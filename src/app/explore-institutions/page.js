'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import styles from '../explore.module.css';
import { db } from '@/lib/firebase/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import Link from 'next/link';

export default function ExploreInstitutions() {
    const [institutions, setInstitutions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInstitutions = async () => {
            try {
                // Fetch verified institutions
                const q = query(collection(db, 'institutions'));
                const snapshot = await getDocs(q);
                const list = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                // Filter if needed, e.g., status === 'approved'
                setInstitutions(list);
            } catch (err) {
                console.error("Error fetching institutions:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchInstitutions();
    }, []);

    return (
        <div className="page-wrapper">
            <Navbar />
            <main className={styles.pageContainer}>
                <section className={styles.heroSection}>
                    <h1 className={styles.heroTitle}>Premier Institutions</h1>
                    <p className={styles.heroSubtitle}>
                        Join academies that uphold the traditions of Indian Classical Arts.
                        Find your perfect place to learn and grow.
                    </p>
                </section>

                <div className={styles.mainContent}>
                    {/* Search Bar */}
                    <div className={styles.searchBar}>
                        <h2 style={{ fontSize: '1.2rem', color: '#1f2937', marginRight: '1rem', fontWeight: 600 }}>Find Institution</h2>
                        <input
                            type="text"
                            placeholder="e.g. Carnatic Music Academy, Kathak Kendra..."
                            className={styles.searchInput}
                        />
                        <button className={styles.filterBtn}>
                            <span>All Forms</span>
                            <span>▼</span>
                        </button>
                    </div>

                    <div className={styles.grid}>
                        {loading ? (
                            <p style={{ gridColumn: 'span 3', textAlign: 'center', padding: '2rem' }}>Loading institutions...</p>
                        ) : institutions.length > 0 ? (
                            institutions.map((inst) => (
                                <div key={inst.id} className={styles.card}>
                                    <div className={styles.cardImage}>
                                        🏛️
                                        {/* Optional: Add featured badge logic here */}
                                        {/* <span style={{ position: 'absolute', top: '1rem', right: '1rem', background: '#ffd700', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>Featured</span> */}
                                    </div>
                                    <div className={styles.cardContent}>
                                        <h3 className={styles.cardTitle}>{inst.basicDetails?.instituteName || 'Unnamed Institution'}</h3>
                                        <p className={styles.cardSubtitle}>Traditional Arts Academy</p>

                                        <div className={styles.cardMeta} style={{ justifyContent: 'space-between' }}>
                                            <span>📍 {inst.basicDetails?.city || 'Location N/A'}</span>
                                            {/* Removed 50+ Courses info as requested */}
                                        </div>

                                        <div className={styles.cardActions}>
                                            <Link href={`/institution-details?id=${inst.id}`} style={{ width: '100%' }}>
                                                <button className={styles.btnPrimary}>More Details</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ padding: '2rem', textAlign: 'center', color: '#666', gridColumn: '1 / -1' }}>
                                No institutions found.
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
