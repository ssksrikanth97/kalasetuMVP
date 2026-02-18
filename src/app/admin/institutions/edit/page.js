'use client';
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase/firebase';
import dashboardStyles from '../../dashboard/admin.module.css';
import styles from '../institutions.module.css';

function InstitutionFormContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [formData, setFormData] = useState({
        instituteName: '',
        email: '',
        phone: '',
        city: '',
        description: '',
        website: '',
        isExclusive: false,
        gallery: []
    });
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

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
                        description: data.description || '',
                        website: data.basicDetails?.website || '',
                        isExclusive: data.isExclusive || false,
                        gallery: data.gallery || [] // Load existing gallery
                    });
                }
            } catch (err) {
                console.error("Error fetching institution:", err);
                setError("Failed to load institution details.");
            } finally {
                setLoading(false);
            }
        };

        fetchInstitution();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setUploading(true);
        const newImageUrls = [];

        try {
            for (const file of files) {
                const storageRef = ref(storage, `institutions/${id}/gallery/${Date.now()}_${file.name}`);
                await uploadBytes(storageRef, file);
                const url = await getDownloadURL(storageRef);
                newImageUrls.push(url);
            }

            setFormData(prev => ({
                ...prev,
                gallery: [...prev.gallery, ...newImageUrls]
            }));
        } catch (error) {
            console.error("Error uploading images:", error);
            setError("Failed to upload updated images.");
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (indexToRemove) => {
        setFormData(prev => ({
            ...prev,
            gallery: prev.gallery.filter((_, index) => index !== indexToRemove)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const docRef = doc(db, 'institutions', id);
            await setDoc(docRef, {
                basicDetails: {
                    instituteName: formData.instituteName,
                    email: formData.email,
                    mobile: formData.phone,
                    city: formData.city,
                    website: formData.website,
                },
                description: formData.description,
                isExclusive: formData.isExclusive,
                gallery: formData.gallery, // Save gallery array
                updatedAt: serverTimestamp()
            }, { merge: true });

            alert("Institution updated successfully!");
            router.push('/admin/institutions');
        } catch (error) {
            console.error("Error updating institution:", error);
            setError("Failed to update institution.");
        } finally {
            setLoading(false);
        }
    };

    if (loading && !formData.instituteName) return <div>Loading...</div>;

    return (
        <main className={dashboardStyles.mainContent}>
            <header className={dashboardStyles.header}>
                <div className={dashboardStyles.titleGroup}>
                    <h1>Edit Institution</h1>
                    <Link href="/admin/institutions" className={styles.backLink}>← Back to List</Link>
                </div>
            </header>

            <section className={dashboardStyles.contentCard}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    {error && <p className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label>Institution Name</label>
                            <input name="instituteName" value={formData.instituteName} onChange={handleChange} required />
                        </div>

                        <div className={styles.formGroup}>
                            <label>City</label>
                            <input name="city" value={formData.city} onChange={handleChange} required />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Phone</label>
                            <input name="phone" value={formData.phone} onChange={handleChange} />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Website</label>
                            <input name="website" value={formData.website} onChange={handleChange} />
                        </div>

                        <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                            <label>Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} rows={5} />
                        </div>

                        <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                            <label>Gallery Images</label>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={uploading}
                                style={{ marginBottom: '1rem' }}
                            />
                            {uploading && <p>Uploading images...</p>}

                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                                {formData.gallery.map((url, index) => (
                                    <div key={index} style={{ position: 'relative', width: '100px', height: '100px' }}>
                                        <img
                                            src={url}
                                            alt={`Gallery ${index}`}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            style={{
                                                position: 'absolute',
                                                top: '-5px',
                                                right: '-5px',
                                                background: 'red',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '50%',
                                                width: '20px',
                                                height: '20px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '12px'
                                            }}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.checkboxGroup}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <input
                                    type="checkbox"
                                    name="isExclusive"
                                    checked={formData.isExclusive}
                                    onChange={handleChange}
                                />
                                Mark as Exclusive (Featured on Homepage)
                            </label>
                        </div>
                    </div>

                    <div className={styles.formActions} style={{ marginTop: '2rem' }}>
                        <button type="submit" className="btn-primary" disabled={loading || uploading}>
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
}

export default function InstitutionFormPage() {
    return (
        <Suspense fallback={<div>Loading form...</div>}>
            <InstitutionFormContent />
        </Suspense>
    );
}
