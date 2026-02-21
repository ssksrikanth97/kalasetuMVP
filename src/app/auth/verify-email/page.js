'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { doc, getDoc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import Navbar from '@/components/Navbar';
import styles from '@/app/auth/auth.module.css';

export default function VerifyEmail() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            router.push('/auth/login');
            return;
        }

        const fetchUserData = async () => {
            const userDocSnap = await getDoc(doc(db, 'users', user.uid));
            if (userDocSnap.exists()) {
                const data = userDocSnap.data();
                setUserData(data);
                if (data.isEmailVerified) {
                    redirectUser(data.role);
                }
            }
        };

        fetchUserData();
    }, [user, authLoading, router]);

    const redirectUser = (role) => {
        if (role === 'artist') {
            router.push('/artist/onboarding'); // or dashboard depending on context
        } else {
            router.push(`/${role}/dashboard`);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        if (otp !== userData?.emailOtp) {
            setError('Invalid OTP. Please try again or request a new one.');
            setLoading(false);
            return;
        }

        try {
            await setDoc(doc(db, 'users', user.uid), {
                isEmailVerified: true,
                emailOtp: null,
                updatedAt: serverTimestamp()
            }, { merge: true });

            setSuccess('Email verified successfully! Redirecting...');
            setTimeout(() => {
                redirectUser(userData.role);
            }, 1500);
        } catch (err) {
            console.error('Error verifying email:', err);
            setError('Failed to verify email. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const newOtp = Math.floor(100000 + Math.random() * 900000).toString();

            // Update user document
            await setDoc(doc(db, 'users', user.uid), {
                emailOtp: newOtp,
                updatedAt: serverTimestamp()
            }, { merge: true });

            // Send new OTP email via mail_queue
            await addDoc(collection(db, 'mail_queue'), {
                to: [userData.email],
                message: {
                    subject: 'Verify your email - KalaSetu',
                    html: `<h1>Welcome to KalaSetu!</h1><p>Your new email verification OTP is: <strong>${newOtp}</strong></p>`
                },
                status: 'pending',
                createdAt: serverTimestamp()
            });

            // Update local state so testing works without refreshing
            setUserData(prev => ({ ...prev, emailOtp: newOtp }));
            setSuccess('New OTP has been generated. (Check your email, or use the alert if testing locally)');

            // Fallback for local testing if emails are slow
            console.log("TESTING OTP:", newOtp);
            alert(`TESTING MODE: Your OTP is ${newOtp}`);

        } catch (err) {
            console.error('Error resending OTP:', err);
            setError('Failed to resend OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (authLoading || !userData) {
        return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
    }

    return (
        <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <div className={styles.authContainer} style={{ justifyContent: 'center', padding: '2rem' }}>
                <div className={styles.formCard} style={{ margin: 'auto', maxWidth: '500px' }}>
                    <div className={styles.formHeader}>
                        <h3 className={styles.formTitle}>Verify Your Email</h3>
                        <p className={styles.formSubtitle}>Please enter the 6-digit OTP sent to {userData.email}</p>
                    </div>

                    {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">{error}</div>}
                    {success && <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center">{success}</div>}

                    <form onSubmit={handleVerifyOtp}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>OTP Code</label>
                            <input
                                type="text"
                                className={styles.input}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                placeholder="123456"
                                maxLength="6"
                                style={{ letterSpacing: '4px', textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}
                            />
                        </div>

                        <button type="submit" className={styles.submitBtn} disabled={loading || !otp}>
                            {loading ? 'Verifying...' : 'Verify OTP'}
                        </button>
                    </form>

                    <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                        <button
                            onClick={handleResendOtp}
                            disabled={loading}
                            style={{ background: 'none', border: 'none', color: 'var(--color-maroon)', cursor: 'pointer', textDecoration: 'underline' }}
                        >
                            Didn't receive the OTP? Resend
                        </button>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                        <button
                            onClick={() => redirectUser(userData.role)}
                            style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '0.9rem' }}
                        >
                            Skip for now (You can verify later in your dashboard)
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
