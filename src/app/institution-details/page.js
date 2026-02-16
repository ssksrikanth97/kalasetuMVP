'use client';
import { useState, useEffect, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import { db } from '@/lib/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './institution.module.css';

function DetailsContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const router = useRouter();
    const [institution, setInstitution] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInstitution = async () => {
            if (!id) return;
            try {
                const docRef = doc(db, 'institutions', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setInstitution({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.log("No such institution!");
                }
            } catch (error) {
                console.error("Error fetching institution:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInstitution();
    }, [id]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                Loading...
            </div>
        );
    }

    if (!institution) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
                <h2>Institution not found</h2>
                <button onClick={() => router.push('/explore-institutions')} style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: 'var(--color-maroon)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Go Back</button>
            </div>
        );
    }

    const { basicDetails } = institution;

    return (
        <>
            {/* Hero / Header */}
            <div className={styles.header}>
                <div className={styles.container}>
                    <h1 className={styles.title}>{basicDetails?.instituteName}</h1>
                    <p className={styles.location}>📍 {basicDetails?.city || 'Location not available'}</p>
                </div>
            </div>

            <div className={styles.container} style={{ marginTop: '-3rem', position: 'relative', zIndex: 2 }}>
                <div className={styles.grid}>
                    {/* Left: Main Info */}
                    <div className={styles.mainColumn}>
                        <div className={styles.card}>
                            <h2 className={styles.sectionTitle}>About the Institution</h2>
                            <p className={styles.description}>
                                {institution.description || "No description provided for this institution yet."}
                            </p>
                        </div>
                    </div>

                    {/* Right: Sidebar / Contact */}
                    <div className={styles.sidebarColumn}>
                        <div className={styles.card}>
                            <h3 className={styles.sidebarTitle}>Contact Information</h3>
                            <div className={styles.contactItem}>
                                <span className={styles.icon}>📧</span>
                                <span>{basicDetails?.email}</span>
                            </div>
                            <div className={styles.contactItem}>
                                <span className={styles.icon}>📞</span>
                                <span>{basicDetails?.mobile}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default function InstitutionDetailsPage() {
    return (
        <div style={{ minHeight: '100vh', background: '#fcfcfc' }}>
            <Navbar />
            <Suspense fallback={<div>Loading Details...</div>}>
                <DetailsContent />
            </Suspense>
        </div>
    );
}
