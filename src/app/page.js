'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import styles from './page.module.css';
import { db } from '@/lib/firebase/firebase';
import { collection, query, where, limit, getDocs } from 'firebase/firestore';

export default function Home() {
  const [featuredArtists, setFeaturedArtists] = useState([]);
  const [featuredInstitutions, setFeaturedInstitutions] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch Artists
        // Assuming artists are in 'users' collection with role 'artist'
        // OR in 'artists' collection. Let's try 'artists' first as per signup flow.
        const artistsQuery = query(collection(db, 'artists'), limit(4));
        const artistsSnap = await getDocs(artistsQuery);
        const artistsData = artistsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFeaturedArtists(artistsData);

        // Fetch Institutions
        const instQuery = query(collection(db, 'institutions'), limit(4));
        const instSnap = await getDocs(instQuery);
        const instData = instSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFeaturedInstitutions(instData);

        // Fetch Products
        // If products collection doesn't exist, this will return empty array, which is fine.
        const productQuery = query(collection(db, 'products'), limit(4));
        const productSnap = await getDocs(productQuery);
        const productData = productSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Fallback for products if DB is empty to show UI
        if (productData.length === 0) {
          setFeaturedProducts([
            { id: 'p1', name: 'Veena (Premium)', type: 'Instrument', price: 25000, image: '🎸' },
            { id: 'p2', name: 'Bharatnatyam Silk', type: 'Costume', price: 3500, image: '👗' },
            { id: 'p3', name: 'Tabla Set', type: 'Instrument', price: 12000, image: '🥁' },
            { id: 'p4', name: 'Temple Jewelry', type: 'Jewelry', price: 4500, image: '📿' },
          ]);
        } else {
          setFeaturedProducts(productData);
        }

      } catch (error) {
        console.error("Error fetching homepage data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingBottom: '2rem' }}>
      <Navbar />

      {/* Hero Section */}
      <header className={styles.hero} style={{ backgroundImage: 'url("/dance-img.png")' }}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle} style={{ color: '#ffffff' }}>
            Discover the Soul of
            <span style={{ color: '#f1501c' }}> Indian Classical Arts</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Connect with verified artists, explore prestigious institutions, and shop for authentic cultural artifacts.
            The bridge between tradition and the world.
          </p>
          <div className={styles.ctaGroup}>
            <Link href="/auth/signup?role=artist">
              <button className={styles.ctaPrimary}>Join as Artist</button>
            </Link>
            <Link href="/shop">
              <button className={styles.ctaSecondary}>Shop Collection</button>
            </Link>
          </div>
        </div>
      </header>

      {/* Featured Artists Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Featured Artists</h2>
            <p className={styles.sectionSubtitle}>Maestros and rising stars in Music, Dance, and Fine Arts.</p>
          </div>
          <Link href="/explore-artists" className={styles.viewAllLink}>View All Artists →</Link>
        </div>

        <div className={styles.scrollContainer}>
          {loading ? (
            [1, 2, 3, 4].map(n => (
              <div key={n} className={styles.card} style={{ height: '350px', background: '#f3f4f6' }}></div>
            ))
          ) : featuredArtists.length > 0 ? (
            featuredArtists.map(artist => (
              <div key={artist.id} className={styles.card}>
                <div className={styles.cardImage}>👤</div>
                <div className={styles.cardContent}>
                  <p className={styles.cardLabel}>{artist.personalDetails?.specialization || 'Artist'}</p>
                  <h3 className={styles.cardTitle}>{artist.personalDetails?.name || 'Artist Name'}</h3>
                  <p style={{ color: '#666', fontSize: '0.9rem' }}>📍 {artist.personalDetails?.location || 'India'}</p>
                </div>
              </div>
            ))
          ) : (
            <div style={{ padding: '2rem', color: '#666' }}>No artists found. Be the first to join!</div>
          )}
        </div>
      </section>

      {/* Shop Section */}
      <section className={styles.section} style={{ background: '#fdfbf7' }}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Curated Marketplace</h2>
            <p className={styles.sectionSubtitle}>Authentic instruments, costumes, and accessories.</p>
          </div>
          <Link href="/shop" className={styles.viewAllLink}>Visit Shop →</Link>
        </div>

        <div className={styles.scrollContainer}>
          {featuredProducts.map(product => (
            <div key={product.id} className={styles.card}>
              <div className={styles.cardImage}>{product.image}</div>
              <div className={styles.cardContent}>
                <p className={styles.cardLabel}>{product.type}</p>
                <h3 className={styles.cardTitle}>{product.name}</h3>
                <p className={styles.cardPrice}>₹{product.price.toLocaleString('en-IN')}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Institutions Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Top Institutions</h2>
            <p className={styles.sectionSubtitle}>Academies dedicated to preserving our heritage.</p>
          </div>
          <Link href="/explore-institutions" className={styles.viewAllLink}>Explore Institutions →</Link>
        </div>

        <div className={styles.scrollContainer}>
          {loading ? (
            [1, 2, 3].map(n => <div key={n} className={styles.card} style={{ height: '300px', background: '#f3f4f6' }}></div>)
          ) : featuredInstitutions.length > 0 ? (
            featuredInstitutions.map(inst => (
              <div key={inst.id} className={styles.card}>
                <div className={styles.cardImage}>🏛️</div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{inst.basicDetails?.instituteName || 'Institution Name'}</h3>
                  <p style={{ color: '#666', fontSize: '0.9rem' }}>📍 {inst.basicDetails?.city || 'Location'}</p>
                </div>
              </div>
            ))
          ) : (
            <div style={{ padding: '2rem', color: '#666' }}>No institutions found.</div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={styles.whySection}>
        <h2 className={styles.sectionTitle} style={{ textAlign: 'center' }}>Why KalaSetu?</h2>
        <div className={styles.grid}>
          <div data-aos="fade-up">
            <span className={styles.featureIcon} style={{ color: 'var(--color-maroon)' }}>🛡️</span>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-text-primary)' }}>Verified Profiles</h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>Every artist and institution is vetted to ensure authenticity and quality.</p>
          </div>
          <div data-aos="fade-up" data-aos-delay="100">
            <span className={styles.featureIcon} style={{ color: 'var(--color-gold-dark)' }}>🤝</span>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-text-primary)' }}>Direct Connection</h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>Connect directly with artists without middlemen for bookings and classes.</p>
          </div>
          <div data-aos="fade-up" data-aos-delay="200">
            <span className={styles.featureIcon} style={{ color: 'var(--color-maroon)' }}>🌏</span>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-text-primary)' }}>Global Reach</h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>Bringing Indian Classical Arts to a global audience through technology.</p>
          </div>
        </div>
      </section>

      <footer className="footer" style={{ borderTop: '1px solid #eee', marginTop: 0 }}>
        <div className="container" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--color-maroon)', marginBottom: '1rem' }}>KalaSetu</h3>
          <p style={{ marginBottom: '2rem', opacity: 0.8, maxWidth: '600px', margin: '0 auto 2rem' }}>
            "Preserving the past, inspiring the future."<br />
            Join us in our mission to keep the eternal flame of Indian Classical Arts burning bright.
          </p>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginBottom: '2rem' }}>
            <Link href="/about" style={{ opacity: 0.7 }}>About Us</Link>
            <Link href="/contact" style={{ opacity: 0.7 }}>Contact</Link>
            <Link href="/privacy" style={{ opacity: 0.7 }}>Privacy Policy</Link>
          </div>
          <p style={{ fontSize: '0.9rem', opacity: 0.5 }}>© 2026 KalaSetu. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
