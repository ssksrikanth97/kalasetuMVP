'use client';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../dashboard/admin.module.css';
import { useEffect, useState, Suspense } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import { useRouter, useSearchParams } from 'next/navigation';

function BookingDetailsContent() {
    const { logout } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (id) {
            const fetchBooking = async () => {
                try {
                    const bookingRef = doc(db, 'bookings', id);
                    const bookingSnap = await getDoc(bookingRef);

                    if (bookingSnap.exists()) {
                        const bookingData = bookingSnap.data();
                        let user = null;
                        let workshop = null;

                        if (bookingData.userId) {
                            const userRef = doc(db, 'users', bookingData.userId);
                            const userSnap = await getDoc(userRef);
                            if (userSnap.exists()) {
                                user = userSnap.data();
                            }
                        }

                        if (bookingData.workshopId) {
                            const workshopRef = doc(db, 'workshops', bookingData.workshopId);
                            const workshopSnap = await getDoc(workshopRef);
                            if (workshopSnap.exists()) {
                                workshop = workshopSnap.data();
                            }
                        }

                        setBooking({
                            id: bookingSnap.id,
                            ...bookingData,
                            user,
                            workshop,
                            bookingDate: bookingData.bookingDate ? bookingData.bookingDate.toDate() : new Date()
                        });
                        setStatus(bookingData.status);
                    } else {
                        alert('Booking not found.');
                        router.push('/admin/bookings');
                    }
                } catch (error) {
                    console.error('Error fetching booking:', error);
                    alert('Failed to fetch booking details.');
                } finally {
                    setLoading(false);
                }
            };
            fetchBooking();
        } else {
            setLoading(false);
        }
    }, [id, router]);

    const handleStatusChange = async (e) => {
        e.preventDefault();
        try {
            const bookingRef = doc(db, 'bookings', id);
            await updateDoc(bookingRef, { status });
            alert('Booking status updated successfully!');
            router.push('/admin/bookings');
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update booking status.');
        }
    };

    if (loading) {
        return <p>Loading booking details...</p>;
    }

    if (!booking) {
        return <p>Booking not found.</p>;
    }

    return (
        <div className={styles.mainContent}>
            <header className={styles.header}>
                <div className={styles.titleGroup}>
                    <h1>Booking #{booking.id}</h1>
                    <p>Manage and view details for this booking.</p>
                </div>
                <Link href="/admin/bookings">
                    <button className="btn-secondary">Back to Bookings</button>
                </Link>
            </header>

            <div className={styles.contentLayout}>
                <div className={styles.orderDetailsCard}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Booking Summary</h2>
                    </div>
                    <div className={styles.detailGrid}>
                        <div className={styles.detailItem}>
                            <span>Customer</span>
                            <p>{booking.user ? booking.user.name : 'Guest'}</p>
                        </div>
                        <div className={styles.detailItem}>
                            <span>Email</span>
                            <p>{booking.user ? booking.user.email : 'N/A'}</p>
                        </div>
                        <div className={styles.detailItem}>
                            <span>Workshop</span>
                            <p>{booking.workshop ? booking.workshop.title : 'Unknown'}</p>
                        </div>
                        <div className={styles.detailItem}>
                            <span>Booking Date</span>
                            <p>{new Intl.DateTimeFormat('en-US').format(booking.bookingDate)}</p>
                        </div>
                        <div className={styles.detailItem}>
                            <span>Status</span>
                            <p>{booking.status}</p>
                        </div>
                    </div>
                </div>

                <div className={styles.orderDetailsCard}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Update Status</h2>
                    </div>
                    <form onSubmit={handleStatusChange} className={styles.formLayout}>
                        <div className={styles.formGroup}>
                            <label htmlFor="status">Booking Status</label>
                            <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className={styles.inputField}>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                        <button type="submit" className="btn-primary">Update Status</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default function BookingDetails() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BookingDetailsContent />
        </Suspense>
    );
}
