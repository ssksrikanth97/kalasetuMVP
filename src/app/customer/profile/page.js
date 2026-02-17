'use client';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function CustomerProfile() {
    const { user, loading } = useAuth();
    const [formData, setFormData] = useState({ name: '', phone: '' });
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                try {
                    const docRef = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setFormData({
                            name: docSnap.data().name || '',
                            phone: docSnap.data().phone || ''
                        });
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };
        if (!loading) fetchUserData();
    }, [user, loading]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');

        try {
            const docRef = doc(db, 'users', user.uid);
            await updateDoc(docRef, {
                name: formData.name,
                phone: formData.phone,
                updatedAt: new Date()
            });
            setMessage('Profile updated successfully!');
        } catch (error) {
            console.error("Error updating profile:", error);
            setMessage('Failed to update profile.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '100vh' }}>
            <Navbar />
            <div className="container" style={{ padding: '2rem 1rem', maxWidth: '600px', margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <Link href="/customer/dashboard" className="btn-secondary">← Back</Link>
                    <h1 style={{ color: 'var(--color-maroon)', margin: 0 }}>Edit Profile</h1>
                </div>

                <div className="card">
                    {message && (
                        <div style={{
                            padding: '1rem',
                            marginBottom: '1rem',
                            borderRadius: '0.375rem',
                            backgroundColor: message.includes('success') ? '#dcfce7' : '#fee2e2',
                            color: message.includes('success') ? '#166534' : '#b91c1c'
                        }}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Email</label>
                            <input
                                type="email"
                                value={user?.email || ''}
                                disabled
                                style={{ width: '100%', padding: '0.75rem', backgroundColor: '#f3f4f6', border: '1px solid #ddd', borderRadius: '0.375rem' }}
                            />
                            <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.25rem' }}>Email cannot be changed.</p>
                        </div>

                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '0.375rem' }}
                            />
                        </div>

                        <div className="form-group" style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '0.375rem' }}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={saving}
                            style={{ width: '100%' }}
                        >
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
