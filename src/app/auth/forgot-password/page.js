'use client';
import { useState } from 'react';
import { auth } from '@/lib/firebase/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import styles from '@/app/auth/auth.module.css';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        console.log("Submit clicked");
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('Password reset email sent! Check your inbox.');
        } catch (err) {
            console.error("Error sending reset email:", err);
            setError(err.message || 'Failed to send reset email.');
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
                        <h2 className={styles.authTitle}>Recover Access</h2>
                        <p className={styles.authDescription}>
                            Don't worry, we can help you reset your password.
                        </p>
                    </div>
                </div>

                <div className={styles.authRight}>
                    <div className={styles.formCard}>
                        <div className={styles.formHeader}>
                            <h3 className={styles.formTitle}>Forgot Password?</h3>
                            <p className={styles.formSubtitle}>Enter your email to receive a reset link.</p>
                        </div>

                        {message && <div style={{ marginBottom: '1rem', padding: '0.75rem', borderRadius: '4px', backgroundColor: '#dcfce7', color: '#166534', textAlign: 'center' }}>{message}</div>}
                        {error && <div style={{ marginBottom: '1rem', padding: '0.75rem', borderRadius: '4px', backgroundColor: '#fee2e2', color: '#b91c1c', textAlign: 'center' }}>{error}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    className={styles.input}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="Enter your registered email"
                                />
                            </div>

                            <button type="submit" className={styles.submitBtn} disabled={loading}>
                                {loading ? 'Sending...' : 'Send Reset Link'}
                            </button>
                        </form>

                        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                            <Link href="/auth/login" className={styles.link}>Back to Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
