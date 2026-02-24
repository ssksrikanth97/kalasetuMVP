'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import styles from '../dashboard/admin.module.css';

export default function BulkEnquiriesPage() {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEnquiries = async () => {
        try {
            const q = query(collection(db, 'bulk_enquiries'), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            const fetchedEnquiries = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate()
            }));
            setEnquiries(fetchedEnquiries);
        } catch (error) {
            console.error("Error fetching enquiries:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const updateStatus = async (id, newStatus) => {
        try {
            const docRef = doc(db, 'bulk_enquiries', id);
            await updateDoc(docRef, { status: newStatus });
            setEnquiries(enquiries.map(enq => enq.id === id ? { ...enq, status: newStatus } : enq));
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status.");
        }
    };

    if (loading) {
        return (
            <main className={styles.mainContent}>
                <p>Loading enquiries...</p>
            </main>
        );
    }

    return (
        <main className={styles.mainContent}>
            <header className={styles.header}>
                <div className={styles.titleGroup}>
                    <h1>Bulk Enquiries</h1>
                    <p>Manage bulk order requests from customers.</p>
                </div>
            </header>

            <div className={styles.contentCard} style={{ overflowX: 'auto' }}>
                {enquiries.length === 0 ? (
                    <p>No bulk enquiries found.</p>
                ) : (
                    <table className={styles.dashboardTable}>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Customer Details</th>
                                <th>Product Request</th>
                                <th>Expected Delivery</th>
                                <th>Info</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {enquiries.map((enq) => (
                                <tr key={enq.id}>
                                    <td>{enq.createdAt ? new Intl.DateTimeFormat('en-IN').format(enq.createdAt) : 'N/A'}</td>
                                    <td>
                                        <strong>{enq.customerName}</strong><br />
                                        <a href={`tel:${enq.contactNumber}`} style={{ color: 'var(--color-maroon)' }}>{enq.contactNumber}</a>
                                    </td>
                                    <td>
                                        <strong>{enq.productName}</strong><br />
                                        Qty: {enq.requestedQuantity}<br />
                                        <small>Est: ₹{(enq.requestedQuantity * enq.pricePerUnit).toLocaleString('en-IN')}</small>
                                    </td>
                                    <td>{enq.expectedDeliveryDate ? new Intl.DateTimeFormat('en-IN').format(enq.expectedDeliveryDate.toDate()) : 'N/A'}</td>
                                    <td style={{ maxWidth: '200px', whiteSpace: 'normal' }}>{enq.additionalInfo}</td>
                                    <td>
                                        <span className={`status-badge status-${enq.status.toLowerCase()}`}>
                                            {enq.status}
                                        </span>
                                    </td>
                                    <td>
                                        <select
                                            value={enq.status}
                                            onChange={(e) => updateStatus(enq.id, e.target.value)}
                                            style={{ padding: '0.25rem', borderRadius: '4px', border: '1px solid #ccc' }}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Contacted">Contacted</option>
                                            <option value="Closed">Closed</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <style jsx>{`
                .status-badge {
                    padding: 0.25rem 0.5rem;
                    border-radius: 9999px;
                    font-size: 0.75rem;
                    font-weight: 600;
                }
                .status-pending { background-color: #fef3c7; color: #92400e; }
                .status-contacted { background-color: #dbeafe; color: #1e40af; }
                .status-closed { background-color: #e5e7eb; color: #374151; }
            `}</style>
        </main>
    );
}
