'use client';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import styles from './admin.module.css';

export default function AdminDashboard() {
    const { user, userRole, loading } = useAuth();
    const router = useRouter();

    const [metrics, setMetrics] = useState({
        totalUsers: 0,
        activeArtists: 0,
        pendingApprovals: 0,
        totalBookings: 0,
        recentUsers: [],
        totalProducts: 0, // Add totalProducts to state
        totalRevenue: 0,
    });

    useEffect(() => {
        if (!loading) {
            if (!user || userRole !== 'admin') {
                // router.push('/auth/login');
            } else {
                fetchDashboardData();
            }
        }
    }, [user, userRole, loading, router]);

    const fetchDashboardData = async () => {
        try {
            const usersSnap = await getDocs(collection(db, 'users'));
            const bookingsSnap = await getDocs(collection(db, 'bookings'));
            const productsSnap = await getDocs(collection(db, 'products')); // Fetch products
            const activeArtistsSnap = await getDocs(query(collection(db, 'artists'), where('status', '==', 'approved')));

            const artistsQuery = query(collection(db, 'artists'), where('status', '==', 'pending'));
            const pendingArtistsSnap = await getDocs(artistsQuery);

            const institutionsQuery = query(collection(db, 'institutions'), where('status', '==', 'pending'));
            const pendingInstSnap = await getDocs(institutionsQuery);

            const usersQuery = query(collection(db, 'users'), orderBy('createdAt', 'desc'), limit(5));
            const recentUsersSnap = await getDocs(usersQuery);
            const recentUsers = recentUsersSnap.docs.map(doc => ({ uid: doc.id, ...doc.data() }));

            // Calculate total revenue
            let totalRevenue = 0;
            bookingsSnap.forEach(doc => {
                totalRevenue += doc.data().totalPrice;
            });

            setMetrics({
                totalUsers: usersSnap.size,
                activeArtists: activeArtistsSnap.size,
                pendingApprovals: pendingArtistsSnap.size + pendingInstSnap.size,
                totalBookings: bookingsSnap.size,
                recentUsers: recentUsers,
                totalProducts: productsSnap.size, // Set totalProducts
                totalRevenue: totalRevenue,
            });
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        }
    };

    return (
        <>
            <header className={styles.header}>
                <div className={styles.titleGroup}>
                    <h1>Dashboard Overview</h1>
                    <p>Welcome back, here's what's happening today.</p>
                </div>

                <div className={styles.headerActions}>
                    <div className={styles.dateBadge}>
                        <span>📅</span> {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </div>
            </header>

            <section className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statHeader}>
                        <span className={styles.statTitle}>Pending Approvals</span>
                        <span className={styles.statIcon}>⏳</span>
                    </div>
                    <div className={styles.statValue}>{metrics.pendingApprovals}</div>
                    <div className={styles.statTrend}>
                        <span className={styles.trendUp}>↑ 2 new</span> since yesterday
                    </div>
                </div>

                <div className={styles.statCard} style={{ '--color-gold': '#27ae60' }}>
                    <div className={styles.statHeader}>
                        <span className={styles.statTitle}>Total Revenue</span>
                        <span className={styles.statIcon}>💰</span>
                    </div>
                    <div className={styles.statValue}>₹{metrics.totalRevenue.toLocaleString('en-IN')}</div>
                    <div className={styles.statTrend}>
                        <span className={styles.trendUp}>↑ 12%</span> vs last month
                    </div>
                </div>

                <div className={styles.statCard} style={{ '--color-gold': '#2980b9' }}>
                    <div className={styles.statHeader}>
                        <span className={styles.statTitle}>Active Bookings</span>
                        <span className={styles.statIcon}>🎫</span>
                    </div>
                    <div className={styles.statValue}>{metrics.totalBookings}</div>
                    <div className={styles.statTrend}>
                        <span className={styles.trendDown}>↓ 3%</span> this week
                    </div>
                </div>

                <div className={styles.statCard} style={{ '--color-gold': '#8e44ad' }}>
                    <div className={styles.statHeader}>
                        <span className={styles.statTitle}>Total Users</span>
                        <span className={styles.statIcon}>👥</span>
                    </div>
                    <div className={styles.statValue}>{metrics.totalUsers}</div>
                    <div className={styles.statTrend}>
                        <span className={styles.trendUp}>↑ 24</span> new signups
                    </div>
                </div>
                <div className={styles.statCard} style={{ '--color-gold': '#f39c12' }}>
                    <div className={styles.statHeader}>
                        <span className={styles.statTitle}>Total Products</span>
                        <span className={styles.statIcon}>📦</span>
                    </div>
                    <div className={styles.statValue}>{metrics.totalProducts}</div>
                    <div className={styles.statTrend}>
                        <span className={styles.trendUp}>↑ 10</span> new products
                    </div>
                </div>
            </section>

            <section className={styles.sectionGrid}>
                <div className={styles.contentCard}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Recent Registrations</h2>
                        <Link href="/admin/users" style={{ color: 'var(--color-maroon)', fontSize: '0.9rem' }}>View All →</Link>
                    </div>

                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Role</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {metrics.recentUsers.length > 0 ? (
                                    metrics.recentUsers.map((u, i) => (
                                        <tr key={i}>
                                            <td style={{ fontWeight: '500' }}>{u.name}</td>
                                            <td style={{ textTransform: 'capitalize' }}>{u.role}</td>
                                            <td>{u.email}</td>
                                            <td>
                                                <span className={`${styles.statusBadge} ${u.role === 'artist' ? styles.statusPending : styles.statusApproved}`}>
                                                    {u.role === 'artist' ? 'Verified' : 'Active'}
                                                </span>
                                            </td>
                                            <td>
                                                <Link href={`/admin/users/view?id=${u.uid}`}>
                                                    <button className={styles.actionButton}>View</button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center', color: '#999' }}>No recent activity found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className={styles.contentCard}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Notifications</h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div className={styles.activityItem}>
                            <div className={styles.activityIcon}>🔔</div>
                            <div className={styles.activityContent}>
                                <h4>New Artist Application</h4>
                                <p className={styles.activityTime}>Review 'Priya Dance Academy'</p>
                            </div>
                        </div>

                        <div className={styles.activityItem}>
                            <div className={styles.activityIcon}>🛒</div>
                            <div className={styles.activityContent}>
                                <h4>Order #1023 Received</h4>
                                <p className={styles.activityTime}>2 mins ago • ₹4,500</p>
                            </div>
                        </div>

                        <div className={styles.activityItem}>
                            <div className={styles.activityIcon}>⚠️</div>
                            <div className={styles.activityContent}>
                                <h4>Low Stock Alert</h4>
                                <p className={styles.activityTime}>Ghungroo bells (Set of 2)</p>
                            </div>
                        </div>
                    </div>

                    <button className="btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>View All Notifications</button>
                </div>

            </section>
        </>
    );
}
