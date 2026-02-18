'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import Navbar from '@/components/Navbar';
import styles from './Dashboard.module.css'; // Using the new CSS module

// This function remains the same, calculating profile completion
const checkProfileStatus = (instData) => {
    if (!instData) return { progress: 0, isComplete: false, checklist: {} };
    const required = [
        instData.basicDetails?.instituteName,
        instData.basicDetails?.city,
        instData.contact?.primaryEmail,
        instData.about?.description,
        instData.media?.logoUrl,
    ];
    const completed = required.filter(Boolean).length;
    const progress = Math.round((completed / required.length) * 100);
    const isComplete = progress === 100;

    return {
        progress,
        isComplete,
        checklist: {
            'Basic Information (Name, City)': Boolean(instData.basicDetails?.instituteName && instData.basicDetails?.city),
            'About & Contact Details': Boolean(instData.about?.description && instData.contact?.primaryEmail),
            'Institution Logo': Boolean(instData.media?.logoUrl),
        }
    };
};

export default function InstitutionDashboard() {
    const { user, loading: authLoading } = useAuth();
    const [institutionData, setInstitutionData] = useState(null);
    const [status, setStatus] = useState('loading');

    useEffect(() => {
        if (!user) return;

        const fetchInstitutionData = async () => {
            try {
                const instDoc = await getDoc(doc(db, 'institutions', user.uid));
                if (instDoc.exists()) {
                    const data = instDoc.data();
                    setInstitutionData(data);
                    const statusInfo = checkProfileStatus(data);
                    setStatus(statusInfo.isComplete ? 'complete' : 'pending');
                } else {
                    setStatus('pending'); // If no doc, profile is incomplete
                }
            } catch (error) {
                console.error("Error fetching institution data:", error);
                setStatus('error');
            }
        };

        fetchInstitutionData();
    }, [user]);

    if (authLoading || status === 'loading') {
        return <div className="page-loading">Loading dashboard...</div>;
    }

    // Pending/Incomplete Profile View
    if (status === 'pending') {
        const { progress, checklist } = checkProfileStatus(institutionData);
        return (
            <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '100vh' }}>
                <Navbar />
                <main className="container" style={{ padding: '2rem 1rem' }}>
                    <div className="card glass-panel" style={{ maxWidth: '700px', margin: '2rem auto' }}>
                        <h2 className="text-2xl font-bold mb-2">Complete Your Institution Profile</h2>
                        <p className="text-gray-600 mb-6">Finish these steps to make your institution visible to students and artists.</p>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span>Profile Completion</span>
                                <span style={{ fontWeight: 'bold' }}>{progress}%</span>
                            </div>
                            <div style={{ background: '#e0e0e0', borderRadius: '10px', height: '12px', overflow: 'hidden' }}>
                                <div style={{ width: `${progress}%`, background: 'var(--color-maroon)', height: '100%' }}></div>
                            </div>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Required Steps:</h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {Object.entries(checklist).map(([key, value]) => (
                                    <li key={key} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
                                        <span style={{ color: value ? '#22c55e' : '#9ca3af', marginRight: '0.75rem' }}>{value ? '✅' : '⬜'}</span>
                                        <span>{key}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Link href="/institution/onboarding" className="btn-primary" style={{ display: 'block', textAlign: 'center', padding: '1rem' }}>
                            Continue to Profile Setup
                        </Link>
                    </div>
                </main>
            </div>
        );
    }

    // Complete Profile View
    return (
        <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '100vh' }}>
            <Navbar />
            <main className="container" style={{ padding: '2rem 1rem' }}>
                {institutionData && (
                    <header className={styles.header}>
                        <div className={styles.headerInfo}>
                            <img
                                src={institutionData.media?.logoUrl || 'https://via.placeholder.com/80'}
                                alt={`${institutionData.basicDetails?.instituteName} Logo`}
                                className={styles.logo}
                            />
                            <div>
                                <h1>{institutionData.basicDetails?.instituteName}</h1>
                                <Link href={`/institution-details?id=${user.uid}`}>View Public Profile</Link>
                            </div>
                        </div>
                    </header>
                )}

                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <h3>Profile Views</h3>
                        <p>1,204</p>
                    </div>
                    <div className={styles.statCard}>
                        <h3>Student Inquiries</h3>
                        <p>8</p>
                    </div>
                    <div className={styles.statCard}>
                        <h3>Courses Offered</h3>
                        <p>12</p>
                    </div>
                </div>

                <div className={styles.actionsGrid}>
                    <div className={styles.actionCard}>
                        <h3>Edit Profile</h3>
                        <p>Update your institution's core details, description, and contact information.</p>
                        <Link href="/institution/manage-profile">Edit Profile →</Link>
                    </div>
                    <div className={styles.actionCard}>
                        <h3>Manage Artists & Team</h3>
                        <p>Add and update details about your affiliated artists and team members.</p>
                        <Link href="/institution/artists">Manage Artists →</Link>
                    </div>
                    <div className={styles.actionCard}>
                        <h3>Manage Events</h3>
                        <p>Create and showcase your institution's events and performances.</p>
                        <Link href="/institution/manage-events">Manage Events →</Link>
                    </div>
                    <div className={styles.actionCard}>
                        <h3>Student Inquiries</h3>
                        <p>View and respond to inquiries from potential students.</p>
                        <Link href="/institution/inquiries">View Inquiries →</Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
