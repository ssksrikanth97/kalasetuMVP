'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { db } from '@/lib/firebase/firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import styles from './page.module.css';

const defaultImage = "https://images.unsplash.com/photo-1542152342-fd82ebd432fd?q=80&w=600&auto=format&fit=crop";

export default function EventsPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const q = query(collection(db, 'events'));
                const snap = await getDocs(q);

                // Sort events by date locally and filter for upcoming
                const today = new Date();
                const fetchedEvents = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                fetchedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
                setEvents(fetchedEvents);

            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className={styles.pageContainer}>
            <Navbar />

            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <h1>Cultural Calendar</h1>
                    <p>Discover and immerse yourself in authentic classical performances, workshops, and exhibitions.</p>
                </div>
            </header>

            <main className={styles.mainContent}>
                {loading ? (
                    <div className={styles.grid}>
                        {[1, 2, 3, 4, 5, 6].map(n => (
                            <div key={n} className={styles.skeletonCard}></div>
                        ))}
                    </div>
                ) : events.length > 0 ? (
                    <div className={styles.grid}>
                        {events.map(event => {
                            const dateObj = event.date ? new Date(event.date) : new Date();
                            return (
                                <Link href={`/events/${event.id}`} key={event.id} className={styles.eventCard}>
                                    <div className={styles.cardImageWrapper}>
                                        <img src={event.imageUrl || defaultImage} alt={event.name} onError={e => e.target.src = defaultImage} />
                                        <div className={styles.dateBadge}>
                                            <span className={styles.dateDay}>{dateObj.getDate()}</span>
                                            <span className={styles.dateMonth}>{dateObj.toLocaleString('default', { month: 'short' })}</span>
                                        </div>
                                        <div className={styles.statusBadge}>
                                            {event.status || 'Upcoming'}
                                        </div>
                                    </div>
                                    <div className={styles.cardContent}>
                                        <h3 className={styles.cardTitle}>{event.name}</h3>
                                        <div className={styles.cardLocation}>
                                            <span>📍</span> {event.location || 'Online'}
                                        </div>
                                        <p className={styles.cardDesc}>
                                            {event.description ? event.description.substring(0, 100) + '...' : 'Join us for this special cultural event.'}
                                        </p>
                                        <span className={styles.cardAction}>Reserve Your Spot →</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        <p>No upcoming events currently listed. Please check back later!</p>
                    </div>
                )}
            </main>
        </div>
    );
}
