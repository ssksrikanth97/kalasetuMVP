'use client';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import styles from '../../dashboard/admin.module.css';
import { useEffect, useState, Suspense } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import { useRouter, useSearchParams } from 'next/navigation';

function UserDetailsContent() {
    const { logout } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [role, setRole] = useState('');

    useEffect(() => {
        if (id) {
            const fetchUser = async () => {
                try {
                    const docRef = doc(db, 'users', id);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const userData = { id: docSnap.id, ...docSnap.data() };
                        setUser(userData);
                        setRole(userData.role);
                    } else {
                        setError('No such user!');
                    }
                } catch (err) {
                    setError('Failed to fetch user data.');
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };
            fetchUser();
        } else {
            setLoading(false);
        }
    }, [id]);

    const handleRoleChange = async (newRole) => {
        setRole(newRole);
        try {
            const userRef = doc(db, 'users', id);
            await updateDoc(userRef, { role: newRole });
            alert('User role updated successfully');
        } catch (error) {
            alert(`Error updating role: ${error.message}`);
        }
    };

    const handleVerifyUser = async () => {
        if (!confirm('Are you sure you want to verify this user?')) return;
        try {
            const userRef = doc(db, 'users', id);
            await updateDoc(userRef, { status: 'Verified' });
            setUser(prev => ({ ...prev, status: 'Verified' }));
            alert('User verified successfully!');
        } catch (error) {
            console.error('Error verifying user:', error);
            alert('Failed to verify user.');
        }
    };

    if (loading) return <p>Loading user details...</p>;
    if (error) return <p className="error">{error}</p>;
    if (!user) return <p>User not found. ID: {id}</p>;

    return (
        <div className={styles.mainContent}>
            <header className={styles.header}>
                <div className={styles.titleGroup}>
                    <h1>User Details</h1>
                    <p>View and manage a specific user's details and role.</p>
                </div>
                <Link href="/admin/users">
                    <button className="btn-secondary">Back to Users</button>
                </Link>
            </header>

            <div className={styles.contentCard}>
                <div className={styles.orderDetailsLayout}>
                    <div className={styles.orderDetailsPrimary}>
                        <div className={styles.cardHeader}>
                            <h2 className={styles.cardTitle}>{user.name || 'No Name'}</h2>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <span className={styles.statusBadge} data-status={user.role?.toLowerCase()}>{user.role}</span>
                                <span className={styles.statusBadge} style={{ backgroundColor: user.status === 'Verified' ? '#dcfce7' : '#fee2e2', color: user.status === 'Verified' ? '#166534' : '#b91c1c' }}>
                                    {user.status || 'Pending'}
                                </span>
                            </div>
                        </div>

                        <div className={styles.cardSection}>
                            <h3 className={styles.sectionTitle}>Contact Information</h3>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Phone:</strong> {user.phone || 'N/A'}</p>
                            <p><strong>User ID:</strong> {user.id}</p>
                        </div>
                    </div>

                    <div className={styles.orderDetailsSidebar}>
                        <div className={styles.cardSection}>
                            <h3 className={styles.sectionTitle}>Actions</h3>

                            <div className={styles.formGroup}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Update Role</label>
                                <select
                                    value={role}
                                    onChange={(e) => handleRoleChange(e.target.value)}
                                    className={styles.inputField}
                                    style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
                                >
                                    <option value="user">User</option>
                                    <option value="customer">Customer</option>
                                    <option value="artist">Artist</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            {user.status !== 'Verified' && (
                                <button
                                    onClick={handleVerifyUser}
                                    className="btn-primary"
                                    style={{ width: '100%', backgroundColor: '#166534' }}
                                >
                                    Mark as Verified
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function UserDetails() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UserDetailsContent />
        </Suspense>
    );
}
