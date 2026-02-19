'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import styles from './page.module.css';
import { db } from '@/lib/firebase/firebase';
import { collection, query, limit, getDocs, orderBy } from 'firebase/firestore';
import { useCart } from '@/context/CartContext';

const defaultImage = "https://images.unsplash.com/photo-1524230659092-07f99a75c013?q=80&w=500&auto=format&fit=crop";

// Product Modal Component
const ProductModal = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)',
      display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000
    }} onClick={onClose}>
      <div style={{
        backgroundColor: 'white', borderRadius: '16px', padding: '2rem', maxWidth: '900px', width: '90%',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', position: 'relative',
        boxShadow: '0 20px 50px rgba(0,0,0,0.2)'
      }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#666' }}>✕</button>
        <div style={{ borderRadius: '12px', overflow: 'hidden', height: '400px' }}>
          <img src={product.mainImage || defaultImage} alt={product.productName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.src = defaultImage} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ color: 'var(--color-maroon)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{product.categoryId}</span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '1rem', lineHeight: 1.2 }}>{product.productName}</h2>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-gold-dark)', marginBottom: '1.5rem' }}>₹{product.price?.toLocaleString('en-IN')}</p>
          <p style={{ lineHeight: 1.6, color: '#555', marginBottom: '2rem' }}>{product.description || "Experience the authentic craftsmanship of India with this exquisite piece."}</p>
          <button className="btn-primary" onClick={() => { onAddToCart(product); onClose(); alert("Added to cart"); }}>Add to Cart - ₹{product.price?.toLocaleString('en-IN')}</button>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. Fetch Events
        const eventsQuery = query(collection(db, 'events'), limit(3));
        const eventsSnap = await getDocs(eventsQuery);
        setFeaturedEvents(eventsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        // 2. Fetch Products
        const productQuery = query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(8)); // 8 products for grid
        const productSnap = await getDocs(productQuery);
        setFeaturedProducts(productSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        // 3. Fetch Institutions (Sample limited set)
        const instQuery = query(collection(db, 'institutions'), limit(6));
        const instSnap = await getDocs(instQuery);
        setInstitutions(instSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      } catch (error) {
        console.error("Error fetching homepage data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <Navbar />

      {/* SECTION 1: HERO */}
      <header className={styles.hero} style={{ backgroundImage: 'url("/dance-img.png")' }}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <span className={styles.heroTagline}>Where Tradition Meets Modernity</span>
          <h1 className={styles.heroTitle}>
            Discover the Soul of <br />
            <span>Indian Classical Arts</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Journey into the timeless art forms, exquisite crafts, and rich heritage of India through a curated digital experience.
          </p>
          <div className={styles.ctaGroup}>
            <Link href="/events" className={styles.ctaPrimary}>Explore Events</Link>
            <Link href="/shop" className={styles.ctaSecondary}>Visit Marketplace</Link>
          </div>
        </div>
      </header>

      {/* SECTION 2: UPCOMING EVENTS */}
      <section className={styles.section} style={{ background: '#fff' }}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Upcoming Events</h2>
          <p>Immerse yourself in live performances, workshops, and exhibitions.</p>
        </div>

        <div className={styles.grid}>
          {loading ? (
            [1, 2, 3].map(n => <div key={n} style={{ height: 400, background: '#f5f5f5', borderRadius: 16 }}></div>)
          ) : featuredEvents.length > 0 ? (
            featuredEvents.map(event => {
              const dateObj = event.date ? new Date(event.date) : new Date();
              return (
                <Link href={`/events/${event.id}`} key={event.id} className={styles.eventCard}>
                  <div className={styles.cardImageWrapper}>
                    <img src={event.imageUrl || defaultImage} alt={event.name} onError={e => e.target.src = defaultImage} />
                    <div className={styles.dateBadge}>
                      <span className={styles.dateDay}>{dateObj.getDate()}</span>
                      <span className={styles.dateMonth}>{dateObj.toLocaleString('default', { month: 'short' })}</span>
                    </div>
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{event.name}</h3>
                    <div className={styles.cardLocation}>
                      <span>📍</span> {event.location || 'Online'}
                    </div>
                    <p className={styles.cardDesc}>{event.description ? event.description.substring(0, 80) + '...' : 'Join us for this special cultural event.'}</p>
                    <span className={styles.cardAction}>View Details →</span>
                  </div>
                </Link>
              )
            })
          ) : (
            <p style={{ textAlign: 'center', gridColumn: '1/-1' }}>No upcoming events currently listed.</p>
          )}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/events" className={styles.viewAllLink}>View Full Calendar →</Link>
        </div>
      </section>

      {/* SECTION 3: MARKETPLACE */}
      <section className={styles.section} style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Artisanal Treasures</h2>
          <p>Discover hand-picked masterpieces from India's finest artisans.</p>
        </div>

        <div className={styles.productGrid}>
          {loading ? (
            [1, 2, 3, 4].map(n => <div key={n} style={{ height: 350, background: '#eee', borderRadius: 20 }}></div>)
          ) : featuredProducts.length > 0 ? (
            featuredProducts.map(product => (
              <div key={product.id} className={styles.productCard} onClick={() => setSelectedProduct(product)}>
                <div className={styles.productImage}>
                  <img src={product.mainImage || defaultImage} alt={product.productName} onError={e => e.target.src = defaultImage} />
                </div>
                <span className={styles.productCat}>{product.categoryId}</span>
                <h3 className={styles.productTitle}>{product.productName}</h3>
                <span className={styles.productPrice}>₹{product.price?.toLocaleString('en-IN')}</span>
                <button
                  className={styles.addToCartBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                    alert("Added to cart");
                  }}
                >
                  <span>Add to Cart</span>
                </button>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', width: '100%' }}>Marketplace is empty.</p>
          )}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/shop" className="btn-secondary" style={{ padding: '0.8rem 2rem', borderRadius: '50px' }}>Browse All Products</Link>
        </div>
      </section>

      {/* SECTION 4: INSTITUTIONS */}
      <section className={styles.section} style={{ background: '#fff' }}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Top Institutions</h2>
          <p>Collaborating with India's most prestigious cultural centers.</p>
        </div>

        <div className={styles.institutionScroll}>
          {loading ? (
            [1, 2, 3, 4].map(n => <div key={n} style={{ minWidth: 250, height: 200, background: '#f9f9f9' }}></div>)
          ) : institutions.length > 0 ? (
            institutions.map(inst => (
              <Link href={`/institution-details?id=${inst.id}`} key={inst.id} className={styles.instCard} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className={styles.instLogo}>
                  🏛️
                </div>
                <h3>{inst.basicDetails?.instituteName}</h3>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>{inst.basicDetails?.city || 'India'}</p>
                <span style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--color-maroon)', fontWeight: '600' }}>Explore Profile</span>
              </Link>
            ))
          ) : (
            <p>No institutions found.</p>
          )}
        </div>
      </section>

      {/* SECTION 5: WHY KALASETU */}
      <section className={styles.whySection} style={{ background: '#2C1A1D' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>Why KalaSetu?</h2>
          <p style={{ opacity: 0.8, maxWidth: '600px', margin: '0 auto' }}>Bridging the gap between India's classical heritage and the modern world.</p>

          <div className={styles.whyGrid}>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🛡️</span>
              <h3 style={{ color: 'white' }}>Verified Authenticity</h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Every artist and artifact is vetted for quality and tradition.</p>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🤝</span>
              <h3 style={{ color: 'white' }}>Direct Support</h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Empowering artisans by connecting them directly to you.</p>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🌏</span>
              <h3 style={{ color: 'white' }}>Global Reach</h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Taking Indian culture to the world stage.</p>
            </div>
          </div>
        </div>
      </section >

      <footer className={styles.footer}>
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
              <Link href="#" className={styles.footerLink}>Artisan Stories</Link>
              <Link href="#" className={styles.footerLink}>Membership</Link>
            </div>
          </div>

          {/* Col 3: Contact Us */}
          <div className={styles.footerCol}>
            <h4>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className={styles.contactItem}>
                <span>📍</span>
                <span>12 Heritage Lane, Sanskriti Kendra, New Delhi, India 110047</span>
              </div>
              <div className={styles.contactItem}>
                <span>📞</span>
                <span>+91 11 2345 6789</span>
              </div>
              <div className={styles.contactItem}>
                <span>✉️</span>
                <span>namaste@kalasetu.in</span>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div className={styles.footerCol}>
            <h4>Newsletter</h4>
            <p style={{ marginBottom: '1.5rem', opacity: 0.8 }}>
              Subscribe to receive updates on upcoming cultural events and new marketplace collections.
            </p>
            <form>
              <input type="email" placeholder="Your email address" className={styles.newsletterInput} />
              <button type="button" className={styles.newsletterBtn}>Subscribe</button>
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
      </footer>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={addToCart} />
    </div >
  );
}
