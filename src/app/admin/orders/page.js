
'use client';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../dashboard/admin.module.css';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';

export default function AdminOrders() {
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
    );
}
