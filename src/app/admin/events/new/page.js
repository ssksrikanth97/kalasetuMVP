'use client';
import { useState } from 'react';
import Link from 'next/link';
import { collection, addDoc, serverTimestamp, getDocs, query, where } from 'firebase/firestore';
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
    const [sendNotification, setSendNotification] = useState(false);

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

            if (sendNotification) {
                // Fetch Customers and Artists
                const customerQuery = query(collection(db, 'users'), where('role', '==', 'customer'));
                const artistQuery = query(collection(db, 'users'), where('role', '==', 'artist'));

                const [custSnap, artistSnap] = await Promise.all([getDocs(customerQuery), getDocs(artistQuery)]);

                const emails = new Set();
                custSnap.forEach(doc => { if (doc.data().email) emails.add(doc.data().email) });
                artistSnap.forEach(doc => { if (doc.data().email) emails.add(doc.data().email) });

                if (emails.size > 0) {
                    await addDoc(collection(db, 'mail_queue'), {
                        to: Array.from(emails),
                        message: {
                            subject: `New Event: ${name}`,
                            html: `<h1>New Event Announced: ${name}</h1><p>${description}</p><p>Location: ${location}</p><p>Date: ${date}</p><img src="${imageUrl}" alt="${name}" style="max-width:100%"/>`
                        },
                        status: 'pending',
                        createdAt: serverTimestamp()
                    });
                    alert(`Newsletter queued for ${emails.size} recipients.`);
                }
            }

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

                    <div className={styles.formGroup} style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                            id="sendNewsletter"
                            type="checkbox"
                            checked={sendNotification}
                            onChange={(e) => setSendNotification(e.target.checked)}
                            style={{ width: '20px', height: '20px' }}
                        />
                        <label htmlFor="sendNewsletter" style={{ margin: 0 }}>Notify Customers & Artists via Email Newsletter</label>
                    </div>
                </form>
            </div>
        </main>
    );
}
