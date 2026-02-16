'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '@/lib/firebase/firebase';
import dashboardStyles from '../../dashboard/admin.module.css';
import styles from '../institutions.module.css';

export default function NewInstitutionPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        instituteName: '',
        email: '',
        password: '',
        phone: '',
        city: '',
        yearEstablished: '',
        description: '',
        website: '',
        isExclusive: false,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: type === 'checkbox' ? checked : value 
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long.');
            setLoading(false);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            await setDoc(doc(db, 'users', user.uid), {
                name: formData.instituteName,
                email: formData.email,
                phone: formData.phone,
                role: 'institution',
                createdAt: serverTimestamp(),
            });

            await setDoc(doc(db, 'institutions', user.uid), {
                institutionId: user.uid,
                status: 'approved',
                isExclusive: formData.isExclusive,
                basicDetails: {
                    instituteName: formData.instituteName,
                    email: formData.email,
                    mobile: formData.phone,
                    city: formData.city,
                    yearEstablished: formData.yearEstablished,
                },
                about: { description: formData.description },
                contact: { primaryEmail: formData.email, website: formData.website },
                createdAt: serverTimestamp(),
            });

            setSuccess('Institution created successfully! Redirecting...');
            setTimeout(() => {
                router.push('/admin/institutions');
            }, 2000);

        } catch (err) {
            setError(err.message || 'Failed to create institution.');
            console.error(err);
            setLoading(false);
        } 
    };

    return (
        <main className={dashboardStyles.mainContent}>
            <header className={dashboardStyles.header}>
                <div className={dashboardStyles.titleGroup}>
                    <h1>Create New Institution</h1>
                    <p>Fill out the details below to add a new institution.</p>
                </div>
            </header>

            <section className={dashboardStyles.contentCard} style={{padding: '2rem'}}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}

                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label htmlFor="instituteName">Institute Name</label>
                            <input type="text" id="instituteName" name="instituteName" value={formData.instituteName} onChange={handleChange} required />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="email">Contact Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="phone">Phone Number</label>
                            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="city">City</label>
                            <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="yearEstablished">Year Established</label>
                            <input type="number" id="yearEstablished" name="yearEstablished" value={formData.yearEstablished} onChange={handleChange} />
                        </div>
                        <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                            <label htmlFor="website">Website URL</label>
                            <input type="url" id="website" name="website" value={formData.website} onChange={handleChange} />
                        </div>
                        <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                            <label htmlFor="description">Description</label>
                            <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4"></textarea>
                        </div>
                         <div className={styles.checkboxGroup}>
                            <input type="checkbox" id="isExclusive" name="isExclusive" checked={formData.isExclusive} onChange={handleChange} />
                            <label htmlFor="isExclusive">Mark as Exclusive</label>
                            <p>Exclusive institutions are featured on the homepage.</p>
                        </div>
                    </div>

                    <div className={styles.formActions}>
                        <button type="button" onClick={() => router.back()} className="btn-secondary" disabled={loading}>Cancel</button>
                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? 'Creating...' : 'Create Institution'}
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
}
