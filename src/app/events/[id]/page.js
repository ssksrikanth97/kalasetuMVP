'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';

export default function EventDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            if (!id) return;
            try {
                const docRef = doc(db, 'events', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setEvent({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.error("No such event!");
                }
            } catch (error) {
                console.error("Error fetching event:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    const defaultImage = "https://images.unsplash.com/photo-1524230659092-07f99a75c013?q=80&w=1000&auto=format&fit=crop";

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Navbar />
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--color-maroon)' }}>
                    Loading event details...
                </div>
            </div>
        );
    }

    if (!event) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Navbar />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <h2 style={{ marginBottom: '1rem' }}>Event not found</h2>
                    <Link href="/">
                        <button className="btn-primary">Return Home</button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#fdfbf7' }}>
            <Navbar />

            <main className="container" style={{ padding: '2rem 1rem 4rem' }}>
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-text-secondary)',
                        marginBottom: '1.5rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '1rem'
                    }}
                >
                    ← Back
                </button>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '2rem',
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                }}>
                    {/* Hero Image Section */}
                    <div style={{ position: 'relative', height: '400px', width: '100%' }}>
                        <Image
                            src={event.imageUrl || defaultImage}
                            alt={event.name}
                            fill
                            style={{ objectFit: 'cover' }}
                            onError={(e) => e.target.src = defaultImage} // Fallback handled by parent usually but Image component handles it differently
                        />
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                            padding: '2rem',
                            color: 'white'
                        }}>
                            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>{event.name}</h1>
                            {event.category && (
                                <span style={{
                                    backgroundColor: 'var(--color-gold)',
                                    color: 'black',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '999px',
                                    fontSize: '0.85rem',
                                    fontWeight: '600',
                                    textTransform: 'uppercase'
                                }}>
                                    {event.category}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Content Section */}
                    <div style={{ padding: '0 2rem 2rem', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>

                        {/* Left Column: Description & Artists */}
                        <div>
                            <div style={{ marginBottom: '2rem' }}>
                                <h3 style={{ color: 'var(--color-maroon)', marginBottom: '1rem', borderBottom: '2px solid #eee', paddingBottom: '0.5rem' }}>About the Event</h3>
                                <p style={{ lineHeight: '1.7', color: 'var(--color-text-secondary)', whiteSpace: 'pre-line' }}>
                                    {event.description || "No description provided."}
                                </p>
                            </div>

                            {event.artists && event.artists.length > 0 && (
                                <div>
                                    <h3 style={{ color: 'var(--color-maroon)', marginBottom: '1rem', borderBottom: '2px solid #eee', paddingBottom: '0.5rem' }}>Performing Artists</h3>
                                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                        {event.artists.map((artist, idx) => (
                                            <div key={idx} style={{
                                                backgroundColor: '#f9fafb',
                                                padding: '0.75rem 1.25rem',
                                                borderRadius: '8px',
                                                border: '1px solid #e5e7eb',
                                                fontWeight: '500'
                                            }}>
                                                {artist}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column: Key Details Sidebar */}
                        <div style={{
                            backgroundColor: '#fff',
                            border: '1px solid #eee',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            height: 'fit-content',
                            position: 'sticky',
                            top: '2rem',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                        }}>
                            <h3 style={{ marginBottom: '1.5rem' }}>Event Details</h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <span style={{ fontSize: '1.25rem' }}>📅</span>
                                    <div>
                                        <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Date & Time</p>
                                        <p style={{ color: '#666' }}>
                                            {event.date ? new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) : 'TBA'}
                                        </p>
                                        {event.time && <p style={{ color: '#666' }}>{event.time}</p>}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <span style={{ fontSize: '1.25rem' }}>📍</span>
                                    <div>
                                        <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Location</p>
                                        <p style={{ color: '#666' }}>{event.location || 'Online / TBA'}</p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <span style={{ fontSize: '1.25rem' }}>🎟️</span>
                                    <div>
                                        <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Ticket Price</p>
                                        <p style={{ fontSize: '1.25rem', color: 'var(--color-maroon)', fontWeight: '700' }}>
                                            {event.price > 0 ? `₹${event.price.toLocaleString('en-IN')}` : 'Free'}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    className="btn-primary"
                                    style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}
                                    onClick={() => alert("Booking functionality coming soon!")}
                                >
                                    Book Tickets
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
