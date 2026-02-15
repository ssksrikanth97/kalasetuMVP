'use client';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from './dashboard/admin.module.css';

export default function AdminLayout({ children }) {
    const { user, userRole, loading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && (!user || userRole !== 'admin')) {
            // router.push('/auth/login');
        }
    }, [user, userRole, loading, router]);

    if (loading) return (
        <div className={styles.dashboardContainer} style={{ justifyContent: 'center', alignItems: 'center', color: 'var(--color-maroon)' }}>
            <div className="spinner"></div> Loading Admin Portal...
        </div>
    );

    return (
        <div className={styles.dashboardContainer}>
            <aside className={styles.sidebar}>
                <div className={styles.logoContainer} style={{ padding: '0 1rem' }}>
                    <div style={{ position: 'relative', width: '100%', height: '40px' }}>
                        <Image
                            src="/logo.png"
                            alt="KalaSetu Admin"
                            fill
                            style={{ objectFit: 'contain', objectPosition: 'left' }}
                        />
                    </div>
                </div>

                <nav className={styles.navLinks}>
                    <Link href="/admin/dashboard" className={`${styles.navItem} ${styles.navItemActive}`}>
                        <span className={styles.navIcon}>📊</span> Dashboard
                    </Link>
                    <Link href="/admin/users" className={styles.navItem}>
                        <span className={styles.navIcon}>👥</span> Users & Approvals
                    </Link>
                    <Link href="/admin/inventory" className={styles.navItem}>
                        <span className={styles.navIcon}>📦</span> Inventory
                    </Link>
                    <Link href="/admin/orders" className={styles.navItem}>
                        <span className={styles.navIcon}>🛍️</span> Orders
                    </Link>
                    <Link href="/admin/bookings" className={styles.navItem}>
                        <span className={styles.navIcon}>📅</span> Bookings
                    </Link>
                    <Link href="/admin/events" className={styles.navItem}>
                        <span className={styles.navIcon}>🎉</span> Manage Events
                    </Link>
                    <Link href="/" target="_blank" className={styles.navItem} style={{ marginTop: 'auto' }}>
                        <span className={styles.navIcon}>🌐</span> Live Site
                    </Link>
                    <button onClick={logout} className={styles.navItem} style={{ background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}>
                        <span className={styles.navIcon}>🚪</span> Logout
                    </button>
                </nav>

                <div className={styles.userProfile}>
                    <div className={styles.avatar}>A</div>
                    <div>
                        <p style={{ fontSize: '0.9rem', color: '#fff' }}>Admin User</p>
                        <p style={{ fontSize: '0.75rem', opacity: 0.7 }}>Super Admin</p>
                    </div>
                </div>
            </aside>

            <main className={styles.mainContent}>
                {children}
            </main>
        </div>
    );
}
