'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import dashboardStyles from '../dashboard/admin.module.css';
import styles from './institutions.module.css';

// A new component for the exclusive badge
const ExclusiveBadge = () => (
    <span className={styles.exclusiveBadge}>Exclusive</span>
);

export default function ManageInstitutionsPage() {
    const [institutions, setInstitutions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchInstitutions = async () => {
        try {
            setLoading(true);
            const querySnapshot = await getDocs(collection(db, 'institutions'));
            const insts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // Sort by exclusivity
            insts.sort((a, b) => (b.isExclusive || false) - (a.isExclusive || false));
            setInstitutions(insts);
        } catch (err) {
            console.error("Error fetching institutions:", err);
            setError('Failed to load institutions. Please try refreshing the page.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInstitutions();
    }, []);

    const handleDelete = async (institutionId) => {
        if (!window.confirm('Are you sure you want to delete this institution? This also deletes the user.')) {
            return;
        }
        try {
            setLoading(true);
            await deleteDoc(doc(db, 'institutions', institutionId));
            await deleteDoc(doc(db, 'users', institutionId));
            fetchInstitutions();
        } catch (err) {
            console.error("Error deleting institution:", err);
            setError('Failed to delete institution.');
            setLoading(false);
        }
    };

    return (
        <main className={dashboardStyles.mainContent}>
            <header className={dashboardStyles.header}>
                <div className={dashboardStyles.titleGroup}>
                    <h1>Manage Institutions</h1>
                    <p>View, edit, or add new institutions.</p>
                </div>
                <Link href="/admin/institutions/new" className="btn-primary">
                    + Add New Institution
                </Link>
            </header>

            <section className={dashboardStyles.contentCard}>
                <div className={dashboardStyles.cardHeader}>
                    <h2 className={dashboardStyles.cardTitle}>All Institutions</h2>
                </div>

                {loading && <p>Loading...</p>}
                {error && <p className="error-message">{error}</p>}

                {!loading && !error && (
                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Institute Name</th>
                                    <th>Email</th>
                                    <th>City</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {institutions.map(inst => (
                                    <tr key={inst.id}>
                                        <td>
                                            {inst.basicDetails?.instituteName || 'N/A'}
                                            {inst.isExclusive && <ExclusiveBadge />}
                                        </td>
                                        <td>{inst.basicDetails?.email || 'N/A'}</td>
                                        <td>{inst.basicDetails?.city || 'N/A'}</td>
                                        <td>
                                            <span className={`${styles.statusBadge} ${inst.status === 'approved' ? styles.statusApproved : styles.statusPending}`}>
                                                {inst.status}
                                            </span>
                                        </td>
                                        <td className={styles.actionButtons}>
                                            <Link href={`/admin/institutions/edit?id=${inst.id}`} className="btn-secondary btn-sm">Edit</Link>
                                            <button onClick={() => handleDelete(inst.id)} className="btn-danger btn-sm" disabled={loading}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </main>
    );
}
