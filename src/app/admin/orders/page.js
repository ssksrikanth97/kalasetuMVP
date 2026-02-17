
'use client';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../dashboard/admin.module.css';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, doc, getDoc, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            const ordersList = await Promise.all(querySnapshot.docs.map(async (orderDoc) => {
                const orderData = orderDoc.data();
                let userName = orderData.customerName || 'Guest';

                // Fallback: If no customerName but has customerId, fetch from users
                if (!orderData.customerName && orderData.customerId) {
                    const userRef = doc(db, 'users', orderData.customerId);
                    const userSnap = await getDoc(userRef);
                    if (userSnap.exists()) {
                        userName = userSnap.data().name;
                    }
                }

                let createdAtDate = new Date();
                if (orderData.createdAt?.toDate) {
                    createdAtDate = orderData.createdAt.toDate();
                } else if (orderData.createdAt) {
                    createdAtDate = new Date(orderData.createdAt);
                }

                return {
                    id: orderDoc.id,
                    ...orderData,
                    userName,
                    createdAt: createdAtDate,
                    amount: orderData.amount || 0 // Ensure amount exists
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
                                        <td>₹{order.amount?.toFixed(2)}</td>
                                        <td>
                                            <span className={styles.statusBadge} data-status={order.status.toLowerCase()}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td>
                                            <Link href={`/admin/orders/view?id=${order.id}`}>
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
