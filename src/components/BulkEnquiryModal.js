'use client';

import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import styles from './Modal.module.css';

export default function BulkEnquiryModal({ isOpen, onClose, product, quantity, onSuccess }) {
    const [name, setName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [expectedDate, setExpectedDate] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            await addDoc(collection(db, 'bulk_enquiries'), {
                productId: product.id,
                productName: product.productName || product.name,
                requestedQuantity: quantity,
                pricePerUnit: product.price,
                customerName: name,
                contactNumber,
                expectedDeliveryDate: new Date(expectedDate),
                additionalInfo,
                status: 'Pending',
                createdAt: serverTimestamp()
            });

            if (onSuccess) onSuccess();
            onClose();
        } catch (err) {
            console.error('Error submitting enquiry:', err);
            setError('Failed to submit enquiry. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>&times;</button>
                <h2>Submit Bulk Enquiry</h2>
                <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
                    You are requesting <strong>{quantity}</strong> units of <strong>{product.productName || product.name}</strong>.
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {error && <div style={{ color: 'red', fontSize: '0.9rem' }}>{error}</div>}

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.25rem' }}>Name</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.25rem' }}>Contact Number</label>
                        <input type="tel" value={contactNumber} onChange={e => setContactNumber(e.target.value)} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.25rem' }}>Expected Delivery Date</label>
                        <input type="date" value={expectedDate} onChange={e => setExpectedDate(e.target.value)} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.25rem' }}>Additional Information (Optional)</label>
                        <textarea value={additionalInfo} onChange={e => setAdditionalInfo(e.target.value)} rows="3" style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}></textarea>
                    </div>

                    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                        <button type="button" onClick={onClose} style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                        <button type="submit" disabled={submitting} style={{ padding: '0.5rem 1rem', background: 'var(--color-maroon)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                            {submitting ? 'Submitting...' : 'Submit Enquiry'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
