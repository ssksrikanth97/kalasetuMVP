'use client';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import styles from '../dashboard/admin.module.css';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            // Fetch directly from Firestore instead of API
            const querySnapshot = await getDocs(collection(db, 'users'));
            const userList = querySnapshot.docs.map(doc => ({
                uid: doc.id,
                ...doc.data()
            }));
            setUsers(userList);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Delete functionality would require API or Cloud Function for Auth deletion. 
    // Here we can only delete from Firestore strictly speaking, but let's disable strictly.
    const deleteUser = async (uid) => {
        alert("Deleting users is disabled in this static version. Please use the Firebase Console.");
        /* 
        if (window.confirm('Are you sure you want to delete this user?')) {
             // ... 
        } 
        */
    };

    return (
        <main className={styles.mainContent}>
            <header className={styles.header}>
                <div className={styles.titleGroup}>
                    <h1>User Management</h1>
                    <p>View and manage application users.</p>
                </div>
            </header>

            <div className={styles.contentCard}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>User List ({users.length})</h2>
                </div>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>Loading users...</td>
                                </tr>
                            ) : users.length > 0 ? (
                                users.map(user => (
                                    <tr key={user.uid}>
                                        <td>{user.uid}</td>
                                        <td>{user.name || user.displayName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role || 'user'}</td>
                                        <td>
                                            <span style={{
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '9999px',
                                                fontSize: '0.75rem',
                                                fontWeight: '500',
                                                backgroundColor: user.status === 'Verified' ? '#dcfce7' : '#fee2e2',
                                                color: user.status === 'Verified' ? '#166534' : '#b91c1c'
                                            }}>
                                                {user.status || 'Pending'}
                                            </span>
                                        </td>
                                        <td>
                                            <Link href={`/admin/users/view?id=${user.uid}`}>
                                                <button className="btn-secondary">View Details</button>
                                            </Link>
                                            <button onClick={() => deleteUser(user.uid)} className="btn-danger" style={{ marginLeft: '0.5rem', opacity: 0.5, cursor: 'not-allowed' }}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
