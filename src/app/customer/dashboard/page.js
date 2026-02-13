'use client';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CustomerDashboard() {
    const { user, userRole, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && (!user || userRole !== 'customer')) {
            // router.push('/auth/login'); // Redirect if not authorized
        }
    }, [user, userRole, loading, router]);

    if (loading) return <div>Loading...</div>;

    return (
        <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '100vh' }}>
            <Navbar />
            <div className="container" style={{ padding: '2rem 1rem' }}>
                <h1 style={{ color: 'var(--color-maroon)', marginBottom: '1.5rem' }}>Customer Dashboard</h1>
                <div className="card glass-panel" style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Welcome, {user?.displayName || 'Art Appreciator'}!</h2>
                    <p>Explore KalaSetu to find verified artists and authentic products.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    <div className="card">
                        <h3>🎭 Find Artists</h3>
                        <p>Browse profiles of classical dancers and musicians.</p>
                        <Link href="/explore-artists" className="btn-primary" style={{ display: 'inline-block', marginTop: '1rem' }}>Browse Artists</Link>
                    </div>
                    <div className="card">
                        <h3>🛍️ Shop Products</h3>
                        <p>Buy costumes, instruments and gifts.</p>
                        <Link href="/shop" className="btn-primary" style={{ display: 'inline-block', marginTop: '1rem' }}>Go to Shop</Link>
                    </div>
                    <div className="card">
                        <h3>📦 My Orders</h3>
                        <p>Track your recent purchases.</p>
                        <Link href="/customer/orders" className="btn-secondary" style={{ display: 'inline-block', marginTop: '1rem' }}>View Orders</Link>
                    </div>
                    <div className="card">
                        <h3>📅 My Bookings</h3>
                        <p>View status of your artist bookings.</p>
                        <Link href="/customer/bookings" className="btn-secondary" style={{ display: 'inline-block', marginTop: '1rem' }}>View Bookings</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
