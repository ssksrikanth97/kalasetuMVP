'use client';
import { useState } from 'react';
import Link from 'next/link';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase/firebase';
import { useRouter } from 'next/navigation';
import dashboardStyles from '../../dashboard/admin.module.css';
import styles from '../testimonials.module.css';

export default function NewTestimonialPage() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleCreateTestimonial = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            let logoImgUrl = '';
            if (image) {
                const imageRef = ref(storage, `testimonials/${Date.now()}_${image.name}`);
                await uploadBytes(imageRef, image);
                logoImgUrl = await getDownloadURL(imageRef);
            }

            await addDoc(collection(db, 'testimonials'), {
                title,
                description,
                logoImg: logoImgUrl,
                createdAt: serverTimestamp(),
            });

            router.push('/admin/testimonials');
        } catch (err) {
            console.error("Error creating testimonial:", err);
            setError('Failed to create testimonial. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={dashboardStyles.mainContent}>
            <header className={dashboardStyles.header}>
                <div className={dashboardStyles.titleGroup}>
                    <h1>Add New Testimonial</h1>
                    <p>Enter details for the new testimonial.</p>
                </div>
                <Link href="/admin/testimonials" className="btn-secondary">
                    Back to Testimonials
                </Link>
            </header>

            <div className={dashboardStyles.contentCard}>
                <form onSubmit={handleCreateTestimonial} className={styles.form}>
                    {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

                    <div className={styles.formGroup}>
                        <label htmlFor="title">Title (e.g. Testimonial Title or Name)</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={styles.inputField}
                            required
                            placeholder="e.g. John Doe - Artisan"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="description">Description (Testimonial Text)</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={styles.inputField}
                            rows="4"
                            required
                            placeholder="Describe their experience..."
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="image">Logo/Image (Optional)</label>
                        <input
                            id="image"
                            type="file"
                            onChange={handleImageChange}
                            className={styles.inputField}
                            accept="image/*"
                        />
                    </div>

                    <div className={styles.formActions}>
                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? 'Adding Testimonial...' : 'Add Testimonial'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
