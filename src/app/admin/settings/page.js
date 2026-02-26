'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import styles from '../dashboard/admin.module.css';
import Toast from '@/components/Toast';

export default function StoreSettingsPage() {
    const [purchaseMode, setPurchaseMode] = useState('Standard Checkout');
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [whatsappMessageTemplate, setWhatsappMessageTemplate] = useState('');
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const docRef = doc(db, 'system_settings', 'store_settings');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setPurchaseMode(data.purchaseMode || 'Standard Checkout');
                    setWhatsappNumber(data.whatsappNumber || '');
                    setWhatsappMessageTemplate(data.whatsappMessageTemplate || 'Hi, I want to order {ProductName}. Quantity: {Quantity}. Price: {Price}. Product Link: {Link}');
                    setMaintenanceMode(data.maintenanceMode || false);
                }
            } catch (error) {
                console.error("Error fetching settings:", error);
                setToastMessage("Error loading settings.");
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const docRef = doc(db, 'system_settings', 'store_settings');
            await setDoc(docRef, {
                purchaseMode,
                whatsappNumber,
                whatsappMessageTemplate,
                maintenanceMode
            }, { merge: true });
            setToastMessage('Settings saved successfully!');
        } catch (error) {
            console.error("Error saving settings:", error);
            setToastMessage('Failed to save settings.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <main className={styles.mainContent}>
                <p>Loading settings...</p>
            </main>
        );
    }

    return (
        <main className={styles.mainContent}>
            <Toast message={toastMessage} onClose={() => setToastMessage('')} />
            <header className={styles.header}>
                <div className={styles.titleGroup}>
                    <h1>Store Settings</h1>
                    <p>Configure global store options and purchase modes.</p>
                </div>
            </header>

            <div className={styles.contentCard}>
                <form onSubmit={handleSave} className={styles.formLayout}>
                    <div className={styles.formGroup} style={{ padding: '1rem', background: '#fff5f5', border: '1px solid #fed7d7', borderRadius: '8px', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <label htmlFor="maintenanceMode" style={{ fontWeight: 'bold', color: '#c53030', marginBottom: 0 }}>Under Construction / Maintenance Mode</label>
                                <small style={{ color: '#e53e3e', display: 'block', marginTop: '0.25rem' }}>
                                    When active, the public website will be hidden. Only Admins can access the site.
                                </small>
                            </div>
                            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    id="maintenanceMode"
                                    checked={maintenanceMode}
                                    onChange={(e) => setMaintenanceMode(e.target.checked)}
                                    style={{ width: '24px', height: '24px', accentColor: '#c53030' }}
                                />
                                <span style={{ marginLeft: '0.5rem', fontWeight: '600' }}>{maintenanceMode ? 'ACTIVE' : 'OFF'}</span>
                            </label>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="purchaseMode">Global Purchase Mode</label>
                        <select
                            id="purchaseMode"
                            value={purchaseMode}
                            onChange={(e) => setPurchaseMode(e.target.value)}
                            className={styles.inputField}
                            required
                        >
                            <option value="Standard Checkout">Standard Checkout (Cart & Payment Gateway)</option>
                            <option value="Order via WhatsApp">Order via WhatsApp</option>
                        </select>
                        <small style={{ color: '#6b7280', display: 'block', marginTop: '0.5rem' }}>
                            {purchaseMode === 'Standard Checkout'
                                ? "Users will add items to their cart and checkout via the website."
                                : "The cart will be hidden, and users will be redirected to WhatsApp to place orders."}
                        </small>
                    </div>

                    {purchaseMode === 'Order via WhatsApp' && (
                        <>
                            <div className={styles.formGroup}>
                                <label htmlFor="whatsappNumber">WhatsApp Business Number (with country code)</label>
                                <input
                                    id="whatsappNumber"
                                    type="text"
                                    value={whatsappNumber}
                                    onChange={(e) => setWhatsappNumber(e.target.value)}
                                    className={styles.inputField}
                                    placeholder="e.g. 919876543210"
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="whatsappMessageTemplate">WhatsApp Message Template</label>
                                <textarea
                                    id="whatsappMessageTemplate"
                                    value={whatsappMessageTemplate}
                                    onChange={(e) => setWhatsappMessageTemplate(e.target.value)}
                                    className={styles.inputField}
                                    rows="4"
                                    required
                                />
                                <small style={{ color: '#6b7280', display: 'block', marginTop: '0.5rem' }}>
                                    Available variables: {'{ProductName}'}, {'{Quantity}'}, {'{Price}'}, {'{Link}'}
                                </small>
                            </div>
                        </>
                    )}

                    <div className={styles.formActions} style={{ marginTop: '2rem' }}>
                        <button type="submit" className="btn-primary" disabled={saving}>
                            {saving ? 'Saving...' : 'Save Settings'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
