'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import Navbar from '@/components/Navbar';

// Mock function to check profile completion
const checkProfileStatus = (artistData) => {
    const required = [
        artistData.personalDetails?.name,
        artistData.personalDetails?.location,
        artistData.personalDetails?.specialization,
        artistData.professionalDetails?.bio,
        artistData.media?.profilePicture,
    ];
    const completed = required.filter(Boolean).length;
    const progress = Math.round((completed / required.length) * 100);
    const isComplete = progress === 100;

    return {
        progress,
        isComplete,
        checklist: {
            'Personal Details': Boolean(artistData.personalDetails?.name && artistData.personalDetails?.location),
            'Specialization & Bio': Boolean(artistData.personalDetails?.specialization && artistData.professionalDetails?.bio),
            'Profile Picture': Boolean(artistData.media?.profilePicture),
            'Gallery / Portfolio': artistData.media?.gallery?.length > 0,
        }
    };
};

export default function ArtistDashboard() {
    const { user, loading: authLoading } = useAuth();
    const [status, setStatus] = useState('loading');
    const [profileStatus, setProfileStatus] = useState({ progress: 0, isComplete: false, checklist: {} });

    useEffect(() => {
        if (!user) return;

        const fetchArtistData = async () => {
            try {
                const artistDoc = await getDoc(doc(db, 'artists', user.uid));
                if (artistDoc.exists()) {
                    const artistData = artistDoc.data();
                    const statusInfo = checkProfileStatus(artistData);
                    setProfileStatus(statusInfo);
                    setStatus(statusInfo.isComplete ? 'complete' : 'pending');
                } else {
                    setStatus('pending'); // No document, so profile is incomplete
                    setProfileStatus({ progress: 10, isComplete: false, checklist: {} })
                }
            } catch (error) {
                console.error("Error fetching artist status:", error);
                setStatus('error');
            }
        };

        fetchArtistData();
    }, [user]);

    if (authLoading || status === 'loading') {
        return <div className="page-loading">Loading your dashboard...</div>;
    }

    return (
        <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '100vh' }}>
            <Navbar />
            <main className="container" style={{ padding: '2rem 1rem' }}>
                <h1 style={{ color: 'var(--color-maroon)', marginBottom: '2rem' }}>Artist Dashboard</h1>
                
                {status === 'pending' ? (
                    <div className="card glass-panel" style={{ maxWidth: '700px', margin: '0 auto' }}>
                        <h2 className="text-2xl font-bold mb-2">Complete Your Profile to Get Discovered</h2>
                        <p className="text-gray-600 mb-6">Finish these steps to make your profile live and visible to clients and institutions.</p>
                        
                        {/* Progress Bar */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span>Profile Completion</span>
                                <span style={{ fontWeight: 'bold' }}>{profileStatus.progress}%</span>
                            </div>
                            <div style={{ background: '#e0e0e0', borderRadius: '10px', height: '12px', overflow: 'hidden' }}>
                                <div style={{ width: `${profileStatus.progress}%`, background: 'var(--color-maroon)', height: '100%' }}></div>
                            </div>
                        </div>

                        {/* Checklist */}
                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Required Steps:</h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {Object.entries(profileStatus.checklist).map(([key, value]) => (
                                    <li key={key} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
                                        <span style={{ color: value ? '#22c55e' : '#9ca3af', marginRight: '0.75rem' }}>
                                            {value ? '✅' : '⬜'}
                                        </span>
                                        <span>{key}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Link href="/artist/onboarding" className="btn-primary" style={{ display: 'block', textAlign: 'center', padding: '1rem', fontSize: '1.1rem' }}>
                            Continue to Profile Setup
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="card">
                            <h3>Profile Management</h3>
                            <p>Add photos, videos, and update your bio.</p>
                            <Link href="/artist/manage-profile" className="btn-secondary mt-4 inline-block">Edit Profile</Link>
                        </div>
                        <div className="card">
                            <h3>My Bookings</h3>
                            <p>View and manage your performance bookings.</p>
                            <Link href="/artist/bookings" className="btn-secondary mt-4 inline-block">View Bookings</Link>
                        </div>
                        <div className="card">
                            <h3>Analytics</h3>
                            <p>See how many people have viewed your profile.</p>
                            <Link href="/artist/analytics" className="btn-secondary-disabled mt-4 inline-block">Coming Soon</Link>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
