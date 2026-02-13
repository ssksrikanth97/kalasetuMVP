'use client';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';

export default function ArtistDashboard() {
    const { user, userRole, loading } = useAuth();
    const [status, setStatus] = useState('pending');
    const router = useRouter();

    useEffect(() => {
        if (!loading && (!user || userRole !== 'artist')) {
            // router.push('/'); // Handle redirect
        }
        const fetchStatus = async () => {
            if (user) {
                const docRef = doc(db, 'artists', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setStatus(docSnap.data().status);
                }
            }
        };
        fetchStatus();
    }, [user, userRole, loading, router]);

    if (loading) return <div>Loading...</div>;

    return (
        <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '100vh' }}>
            <Navbar />
            <div className="container" style={{ padding: '2rem 1rem' }}>
                <h1 style={{ color: 'var(--color-maroon)', marginBottom: '1.5rem' }}>Artist Dashboard</h1>

                {status === 'pending' ? (
                    <div className="card glass-panel text-center p-8">
                        <h2 className="text-2xl text-maroon mb-4">You are almost there!</h2>
                        <p className="mb-6 text-lg">Your profile is currently under review or requires completion.</p>
                        <Link href="/artist/onboarding" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.2rem' }}>
                            Complete Artist Profile
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="card">
                            <h3>Profile Management</h3>
                            <p>Add photos, videos, and update your bio.</p>
                            <Link href="/artist/manage-profile" className="btn-secondary mt-4 inline-block">Edit Profile</Link>
                        </div>
                        <div className="card">
                            <h3>Booking Requests</h3>
                            <p>View and manage booking requests from customers.</p>
                            <Link href="/artist/bookings" className="btn-secondary mt-4 inline-block">View Requests</Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
