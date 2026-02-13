'use client';
import Navbar from '@/components/Navbar';
import styles from '../explore.module.css';

export default function Shop() {
    return (
        <div className="page-wrapper">
            <Navbar />
            <main className={styles.pageContainer}>
                <section className={styles.heroSection}>
                    <h1 className={styles.heroTitle}>KalaSetu Bazaar</h1>
                    <p className={styles.heroSubtitle}>
                        Authentic Instruments, Elegant Costumes, and Handcrafted Accessories.
                        Directly from artisans to your doorstep.
                    </p>
                </section>

                <div className={styles.mainContent}>
                    {/* Filter Categories */}
                    <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '2rem' }}>
                        {['All', 'Instruments', 'Costumes', 'Jewelry', 'Books'].map(cat => (
                            <button key={cat} style={{
                                padding: '0.5rem 1.25rem',
                                borderRadius: '20px',
                                border: '1px solid #e5e7eb',
                                background: cat === 'All' ? 'var(--color-maroon)' : 'white',
                                color: cat === 'All' ? 'white' : 'var(--color-text-secondary)',
                                cursor: 'pointer',
                                fontWeight: 500,
                                whiteSpace: 'nowrap'
                            }}>
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className={styles.grid}>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                            <div key={item} className={styles.card}>
                                <div className={styles.cardContent}>
                                    <div className={styles.cardImage} style={{ marginBottom: '1rem', borderRadius: '8px' }}>
                                        🛍️
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <h3 className={styles.cardTitle} style={{ fontSize: '1.1rem', margin: 0 }}>Veena (Premium)</h3>
                                            <p className={styles.cardSubtitle} style={{ fontSize: '0.85rem' }}>Classical Instrument</p>
                                        </div>
                                        <div className={styles.cardPrice}>₹{(item * 1500) + 4999}</div>
                                    </div>

                                    <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: '0.5rem 0' }}>
                                        Handcrafted from seasoned Jackwood. Beautiful tone and finish...
                                    </p>

                                    <div className={styles.cardActions} style={{ marginTop: '1rem' }}>
                                        <button className={styles.btnPrimary}>Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
