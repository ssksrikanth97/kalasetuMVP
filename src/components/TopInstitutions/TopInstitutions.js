'use client';
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import Link from 'next/link';
import styles from './TopInstitutions.module.css'; // We'll create this CSS module next.

const TopInstitutions = () => {
    const [institutions, setInstitutions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopInstitutions = async () => {
            try {
                const q = query(
                    collection(db, 'institutions'), 
                    where('isExclusive', '==', true), 
                    limit(6) // Limit to 6 institutions
                );
                const querySnapshot = await getDocs(q);
                const topInsts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setInstitutions(topInsts);
            } catch (err) {
                console.error("Error fetching top institutions:", err);
                setError('Could not load featured institutions.');
            } finally {
                setLoading(false);
            }
        };

        fetchTopInstitutions();
    }, []);

    if (loading) return <div className={styles.loader}>Loading...</div>;
    if (error) return <div className={styles.error}>{error}</div>;
    if (institutions.length === 0) return null; // Don't render if no exclusive institutions

    return (
        <section className={styles.topInstitutionsSection}>
            <div className={`container ${styles.container}`}>
                <h2 className={styles.sectionTitle}>Top Institutions</h2>
                <div className={styles.grid}>
                    {institutions.map(inst => (
                        <Link href={`/institution/${inst.id}`} key={inst.id} className={styles.card}>
                            <div className={styles.cardContent}>
                                <h3 className={styles.instName}>{inst.basicDetails.instituteName}</h3>
                                <p className={styles.instCity}>{inst.basicDetails.city}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopInstitutions;
