'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { db, storage } from '@/lib/firebase/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuth } from '@/context/AuthContext';
import dashboardStyles from '../dashboard/admin.module.css';
import eventStyles from './events.module.css';

export default function ManageEvents() {
    const { user, userRole, loading: authLoading, logout } = useAuth();
    const router = useRouter();
    const [events, setEvents] = useState([]);
    const [formLoading, setFormLoading] = useState(false);
    const [eventsLoading, setEventsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        artists: '',
        artistsNeeded: '',
        imageFile: null,
        videoFile: null,
    });
    const [galleryFiles, setGalleryFiles] = useState([]);

    useEffect(() => {
        if (!authLoading) {
            if (!user || userRole !== 'admin') {
                router.push('/auth/login');
            }
        }
    }, [user, userRole, authLoading, router]);

    useEffect(() => {
        const fetchEvents = async () => {
            setEventsLoading(true);
            try {
                const eventsCollection = collection(db, 'events');
                const eventSnapshot = await getDocs(eventsCollection);
                const eventsData = eventSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setEvents(eventsData);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
            setEventsLoading(false);
        };
        if (user) { // Only fetch events if user is authenticated
            fetchEvents();
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === 'gallery') {
            setGalleryFiles(Array.from(files));
        } else {
            setNewEvent({ ...newEvent, [name]: files[0] });
        }
    };

    const uploadFile = async (file) => {
        if (!file) return null;
        const storageRef = ref(storage, `events/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            console.error("Cannot submit form: User is not authenticated.");
            return;
        }
        setFormLoading(true);

        try {
            let imageUrl = currentEvent?.imageUrl || '';
            let videoUrl = currentEvent?.videoUrl || '';
            let galleryUrls = currentEvent?.gallery || [];

            if (newEvent.imageFile) {
                imageUrl = await uploadFile(newEvent.imageFile);
            }
            if (newEvent.videoFile) {
                videoUrl = await uploadFile(newEvent.videoFile);
            }
            if (galleryFiles.length > 0) {
                galleryUrls = await Promise.all(galleryFiles.map(file => uploadFile(file)));
            }

            const eventData = {
                name: newEvent.title,
                description: newEvent.description,
                date: newEvent.date,
                location: newEvent.location,
                artists: newEvent.artists.split(',').map(s => s.trim()),
                artistsNeeded: newEvent.artistsNeeded,
                imageUrl,
                videoUrl,
                gallery: galleryUrls,
                status: 'approved',
            };

            if (isEditing) {
                const eventDoc = doc(db, 'events', currentEvent.id);
                await updateDoc(eventDoc, eventData);
                setEvents(events.map(event => event.id === currentEvent.id ? { id: event.id, ...eventData } : event));
            } else {
                const docRef = await addDoc(collection(db, 'events'), eventData);
                setEvents([...events, { id: docRef.id, ...eventData }]);
            }

            resetForm();
        } catch (error) {
            console.error("Error saving event:", error);
        }
        setFormLoading(false);
    };

    const handleEdit = (event) => {
        setIsEditing(true);
        setCurrentEvent(event);
        setNewEvent({
            title: event.name || '',
            description: event.description || '',
            date: event.date || '',
            location: event.location || '',
            artists: (event.artists || []).join(', '),
            artistsNeeded: event.artistsNeeded || '',
            imageFile: null,
            videoFile: null,
        });
        setGalleryFiles([]);
        window.scrollTo(0, 0);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            try {
                await deleteDoc(doc(db, 'events', id));
                setEvents(events.filter(event => event.id !== id));
            } catch (error) {
                console.error("Error deleting event: ", error);
            }
        }
    };

    const resetForm = () => {
        setIsEditing(false);
        setCurrentEvent(null);
        setNewEvent({ title: '', description: '', date: '', location: '', artists: '', artistsNeeded: '', imageFile: null, videoFile: null });
        setGalleryFiles([]);
    };

    if (authLoading || !user) {
        return (
            <div className={dashboardStyles.dashboardContainer} style={{ justifyContent: 'center', alignItems: 'center', color: 'var(--color-maroon)' }}>
                <div className="spinner"></div> Loading Admin Portal...
            </div>
        );
    }

    return (
        <div className={dashboardStyles.dashboardContainer}>
            <aside className={dashboardStyles.sidebar}>
            <div className={dashboardStyles.logoContainer} style={{ padding: '0 1rem' }}>
                    <div style={{ position: 'relative', width: '100%', height: '40px' }}>
                        <Image
                            src="/logo.png"
                            alt="KalaSetu Admin"
                            fill
                            style={{ objectFit: 'contain', objectPosition: 'left' }}
                        />
                    </div>
                </div>
                <nav className={dashboardStyles.navLinks}>
                    <Link href="/admin/dashboard" className={dashboardStyles.navItem}>
                        <span className={dashboardStyles.navIcon}>📊</span> Dashboard
                    </Link>
                    <Link href="/admin/users" className={dashboardStyles.navItem}>
                        <span className={dashboardStyles.navIcon}>👥</span> Users & Approvals
                    </Link>
                    <Link href="/admin/inventory" className={dashboardStyles.navItem}>
                        <span className={dashboardStyles.navIcon}>📦</span> Inventory
                    </Link>
                    <Link href="/admin/orders" className={dashboardStyles.navItem}>
                        <span className={dashboardStyles.navIcon}>🛍️</span> Orders
                    </Link>
                    <Link href="/admin/bookings" className={dashboardStyles.navItem}>
                        <span className={dashboardStyles.navIcon}>📅</span> Bookings
                    </Link>
                    <Link href="/admin/events" className={`${dashboardStyles.navItem} ${dashboardStyles.navItemActive}`}>
                        <span className={dashboardStyles.navIcon}>🎉</span> Manage Events
                    </Link>
                    <Link href="/" target="_blank" className={dashboardStyles.navItem} style={{ marginTop: 'auto' }}>
                        <span className={dashboardStyles.navIcon}>🌐</span> Live Site
                    </Link>
                    <button onClick={logout} className={dashboardStyles.navItem} style={{ background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}>
                        <span className={dashboardStyles.navIcon}>🚪</span> Logout
                    </button>
                </nav>
            </aside>

            <main className={dashboardStyles.mainContent}>
                <header className={dashboardStyles.header}>
                    <div className={dashboardStyles.titleGroup}>
                        <h1>Manage Events</h1>
                        <p>Create, edit, and manage all cultural events.</p>
                    </div>
                </header>

                <section className={`${dashboardStyles.contentCard} ${eventStyles.formCard}`}>
                    <div className={dashboardStyles.cardHeader}>
                        <h2 className={dashboardStyles.cardTitle}>{isEditing ? 'Edit Event' : 'Create New Event'}</h2>
                    </div>
                    <form onSubmit={handleFormSubmit} className={eventStyles.formGrid}>
                        <input type="text" name="title" value={newEvent.title} onChange={handleInputChange} placeholder="Event Title" required />
                        <textarea name="description" value={newEvent.description} onChange={handleInputChange} placeholder="Event Description"></textarea>
                        <input type="date" name="date" value={newEvent.date} onChange={handleInputChange} required />
                        <input type="text" name="location" value={newEvent.location} onChange={handleInputChange} placeholder="Location" />
                        <input type="text" name="artists" value={newEvent.artists} onChange={handleInputChange} placeholder="Performing Artists (comma-separated)" />
                        <input type="number" name="artistsNeeded" value={newEvent.artistsNeeded} onChange={handleInputChange} placeholder="No. of Artists Needed" />
                        
                        <div className={eventStyles.fileInputContainer}>
                            <label>Main Image</label>
                            <input type="file" name="imageFile" onChange={handleFileChange} accept="image/*" />
                        </div>
                        
                        <div className={eventStyles.fileInputContainer}>
                            <label>Main Video</label>
                            <input type="file" name="videoFile" onChange={handleFileChange} accept="video/*" />
                        </div>
                        
                        <div className={eventStyles.fileInputContainer} style={{ gridColumn: '1 / -1' }}>
                            <label>Image & Video Gallery (multiple files)</label>
                            <input type="file" name="gallery" onChange={handleFileChange} accept="image/*,video/*" multiple />
                        </div>

                        <div className={eventStyles.formActions}>
                            <button type="submit" className="btn-primary" disabled={formLoading}>{formLoading ? 'Saving...' : 'Save Event'}</button>
                            {isEditing && <button type="button" onClick={resetForm} className="btn-secondary">Cancel Edit</button>}
                        </div>
                    </form>
                </section>

                <section className={dashboardStyles.contentCard}>
                    <div className={dashboardStyles.cardHeader}>
                        <h2 className={dashboardStyles.cardTitle}>Existing Events</h2>
                    </div>
                    {eventsLoading ? <div className="spinner"></div> : (
                        <div className={eventStyles.eventGrid}>
                            {events.map(event => (
                                <div key={event.id} className={eventStyles.eventCard}>
                                    {event.imageUrl && <img src={event.imageUrl} alt={event.name} className={eventStyles.eventImage} />}
                                    <div className={eventStyles.eventInfo}>
                                        <h3>{event.name}</h3>
                                        <p>{new Date(event.date).toLocaleDateString()}</p>
                                        <p>{event.location}</p>
                                        <p>Artists Needed: {event.artistsNeeded}</p>
                                        <div className={eventStyles.actionsContainer}>
                                            <button onClick={() => handleEdit(event)} className={eventStyles.btnEdit}>Edit</button>
                                            <button onClick={() => handleDelete(event.id)} className={eventStyles.btnRemove}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
