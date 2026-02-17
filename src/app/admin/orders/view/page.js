'use client';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../dashboard/admin.module.css';
import { useEffect, useState, Suspense } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import { useRouter, useSearchParams } from 'next/navigation';

function OrderDetailsContent() {
    const { logout } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

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
                        let userName = orderData.customerName || 'Guest';
                        if (!orderData.customerName && orderData.customerId) {
                            const userRef = doc(db, 'users', orderData.customerId);
                            const userSnap = await getDoc(userRef);
                            if (userSnap.exists()) {
                                userName = userSnap.data().name;
                            }
                        }

                        setOrder({
                            id: orderSnap.id,
                            ...orderData,
                            userName,
                            amount: orderData.amount || orderData.totalAmount || 0
                        });
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
        } else {
            setLoading(false);
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
        <div className={styles.mainContent}>
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
                            <p>{order.userName}</p>
                        </div>
                        <div className={styles.detailItem}>
                            <span>Customer ID</span>
                            <p>{order.customerId || 'N/A'}</p>
                        </div>
                        <div className={styles.detailItem}>
                            <span>Total Amount</span>
                            <p>₹{order.amount?.toFixed(2)}</p>
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
                            <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className={styles.inputField} style={{ width: '100%' }}>
                                <option value="Pending">Pending</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                        <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>Update Status</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default function OrderDetails() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <OrderDetailsContent />
        </Suspense>
    );
}
