'use client';

import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from '@/lib/firebase/firebase';
import { useCart } from '@/context/CartContext';
import { useStoreSettings } from '@/context/StoreSettingsContext';
import Navbar from '@/components/Navbar';
import styles from '../explore.module.css';
import Toast from '@/components/Toast';
import BulkEnquiryModal from '@/components/BulkEnquiryModal';

export default function Shop() {
    const { addToCart } = useCart();
    const { settings } = useStoreSettings();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filter, setFilter] = useState("All");
    const [loading, setLoading] = useState(true);
    const [toastMessage, setToastMessage] = useState('');
    const [quantities, setQuantities] = useState({});

    // Modal State
    const [bulkModalOpen, setBulkModalOpen] = useState(false);
    const [selectedProductForBulk, setSelectedProductForBulk] = useState(null);

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

                // Initialize quantities to 1
                const initialQuantities = {};
                fetchedProducts.forEach(p => initialQuantities[p.id] = 1);
                setQuantities(initialQuantities);

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

    const handleQuantityChange = (productId, delta) => {
        setQuantities(prev => ({
            ...prev,
            [productId]: Math.max(1, (prev[productId] || 1) + delta)
        }));
    };

    const handleAddToCart = (product) => {
        const qty = quantities[product.id] || 1;
        // The addToCart in CartContext may only support single item addition unless modified. 
        // For standard cart, we will just loop or assume they have an updated context.
        // Actually, we should just call it `qty` times or pass qty if context supports it.
        // Assuming context supports adding item one by one or we just add it to cart
        for (let i = 0; i < qty; i++) {
            addToCart(product);
        }
        setToastMessage(`Added ${qty} ${product.productName || 'Item'}(s) to cart!`);
        setTimeout(() => setToastMessage(''), 3000);
    };

    const handleWhatsAppOrder = (product) => {
        const qty = quantities[product.id] || 1;

        let message = settings?.whatsappMessageTemplate || 'Hi, I want to order {ProductName}. Quantity: {Quantity}. Price: {Price}. Product Link: {Link}';
        const productLink = `${window.location.origin}/shop`; // Or product specific link if available

        message = message.replace('{ProductName}', product.productName || 'Item');
        message = message.replace('{Quantity}', qty);
        message = message.replace('{Price}', `₹${(product.price * qty).toLocaleString('en-IN')}`);
        message = message.replace('{Link}', productLink);

        const waUrl = `https://wa.me/${settings?.whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(waUrl, '_blank');
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
                                                style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '0.25rem' }}>
                                                    <button
                                                        onClick={() => handleQuantityChange(product.id, -1)}
                                                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem 0.5rem', fontSize: '1.2rem' }}
                                                    >
                                                        -
                                                    </button>
                                                    <span style={{ fontWeight: 500 }}>{quantities[product.id] || 1}</span>
                                                    <button
                                                        onClick={() => handleQuantityChange(product.id, 1)}
                                                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem 0.5rem', fontSize: '1.2rem' }}
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                {product.enableBulkEnquiry && quantities[product.id] > product.bulkThreshold ? (
                                                    <button
                                                        className={styles.btnPrimary}
                                                        onClick={() => {
                                                            setSelectedProductForBulk(product);
                                                            setBulkModalOpen(true);
                                                        }}
                                                        style={{ background: '#4b5563', borderColor: '#4b5563', width: '100%' }}
                                                    >
                                                        Submit Bulk Enquiry
                                                    </button>
                                                ) : settings?.purchaseMode === 'Order via WhatsApp' ? (
                                                    <button
                                                        className={styles.btnPrimary}
                                                        onClick={() => handleWhatsAppOrder(product)}
                                                        style={{ background: '#25D366', borderColor: '#25D366', width: '100%' }}
                                                    >
                                                        WhatsApp
                                                    </button>
                                                ) : (
                                                    <button
                                                        className={styles.btnPrimary}
                                                        onClick={() => handleAddToCart(product)}
                                                        style={{ width: '100%' }}
                                                    >
                                                        Add to Cart
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </main>

            {/* Bulk Enquiry Modal */}
            <BulkEnquiryModal
                isOpen={bulkModalOpen}
                onClose={() => { setBulkModalOpen(false); setSelectedProductForBulk(null); }}
                product={selectedProductForBulk}
                quantity={selectedProductForBulk ? quantities[selectedProductForBulk.id] : 0}
                onSuccess={() => {
                    setToastMessage('Bulk enquiry submitted successfully!');
                    setTimeout(() => setToastMessage(''), 3000);
                }}
            />
        </div>
    );
}