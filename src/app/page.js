'use client';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import styles from './page.module.css';

export default function Home() {
  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '100vh' }}>
      <Navbar />

      <header className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Discover the Soul of<br />Indian Classical Arts</h1>
          <p className={styles.heroSubtitle}>Connect with verified artists, book performances, and shop for authentic cultural products. The bridge between tradition and the world.</p>
          <div className={styles.ctaGroup}>
            <Link href="/explore-artists">
              <button className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', backgroundColor: 'var(--color-gold)', color: 'var(--color-maroon)', border: 'none', cursor: 'pointer' }}>
                Find Artists
              </button>
            </Link>
            <Link href="/shop">
              <button className="btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', borderColor: '#fff', color: '#fff', cursor: 'pointer' }}>
                Shop Collection
              </button>
            </Link>
          </div>
        </div>
      </header>

      <section className={styles.featureSection}>
        <h2 className={styles.sectionTitle}>Our Offerings</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🎭</span>
            <h3 className={styles.featureTitle}>Book Artists</h3>
            <p className={styles.featureDesc}>Find and book verified classical dancers and musicians for your events.</p>
            <Link href="/explore-artists" style={{ color: 'var(--color-maroon)', fontWeight: '600', marginTop: '1rem', display: 'block' }}>
              Explore Artists →
            </Link>
          </div>

          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🛍️</span>
            <h3 className={styles.featureTitle}>Shop Authentic</h3>
            <p className={styles.featureDesc}>Buy classical dance costumes, instruments, and traditional artifacts directly from artisans.</p>
            <Link href="/shop" style={{ color: 'var(--color-maroon)', fontWeight: '600', marginTop: '1rem', display: 'block' }}>
              Visit Shop →
            </Link>
          </div>

          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🏛️</span>
            <h3 className={styles.featureTitle}>Learn from Masters</h3>
            <p className={styles.featureDesc}>Connect with premier institutions for learning Indian classical arts.</p>
            <Link href="/explore-institutions" style={{ color: 'var(--color-maroon)', fontWeight: '600', marginTop: '1rem', display: 'block' }}>
              Find Institutions →
            </Link>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container" style={{ textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-maroon)', marginBottom: '1rem' }}>KalaSetu</h3>
          <p style={{ marginBottom: '1.5rem', opacity: 0.8 }}>Preserving and promoting Indian Classical Arts globally.</p>
          <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>© 2024 KalaSetu. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
