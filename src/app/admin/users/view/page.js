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

    const handleRoleChange = async () => {
        if (!confirm(`Are you sure you want to change this user's role to ${role}?`)) return;
        try {
            const userRef = doc(db, 'users', id);
            await updateDoc(userRef, { role: role });
            setUser(prev => ({ ...prev, role: role }));
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

    const formatDate = (timestamp) => {
        if (!timestamp) return 'N/A';
        // Handle Firestore Timestamp or JS Date
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getInitials = (name) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    };

    if (loading) return <div className={styles.mainContent}><p>Loading user details...</p></div>;
    if (error) return <div className={styles.mainContent}><p className="error">{error}</p></div>;
    if (!user) return <div className={styles.mainContent}><p>User not found. ID: {id}</p></div>;

    return (
        <div className={styles.mainContent}>
            <header className={styles.header}>
                <div className={styles.titleGroup}>
                    <h1>User Details</h1>
                    <p>Manage profile and permissions for <span style={{ fontWeight: '600', color: 'var(--foreground)' }}>{user.name}</span></p>
                </div>
                <Link href="/admin/users" className="btn-secondary">
                    Back to Users
                </Link>
            </header>

            <div className={styles.sectionGrid}>
                {/* Left Column - Main Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Profile Card */}
                    <div className={styles.contentCard}>
                        <div className={styles.cardHeader}>
                            <h2 className={styles.cardTitle}>Profile Information</h2>
                        </div>
                        <div style={{ padding: '1.5rem', display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                            <div style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--card)',
                                border: '2px solid var(--border)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2.5rem',
                                color: 'var(--muted-foreground)',
                                overflow: 'hidden',
                                flexShrink: 0
                            }}>
                                {user.photoURL ? (
                                    <img src={user.photoURL} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    getInitials(user.name)
                                )}
                            </div>

                            <div style={{ flex: 1, minWidth: '200px' }}>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{user.name || 'No Name'}</h3>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <span className={`${styles.statusBadge}`} style={{
                                            backgroundColor: user.role === 'admin' ? '#e0f2fe' : (user.role === 'artist' ? '#fce7f3' : '#f3f4f6'),
                                            color: user.role === 'admin' ? '#0369a1' : (user.role === 'artist' ? '#be185d' : '#374151'),
                                            border: '1px solid transparent'
                                        }}>
                                            {user.role?.toUpperCase() || 'USER'}
                                        </span>
                                        <span className={`${styles.statusBadge} ${user.status === 'Verified' ? styles.statusApproved : styles.statusPending}`}>
                                            {user.status || 'Pending'}
                                        </span>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                    <div>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', marginBottom: '0.25rem' }}>Email</p>
                                        <p style={{ fontWeight: '500' }}>{user.email}</p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', marginBottom: '0.25rem' }}>Phone</p>
                                        <p style={{ fontWeight: '500' }}>{user.phone || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', marginBottom: '0.25rem' }}>User ID</p>
                                        <p style={{ fontSize: '0.875rem', fontFamily: 'monospace' }}>{user.id}</p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', marginBottom: '0.25rem' }}>Joined On</p>
                                        <p style={{ fontWeight: '500' }}>{formatDate(user.createdAt)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Extended Details (JSON Dump for dev, formatted for prod) */}
                    <div className={styles.contentCard}>
                        <div className={styles.cardHeader}>
                            <h2 className={styles.cardTitle}>Additional Details</h2>
                        </div>
                        <div style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
                                {user.city && (
                                    <div>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>City</p>
                                        <p>{user.city}</p>
                                    </div>
                                )}
                                {user.bio && (
                                    <div style={{ gridColumn: '1 / -1' }}>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>Bio</p>
                                        <p>{user.bio}</p>
                                    </div>
                                )}
                                {/* Add more specific fields here as needed */}
                            </div>
                            {/* Fallback for other data */}
                            <details style={{ marginTop: '1rem', cursor: 'pointer' }}>
                                <summary style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>View Raw Data</summary>
                                <pre style={{ marginTop: '0.5rem', padding: '1rem', background: '#f5f5f5', borderRadius: '4px', overflowX: 'auto', fontSize: '0.75rem' }}>
                                    {JSON.stringify(user, null, 2)}
                                </pre>
                            </details>
                        </div>
                    </div>
                </div>

                {/* Right Column - Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className={styles.contentCard}>
                        <div className={styles.cardHeader}>
                            <h2 className={styles.cardTitle}>Account Actions</h2>
                        </div>
                        <div style={{ padding: '1.5rem' }}>
                            <div className={styles.formGroup}>
                                <label>Change Role</label>
                                {user.role === 'admin' ? (
                                    <p style={{ color: 'var(--muted-foreground)', fontStyle: 'italic' }}>Cannot change role for Admin users.</p>
                                ) : (
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <select
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            className={styles.selectField}
                                        >
                                            <option value="customer">Customer</option>
                                            <option value="artist">Artist</option>
                                            <option value="institution">Institution</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                        <button onClick={handleRoleChange} className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
                                            Update
                                        </button>
                                    </div>
                                )}
                            </div>

                            <hr style={{ margin: '1.5rem 0', border: 'none', borderTop: '1px solid var(--border)' }} />

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {user.status !== 'Verified' ? (
                                    <button
                                        onClick={handleVerifyUser}
                                        className="btn-primary"
                                        style={{ width: '100%', backgroundColor: '#166534', borderColor: '#166534' }}
                                    >
                                        Verify User
                                    </button>
                                ) : (
                                    <button disabled className="btn-secondary" style={{ width: '100%', opacity: 0.7, cursor: 'not-allowed' }}>
                                        User Verified
                                    </button>
                                )}

                                <button
                                    onClick={() => alert('Feature coming soon: Password Reset Email')}
                                    className="btn-secondary"
                                    style={{ width: '100%' }}
                                >
                                    Send Password Reset
                                </button>

                                {user.role !== 'admin' && (
                                    <button
                                        onClick={() => alert('Feature coming soon: Delete User')}
                                        className="btn-danger"
                                        style={{ width: '100%', marginTop: '0.5rem' }}
                                    >
                                        Delete User
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={styles.contentCard}>
                        <div className={styles.cardHeader}>
                            <h2 className={styles.cardTitle}>System Metadata</h2>
                        </div>
                        <div style={{ padding: '1.5rem', fontSize: '0.875rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{ color: 'var(--muted-foreground)' }}>Profile Created</span>
                                <span>{formatDate(user.createdAt)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{ color: 'var(--muted-foreground)' }}>Last Login</span>
                                <span>{formatDate(user.lastLoginAt) || 'N/A'}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--muted-foreground)' }}>Provider</span>
                                <span>{user.provider || 'Email/Password'}</span>
                            </div>
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
