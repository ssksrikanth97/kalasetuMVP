'use client';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../dashboard/admin.module.css';
import { useEffect, useState, Suspense } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import { useRouter, useSearchParams } from 'next/navigation';

function EditUserContent() {
    const { logout } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

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
                    const docRef = doc(db, 'users', id);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        setUser(userData);
                        setName(userData.name || '');
                        setEmail(userData.email || '');
                        setRole(userData.role || 'user');
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
        } else {
            setLoading(false);
        }
    }, [id]);

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            // Update role locally in Firestore (API route disabled for static export)
            const userRef = doc(db, 'users', id);
            await updateDoc(userRef, {
                name,
                email,
                role
            });
            alert("User updated in Database. Note: User Claims update requires backend API.");
            router.push('/admin/users');
        } catch (err) {
            setError('Failed to update user.');
            console.error(err);
        }
    };

    const handleResetPassword = async () => {
        alert("Password reset functionality is disabled in this static version.");
        /*
        if (window.confirm('Are you sure you want to send a password reset email to this user?')) {
            // ...
        }
        */
    };

    return (
        <div className={styles.mainContent}>
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
                            <label htmlFor="role">Role (Firestore-only)</label>
                            <select
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className={styles.inputField}
                            >
                                <option value="user">User</option>
                                <option value="artist">Artist</option>
                                <option value="institution">Institution</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div className={styles.formActions}>
                            <button type="submit" className="btn-primary">Update User</button>
                            <button type="button" className="btn-secondary" onClick={handleResetPassword} style={{ opacity: 0.5, cursor: 'not-allowed' }}>Reset Password</button>
                            <Link href="/admin/users">
                                <button type="button" className="btn-secondary">Cancel</button>
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default function EditUser() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EditUserContent />
        </Suspense>
    );
}
