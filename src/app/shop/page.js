'use client';
import Navbar from '@/components/Navbar';
import styles from '../explore.module.css';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

const PRODUCTS = [
    { id: 1, name: 'Veena (Premium)', type: 'Instrument', price: 25000, image: '🎸', description: 'Handcrafted from seasoned Jackwood. Beautiful tone.' },
    { id: 2, name: 'Bharatanatyam Costume', type: 'Costume', price: 3500, image: '👗', description: 'Authentic silk costume with detailed embroidery.' },
    { id: 3, name: 'Tabla Set', type: 'Instrument', price: 12000, image: '🥁', description: 'Professional quality copper bayan and dayan.' },
    { id: 4, name: 'Temple Jewelry Set', type: 'Jewelry', price: 4500, image: '📿', description: 'Traditional Kemp stones gold-plated set.' },
    { id: 5, name: 'Ghungroo (50 Bells)', type: 'Accessory', price: 1200, image: '🔔', description: 'Cotton cord ghungroos for Kathak and Bharatanatyam.' },
    { id: 6, name: 'Sitar', type: 'Instrument', price: 30000, image: '🎻', description: 'Ravi Shankar style professionally tuned sitar.' },
    { id: 7, name: 'Natyashastra Book', type: 'Book', price: 800, image: '📖', description: 'Comprehensive guide to Indian performing arts.' },
    { id: 8, name: 'Flute (Bansuri)', type: 'Instrument', price: 1500, image: '🎶', description: 'Professional C-sharp medium bamboo flute.' },
];

export default function Shop() {
    const { addToCart } = useCart();
    const [filter, setFilter] = useState('All');

    const filteredProducts = filter === 'All'
        ? PRODUCTS
        : PRODUCTS.filter(p => p.type === filter || (filter === 'Instruments' && p.type === 'Instrument') || (filter === 'Costumes' && p.type === 'Costume'));

    const handleAddToCart = (product) => {
        addToCart(product);
        // Optional: Add toast notification here
        alert(`Added ${product.name} to cart!`);
    };

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
                            <button key={cat} onClick={() => setFilter(cat)} style={{
                                padding: '0.5rem 1.25rem',
                                borderRadius: '20px',
                                border: '1px solid #e5e7eb',
                                background: filter === cat ? 'var(--color-maroon)' : 'white',
                                color: filter === cat ? 'white' : 'var(--color-text-secondary)',
                                cursor: 'pointer',
                                fontWeight: 500,
                                whiteSpace: 'nowrap',
                                transition: 'all 0.2s'
                            }}>
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className={styles.grid}>
                        {filteredProducts.map((product) => (
                            <div key={product.id} className={styles.card}>
                                <div className={styles.cardContent}>
                                    <div className={styles.cardImage} style={{ marginBottom: '1rem', borderRadius: '8px', fontSize: '4rem' }}>
                                        {product.image}
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <h3 className={styles.cardTitle} style={{ fontSize: '1.1rem', margin: 0 }}>{product.name}</h3>
                                            <p className={styles.cardSubtitle} style={{ fontSize: '0.85rem' }}>{product.type}</p>
                                        </div>
                                        <div className={styles.cardPrice}>₹{product.price.toLocaleString('en-IN')}</div>
                                    </div>

                                    <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: '0.5rem 0', flex: 1 }}>
                                        {product.description}
                                    </p>

                                    <div className={styles.cardActions} style={{ marginTop: '1rem' }}>
                                        <button
                                            className={styles.btnPrimary}
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            Add to Cart
                                        </button>
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
