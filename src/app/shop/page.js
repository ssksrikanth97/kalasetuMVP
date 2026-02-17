'use client';

import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from '@/lib/firebase/firebase';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import styles from '../explore.module.css';
import Toast from '@/components/Toast';

export default function Shop() {
    const { addToCart } = useCart();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filter, setFilter] = useState("All");
    const [loading, setLoading] = useState(true);
    const [toastMessage, setToastMessage] = useState('');

    const defaultImage = "https://images.unsplash.com/photo-1524230659092-07f99a75c013?q=80&w=500&auto=format&fit=crop";

    useEffect(() => {
        const fetchProductsAndCategories = async () => {
            try {
                const productsQuery = query(collection(db, "products"));
                const querySnapshot = await getDocs(productsQuery);
                const fetchedProducts = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setProducts(fetchedProducts);

                const fetchedCategories = [...new Set(fetchedProducts.map(p => p.categoryId))];
                setCategories([...new Set(['All', ...fetchedCategories.filter(Boolean)])]);

                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchProductsAndCategories();
    }, []);

    const filteredProducts =
        filter === "All"
            ? products
            : products.filter(p => p.categoryId === filter);

    const handleAddToCart = (product) => {
        addToCart(product);
        setToastMessage(`Added ${product.productName || 'Item'} to cart!`);
        setTimeout(() => setToastMessage(''), 3000);
    };

    return (
        <div className="page-wrapper">
            <Navbar />
            <Toast message={toastMessage} onClose={() => setToastMessage('')} />
            <main className={styles.pageContainer}>
                <section className={styles.heroSection}>
                    <h1 className={styles.heroTitle}>KalaSetu Bazaar</h1>
                    <p className={styles.heroSubtitle}>
                        Authentic Instruments, Elegant Costumes, and Handcrafted Accessories.
                        Directly from artisans to your doorstep.
                    </p>
                </section>

                <div className={styles.mainContent}>
                    {loading ? (
                        <p>Loading products...</p>
                    ) : (
                        <>
                            {/* Filter Categories */}
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '1rem',
                                    overflowX: 'auto',
                                    paddingBottom: '1rem',
                                    marginBottom: '2rem'
                                }}
                            >
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setFilter(cat)}
                                        style={{
                                            padding: '0.5rem 1.25rem',
                                            borderRadius: '20px',
                                            border: '1px solid #e5e7eb',
                                            background: filter === cat ? 'var(--color-maroon)' : 'white',
                                            color: filter === cat ? 'white' : 'var(--color-text-secondary)',
                                            cursor: 'pointer',
                                            fontWeight: 500,
                                            whiteSpace: 'nowrap',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            <div className={styles.grid}>
                                {filteredProducts.map((product) => (
                                    <div key={product.id} className={styles.card}>
                                        <div className={styles.cardContent}>
                                            <img
                                                src={product.mainImage || defaultImage}
                                                alt={product.productName}
                                                className={styles.cardImage}
                                                style={{
                                                    marginBottom: '1rem',
                                                    borderRadius: '8px',
                                                    width: '100%',
                                                    height: '200px',
                                                    objectFit: 'cover'
                                                }}
                                                onError={(e) => e.target.src = defaultImage}
                                            />

                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'flex-start'
                                                }}
                                            >
                                                <div>
                                                    <h3
                                                        className={styles.cardTitle}
                                                        style={{ fontSize: '1.1rem', margin: 0 }}
                                                    >
                                                        {product.productName}
                                                    </h3>
                                                    <p
                                                        className={styles.cardSubtitle}
                                                        style={{ fontSize: '0.85rem' }}
                                                    >
                                                        {product.categoryId}
                                                    </p>
                                                </div>
                                                <div className={styles.cardPrice}>
                                                    ₹{product.price?.toLocaleString('en-IN')}
                                                </div>
                                            </div>

                                            <p
                                                style={{
                                                    fontSize: '0.85rem',
                                                    color: '#6b7280',
                                                    margin: '0.5rem 0',
                                                    flex: 1
                                                }}
                                            >
                                                {product.shortDescription}
                                            </p>

                                            <div
                                                className={styles.cardActions}
                                                style={{ marginTop: '1rem' }}
                                            >
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
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}