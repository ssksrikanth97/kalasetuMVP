
'use client';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../dashboard/admin.module.css';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';

export default function AdminOrders() {
    const { logout } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const q = query(collection(db, 'orders'));
            const querySnapshot = await getDocs(q);
            const ordersList = await Promise.all(querySnapshot.docs.map(async (orderDoc) => {
                const orderData = orderDoc.data();
                let userName = 'Guest';
                if (orderData.userId) {
                    const userRef = doc(db, 'users', orderData.userId);
                    const userSnap = await getDoc(userRef);
                    if (userSnap.exists()) {
                        userName = userSnap.data().name;
                    }
                }
                return {
                    id: orderDoc.id,
                    ...orderData,
                    userName,
                    createdAt: orderData.createdAt.toDate(), // Convert Firestore Timestamp to JS Date
                };
            }));
            setOrders(ordersList);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

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
                    <Link href="/admin/users" className={styles.navItem}>
                        <span className={styles.navIcon}>👥</span> Users
                    </Link>
                    <Link href="/admin/products" className={styles.navItem}>
                        <span className={styles.navIcon}>📦</span> Products
                    </Link>
                    <Link href="/admin/orders" className={`${styles.navItem} ${styles.navItemActive}`}>
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
                        <h1>Order Management</h1>
                        <p>View and manage all customer orders.</p>
                    </div>
                </header>

                <div className={styles.contentCard}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Order List ({orders.length})</h2>
                    </div>
                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>Loading orders...</td>
                                    </tr>
                                ) : orders.length > 0 ? (
                                    orders.map(order => (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.userName}</td>
                                            <td>{new Intl.DateTimeFormat('en-US').format(order.createdAt)}</td>
                                            <td>₹{order.totalAmount.toFixed(2)}</td>
                                            <td>
                                                <span className={styles.statusBadge} data-status={order.status.toLowerCase()}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td>
                                                <Link href={`/admin/orders/${order.id}`}>
                                                    <button className="btn-secondary">View Details</button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
                                            No orders found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
