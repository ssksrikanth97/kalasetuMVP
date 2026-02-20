'use client';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function CustomerDashboard() {
    const { user, userRole, loading } = useAuth();
    const router = useRouter();
    const [isEmailVerified, setIsEmailVerified] = useState(true);

    useEffect(() => {
        if (!loading && (!user || userRole !== 'customer')) {
            // router.push('/auth/login'); // Redirect if not authorized
            return;
        }

        const fetchUserData = async () => {
            if (user) {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    setIsEmailVerified(userDoc.data().isEmailVerified ?? false);
                }
            }
        };

        fetchUserData();
    }, [user, userRole, loading, router]);

    if (loading) return <div>Loading...</div>;

    return (
        <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '100vh' }}>
            <Navbar />

            {!isEmailVerified && (
                <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '1rem', textAlign: 'center', fontWeight: '500' }}>
                    Your email is not verified yet. Please <Link href="/auth/verify-email" style={{ textDecoration: 'underline', fontWeight: '700' }}>verify your email</Link> to secure your account.
                </div>
            )}

            <div className="container" style={{ padding: '2rem 1rem' }}>
                <h1 style={{ color: 'var(--color-maroon)', marginBottom: '1.5rem' }}>Customer Dashboard</h1>
                <div className="card glass-panel" style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Welcome back, {user?.displayName || 'Art Appreciator'}!</h2>
                    <p>Explore KalaSetu to find verified artists and authentic products.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {/* Profile Section */}
                    <div className="card">
                        <h3>👤 My Profile</h3>
                        <p><strong>Name:</strong> {user?.displayName || 'N/A'}</p>
                        <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
                        <Link
                            href="/customer/profile"
                            className="btn-secondary"
                            style={{ marginTop: '1rem', display: 'inline-block' }}
                        >
                            Edit Profile
                        </Link>
                    </div>

                    {/* Orders Section */}
                    <div className="card">
                        <h3>📦 My Orders</h3>
                        <p>View and track your recent purchases.</p>
                        <Link href="/customer/orders" className="btn-primary" style={{ display: 'inline-block', marginTop: '1rem' }}>
                            View Order History
                        </Link>
                    </div>
                </div>
                {/* Artist Conversion Section */}
                <div className="card" style={{ background: 'linear-gradient(135deg, #fff, #ffe4e1)' }}>
                    <h3 style={{ color: 'var(--color-maroon)' }}>🎨 Are you an Artist?</h3>
                    <p>Showcase your talent and reach a global audience.</p>
                    <Link href="/artist/onboarding?mode=convert" className="btn-primary" style={{ display: 'inline-block', marginTop: '1rem', backgroundColor: 'var(--color-maroon)' }}>
                        Join as Artist
                    </Link>
                </div>
            </div>


        </div>
    );
}
