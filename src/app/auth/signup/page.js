'use client';
import { useState, useEffect, Suspense } from 'react';
import { auth, db } from '@/lib/firebase/firebase';
import { createUserWithEmailAndPassword, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import styles from '../auth.module.css';

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
        role: 'customer', // Default
    });

    const [signupMethod, setSignupMethod] = useState('email'); // 'email' or 'phone'
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [confirmationResult, setConfirmationResult] = useState(null);

    useEffect(() => {
        const role = searchParams.get('role');
        if (role) {
            setFormData(prev => ({ ...prev, role }));
        }
    }, [searchParams]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const setupRecaptcha = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                'size': 'invisible',
                'callback': (response) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                }
            });
        }
    };

    const handleSendOtp = async () => {
        setLoading(true);
        setError('');
        try {
            setupRecaptcha();
            const phoneNumber = formData.phone.startsWith('+') ? formData.phone : `+91${formData.phone}`; // Assuming India default
            const appVerifier = window.recaptchaVerifier;

            const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
            setConfirmationResult(confirmation);
            setOtpSent(true);
            alert("OTP Sent to " + phoneNumber);
        } catch (err) {
            console.error("Error sending OTP:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const verifyOtpAndSignup = async () => {
        setLoading(true);
        setError('');
        try {
            const credential = PhoneAuthProvider.credential(confirmationResult.verificationId, otp);
            const userCredential = await signInWithCredential(auth, credential);
            const user = userCredential.user;

            // Continue with creating user document...
            // Note: Update email in formData if using phone auth, or make email optional
            await createUserProfile(user);
        } catch (err) {
            console.error("Error verifying OTP:", err);
            setError("Invalid OTP. Please try again.");
            setLoading(false);
        }
    };

    const createUserProfile = async (user) => {
        try {
            await setDoc(doc(db, 'users', user.uid), {
                name: formData.name,
                email: formData.email, // Might be empty if phone-only
                phone: user.phoneNumber,
                role: formData.role,
                createdAt: serverTimestamp(),
            });

            if (formData.role === 'artist') {
                await setDoc(doc(db, 'artists', user.uid), {
                    artistId: user.uid,
                    personalDetails: { name: formData.name, email: formData.email, phone: user.phoneNumber },
                    status: 'pending',
                    createdAt: serverTimestamp(),
                });
                router.push('/artist/onboarding');
            } else {
                router.push(`/${formData.role}/dashboard`);
            }
        } catch (err) {
            console.error("Error creating profile:", err);
            setError("Error creating user profile.");
            setLoading(false);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (signupMethod === 'phone') {
            if (!otpSent) {
                handleSendOtp();
            } else {
                verifyOtpAndSignup();
            }
            return;
        }

        setLoading(true);
        setError('');

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;
            await createUserProfile(user);

        } catch (err) {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                setError('Your email ID is already registered with us. Please log in to access the system.');
            } else {
                setError(err.message || 'Failed to create account');
            }
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

                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
                        <button
                            type="button"
                            onClick={() => { setSignupMethod('email'); setOtpSent(false); }}
                            style={{
                                padding: '0.5rem 1rem',
                                border: '1px solid #ccc',
                                borderRadius: '20px',
                                background: signupMethod === 'email' ? 'var(--color-maroon)' : 'white',
                                color: signupMethod === 'email' ? 'white' : '#333'
                            }}
                        >
                            Email Signup
                        </button>
                        <button
                            type="button"
                            onClick={() => { setSignupMethod('phone'); setOtpSent(false); }}
                            style={{
                                padding: '0.5rem 1rem',
                                border: '1px solid #ccc',
                                borderRadius: '20px',
                                background: signupMethod === 'phone' ? 'var(--color-maroon)' : 'white',
                                color: signupMethod === 'phone' ? 'white' : '#333'
                            }}
                        >
                            Phone Signup
                        </button>
                    </div>

                    <form onSubmit={handleSignup}>
                        <div id="recaptcha-container"></div>
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

                        {signupMethod === 'email' ? (
                            <>
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
                                        <label className={styles.label}>Phone (Optional)</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            className={styles.input}
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+91 XXXXX XXXXX"
                                        />
                                    </div>
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
                            </>
                        ) : (
                            // Phone Signup Fields
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    className={styles.input}
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    placeholder="+91 XXXXXXXXXX"
                                    disabled={otpSent}
                                />
                                {otpSent && (
                                    <div style={{ marginTop: '1rem' }}>
                                        <label className={styles.label}>Enter OTP</label>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            required
                                            placeholder="123456"
                                        />
                                    </div>
                                )}
                            </div>
                        )}

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

                        <button type="submit" className={styles.submitBtn} disabled={loading}>
                            {loading ? 'Processing...' : (signupMethod === 'phone' && !otpSent ? 'Send OTP' : 'Sign Up')}
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
