
'use client';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import styles from '../dashboard/admin.module.css';
import { useEffect, useState } from 'react';

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/admin/users');
            const data = await response.json();
            setUsers(data.users);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const deleteUser = async (uid) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const response = await fetch('/api/admin/users', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ uid }),
                });

                if (response.ok) {
                    fetchUsers(); // Refresh the list after deletion
                } else {
                    const data = await response.json();
                    alert(`Error deleting user: ${data.error}`);
                }
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Failed to delete user. Please try again.');
            }
        }
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
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>Loading users...</td>
                                </tr>
                            ) : users.length > 0 ? (
                                users.map(user => (
                                    <tr key={user.uid}>
                                        <td>{user.uid}</td>
                                        <td>{user.displayName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.customClaims && user.customClaims.role ? user.customClaims.role : 'user'}</td>
                                        <td>
                                            <Link href={`/admin/users/edit/${user.uid}`}>
                                                <button className="btn-secondary">Edit</button>
                                            </Link>
                                            <button onClick={() => deleteUser(user.uid)} className="btn-danger" style={{ marginLeft: '0.5rem' }}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
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
