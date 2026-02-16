'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import dashboardStyles from '../../dashboard/admin.module.css';
import eventStyles from '../../events/events.module.css';

export default function NewInstitutionPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        instituteName: '',
        email: '',
        phone: '',
        password: '',
        city: '',
        yearEstablished: '',
        description: '',
        website: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long.');
            setLoading(false);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            await setDoc(doc(db, 'users', user.uid), {
                name: formData.instituteName,
                email: formData.email,
                phone: formData.phone,
                role: 'institution',
                createdAt: serverTimestamp(),
            });

            await setDoc(doc(db, 'institutions', user.uid), {
                institutionId: user.uid,
                basicDetails: {
                    instituteName: formData.instituteName,
                    email: formData.email,
                    mobile: formData.phone,
                    city: formData.city,
                    yearEstablished: formData.yearEstablished
                },
                about: {
                    description: formData.description,
                },
                contact: {
                    primaryEmail: formData.email,
                    website: formData.website,
                },
                media: {
                    logoUrl: '',
                },
                status: 'active',
                createdAt: serverTimestamp(),
            });
            
            router.push('/admin/dashboard');

        } catch (err) {
            console.error(err);
            setError(err.message || 'Failed to create institution.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={dashboardStyles.mainContent}>
            <header className={dashboardStyles.header}>
                <div className={dashboardStyles.titleGroup}>
                    <h1>Create New Institution</h1>
                    <p>Fill out the details below to add a new institution.</p>
                </div>
            </header>

            <section className={`${dashboardStyles.contentCard} ${eventStyles.formCard}`}>
                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">{error}</div>}

                <form onSubmit={handleSubmit} className={eventStyles.formGrid}>
                    <input type="text" name="instituteName" value={formData.instituteName} onChange={handleChange} placeholder="Institution Name" required />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required />
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
                    <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City, State" />
                    <input type="number" name="yearEstablished" value={formData.yearEstablished} onChange={handleChange} placeholder="Year Established" />
                    <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" style={{ gridColumn: '1 / -1' }}></textarea>
                    <input type="url" name="website" value={formData.website} onChange={handleChange} placeholder="Website" style={{ gridColumn: '1 / -1' }} />

                    <div className={eventStyles.formActions}>
                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? 'Creating...' : 'Create Institution'}
                        </button>
                        <button type="button" onClick={() => router.back()} className="btn-secondary">Cancel</button>
                    </div>
                </form>
            </section>
        </main>
    );
}
