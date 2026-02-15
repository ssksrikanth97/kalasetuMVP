
'use client';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../dashboard/admin.module.css';
import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import { useRouter, useParams } from 'next/navigation';

export default function OrderDetails() {
    const { logout } = useAuth();
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (id) {
            const fetchOrder = async () => {
                try {
                    const orderRef = doc(db, 'orders', id);
                    const orderSnap = await getDoc(orderRef);

                    if (orderSnap.exists()) {
                        const orderData = orderSnap.data();
                        let user = null;
                        if (orderData.userId) {
                            const userRef = doc(db, 'users', orderData.userId);
                            const userSnap = await getDoc(userRef);
                            if (userSnap.exists()) {
                                user = userSnap.data();
                            }
                        }
                        setOrder({ id: orderSnap.id, ...orderData, user });
                        setStatus(orderData.status);
                    } else {
                        alert('Order not found.');
                        router.push('/admin/orders');
                    }
                } catch (error) {
                    console.error('Error fetching order:', error);
                    alert('Failed to fetch order details.');
                } finally {
                    setLoading(false);
                }
            };
            fetchOrder();
        }
    }, [id, router]);

    const handleStatusChange = async (e) => {
        e.preventDefault();
        try {
            const orderRef = doc(db, 'orders', id);
            await updateDoc(orderRef, { status });
            alert('Order status updated successfully!');
            router.push('/admin/orders');
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update order status.');
        }
    };

    if (loading) {
        return <p>Loading order details...</p>;
    }

    if (!order) {
        return <p>Order not found.</p>;
    }

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
                        <h1>Order #{order.id}</h1>
                        <p>Manage and view details for this order.</p>
                    </div>
                     <Link href="/admin/orders">
                        <button className="btn-secondary">Back to Orders</button>
                    </Link>
                </header>

                <div className={styles.contentLayout}>
                    <div className={styles.orderDetailsCard}>
                        <div className={styles.cardHeader}>
                            <h2 className={styles.cardTitle}>Order Summary</h2>
                        </div>
                         <div className={styles.detailGrid}>
                            <div className={styles.detailItem}>
                                <span>Customer</span>
                                <p>{order.user ? order.user.name : 'Guest'}</p>
                            </div>
                            <div className={styles.detailItem}>
                                <span>Email</span>
                                <p>{order.user ? order.user.email : 'N/A'}</p>
                            </div>
                            <div className={styles.detailItem}>
                                <span>Total Amount</span>
                                <p>₹{order.totalAmount.toFixed(2)}</p>
                            </div>
                            <div className={styles.detailItem}>
                                <span>Status</span>
                                <p>{order.status}</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.orderDetailsCard}>
                        <div className={styles.cardHeader}>
                            <h2 className={styles.cardTitle}>Update Status</h2>
                        </div>
                        <form onSubmit={handleStatusChange} className={styles.formLayout}>
                             <div className={styles.formGroup}>
                                <label htmlFor="status">Order Status</label>
                                <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className={styles.inputField}>
                                    <option value="Pending">Pending</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>
                            <button type="submit" className="btn-primary">Update Status</button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
