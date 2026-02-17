'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase/firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import dashboardStyles from '../dashboard/admin.module.css';
import styles from './events.module.css';

export default function ManageEventsPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, 'events'));
            const eventsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setEvents(eventsData);
        } catch (err) {
            console.error("Error fetching events:", err);
            setError('Failed to load events. Please try again.');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleDelete = async (eventId) => {
        if (!window.confirm('Are you sure you want to delete this event?')) return;
        try {
            await deleteDoc(doc(db, 'events', eventId));
            fetchEvents(); // Refresh list
        } catch (err) {
            console.error("Error deleting event:", err);
            setError('Failed to delete event.');
        }
    };

    return (
        <main className={dashboardStyles.mainContent}>
            <header className={dashboardStyles.header}>
                <div className={dashboardStyles.titleGroup}>
                    <h1>Manage Events</h1>
                    <p>Add, edit, or remove events.</p>
                </div>
                <div className={styles.headerActions}>
                    <Link href="/admin/events/new" className="btn-primary">
                        + Add New Event
                    </Link>
                </div>
            </header>

            <section className={dashboardStyles.contentCard}>
                <div className={dashboardStyles.cardHeader}>
                    <h2 className={dashboardStyles.cardTitle}>Current Events</h2>
                </div>

                {loading && <p>Loading events...</p>}
                {error && <p className="error-message">{error}</p>}

                {!loading && !error && (
                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Event Name</th>
                                    <th>Date</th>
                                    <th>Location</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.length > 0 ? events.map(event => (
                                    <tr key={event.id}>
                                        <td>{event.name}</td>
                                        <td>{new Date(event.date).toLocaleDateString()}</td>
                                        <td>{event.location}</td>
                                        <td>
                                            <span className={`${styles.statusBadge} ${styles.statusApproved}`}>
                                                {event.status}
                                            </span>
                                        </td>
                                        <td className={styles.actionButtons}>
                                            <Link href={`/admin/events/edit?id=${event.id}`} className="btn-secondary btn-sm">Edit</Link>
                                            <button onClick={() => handleDelete(event.id)} className="btn-danger btn-sm">Delete</button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No events found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </main>
    );
}
