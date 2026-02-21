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
    const [profileCompletion, setProfileCompletion] = useState(0);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    const calculateArtistCompletion = (data) => {
        if (!data) return 0;
        let score = 0;
        let total = 10;

        const pd = data.personalDetails || {};
        if (pd.name) score++;
        if (pd.phone) score++;
        if (pd.gender) score++;
        if (pd.location) score++;
        if (pd.specialization) score++;

        const prof = data.professionalDetails || {};
        if (prof.bio) score++;
        if (prof.experience) score++;
        if (prof.instagram || prof.youtube || prof.website) score++;

        const m = data.media || {};
        if (m.profilePicture) score++;
        if (m.gallery && m.gallery.length > 0) score++;

        return Math.round((score / total) * 100);
    };

    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {
            try {
                // Fetch Artist Profile
                const artistDoc = await getDoc(doc(db, 'artists', user.uid));
                if (artistDoc.exists()) {
                    const data = artistDoc.data();
                    setArtistData(data);
                    setProfileCompletion(calculateArtistCompletion(data));
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
        return (
            <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Navbar />
                <div className={styles.dashboardContainer} style={{ paddingTop: '2rem' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginBottom: '2rem', padding: '2rem', backgroundColor: 'white', borderRadius: '16px' }}>
                        <div style={{ width: '150px', height: '150px', borderRadius: '50%', backgroundColor: '#e5e7eb', animation: 'pulse 1.5s infinite' }}></div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center', minWidth: '250px' }}>
                            <div style={{ width: '40%', height: '30px', backgroundColor: '#e5e7eb', borderRadius: '8px', animation: 'pulse 1.5s infinite' }}></div>
                            <div style={{ width: '30%', height: '20px', backgroundColor: '#e5e7eb', borderRadius: '8px', animation: 'pulse 1.5s infinite' }}></div>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                                <div style={{ width: '100px', height: '16px', backgroundColor: '#e5e7eb', borderRadius: '8px', animation: 'pulse 1.5s infinite' }}></div>
                                <div style={{ width: '100px', height: '16px', backgroundColor: '#e5e7eb', borderRadius: '8px', animation: 'pulse 1.5s infinite' }}></div>
                                <div style={{ width: '100px', height: '16px', backgroundColor: '#e5e7eb', borderRadius: '8px', animation: 'pulse 1.5s infinite' }}></div>
                            </div>
                            <div style={{ width: '80%', height: '16px', backgroundColor: '#e5e7eb', borderRadius: '8px', animation: 'pulse 1.5s infinite', marginTop: '1rem' }}></div>
                            <div style={{ width: '70%', height: '16px', backgroundColor: '#e5e7eb', borderRadius: '8px', animation: 'pulse 1.5s infinite' }}></div>
                        </div>
                    </div>
                </div>
                <style>{`
                    @keyframes pulse {
                        0%, 100% { opacity: 1; }
                        50% { opacity: .5; }
                    }
                `}</style>
            </div>
        );
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

                {profileCompletion < 100 && (
                    <div style={{ padding: '2rem', marginBottom: '2rem', borderLeft: '4px solid var(--color-orange)', backgroundColor: '#fff8f1', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                            <div>
                                <h3 style={{ color: 'var(--color-maroon)', marginBottom: '0.5rem', marginTop: 0 }}>Complete Your Profile</h3>
                                <p style={{ margin: 0, color: '#666' }}>Your profile is {profileCompletion}% complete. Add your details for more visibility on the platform.</p>
                            </div>
                            <Link href="/artist/onboarding" className="btn-primary" style={{ backgroundColor: 'var(--color-orange)', border: 'none' }}>Complete Now</Link>
                        </div>
                        <div style={{ height: '8px', width: '100%', backgroundColor: '#fcd34d', borderRadius: '4px', marginTop: '1.5rem', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${profileCompletion}%`, backgroundColor: 'var(--color-orange)', transition: 'width 0.5s ease-in-out' }}></div>
                        </div>
                    </div>
                )}

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
                                <div
                                    key={index}
                                    className={styles.galleryItem}
                                    onClick={() => setSelectedImageIndex(index)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <Image
                                        src={imgUrl}
                                        alt={`Gallery ${index + 1}`}
                                        fill
                                        className={styles.galleryImage}
                                        style={{ transition: 'transform 0.3s' }}
                                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                                    />
                                    <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0)', transition: 'background-color 0.3s' }}
                                        onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.1)'}
                                        onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0)'}
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Full Screen Gallery Modal / Carousel */}
                {selectedImageIndex !== null && (
                    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setSelectedImageIndex(null)}>
                        <button onClick={() => setSelectedImageIndex(null)} style={{ position: 'absolute', top: '20px', right: '30px', color: 'white', fontSize: '3rem', background: 'none', border: 'none', cursor: 'pointer', zIndex: 10000 }}>&times;</button>

                        <button
                            onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(prev => prev > 0 ? prev - 1 : media.gallery.length - 1); }}
                            style={{ position: 'absolute', left: '20px', color: 'white', fontSize: '4rem', background: 'none', border: 'none', cursor: 'pointer', zIndex: 10000, padding: '20px' }}>
                            &#8249;
                        </button>

                        <div style={{ position: 'relative', width: '80vw', height: '80vh' }} onClick={e => e.stopPropagation()}>
                            <img
                                src={media.gallery[selectedImageIndex]}
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                alt={`Gallery View ${selectedImageIndex + 1}`}
                            />
                            <div style={{ position: 'absolute', bottom: '-40px', left: '0', right: '0', textAlign: 'center', color: 'white' }}>
                                {selectedImageIndex + 1} of {media.gallery.length}
                            </div>
                        </div>

                        <button
                            onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(prev => prev < media.gallery.length - 1 ? prev + 1 : 0); }}
                            style={{ position: 'absolute', right: '20px', color: 'white', fontSize: '4rem', background: 'none', border: 'none', cursor: 'pointer', zIndex: 10000, padding: '20px' }}>
                            &#8250;
                        </button>
                    </div>
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
