'use client';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';

export default function InstitutionDashboard() {
    const { user, userRole, loading } = useAuth();
    const [status, setStatus] = useState('pending');
    const router = useRouter();

    useEffect(() => {
        if (!loading && (!user || userRole !== 'institution')) {
            // router.push('/'); // Handle redirect
        }
        const fetchStatus = async () => {
            if (user) {
                const docRef = doc(db, 'institutions', user.uid);
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
                <h1 style={{ color: 'var(--color-maroon)', marginBottom: '1.5rem' }}>Institution Dashboard</h1>

                {status === 'pending' ? (
                    <div className="card glass-panel text-center p-8">
                        <h2 className="text-2xl text-maroon mb-4">Complete Institution Profile</h2>
                        <p className="mb-6 text-lg">Your profile is currently under review or requires completion.</p>
                        <Link href="/institution/onboarding" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.2rem' }}>
                            Complete Profile
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-6">
                        <div className="card">
                            <h3>Institution Details</h3>
                            <p>Showcase specialization, student details, and media.</p>
                            <Link href="/institution/manage-profile" className="btn-secondary mt-4 inline-block">Edit Details</Link>
                        </div>
                        <div className="card">
                            <h3>Manage Bookings</h3>
                            <p>Handle performance requests and inquiries.</p>
                            <Link href="/institution/bookings" className="btn-secondary mt-4 inline-block">Bookings</Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
