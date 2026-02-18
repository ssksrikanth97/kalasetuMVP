'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { createUserWithEmailAndPassword, getAuth, signOut } from 'firebase/auth';
import { initializeApp, getApp, getApps, deleteApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, auth, storage, firebaseConfig } from '@/lib/firebase/firebase';
import dashboardStyles from '../../dashboard/admin.module.css';
import styles from '../institutions.module.css';

export default function NewInstitutionPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        instituteName: '',
        email: '',
        // password removed
        phone: '',
        city: '',
        yearEstablished: '',
        description: '',
        website: '',
        isExclusive: false,
    });
    const [galleryFiles, setGalleryFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
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

    const handleFileChange = (e) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setGalleryFiles(prev => [...prev, ...files]);

            const newPreviews = files.map(file => URL.createObjectURL(file));
            setPreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        // Create a secondary app instance to create user without logging out admin
        let secondaryApp;
        try {
            // Check if app exists already (unlikely with unique name but good practice)
            const appName = "SecondaryApp-" + Date.now();
            secondaryApp = initializeApp(firebaseConfig, appName);
            const secondaryAuth = getAuth(secondaryApp);

            // Generate temporary password
            const tempPassword = Math.random().toString(36).slice(-8) + "Aa1@";

            // Create User
            const userCredential = await createUserWithEmailAndPassword(secondaryAuth, formData.email, tempPassword);
            const newUser = userCredential.user;
            const newUid = newUser.uid; // Get the UID for the new user

            // Upload Images (using primary app's storage where Admin is authenticated)
            let galleryUrls = [];
            if (galleryFiles.length > 0) {
                const uploadPromises = galleryFiles.map(async (file) => {
                    const fileRef = ref(storage, `institutions/${newUid}/gallery_${Date.now()}_${file.name}`);
                    await uploadBytes(fileRef, file);
                    return getDownloadURL(fileRef);
                });
                galleryUrls = await Promise.all(uploadPromises);
            }

            // Create Firestore Documents
            await setDoc(doc(db, 'users', newUid), {
                name: formData.instituteName,
                email: formData.email,
                phone: formData.phone,
                role: 'institution',
                createdAt: serverTimestamp(),
            });

            await setDoc(doc(db, 'institutions', newUid), {
                institutionId: newUid,
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
                contact: { primaryEmail: formData.email, website: formData.website || '' },
                gallery: galleryUrls,
                createdAt: serverTimestamp(),
            });

            setSuccess(`Institution created! Temporary Password: ${tempPassword}`);

            // Clean up secondary app
            await signOut(secondaryAuth); // Sign out just in case
            await deleteApp(secondaryApp); // Delete the app instance

            // Redirect after delay (longer delay to let them copy password)
            // setTimeout(() => router.push('/admin/institutions'), 10000);

        } catch (err) {
            setError(err.message || 'Failed to create institution.');
            console.error(err);
            if (secondaryApp) await deleteApp(secondaryApp).catch(console.error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={dashboardStyles.mainContent}>
            <header className={dashboardStyles.header}>
                <div className={dashboardStyles.titleGroup}>
                    <h1>Create New Institution</h1>
                    <p>Fill out the details below. A temporary password will be generated.</p>
                </div>
            </header>

            <section className={dashboardStyles.contentCard} style={{ padding: '2rem' }}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    {error && <div className="error-message" style={{ color: 'red', marginBottom: '1rem', padding: '1rem', background: '#ffebee' }}>{error}</div>}
                    {success && <div className="success-message" style={{ color: 'green', marginBottom: '1rem', padding: '1rem', background: '#e8f5e9', border: '1px solid green' }}>
                        <h3>{success}</h3>
                        <p>Please copy this password now. It will not be shown again.</p>
                        <button type="button" onClick={() => router.push('/admin/institutions')} className="btn-secondary" style={{ marginTop: '0.5rem' }}>Go to List</button>
                    </div>}

                    {!success && (
                        <>
                            <div className={styles.formGrid}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="instituteName">Institute Name *</label>
                                    <input type="text" id="instituteName" name="instituteName" value={formData.instituteName} onChange={handleChange} required className={dashboardStyles.inputField} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="email">Contact Email *</label>
                                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={dashboardStyles.inputField} />
                                </div>
                                {/* Password Field Removed */}
                                <div className={styles.formGroup}>
                                    <label htmlFor="phone">Phone Number</label>
                                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={dashboardStyles.inputField} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="city">City</label>
                                    <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} className={dashboardStyles.inputField} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="yearEstablished">Year Established</label>
                                    <input type="number" id="yearEstablished" name="yearEstablished" value={formData.yearEstablished} onChange={handleChange} className={dashboardStyles.inputField} />
                                </div>
                                <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                                    <label htmlFor="website">Website URL (Optional)</label>
                                    <input type="url" id="website" name="website" value={formData.website} onChange={handleChange} className={dashboardStyles.inputField} />
                                </div>
                                <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                                    <label htmlFor="description">Description (Bio)</label>
                                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4" className={dashboardStyles.inputField}></textarea>
                                </div>

                                <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                                    <label>Gallery Images</label>
                                    <input type="file" multiple onChange={handleFileChange} accept="image/*" className={dashboardStyles.inputField} />
                                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
                                        {previews.map((src, idx) => (
                                            <img key={idx} src={src} alt="preview" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                                        ))}
                                    </div>
                                </div>

                                <div className={styles.checkboxGroup} style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <input type="checkbox" id="isExclusive" name="isExclusive" checked={formData.isExclusive} onChange={handleChange} style={{ width: 'auto' }} />
                                    <div>
                                        <label htmlFor="isExclusive" style={{ marginBottom: 0 }}>Mark as Exclusive</label>
                                        <p style={{ fontSize: '0.75rem', color: '#666', margin: 0 }}>Exclusive institutions are featured on the homepage.</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.formActions}>
                                <button type="button" onClick={() => router.back()} className="btn-secondary" disabled={loading}>Cancel</button>
                                <button type="submit" className="btn-primary" disabled={loading}>
                                    {loading ? 'Creating...' : 'Create Institution'}
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </section>
        </main>
    );
}
