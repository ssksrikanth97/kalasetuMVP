'use client';
import { useState } from 'react';
import Link from 'next/link';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import styles from './Footer.module.css';

export default function Footer() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        try {
            await addDoc(collection(db, 'newsletter_subscriptions'), {
                email: email,
                subscribedAt: serverTimestamp(),
                source: 'footer'
            });
            setStatus('success');
            setEmail('');
        } catch (error) {
            console.error("Error subscribing to newsletter:", error);
            setStatus('error');
        }
    };

    return (
        <footer className={styles.footer}>
            <div className="container" style={{ margin: '0 auto' }}>
                <div className={styles.footerContent}>
                    {/* Col 1: Brand */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'white' }}>
                            <span style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px',
                                borderRadius: '50%', background: '#7B1E3A', color: 'white', fontSize: '1.2rem', border: '1px solid #C6A75E'
                            }}>K</span>
                            KalaSetu
                        </div>
                        <p style={{ lineHeight: 1.6, opacity: 0.8, marginBottom: '2rem', maxWidth: '300px' }}>
                            Bridging the gap between India's timeless heritage and the modern world through art, culture, and craftsmanship.
                        </p>
                        <div className={styles.socialIcons}>
                            <a href="#" className={styles.socialIcon}>fb</a>
                            <a href="#" className={styles.socialIcon}>tw</a>
                            <a href="#" className={styles.socialIcon}>in</a>
                            <a href="#" className={styles.socialIcon}>yt</a>
                        </div>
                    </div>

                    {/* Col 2: Quick Links */}
                    <div className={styles.footerCol}>
                        <h4>Quick Links</h4>
                        <div className={styles.footerLinkList}>
                            <Link href="/about" className={styles.footerLink}>About Us</Link>
                            <Link href="/events" className={styles.footerLink}>Upcoming Events</Link>
                            <Link href="/shop" className={styles.footerLink}>Marketplace</Link>
                            <Link href="/explore-institutions" className={styles.footerLink}>Institutions</Link>
                        </div>
                    </div>

                    {/* Col 3: Contact Us */}
                    <div className={styles.footerCol}>
                        <h4>Contact Us</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {/* Address Removed as per request */}
                            <div className={styles.contactItem}>
                                <span>📞</span>
                                <span>70759 76451</span>
                            </div>
                            <div className={styles.contactItem}>
                                <span>✉️</span>
                                <span>kalasetuarts@gmail.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Col 4: Newsletter */}
                    <div className={styles.footerCol}>
                        <h4>Newsletter</h4>
                        <p style={{ marginBottom: '1.5rem', opacity: 0.8 }}>
                            Subscribe to receive updates on upcoming cultural events and new marketplace collections.
                        </p>
                        <form onSubmit={handleSubscribe}>
                            <input
                                type="email"
                                placeholder="Your email address"
                                className={styles.newsletterInput}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                                className={styles.newsletterBtn}
                                disabled={status === 'loading' || status === 'success'}
                                style={{ opacity: status === 'loading' ? 0.7 : 1 }}
                            >
                                {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
                            </button>
                            {status === 'error' && <p style={{ color: '#ff6b6b', fontSize: '0.8rem', marginTop: '0.5rem' }}>Something went wrong. Please try again.</p>}
                        </form>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <p>© 2026 KalaSetu. All rights reserved.</p>
                    <div className={styles.footerBottomLinks}>
                        <Link href="/privacy" className={styles.footerLink} style={{ fontSize: '0.85rem' }}>Privacy Policy</Link>
                        <Link href="#" className={styles.footerLink} style={{ fontSize: '0.85rem' }}>Terms of Service</Link>
                        <Link href="#" className={styles.footerLink} style={{ fontSize: '0.85rem' }}>Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
