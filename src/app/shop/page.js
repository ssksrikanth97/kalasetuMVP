'use client';

import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from '@/lib/firebase/firebase';
import { useCart } from '@/context/CartContext';
import { useStoreSettings } from '@/context/StoreSettingsContext';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import styles from '../explore.module.css';
import Toast from '@/components/Toast';
import BulkEnquiryModal from '@/components/BulkEnquiryModal';

export default function Shop() {
    const searchParams = useSearchParams();
    const queryParam = searchParams.get('query') || '';

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
                // Fetch Categories
                const categoriesQuery = query(collection(db, "categories"));
                const categorySnap = await getDocs(categoriesQuery);
                const fetchedCategories = categorySnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                setCategories(fetchedCategories);
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

    const filteredProducts = products.filter(p => {
        // Filter by Category
        const categoryMatch = filter === "All" || p.categoryId === filter || p.subCategory === filter;

        // Filter by Search Query
        const searchMatch = !queryParam ||
            (p.productName && p.productName.toLowerCase().includes(queryParam.toLowerCase())) ||
            (p.categoryId && p.categoryId.toLowerCase().includes(queryParam.toLowerCase())) ||
            (p.shortDescription && p.shortDescription.toLowerCase().includes(queryParam.toLowerCase()));

        return categoryMatch && searchMatch;
    });

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
                            {queryParam && (
                                <div style={{
                                    marginBottom: '2rem',
                                    padding: '1.5rem',
                                    backgroundColor: '#f9fafb',
                                    borderRadius: '12px',
                                    border: '1px solid #e5e7eb',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <div>
                                        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}>
                                            Search results for "{queryParam}"
                                        </h2>
                                        <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
                                            Found {filteredProducts.length} items
                                        </p>
                                    </div>
                                    <Link href="/shop" style={{ padding: '0.5rem 1rem', background: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>
                                        Clear Search
                                    </Link>
                                </div>
                            )}

                            {/* Horizontal Category Filters (Etsy Style) */}
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '0.75rem',
                                    overflowX: 'auto',
                                    paddingBottom: '1rem',
                                    marginBottom: '2rem',
                                    scrollbarWidth: 'none', /* Firefox */
                                    msOverflowStyle: 'none',  /* Internet Explorer 10+ */
                                }}
                            >
                                <button
                                    onClick={() => setFilter("All")}
                                    style={{
                                        padding: '0.5rem 1.25rem',
                                        borderRadius: '30px',
                                        border: filter === "All" ? '2px solid var(--color-maroon)' : '1px solid #d1d5db',
                                        background: filter === "All" ? '#fff0f3' : 'white',
                                        color: filter === "All" ? 'var(--color-maroon)' : 'var(--color-text-primary)',
                                        cursor: 'pointer',
                                        fontWeight: 600,
                                        fontSize: '0.9rem',
                                        whiteSpace: 'nowrap',
                                        transition: 'all 0.2s',
                                        boxShadow: filter === "All" ? 'none' : '0 2px 4px rgba(0,0,0,0.05)'
                                    }}
                                >
                                    All Products
                                </button>
                                {categories.filter(c => !c.parentCategoryId).map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setFilter(cat.id)}
                                        style={{
                                            padding: '0.5rem 1.25rem',
                                            borderRadius: '30px',
                                            border: filter === cat.id ? '2px solid var(--color-maroon)' : '1px solid #d1d5db',
                                            background: filter === cat.id ? '#fff0f3' : 'white',
                                            color: filter === cat.id ? 'var(--color-maroon)' : 'var(--color-text-primary)',
                                            cursor: 'pointer',
                                            fontWeight: 600,
                                            fontSize: '0.9rem',
                                            whiteSpace: 'nowrap',
                                            transition: 'all 0.2s',
                                            boxShadow: filter === cat.id ? 'none' : '0 2px 4px rgba(0,0,0,0.05)'
                                        }}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>

                            {/* Main Product Grid Area */}
                            <div className={styles.grid}>
                                {filteredProducts.map((product) => (
                                    <div key={product.id} className={styles.productCard}>
                                        <div className={styles.productImage}>
                                            <Link href={`/products/${product.id}`} style={{ display: 'block', height: '100%' }}>
                                                <img src={product.mainImage || defaultImage} alt={product.productName} onError={e => e.target.src = defaultImage} />
                                            </Link>

                                            {/* Quantity and Actions Overlay Container */}
                                            <div className={styles.hoverActionsOverlay}>
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: '8px', padding: '0.25rem', marginBottom: '0.5rem', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} onClick={e => e.stopPropagation()}>
                                                    <button onClick={() => handleQuantityChange(product.id, -1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem 0.5rem', fontSize: '1.2rem' }}>-</button>
                                                    <span style={{ fontWeight: 600, minWidth: '20px', textAlign: 'center' }}>{quantities[product.id] || 1}</span>
                                                    <button onClick={() => handleQuantityChange(product.id, 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem 0.5rem', fontSize: '1.2rem' }}>+</button>
                                                </div>

                                                {product.enableBulkEnquiry && quantities[product.id] > product.bulkThreshold ? (
                                                    <button
                                                        className={styles.hoverCartBtn}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedProductForBulk(product);
                                                            setBulkModalOpen(true);
                                                        }}
                                                        style={{ backgroundColor: '#4b5563', color: 'white' }}
                                                    >
                                                        <span>Submit Bulk Enquiry</span>
                                                    </button>
                                                ) : settings?.purchaseMode === 'Order via WhatsApp' ? (
                                                    <button
                                                        className={styles.hoverCartBtn}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleWhatsAppOrder(product);
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
                                                            handleAddToCart(product);
                                                        }}
                                                    >
                                                        <span>Add to Cart</span>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <div className={styles.productInfo}>
                                            <Link href={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                <h3 className={styles.productTitle}>{product.productName}</h3>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                                    <span className={styles.productPrice} style={{ marginBottom: 0 }}>₹{product.price?.toLocaleString('en-IN')}</span>
                                                    {product.discountPercentage > 0 && <span style={{ color: '#059669', fontSize: '0.9rem', fontWeight: 'bold' }}>({product.discountPercentage}% OFF)</span>}
                                                </div>
                                                <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                                    {product.shortDescription || product.categoryId}
                                                </p>
                                            </Link>
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