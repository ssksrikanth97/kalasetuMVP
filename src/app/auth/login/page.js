'use client';
import { useState } from 'react';
import Image from 'next/image';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import styles from '../auth.module.css';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const userDoc = await getDoc(doc(db, 'users', user.uid));

            if (userDoc.exists()) {
                const role = userDoc.data().role;
                switch (role) {
                    case 'admin':
                        router.push('/admin/dashboard');
                        break;
                    case 'artist':
                        router.push('/artist/dashboard');
                        break;
                    case 'institution':
                        router.push('/institution/dashboard');
                        break;
                    default:
                        router.push('/customer/dashboard');
                        break;
                }
            } else {
                // If no user document, redirect to a default page.
                console.warn(`No user document found for UID: ${user.uid}`);
                router.push('/');
            }
        } catch (err) {
            console.error("Login error:", err.code, err.message);
            switch (err.code) {
                case 'auth/user-not-found':
                    setError('No account found with this email. Please sign up.');
                    break;
                case 'auth/wrong-password':
                    setError('Incorrect password. Please try again.');
                    break;
                case 'auth/user-disabled':
                    setError('This account has been disabled. Please contact support.');
                    break;
                default:
                    setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <div className={styles.authContainer}>
                <div className={styles.authLeft}>
                    <div className={styles.authContent}>
                        <div style={{ position: 'relative', width: '250px', height: '80px', marginBottom: '1rem' }}>
                            <Image
                                src="/logo.png"
                                alt="KalaSetu"
                                fill
                                style={{ objectFit: 'contain', objectPosition: 'left' }}
                                priority
                            />
                        </div>
                        <p className={styles.authDescription}>
                            "The bridge between tradition and the world."<br /><br />
                            Sign in to access curated Indian classical arts, verified artists, and authentic products.
                        </p>
                    </div>
                </div>

                <div className={styles.authRight}>
                    <div className={styles.formCard}>
                        <div className={styles.formHeader}>
                            <h3 className={styles.formTitle}>Welcome Back</h3>
                            <p className={styles.formSubtitle}>Please enter your details to sign in.</p>
                        </div>

                        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">{error}</div>}

                        <form onSubmit={handleLogin}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Email Address</label>
                                <input
                                    type="email"
                                    className={styles.input}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="yourname@example.com"
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <label className={styles.label}>Password</label>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--color-maroon)', cursor: 'pointer' }}>Forgot Password?</span>
                                </div>
                                <input
                                    type="password"
                                    className={styles.input}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                />
                            </div>

                            <button type="submit" className={styles.submitBtn} disabled={loading}>
                                {loading ? 'Signing In...' : 'Sign In'}
                            </button>
                        </form>

                        <p className={styles.footerText}>
                            Don't have an account? <Link href="/auth/signup" className={styles.link}>Join for free</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
