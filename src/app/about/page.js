'use client';
import Navbar from '@/components/Navbar';
import styles from '../explore.module.css';

export default function About() {
    return (
        <div className="page-wrapper">
            <Navbar />
            <main className={styles.pageContainer}>
                {/* Hero */}
                <section className={styles.heroSection} style={{ padding: '6rem 1rem' }}>
                    <h1 className={styles.heroTitle}>Preserving Heritage, Empowering Artists</h1>
                    <p className={styles.heroSubtitle}>
                        KalaSetu is more than a platform—it's a movement to keep the timeless traditions of Indian Art alive in the digital age.
                    </p>
                </section>

                <div className={styles.aboutContainer}>
                    {/* Mission Section */}
                    <section className={styles.aboutSection}>
                        <h2 className={styles.aboutTitle}>Our Mission</h2>
                        <p className={styles.aboutText}>
                            At KalaSetu, our mission is simple yet profound: to bridge the gap (Setu) between the rich, ancient traditions of Indian Classical Arts (Kala) and the modern world. We strive to provide a dignified platform for artists to showcase their talent, for students to find authentic gurus, and for connoisseurs to access genuine art.
                        </p>
                    </section>

                    <section className={styles.aboutSection}>
                        <h2 className={styles.aboutTitle}>Our Core Values</h2>
                        <div className={styles.valueGrid}>
                            <div className={styles.valueCard}>
                                <span className={styles.valueIcon}>🕉️</span>
                                <h3 style={{ fontSize: '1.2rem', color: 'var(--color-maroon)', marginBottom: '0.5rem' }}>Authenticity</h3>
                                <p style={{ fontSize: '0.9rem', color: '#555' }}>Preserving the purity and lineage of classical forms.</p>
                            </div>
                            <div className={styles.valueCard}>
                                <span className={styles.valueIcon}>🤝</span>
                                <h3 style={{ fontSize: '1.2rem', color: 'var(--color-maroon)', marginBottom: '0.5rem' }}>Community</h3>
                                <p style={{ fontSize: '0.9rem', color: '#555' }}>Fostering a supportive ecosystem for artists and rasikas.</p>
                            </div>
                            <div className={styles.valueCard}>
                                <span className={styles.valueIcon}>🚀</span>
                                <h3 style={{ fontSize: '1.2rem', color: 'var(--color-maroon)', marginBottom: '0.5rem' }}>Innovation</h3>
                                <p style={{ fontSize: '0.9rem', color: '#555' }}>Leveraging technology to reach global audiences.</p>
                            </div>
                        </div>
                    </section>

                    <section className={styles.aboutSection} style={{ marginTop: '6rem', background: '#f9fafb', padding: '3rem', borderRadius: '16px' }}>
                        <h2 className={styles.aboutTitle} style={{ fontSize: '2rem' }}>Join the Movement</h2>
                        <p className={styles.aboutText}>
                            Whether you are an artist looking for a stage, a student seeking a mentor, or simply an admirer of beauty, there is a place for you here.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
                            <button className={styles.btnPrimary} style={{ width: 'auto', padding: '1rem 2rem' }}>Become an Artist</button>
                            <button className={styles.btnSecondary} style={{ width: 'auto', padding: '1rem 2rem' }}>Browse Shop</button>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
