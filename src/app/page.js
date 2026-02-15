'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import styles from './page.module.css';
import { db } from '@/lib/firebase/firebase';
import { collection, query, where, limit, getDocs } from 'firebase/firestore';

export default function Home() {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [featuredInstitutions, setFeaturedInstitutions] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch Approved Events
        const eventsQuery = query(collection(db, 'events'), where('status', '==', 'approved'), limit(4));
        const eventsSnap = await getDocs(eventsQuery);
        const eventsData = eventsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFeaturedEvents(eventsData);

        // Fetch Approved Institutions
        const instQuery = query(collection(db, 'institutions'), where('status', '==', 'approved'), limit(4));
        const instSnap = await getDocs(instQuery);
        const instData = instSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFeaturedInstitutions(instData);

        // Fetch Approved Products
        const productQuery = query(collection(db, 'products'), where('status', '==', 'approved'), limit(4));
        const productSnap = await getDocs(productQuery);
        const productData = productSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFeaturedProducts(productData);

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

      {/* Upcoming Events Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Upcoming Events</h2>
            <p className={styles.sectionSubtitle}>Don't miss these upcoming performances and workshops.</p>
          </div>
          <Link href="/admin/events" className={styles.viewAllLink}>View All Events →</Link>
        </div>

        <div className={styles.scrollContainer}>
          {loading ? (
            [1, 2, 3, 4].map(n => (
              <div key={n} className={styles.card} style={{ height: '350px', background: '#f3f4f6' }}></div>
            ))
          ) : featuredEvents.length > 0 ? (
            featuredEvents.map(event => (
              <div key={event.id} className={styles.card}>
                <div className={styles.cardImage}>
                  {event.imageUrl ? (
                    <img src={event.imageUrl} alt={event.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ fontSize: '4rem' }}>🗓️</span>
                  )}
                </div>
                <div className={styles.cardContent}>
                  <p className={styles.cardLabel}>{event.date ? new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Date'}</p>
                  <h3 className={styles.cardTitle}>{event.name || 'Event Name'}</h3>
                  {event.location && <p className={styles.cardLocation}>📍 {event.location}</p>}
                  {event.artists && <p className={styles.cardArtists}>🎤 {event.artists.join(', ')}</p>}
                </div>
              </div>
            ))
          ) : (
            <div style={{ padding: '2rem', color: '#666' }}>No upcoming events found.</div>
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
          {loading ? (
            [1, 2, 3, 4].map(n => (
              <div key={n} className={styles.card} style={{ height: '350px', background: '#f3f4f6' }}></div>
            ))
          ) : featuredProducts.length > 0 ? (
            featuredProducts.map(product => (
              <div key={product.id} className={styles.card}>
                <div className={styles.cardImage}>
                  {product.mainImage ? (
                    <img src={product.mainImage} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span>{product.image || '🖼️'}</span>
                  )}
                </div>
                <div className={styles.cardContent}>
                  <p className={styles.cardLabel}>{product.type}</p>
                  <h3 className={styles.cardTitle}>{product.name}</h3>
                  <p className={styles.cardPrice}>₹{product.price.toLocaleString('en-IN')}</p>
                </div>
              </div>
            ))
          ) : (
            <div style={{ padding: '2rem', color: '#666' }}>No approved products found.</div>
          )}
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
                <div className={styles.cardImage}>
                  {inst.media?.logoUrl ? (
                    <img src={inst.media.logoUrl} alt={`${inst.basicDetails?.instituteName} Logo`} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '1rem' }} />
                  ) : (
                    <span style={{ fontSize: '4rem' }}>🏛️</span>
                  )}
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{inst.basicDetails?.instituteName || 'Institution Name'}</h3>
                  <p style={{ color: '#666', fontSize: '0.9rem' }}>📍 {inst.basicDetails?.city || 'Location'}</p>
                </div>
              </div>
            ))
          ) : (
            <div style={{ padding: '2rem', color: '#666' }}>No approved institutions found.</div>
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
