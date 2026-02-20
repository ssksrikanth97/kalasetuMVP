'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase/firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import dashboardStyles from '../dashboard/admin.module.css';
import styles from './testimonials.module.css';
import Image from 'next/image';

export default function ManageTestimonialsPage() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTestimonials = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, 'testimonials'));
            const testimonialsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTestimonials(testimonialsData);
        } catch (err) {
            console.error("Error fetching testimonials:", err);
            setError('Failed to load testimonials. Please try again.');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
        try {
            await deleteDoc(doc(db, 'testimonials', id));
            fetchTestimonials(); // Refresh list
        } catch (err) {
            console.error("Error deleting testimonial:", err);
            setError('Failed to delete testimonial.');
        }
    };

    return (
        <main className={dashboardStyles.mainContent}>
            <header className={dashboardStyles.header}>
                <div className={dashboardStyles.titleGroup}>
                    <h1>Manage Testimonials</h1>
                    <p>Add, edit, or remove testimonials.</p>
                </div>
                <div className={styles.headerActions}>
                    <Link href="/admin/testimonials/new" className="btn-primary">
                        + Add New Testimonial
                    </Link>
                </div>
            </header>

            <section className={dashboardStyles.contentCard}>
                <div className={dashboardStyles.cardHeader}>
                    <h2 className={dashboardStyles.cardTitle}>Current Testimonials</h2>
                </div>

                {loading && <p>Loading testimonials...</p>}
                {error && <p className="error-message">{error}</p>}

                {!loading && !error && (
                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Logo</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {testimonials.length > 0 ? testimonials.map(t => (
                                    <tr key={t.id}>
                                        <td>
                                            {t.logoImg ? (
                                                <div style={{ position: 'relative', width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden' }}>
                                                    <Image src={t.logoImg} alt={t.title} fill style={{ objectFit: 'cover' }} unoptimized={true} />
                                                </div>
                                            ) : (
                                                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    No Img
                                                </div>
                                            )}
                                        </td>
                                        <td>{t.title}</td>
                                        <td>{t.description && t.description.length > 50 ? `${t.description.substring(0, 50)}...` : t.description}</td>
                                        <td className={styles.actionButtons}>
                                            <button onClick={() => handleDelete(t.id)} className="btn-danger btn-sm">Delete</button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>No testimonials found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </main>
    );
}
