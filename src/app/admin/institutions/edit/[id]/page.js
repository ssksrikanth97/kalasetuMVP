'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import dashboardStyles from '../../dashboard/admin.module.css';
import styles from '../institutions.module.css';

export default function InstitutionFormPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;

    const [formData, setFormData] = useState({
        instituteName: '',
        email: '',
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

    useEffect(() => {
        if (id) {
            const fetchInstitution = async () => {
                setLoading(true);
                try {
                    const docRef = doc(db, 'institutions', id);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setFormData({
                            instituteName: data.basicDetails?.instituteName || '',
                            email: data.basicDetails?.email || '',
                            phone: data.basicDetails?.mobile || '',
                            city: data.basicDetails?.city || '',
                            yearEstablished: data.basicDetails?.yearEstablished || '',
                            description: data.about?.description || '',
                            website: data.contact?.website || '',
                            isExclusive: data.isExclusive || false,
                        });
                    } else {
                        setError('No such institution found!');
                    }
                } catch (err) {
                    setError('Failed to fetch institution data.');
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };
            fetchInstitution();
        }
    }, [id]);

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

        try {
            const instRef = doc(db, 'institutions', id);
            await setDoc(instRef, {
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
                updatedAt: serverTimestamp(),
            }, { merge: true });

            setSuccess('Institution updated successfully! Redirecting...');
            setTimeout(() => {
                router.push('/admin/institutions');
            }, 2000);

        } catch (error) {
            setError(error.message);
            console.error("Error saving institution:", error);
            setLoading(false);
        }
    };

    return (
        <main className={dashboardStyles.mainContent}>
            <header className={dashboardStyles.header}>
                <div className={dashboardStyles.titleGroup}>
                    <h1>Edit Institution</h1>
                    <p>Update the details below.</p>
                </div>
            </header>

            <section className={dashboardStyles.contentCard} style={{padding: '2rem'}}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    {loading && <div className="spinner"></div>}
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}

                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label htmlFor="instituteName">Institute Name</label>
                            <input type="text" id="instituteName" name="instituteName" value={formData.instituteName} onChange={handleChange} required />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="email">Contact Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required disabled />
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
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
}
