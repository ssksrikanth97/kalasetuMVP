'use client';
import { useState } from 'react';
import Image from 'next/image';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
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
                    setError(`Error: ${err.code} - ${err.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError('');
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Check if user exists in Firestore
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);

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
                // New user - create customer profile by default
                await setDoc(userDocRef, {
                    name: user.displayName || 'User',
                    email: user.email,
                    role: 'customer',
                    createdAt: serverTimestamp(),
                    photoURL: user.photoURL,
                    phone: user.phoneNumber || ''
                });
                router.push('/customer/dashboard');
            }
        } catch (err) {
            console.error("Google Login Error:", err);
            setError(err.message);
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
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', position: 'relative', zIndex: 20 }}>
                                    <label className={styles.label} style={{ marginBottom: 0 }}>Password</label>
                                    <a href="/auth/forgot-password" className={styles.link} style={{ fontSize: '0.85rem', padding: '0 0.5rem', cursor: 'pointer', textDecoration: 'none' }}>Forgot your password?</a>
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

                        <div className={styles.divider}>
                            <span>Or continue with</span>
                        </div>

                        <button
                            type="button"
                            className={styles.googleBtn}
                            onClick={handleGoogleLogin}
                            disabled={loading}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.52 12.29C23.52 11.43 23.47 10.73 23.32 10.03H12V14.51H18.52C18.23 16.03 17.34 17.38 16.14 18.24V21.2H19.92C22.18 19.12 23.52 16.04 23.52 12.29Z" fill="#4285F4" />
                                <path d="M12 24C15.24 24 17.96 22.92 19.92 21.2L16.14 18.24C15.08 18.96 13.68 19.39 12 19.39C8.84 19.39 6.16 17.26 5.2 14.39H1.32V17.39C3.34 21.39 7.42 24 12 24Z" fill="#34A853" />
                                <path d="M5.2 14.39C4.94 13.56 4.8 12.69 4.8 11.8C4.8 10.91 4.94 10.04 5.2 9.21V6.21H1.32C0.45 7.95 0 9.83 0 11.8C0 13.77 0.45 15.65 1.32 17.39L5.2 14.39Z" fill="#FBBC05" />
                                <path d="M12 4.21C13.82 4.21 15.42 4.84 16.7 6.06L20.03 2.73C17.96 0.79 15.24 0 12 0C7.42 0 3.34 2.61 1.32 6.21L5.2 9.21C6.16 6.34 8.84 4.21 12 4.21Z" fill="#EA4335" />
                            </svg>
                            Sign in with Google
                        </button>

                        <p className={styles.footerText}>
                            Don't have an account? <Link href="/auth/signup" className={styles.link}>Join for free</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
