'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import Navbar from '@/components/Navbar';
import styles from './institution-profile.module.css';

export default function InstitutionProfile() {
    const { institutionId } = useParams();
    const [institution, setInstitution] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!institutionId) return;
        const fetchInstitution = async () => {
            const docRef = doc(db, 'institutions', institutionId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setInstitution(docSnap.data());
            } else {
                console.log("No such institution!");
            }
            setLoading(false);
        };
        fetchInstitution();
    }, [institutionId]);

    if (loading) {
        return <div className="page-loading">Loading profile...</div>;
    }

    if (!institution) {
        return <div>Institution not found.</div>;
    }

    return (
        <div className={styles.pageWrapper}>
            <Navbar />
            <main className={styles.container}>
                <header className={styles.header}>
                    <img src={institution.media?.logoUrl || 'https://via.placeholder.com/150'} alt="Logo" className={styles.logo} />
                    <div className={styles.headerContent}>
                        <h1>{institution.basicDetails?.instituteName}</h1>
                        <p className={styles.location}>{institution.basicDetails?.city}</p>
                    </div>
                </header>

                <section className={styles.aboutSection}>
                    <h2>About</h2>
                    <p>{institution.about?.description}</p>
                </section>

                {institution.events && institution.events.length > 0 && (
                    <section className={styles.eventsSection}>
                        <h2>Events & Gallery</h2>
                        <div className={styles.eventsGrid}>
                            {institution.events.map(event => (
                                <div key={event.id} className={styles.eventCard}>
                                    <img src={event.imageUrl || 'https://via.placeholder.com/300x200'} alt={event.name} />
                                    <div className={styles.eventInfo}>
                                        <h3>{event.name}</h3>
                                        <p>{event.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {institution.artists && institution.artists.length > 0 && (
                    <section className={styles.artistsSection}>
                        <h2>Artists & Team</h2>
                        <div className={styles.artistsGrid}>
                            {institution.artists.map(artist => (
                                <div key={artist.id} className={styles.artistCard}>
                                    <img src={artist.imageUrl || 'https://via.placeholder.com/150'} alt={artist.name} />
                                    <h3>{artist.name}</h3>
                                    <p>{artist.role}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}
