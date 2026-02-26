'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import styles from './page.module.css';
import { db } from '@/lib/firebase/firebase';
import { collection, query, limit, getDocs, orderBy } from 'firebase/firestore';
import { useCart } from '@/context/CartContext';
import { useStoreSettings } from '@/context/StoreSettingsContext';

const defaultImage = "https://images.unsplash.com/photo-1524230659092-07f99a75c013?q=80&w=500&auto=format&fit=crop";

// Product Modal Component
const ProductModal = ({ product, onClose, onAddToCart }) => {
  const { settings } = useStoreSettings();
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
          {settings?.purchaseMode === 'Order via WhatsApp' ? (
            <button className="btn-primary" onClick={() => {
              const message = settings.whatsappMessageTemplate
                .replace('{ProductName}', product.productName)
                .replace('{Quantity}', '1')
                .replace('{Price}', product.price?.toLocaleString('en-IN') || '')
                .replace('{Link}', `${window.location.origin}/products/${product.id}`);
              window.open(`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
              onClose();
            }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', backgroundColor: '#25D366', borderColor: '#25D366' }}>
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.878-.788-1.482-1.761-1.655-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.052 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
              Order via WhatsApp
            </button>
          ) : (
            <button className="btn-primary" onClick={() => { onAddToCart(product); onClose(); alert("Added to cart"); }}>Add to Cart - ₹{product.price?.toLocaleString('en-IN')}</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const { settings } = useStoreSettings();
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [categories, setCategories] = useState([]);
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

        // 1B. Fetch Categories
        const catQuery = query(collection(db, 'categories'));
        const catSnap = await getDocs(catQuery);
        const fetchedCats = catSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCategories(fetchedCats.filter(c => !c.parentCategoryId).slice(0, 8)); // Top categories

        // 2. Fetch Products
        // We fetch a larger pool of recent products to safely filter discounted items 
        // since older records might have 'discountPercentage' saved as a string (e.g., "50" instead of 50).
        // Firestore single-field queries (>) strictly check type, ignoring strings in a number query.
        const productQuery = query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(50));
        const productSnap = await getDocs(productQuery);
        const allProducts = productSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Take the first 8 for Artisanal Treasures
        setFeaturedProducts(allProducts.slice(0, 8));

        // Safely parse and filter for discounted items
        const discounted = allProducts.filter(p => Number(p.discountPercentage) > 5).slice(0, 8);
        setDiscountedProducts(discounted);

        // 3. Fetch Institutions (Sample limited set)
        const instQuery = query(collection(db, 'institutions'), limit(6));
        const instSnap = await getDocs(instQuery);
        setInstitutions(instSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        // 4. Fetch Testimonials
        const testimonialQuery = query(collection(db, 'testimonials'));
        const testimonialSnap = await getDocs(testimonialQuery);
        setTestimonials(testimonialSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

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
      <header className={styles.hero} style={{ backgroundImage: 'url("/KALASETU_Cultural_Ecosystem_img.jpg")' }}>
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
            <Link href="/shop" className={styles.ctaSecondary}>Visit Shop</Link>
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

      {/* CATEGORIES SHOWCASE REMOVED AS REQUESTED */}

      {/* SECTION 3: DYNAMIC CATEGORY MARKETPLACE */}
      {categories.map((cat, catIndex) => {
        const categoryProducts = featuredProducts.filter(p => p.categoryId === cat.name || p.categoryId === cat.id);
        if (categoryProducts.length === 0) return null;

        return (
          <section key={cat.id || catIndex} className={styles.section} style={{ backgroundColor: catIndex % 2 === 0 ? 'white' : 'var(--bg-secondary)' }}>
            <div className={styles.sectionHeader} style={{ marginBottom: '3rem' }}>
              <h2 className={styles.sectionTitle}>{cat.name}</h2>
              <p>Explore the finest selections of {cat.name}.</p>
            </div>

            <div className={styles.productGrid}>
              {categoryProducts.map((product, index) => (
                <div key={`${product.id}-${index}`} className={styles.productCard} onClick={() => setSelectedProduct(product)}>
                  <div className={styles.productImage}>
                    <img src={product.mainImage || defaultImage} alt={product.productName} onError={e => e.target.src = defaultImage} />
                    {settings?.purchaseMode === 'Order via WhatsApp' ? (
                      <button
                        className={styles.hoverCartBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          const message = settings.whatsappMessageTemplate
                            .replace('{ProductName}', product.productName)
                            .replace('{Quantity}', '1')
                            .replace('{Price}', product.price?.toLocaleString('en-IN') || '')
                            .replace('{Link}', `${window.location.origin}/products/${product.id}`);
                          window.open(`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.878-.788-1.482-1.761-1.655-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.052 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
                          WhatsApp
                        </span>
                      </button>
                    ) : (
                      <button
                        className={styles.hoverCartBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                          alert("Added to cart");
                        }}
                      >
                        <span>Add to Cart</span>
                      </button>
                    )}
                  </div>
                  <div className={styles.productInfo}>
                    <h3 className={styles.productTitle}>{product.productName}</h3>
                    <span className={styles.productPrice}>₹{product.price?.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      {/* SECTION 3B: DISCOUNTED PRODUCTS */}
      <section className={styles.section} style={{ backgroundColor: '#fff', paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div className={styles.sectionHeader} style={{ marginBottom: '2rem' }}>
          <h2 className={styles.sectionTitle}>50% Discount Products</h2>
          <p>Grab these exclusive deals with incredible discounts.</p>
        </div>

        <div className={styles.productGrid}>
          {loading ? (
            [1, 2, 3, 4].map(n => <div key={n} className={styles.productCard} style={{ height: 350, background: '#eee' }}></div>)
          ) : discountedProducts.length > 0 ? (
            discountedProducts.map((product, index) => (
              <div key={`${product.id}-${index}`} className={styles.productCard} onClick={() => setSelectedProduct(product)} style={{ width: '100%' }}>
                <div className={styles.productImage}>
                  <img src={product.mainImage || defaultImage} alt={product.productName} onError={e => e.target.src = defaultImage} />
                  <button
                    className={styles.hoverCartBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                      alert("Added to cart");
                    }}
                  >
                    <span>Add to Cart</span>
                  </button>
                </div>
                <div className={styles.productInfo}>
                  <h3 className={styles.productTitle}>{product.productName}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span className={styles.productPrice} style={{ marginBottom: 0 }}>₹{product.price?.toLocaleString('en-IN')}</span>
                    <span style={{ color: '#059669', fontSize: '0.9rem', fontWeight: 'bold' }}>({product.discountPercentage || 50}% OFF)</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', width: '100%', padding: '2rem 0' }}>No special offers at the moment.</p>
          )}
        </div>
      </section>

      {/* SECTION 4: INSTITUTIONS 
      <section className={styles.section} style={{ background: '#fff', paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div className={styles.sectionHeader} style={{ marginBottom: '2rem' }}>
          <h2 className={styles.sectionTitle}>Top Institutions</h2>
          <p>Collaborating with India's most prestigious cultural centers.</p>
        </div>

        <div className={styles.instGrid}>
          {loading ? (
            [1, 2, 3, 4].map(n => <div key={n} className={styles.instCard} style={{ minWidth: 250, height: 200, background: '#f9f9f9' }}></div>)
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
            <p style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '2rem 0' }}>No institutions found.</p>
          )}
        </div>
      </section>
      */}

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

      {/* SECTION 6: TESTIMONIALS */}
      {!loading && testimonials.length > 0 && (
        <section className={styles.testimonialsSection}>
          <div className={styles.sectionHeader} style={{ marginBottom: '3rem' }}>
            <h2 className={styles.sectionTitle}>What People Say</h2>
            <p>Voices from our vibrant community of artists and art lovers.</p>
          </div>
          <div className={styles.testimonialTrack}>
            {/* Duplicate the array to create a seamless scrolling loop */}
            {[...testimonials, ...testimonials, ...testimonials].map((t, index) => (
              <div key={`${t.id}-${index}`} className={styles.testimonialCard}>
                {t.logoImg && (
                  <img src={t.logoImg} alt={t.title} className={styles.testimonialLogo} />
                )}
                <p className={styles.testimonialText}>"{t.description}"</p>
                <h4 className={styles.testimonialTitle}>- {t.title}</h4>
              </div>
            ))}
          </div>
        </section>
      )}

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={addToCart} />
    </div >
  );
}
