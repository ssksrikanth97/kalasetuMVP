'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import TopInstitutions from '@/components/TopInstitutions/TopInstitutions';
import styles from './page.module.css';
import { db } from '@/lib/firebase/firebase';
import { collection, query, where, limit, getDocs, orderBy } from 'firebase/firestore';
import { useCart } from '@/context/CartContext';

export default function Home() {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch Approved Events (Showing all for now to ensure visibility)
        const eventsQuery = query(collection(db, 'events'), limit(4));
        const eventsSnap = await getDocs(eventsQuery);
        const eventsData = eventsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFeaturedEvents(eventsData);

        // Fetch Approved Products (Showing all for now to ensure visibility)
        const productQuery = query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(4));
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

  const defaultImage = "https://images.unsplash.com/photo-1524230659092-07f99a75c013?q=80&w=500&auto=format&fit=crop";

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
              <Link href={`/events/${event.id}`} key={event.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className={styles.card}>
                  <div className={styles.cardImage}>
                    <img
                      src={event.imageUrl || defaultImage}
                      alt={event.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => e.target.src = defaultImage}
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <p className={styles.cardLabel}>{event.date ? new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Date'}</p>
                    <h3 className={styles.cardTitle}>{event.name || 'Event Name'}</h3>
                    {event.location && <p className={styles.cardLocation}>📍 {event.location}</p>}
                    {event.artists && <p className={styles.cardArtists}>🎤 {event.artists.join(', ')}</p>}
                  </div>
                </div>
              </Link>
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
              <div
                key={product.id}
                className={styles.card}
                onClick={() => setSelectedProduct(product)}
                style={{ cursor: 'pointer', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.02)' } }}
              >
                <div className={styles.cardImage}>
                  <img
                    src={product.mainImage || defaultImage}
                    alt={product.productName}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => e.target.src = defaultImage}
                  />
                </div>
                <div className={styles.cardContent}>
                  <p className={styles.cardLabel}>{product.categoryId}</p>
                  <h3 className={styles.cardTitle}>{product.productName}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <p className={styles.cardPrice}>₹{product.price.toLocaleString('en-IN')}</p>
                    <button
                      className="btn-primary"
                      style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                        alert("Added to cart!");
                      }}
                    >
                      Add +
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ padding: '2rem', color: '#666' }}>No products found in the marketplace.</div>
          )}
        </div>
      </section>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(5px)'
        }} onClick={() => setSelectedProduct(null)}>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '16px',
            maxWidth: '800px',
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }} onClick={e => e.stopPropagation()}>

            <button
              onClick={() => setSelectedProduct(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              ✕
            </button>

            {/* Left: Image */}
            <div style={{ height: '400px', borderRadius: '8px', overflow: 'hidden' }}>
              <img
                src={selectedProduct.mainImage || defaultImage}
                alt={selectedProduct.productName}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => e.target.src = defaultImage}
              />
            </div>

            {/* Right: Details */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{
                color: 'var(--color-maroon)',
                fontWeight: '600',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '0.5rem'
              }}>
                {selectedProduct.categoryId}
              </span>

              <h2 style={{ fontSize: '2rem', marginBottom: '1rem', lineHeight: 1.2 }}>{selectedProduct.productName}</h2>

              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '1.5rem' }}>
                ₹{selectedProduct.price.toLocaleString('en-IN')}
              </p>

              <p style={{ lineHeight: '1.6', color: '#555', marginBottom: '2rem' }}>
                {selectedProduct.description || "No description available for this product."}
              </p>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  className="btn-primary"
                  style={{ flex: 1, padding: '1rem', fontSize: '1rem' }}
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null); // Close modal on add? Or keep open? Let's close for now or show toast.
                    alert("Product added to cart!");
                  }}
                >
                  Add to Cart 🛒
                </button>
              </div>

              <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #eee', fontSize: '0.9rem', color: '#888' }}>
                <p>✓ Authentic Quality Guaranteed</p>
                <p>✓ Secure Shipping Worldwide</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top Institutions Section */}
      <TopInstitutions />

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
