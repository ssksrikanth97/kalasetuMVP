
'use client';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../../dashboard/admin.module.css';
import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import { useRouter, useParams } from 'next/navigation';

export default function EditUser() {
    const { logout } = useAuth();
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchUser = async () => {
                try {
                    const response = await fetch('/api/admin/users');
                    const data = await response.json();
                    const userRecord = data.users.find(u => u.uid === id);

                    const docRef = doc(db, 'users', id);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        setUser(userData);
                        setName(userData.name);
                        setEmail(userData.email);
                        if (userRecord && userRecord.customClaims) {
                            setRole(userRecord.customClaims.role || 'user');
                        } else {
                            setRole(userData.role || 'user');
                        }

                    } else {
                        setError('No such user in firestore!');
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

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch('/api/admin/users', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ uid: id, role }),
            });

            if (response.ok) {
                const userRef = doc(db, 'users', id);
                await updateDoc(userRef, {
                    name,
                    email,
                });
                router.push('/admin/users');
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to update user role.');
            }
        } catch (err) {
            setError('Failed to update user.');
            console.error(err);
        }
    };

    const handleResetPassword = async () => {
        if (window.confirm('Are you sure you want to send a password reset email to this user?')) {
            try {
                const response = await fetch('/api/admin/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });

                if (response.ok) {
                    alert('Password reset email sent successfully');
                } else {
                    const data = await response.json();
                    alert(`Error sending password reset email: ${data.error}`);
                }
            } catch (error) {
                console.error('Error sending password reset email:', error);
                alert('Failed to send password reset email. Please try again.');
            }
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
                        <h1>Edit User</h1>
                        <p>Modify user details and role.</p>
                    </div>
                </header>

                <div className={styles.contentCard}>
                    {loading ? (
                        <p>Loading user data...</p>
                    ) : error ? (
                        <p className="error">{error}</p>
                    ) : (
                        <form onSubmit={handleUpdateUser}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className={styles.inputField}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={styles.inputField}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="role">Role</label>
                                <select
                                    id="role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className={styles.inputField}
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div className={styles.formActions}>
                                <button type="submit" className="btn-primary">Update User</button>
                                <button type="button" className="btn-secondary" onClick={handleResetPassword}>Reset Password</button>
                                <Link href="/admin/users">
                                    <button type="button" className="btn-secondary">Cancel</button>
                                </Link>
                            </div>
                        </form>
                    )}
                </div>
            </main>
        </div>
    );
}
