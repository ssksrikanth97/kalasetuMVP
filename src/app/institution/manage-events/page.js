'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { db, storage } from '@/lib/firebase/firebase';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Navbar from '@/components/Navbar';
import styles from './manage-events.module.css';

export default function ManageEvents() {
    const { user } = useAuth();
    const [events, setEvents] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newEvent, setNewEvent] = useState({ name: '', date: '', description: '', image: null });
    const [imagePreview, setImagePreview] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        const fetchEvents = async () => {
            const docRef = doc(db, 'institutions', user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists() && docSnap.data().events) {
                setEvents(docSnap.data().events);
            }
            setLoading(false);
        };
        fetchEvents();
    }, [user]);

    const handleInputChange = (e) => {
        setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            setNewEvent({ ...newEvent, image: file });
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleAddEvent = async (e) => {
        e.preventDefault();
        if (!user || !newEvent.name) return;

        let imageUrl = '';
        if (newEvent.image) {
            const imageRef = ref(storage, `institutions/${user.uid}/events/${newEvent.image.name}`);
            await uploadBytes(imageRef, newEvent.image);
            imageUrl = await getDownloadURL(imageRef);
        }

        const eventToAdd = { ...newEvent, id: Date.now().toString(), imageUrl, image: null };
        const instDocRef = doc(db, 'institutions', user.uid);
        await updateDoc(instDocRef, { events: arrayUnion(eventToAdd) });
        
        setEvents([...events, eventToAdd]);
        setNewEvent({ name: '', date: '', description: '', image: null });
        setImagePreview('');
        setShowForm(false);
    };
    
    const handleRemoveEvent = async (eventId) => {
        if (!user) return;
        const eventToRemove = events.find(e => e.id === eventId);
        if (!eventToRemove) return;

        const instDocRef = doc(db, 'institutions', user.uid);
        await updateDoc(instDocRef, { events: arrayRemove(eventToRemove) });

        setEvents(events.filter(e => e.id !== eventId));
    };

    return (
        <div className={styles.pageWrapper}>
            <Navbar />
            <main className={styles.container}>
                <div className={styles.header}>
                    <Link href="/institution/dashboard" className={styles.backLink}>
                        &larr;
                    </Link>
                    <h1>Manage Events</h1>
                </div>

                <button onClick={() => setShowForm(!showForm)} className={styles.btnAdd}>
                    {showForm ? 'Cancel' : '+ Add New Event'}
                </button>

                {showForm && (
                    <form onSubmit={handleAddEvent} className={styles.form}>
                        <h2>Add New Event</h2>
                        <input name="name" value={newEvent.name} onChange={handleInputChange} placeholder="Event Name" required />
                        <input name="date" type="date" value={newEvent.date} onChange={handleInputChange} />
                        <textarea name="description" value={newEvent.description} onChange={handleInputChange} placeholder="Event Description"></textarea>
                        <input type="file" onChange={handleFileChange} accept="image/*" />
                        {imagePreview && <img src={imagePreview} alt="Preview" className={styles.preview} />}
                        <button type="submit">Add Event</button>
                    </form>
                )}

                <div className={styles.eventGrid}>
                    {loading ? <p>Loading events...</p> : events.map(event => (
                        <div key={event.id} className={styles.eventCard}>
                            <img src={event.imageUrl || 'https://via.placeholder.com/300x200'} alt={event.name} />
                            <div className={styles.eventInfo}>
                                <h3>{event.name}</h3>
                                <p className={styles.date}>{event.date}</p>
                                <p>{event.description}</p>
                                <button onClick={() => handleRemoveEvent(event.id)} className={styles.btnRemove}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
