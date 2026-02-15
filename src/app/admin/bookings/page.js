
'use client';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../dashboard/admin.module.css';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';

export default function AdminBookings() {
    const { logout } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        try {
            const q = query(collection(db, 'bookings'));
            const querySnapshot = await getDocs(q);
            const bookingsList = await Promise.all(querySnapshot.docs.map(async (bookingDoc) => {
                const bookingData = bookingDoc.data();
                let userName = 'Guest';
                let workshopTitle = 'Unknown Workshop';

                if (bookingData.userId) {
                    const userRef = doc(db, 'users', bookingData.userId);
                    const userSnap = await getDoc(userRef);
                    if (userSnap.exists()) {
                        userName = userSnap.data().name;
                    }
                }

                if (bookingData.workshopId) {
                    const workshopRef = doc(db, 'workshops', bookingData.workshopId);
                    const workshopSnap = await getDoc(workshopRef);
                    if (workshopSnap.exists()) {
                        workshopTitle = workshopSnap.data().title;
                    }
                }

                return {
                    id: bookingDoc.id,
                    ...bookingData,
                    userName,
                    workshopTitle,
                    bookingDate: bookingData.bookingDate.toDate(),
                };
            }));
            setBookings(bookingsList);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const deleteBooking = async (bookingId) => {
        if (window.confirm('Are you sure you want to delete this booking?')) {
            try {
                await deleteDoc(doc(db, 'bookings', bookingId));
                fetchBookings(); // Refresh the list after deletion
            } catch (error) {
                console.error('Error deleting booking: ', error);
                alert('Failed to delete booking. Please try again.');
            }
        }
    };


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
                    <Link href="/admin/dashboard" className={styles.navItem}>
                        <span className={styles.navIcon}>📊</span> Dashboard
                    </Link>
                    <Link href="/admin/users" className={styles.navItem}>
                        <span className={styles.navIcon}>👥</span> Users
                    </Link>
                    <Link href="/admin/products" className={styles.navItem}>
                        <span className={styles.navIcon}>📦</span> Products
                    </Link>
                    <Link href="/admin/orders" className={styles.navItem}>
                        <span className={styles.navIcon}>🛍️</span> Orders
                    </Link>
                    <Link href="/admin/bookings" className={`${styles.navItem} ${styles.navItemActive}`}>
                        <span className={styles.navIcon}>📅</span> Bookings
                    </Link>
                    <Link href="/" target="_blank" className={styles.navItem} style={{ marginTop: 'auto' }}>
                        <span className={styles.navIcon}>🌐</span> Live Site
                    </Link>
                    <button onClick={logout} className={styles.navItem} style={{ background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}>
                        <span className={styles.navIcon}>🚪</span> Logout
                    </button>
                </nav>
            </aside>

            <main className={styles.mainContent}>
                <header className={styles.header}>
                    <div className={styles.titleGroup}>
                        <h1>Booking Management</h1>
                        <p>View and manage all workshop bookings.</p>
                    </div>
                </header>

                <div className={styles.contentCard}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Booking List ({bookings.length})</h2>
                    </div>
                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Booking ID</th>
                                    <th>Customer</th>
                                    <th>Workshop</th>
                                    <th>Booking Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>Loading bookings...</td>
                                    </tr>
                                ) : bookings.length > 0 ? (
                                    bookings.map(booking => (
                                        <tr key={booking.id}>
                                            <td>{booking.id}</td>
                                            <td>{booking.userName}</td>
                                            <td>{booking.workshopTitle}</td>
                                            <td>{new Intl.DateTimeFormat('en-US').format(booking.bookingDate)}</td>
                                            <td>
                                                <span className={styles.statusBadge} data-status={booking.status.toLowerCase()}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td>
                                                <Link href={`/admin/bookings/${booking.id}`}>
                                                    <button className="btn-secondary">View Details</button>
                                                </Link>
                                                <button onClick={() => deleteBooking(booking.id)} className="btn-danger" style={{ marginLeft: '0.5rem' }}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
                                            No bookings found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
