'use client';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../../dashboard/admin.module.css';
import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase/firebase';
import { useRouter, useParams } from 'next/navigation';

// Safely formats a Firestore Timestamp or other date format into 'YYYY-MM-DD'
const formatDateForInput = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp instanceof Timestamp ? timestamp.toDate() : new Date(timestamp);
    return date.toISOString().split('T')[0];
};

export default function EditEvent() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const fetchEvent = async () => {
                setLoading(true);
                try {
                    const docRef = doc(db, 'events', id);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const event = docSnap.data();
                        setName(event.name || '');
                        setDescription(event.description || '');
                        setDate(formatDateForInput(event.date));
                        setLocation(event.location || '');
                        setImageUrl(event.imageUrl || '');
                    } else {
                        alert('Event not found.');
                        router.push('/admin/events');
                    }
                } catch (error) {
                    console.error('Error fetching event:', error);
                    alert('Failed to fetch event data.');
                } finally {
                    setLoading(false);
                }
            };
            fetchEvent();
        }
    }, [id, router]);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const updateEvent = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            let newImageUrl = imageUrl;
            if (image) {
                const imageRef = ref(storage, `events/${Date.now()}_${image.name}`);
                await uploadBytes(imageRef, image);
                newImageUrl = await getDownloadURL(imageRef);
            }

            const eventRef = doc(db, 'events', id);
            await updateDoc(eventRef, {
                name,
                description,
                date: new Date(date),
                location,
                imageUrl: newImageUrl,
            });

            alert('Event updated successfully!');
            router.push('/admin/events');
        } catch (error) {
            console.error('Error updating event:', error);
            alert(`Failed to update event: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    if (loading) {
        return <main className={styles.mainContent}><p>Loading...</p></main>;
    }

    return (
        <main className={styles.mainContent}>
            <header className={styles.header}>
                <div className={styles.titleGroup}>
                    <h1>Edit Event</h1>
                    <p>Update the details for this event.</p>
                </div>
                <Link href="/admin/events" className="btn-secondary">
                    Back to Events
                </Link>
            </header>

            <div className={styles.contentCard}>
                <form onSubmit={updateEvent} className={styles.formLayout}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Event Name</label>
                        <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className={styles.inputField} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="description">Description</label>
                        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className={styles.inputField} rows="4"></textarea>
                    </div>
                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label htmlFor="date">Date</label>
                            <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className={styles.inputField} required />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="location">Location</label>
                            <input id="location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} className={styles.inputField} required />
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Current Image</label>
                        <div className={styles.imagePreview}>
                            {imageUrl ? (
                                <Image src={imageUrl} alt={name || 'Event image'} width={100} height={100} style={{ objectFit: 'cover', borderRadius: '8px' }} />
                            ) : (
                                <p>No image available.</p>
                            )}
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="image">Upload New Image</label>
                        <input id="image" type="file" onChange={handleImageChange} className={styles.inputField} />
                        {image && <p style={{ marginTop: '0.5rem' }}>Selected: {image.name}</p>}
                    </div>

                    <div className={styles.formActions}>
                        <button type="submit" className="btn-primary" disabled={uploading}>
                            {uploading ? 'Updating Event...' : 'Update Event'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
