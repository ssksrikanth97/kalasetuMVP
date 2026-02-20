'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import Navbar from '@/components/Navbar';
import styles from '@/app/artist/dashboard/artist-dashboard.module.css';

export default function ArtistDashboard() {
    const { user, loading: authLoading } = useAuth();
    const [artistData, setArtistData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [isEmailVerified, setIsEmailVerified] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {
            try {
                // Fetch Artist Profile
                const artistDoc = await getDoc(doc(db, 'artists', user.uid));
                if (artistDoc.exists()) {
                    setArtistData(artistDoc.data());
                }

                // Fetch User Details to check Email Verification status
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    setIsEmailVerified(userDoc.data().isEmailVerified ?? false);
                }

                // Fetch Orders
                const q = query(collection(db, 'orders'), where('artistIds', 'array-contains', user.uid));
                const orderSnap = await getDocs(q);

                const fetchedOrders = orderSnap.docs.map(doc => {
                    const data = doc.data();
                    // Handle date formatting
                    let dateStr = 'N/A';
                    if (data.createdAt?.toDate) {
                        dateStr = data.createdAt.toDate().toLocaleDateString();
                    } else if (data.createdAt) {
                        dateStr = new Date(data.createdAt).toLocaleDateString();
                    }

                    return {
                        id: doc.id,
                        ...data,
                        date: dateStr,
                        // Extract items relevant to this artist if needed, or show all
                        // For simplicity, showing item names
                        items: data.items?.map(i => i.name) || []
                    };
                });

                setOrders(fetchedOrders);

            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    if (authLoading || loading) {
        return <div className="page-loading">Loading your portfolio...</div>;
    }

    if (!artistData) {
        return (
            <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '100vh' }}>
                <Navbar />
                <div className={styles.dashboardContainer}>
                    <div className={styles.emptyState}>
                        <h2>Profile Not Found</h2>
                        <p>Please complete your onboarding to view your dashboard.</p>
                        <Link href="/artist/onboarding" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>Complete Profile</Link>
                    </div>
                </div>
            </div>
        );
    }

    const { personalDetails, professionalDetails, media } = artistData;

    return (
        <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
            <Navbar />

            {!isEmailVerified && (
                <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '1rem', textAlign: 'center', fontWeight: '500' }}>
                    Your email is not verified yet. Please <Link href="/auth/verify-email" style={{ textDecoration: 'underline', fontWeight: '700' }}>verify your email</Link> to secure your account.
                </div>
            )}

            <div className={styles.dashboardContainer}>

                {/* Header / Profile Resume Section */}
                <header className={styles.headerSection}>
                    <div className={styles.profileImageContainer}>
                        {media?.profilePicture ? (
                            <Image
                                src={media.profilePicture}
                                alt={personalDetails?.name || 'Artist'}
                                fill
                                className={styles.profileImage}
                            />
                        ) : (
                            <div style={{ width: '100%', height: '100%', backgroundColor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                📷
                            </div>
                        )}
                    </div>

                    <div className={styles.profileInfo}>
                        <h1 className={styles.artistName}>{personalDetails?.name}</h1>
                        <p className={styles.artistTitle}>{personalDetails?.specialization}</p>

                        <div className={styles.artistMeta}>
                            {personalDetails?.location && <span className={styles.metaItem}>📍 {personalDetails.location}</span>}
                            {personalDetails?.phone && <span className={styles.metaItem}>📞 {personalDetails.phone}</span>}
                            {personalDetails?.gender && <span className={styles.metaItem}>👤 {personalDetails.gender}</span>}
                            {professionalDetails?.experience && <span className={styles.metaItem}>⭐ {professionalDetails.experience} Years Exp.</span>}
                        </div>

                        <p className="text-gray-600 mb-4 max-w-2xl">{professionalDetails?.bio}</p>

                        <div className={styles.socialConfig}>
                            {professionalDetails?.instagram && <a href={professionalDetails.instagram} target="_blank" className={styles.socialLink}>Instagram ↗</a>}
                            {professionalDetails?.youtube && <a href={professionalDetails.youtube} target="_blank" className={styles.socialLink}>YouTube ↗</a>}
                            {professionalDetails?.website && <a href={professionalDetails.website} target="_blank" className={styles.socialLink}>Website ↗</a>}
                            <Link href="/artist/onboarding" className="text-orange-600 font-medium hover:underline ml-auto">✎ Edit Profile</Link>
                        </div>
                    </div>
                </header>

                {/* Gallery Grid */}
                {media?.gallery && media.gallery.length > 0 && (
                    <section>
                        <h2 className={styles.sectionTitle}>Portfolio Gallery</h2>
                        <div className={styles.galleryGrid}>
                            {media.gallery.map((imgUrl, index) => (
                                <div key={index} className={styles.galleryItem}>
                                    <Image
                                        src={imgUrl}
                                        alt={`Gallery ${index + 1}`}
                                        fill
                                        className={styles.galleryImage}
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Orders Table */}
                <section>
                    <h2 className={styles.sectionTitle}>Recent Orders</h2>
                    {orders.length > 0 ? (
                        <div style={{ overflowX: 'auto' }}>
                            <table className={styles.ordersTable}>
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Date</th>
                                        <th>Customer</th>
                                        <th>Service/Item</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.date}</td>
                                            <td>{order.customerName}</td>
                                            <td>{order.items.join(', ')}</td>
                                            <td>₹{order.amount}</td>
                                            <td>
                                                <span className={order.status === 'Paid' ? styles.statusPaid : styles.statusUnpaid}>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className={styles.emptyState}>
                            <p>No orders received yet.</p>
                        </div>
                    )}
                </section>

            </div>
        </div>
    );
}
