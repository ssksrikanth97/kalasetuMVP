'use client';
import { useState } from 'react';
import Link from 'next/link';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase/firebase';
import { useRouter } from 'next/navigation';
import styles from '../../dashboard/admin.module.css';

export default function NewEventPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            let imageUrl = '';
            if (image) {
                const imageRef = ref(storage, `events/${Date.now()}_${image.name}`);
                await uploadBytes(imageRef, image);
                imageUrl = await getDownloadURL(imageRef);
            }

            await addDoc(collection(db, 'events'), {
                name,
                description,
                date: new Date(date),
                location,
                imageUrl,
                status: 'Approved', // Auto-approve admin created events
                createdAt: serverTimestamp(),
            });

            router.push('/admin/events');
        } catch (err) {
            console.error("Error creating event:", err);
            setError('Failed to create event. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={styles.mainContent}>
            <header className={styles.header}>
                <div className={styles.titleGroup}>
                    <h1>Create New Event</h1>
                    <p>Enter the details for the upcoming event.</p>
                </div>
                <Link href="/admin/events" className="btn-secondary">
                    Back to Events
                </Link>
            </header>

            <div className={styles.contentCard}>
                <form onSubmit={handleCreateEvent} className={styles.formLayout}>
                    {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

                    <div className={styles.formGroup}>
                        <label htmlFor="name">Event Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={styles.inputField}
                            required
                            placeholder="e.g. Classical Dance Workshop"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={styles.inputField}
                            rows="4"
                            required
                            placeholder="Describe the event..."
                        />
                    </div>

                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label htmlFor="date">Date</label>
                            <input
                                id="date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className={styles.inputField}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="location">Location</label>
                            <input
                                id="location"
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className={styles.inputField}
                                required
                                placeholder="e.g. City Hall, Bangalore"
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="image">Event Image</label>
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
                            {loading ? 'Creating Event...' : 'Create Event'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
