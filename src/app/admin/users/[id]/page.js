
'use client';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../dashboard/admin.module.css';
import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import { useRouter, useParams } from 'next/navigation';

export default function UserDetails() {
    const { logout } = useAuth();
    const router = useRouter();
    const params = useParams();
    const { id } = params;

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

    return (
        <div className={styles.dashboardContainer}>
            <aside className={styles.sidebar}>
                <div className={styles.logoContainer} style={{ padding: '0 1rem' }}>
                    <div style={{ position: 'relative', width: '100%', height: '40px' }}>
                        <Image
                            src="/logo.png"
                            alt="KalaSetu Admin"
                            fill
                            style={{ objectFit: 'contain', objectPosition: 'left' }}
                        />
                    </div>
                </div>
                <nav className={styles.navLinks}>
                    <Link href="/admin/dashboard" className={styles.navItem}>
                        <span className={styles.navIcon}>📊</span> Dashboard
                    </Link>
                    <Link href="/admin/users" className={`${styles.navItem} ${styles.navItemActive}`}>
                        <span className={styles.navIcon}>👥</span> Users
                    </Link>
                    <Link href="/admin/products" className={styles.navItem}>
                        <span className={styles.navIcon}>📦</span> Products
                    </Link>
                    <Link href="/admin/orders" className={styles.navItem}>
                        <span className={styles.navIcon}>🛍️</span> Orders
                    </Link>
                    <Link href="/admin/bookings" className={styles.navItem}>
                        <span className={styles.navIcon}>📅</span> Bookings
                    </Link>
                    <Link href="/" target="_blank" className={styles.navItem} style={{ marginTop: 'auto' }}>
                        <span className={styles.navIcon}>🌐</span> Live Site
                    </Link>
                    <button onClick={logout} className={styles.navItem} style={{ background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}>
                        <span className={styles.navIcon}>🚪</span> Logout
                    </button>
                </nav>
            </aside>

            <main className={styles.mainContent}>
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
                    {loading ? (
                        <p>Loading user details...</p>
                    ) : error ? (
                        <p className="error">{error}</p>
                    ) : user && (
                        <div className={styles.orderDetailsLayout}>
                            <div className={styles.orderDetailsPrimary}>
                                <div className={styles.cardHeader}>
                                    <h2 className={styles.cardTitle}>{user.name}</h2>
                                    <div className={styles.statusBadge} data-status={user.role.toLowerCase()}>{user.role}</div>
                                </div>

                                <div className={styles.cardSection}>
                                    <h3 className={styles.sectionTitle}>Contact Information</h3>
                                    <p><strong>Email:</strong> {user.email}</p>
                                </div>

                            </div>

                            <div className={styles.orderDetailsSidebar}>
                                <div className={styles.cardSection}>
                                    <h3 className={styles.sectionTitle}>Update Role</h3>
                                    <div className={styles.formGroup}>
                                        <select 
                                            value={role} 
                                            onChange={(e) => handleRoleChange(e.target.value)} 
                                            className={styles.inputField}
                                        >
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
