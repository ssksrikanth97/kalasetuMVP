'use client';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase/firebase';
import { collection, query, where, getDocs, orderBy, updateDoc, doc } from 'firebase/firestore';

export default function CustomerOrders() {
    const { user, loading } = useAuth();
    const [orders, setOrders] = useState([]);
    const [fetchLoading, setFetchLoading] = useState(true);

    const fetchOrders = async () => {
        if (!user) return;
        setFetchLoading(true);
        try {
            const q = query(
                collection(db, 'orders'),
                where('customerId', '==', user.uid),
                orderBy('createdAt', 'desc')
            );
            const querySnapshot = await getDocs(q);
            const fetchedOrders = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate() : new Date(doc.data().createdAt)
            }));
            setOrders(fetchedOrders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setFetchLoading(false);
        }
    };

    useEffect(() => {
        if (!loading && user) {
            fetchOrders();
        }
    }, [user, loading]);

    const handleCancelOrder = async (orderId) => {
        if (!confirm("Are you sure you want to cancel this order?")) return;

        try {
            const orderRef = doc(db, 'orders', orderId);
            await updateDoc(orderRef, {
                status: 'Cancelled',
                cancelledAt: new Date(),
                cancelledBy: 'customer'
            });
            alert("Order cancelled successfully.");
            fetchOrders(); // Refresh list
        } catch (error) {
            console.error("Error cancelling order:", error);
            alert("Failed to cancel order: " + error.message);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '100vh' }}>
            <Navbar />
            <div className="container" style={{ padding: '2rem 1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <Link href="/customer/dashboard" className="btn-secondary">← Back</Link>
                    <h1 style={{ color: 'var(--color-maroon)', margin: 0 }}>My Orders</h1>
                </div>

                {fetchLoading ? (
                    <p>Loading orders...</p>
                ) : orders.length === 0 ? (
                    <div className="card">
                        <p>No orders found.</p>
                        <Link href="/shop" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>Start Shopping</Link>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {orders.map(order => (
                            <div key={order.id} className="card" style={{ borderLeft: `4px solid ${order.status === 'Cancelled' ? 'red' : order.status === 'Accepted' ? 'green' : 'orange'}` }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                                    <div>
                                        <h3 style={{ margin: '0 0 0.5rem 0' }}>Order #{order.id.slice(0, 8)}</h3>
                                        <p style={{ margin: 0, color: 'gray', fontSize: '0.9rem' }}>Placed on {order.createdAt.toLocaleDateString()}</p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '999px',
                                            background: order.status === 'Cancelled' ? '#fee2e2' : order.status === 'Accepted' ? '#dcfce7' : '#ffedd5',
                                            color: order.status === 'Cancelled' ? '#b91c1c' : order.status === 'Accepted' ? '#15803d' : '#9a3412',
                                            fontSize: '0.85rem',
                                            fontWeight: 'bold'
                                        }}>
                                            {order.status || 'Pending'}
                                        </span>
                                        <p style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>₹{order.amount?.toLocaleString('en-IN')}</p>
                                    </div>
                                </div>

                                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
                                    <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Items</h4>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                        {order.items?.map((item, idx) => (
                                            <li key={idx} style={{ padding: '0.5rem 0', display: 'flex', justifyContent: 'space-between' }}>
                                                <span>{item.quantity}x {item.productName}</span>
                                                <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Allow cancellation only if status is NOT 'Accepted' or 'Cancelled' */}
                                {order.status !== 'Accepted' && order.status !== 'Cancelled' && (
                                    <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                                        <button
                                            onClick={() => handleCancelOrder(order.id)}
                                            style={{
                                                background: 'transparent',
                                                border: '1px solid #ef4444',
                                                color: '#ef4444',
                                                padding: '0.5rem 1rem',
                                                borderRadius: '0.375rem',
                                                cursor: 'pointer',
                                                fontSize: '0.875rem'
                                            }}
                                        >
                                            Cancel Order
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
