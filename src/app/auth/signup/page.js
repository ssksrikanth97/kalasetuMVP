'use client';
import { useState, useEffect, Suspense } from 'react';
import { auth, db } from '@/lib/firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import styles from '@/app/auth/auth.module.css';

function SignupForm() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        role: 'artist', // Default
    });

    useEffect(() => {
        const role = searchParams.get('role');
        if (role) {
            setFormData(prev => ({ ...prev, role }));
        }
    }, [searchParams]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            const otp = Math.floor(100000 + Math.random() * 900000).toString();

            await setDoc(doc(db, 'users', user.uid), {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                role: formData.role,
                isEmailVerified: false,
                emailOtp: otp,
                createdAt: serverTimestamp(),
            });

            // Send OTP email via mail_queue
            await addDoc(collection(db, 'mail_queue'), {
                to: [formData.email],
                message: {
                    subject: 'Verify your email - KalaSetu',
                    html: `<h1>Welcome to KalaSetu!</h1><p>Your email verification OTP is: <strong>${otp}</strong></p>`
                },
                status: 'pending',
                createdAt: serverTimestamp()
            });

            if (formData.role === 'artist') {
                await setDoc(doc(db, 'artists', user.uid), {
                    artistId: user.uid,
                    personalDetails: { name: formData.name, email: formData.email, phone: formData.phone },
                    status: 'pending',
                    createdAt: serverTimestamp(),
                });
            }

            // Redirect everyone to verify their email via OTP
            router.push('/auth/verify-email');

        } catch (err) {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                setError('Your email ID is already registered with us. Please log in to access the system.');
            } else {
                setError(err.message || 'Failed to create account');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.authContainer}>
            {/* Left Side - Brand Story */}
            <div className={styles.authLeft}>
                <div className={styles.authContent}>
                    <h2 className={styles.authTitle}>Join the Community</h2>
                    <p className={styles.authDescription}>
                        Create an account to discover, book, and learn from the finest artists in Indian Classical Arts.<br /><br />
                        "Culture is the widening of the mind and of the spirit."
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className={styles.authRight}>
                <div className={styles.formCard} style={{ maxWidth: '500px' }}>
                    <div className={styles.formHeader}>
                        <h3 className={styles.formTitle}>Create Account</h3>
                        <p className={styles.formSubtitle}>Begin your cultural journey today.</p>
                    </div>

                    {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">{error}</div>}

                    <form onSubmit={handleSignup}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                className={styles.input}
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="e.g. Aditi Sharma"
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className={styles.input}
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="user@example.com"
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    className={styles.input}
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    placeholder="+91 XXXXX XXXXX"
                                />
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>I want to join as a</label>
                            <select
                                name="role"
                                className={styles.input}
                                value={formData.role}
                                onChange={handleChange}
                                style={{ cursor: 'pointer' }}
                            >
                                <option value="customer">Customer (Book & Shop)</option>
                                <option value="artist">Artist (Showcase Talent)</option>
                            </select>
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Create Password</label>
                            <input
                                type="password"
                                name="password"
                                className={styles.input}
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="Min. 6 characters"
                            />
                        </div>

                        <button type="submit" className={styles.submitBtn} disabled={loading}>
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </form>

                    <p className={styles.footerText}>
                        Already a member? <Link href="/auth/login" className={styles.link}>Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function SignupPage() {
    return (
        <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <Suspense fallback={<div>Loading...</div>}>
                <SignupForm />
            </Suspense>
        </div>
    );
}
