'use client';
import { useState } from 'react';
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

            // Fetch role for redirection
            const userDoc = await getDoc(doc(db, 'users', user.uid));

            if (userDoc.exists()) {
                const role = userDoc.data().role;
                // Redirect based on role
                if (role === 'admin') {
                    router.push('/admin/dashboard');
                } else if (role === 'artist') {
                    router.push('/artist/dashboard');
                } else if (role === 'institution') {
                    router.push('/institution/dashboard');
                } else {
                    router.push('/customer/dashboard');
                }
            } else {
                // Fallback
                router.push('/');
            }
        } catch (err) {
            console.error(err);
            setError('Invalid email or password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <div className={styles.authContainer}>
                {/* Left Side - Brand Story */}
                <div className={styles.authLeft}>
                    <div className={styles.authContent}>
                        <h2 className={styles.authTitle}>KalaSetu</h2>
                        <p className={styles.authDescription}>
                            "The bridge between tradition and the world."<br /><br />
                            Sign in to access curated Indian classical arts, verified artists, and authentic products.
                        </p>
                    </div>
                </div>

                {/* Right Side - Login Form */}
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
