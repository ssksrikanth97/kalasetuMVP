'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc, collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useStoreSettings } from '@/context/StoreSettingsContext';
import Toast from '@/components/Toast';
import BulkEnquiryModal from '@/components/BulkEnquiryModal';

export default function ProductDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const { addToCart } = useCart();
    const { settings } = useStoreSettings();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(null);
    const [randomProducts, setRandomProducts] = useState([]);

    const [quantity, setQuantity] = useState(1);
    const [toastMessage, setToastMessage] = useState('');
    const [bulkModalOpen, setBulkModalOpen] = useState(false);
    const [selectedVariants, setSelectedVariants] = useState({});

    useEffect(() => {
        const fetchProductAndRecommendations = async () => {
            if (!id) return;
            try {
                const docRef = doc(db, 'products', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    let data = { id: docSnap.id, ...docSnap.data() };

                    // Defensively generate IDs for variants missing them
                    if (data.variants && Array.isArray(data.variants)) {
                        data.variants = data.variants.map((v, i) => ({ ...v, id: v.id || `v-${i}` }));
                    }

                    setProduct(data);
                    setActiveImage(data.mainImage);

                    // Fetch some random products for "You May Also Like"
                    // In a real scenario, this might use an index or specific recommendations.
                    // For now, grabbing 10 and picking 4 random ones.
                    const productsRef = collection(db, 'products');
                    const q = query(productsRef, limit(10));
                    const querySnapshot = await getDocs(q);

                    let fetchedProducts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    // Exclude current product
                    fetchedProducts = fetchedProducts.filter(p => p.id !== id);
                    // Shuffle and take 4
                    fetchedProducts = fetchedProducts.sort(() => 0.5 - Math.random()).slice(0, 4);
                    setRandomProducts(fetchedProducts);

                } else {
                    console.error("No such product!");
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductAndRecommendations();
    }, [id]);

    const updateQuantity = (delta) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    useEffect(() => {
        if (product?.variants?.length > 0) {
            const initialSelections = {};
            const grouped = product.variants.reduce((acc, variant) => {
                if (!acc[variant.type]) acc[variant.type] = [];
                acc[variant.type].push(variant);
                return acc;
            }, {});

            Object.keys(grouped).forEach(type => {
                initialSelections[type] = grouped[type][0]; // default to first option
            });
            setSelectedVariants(initialSelections);
        }
    }, [product]);

    const handleVariantChange = (type, variantId) => {
        const variant = product?.variants?.find(v => v.id === variantId);
        if (variant) {
            setSelectedVariants(prev => ({ ...prev, [type]: variant }));
        }
    };

    const groupedVariants = product?.variants?.reduce((acc, variant) => {
        if (!acc[variant.type]) acc[variant.type] = [];
        acc[variant.type].push(variant);
        return acc;
    }, {}) || {};

    const activeExtraPrice = Object.values(selectedVariants).reduce((sum, v) => sum + (Number(v?.extraPrice) || 0), 0);
    const finalPrice = (product?.price || 0) + activeExtraPrice;

    const handleAddToCart = () => {
        const variantString = Object.values(selectedVariants).map(v => `${v.type}: ${v.value}`).join(' | ');
        const cartItemProduct = {
            ...product,
            price: finalPrice,
            productName: variantString ? `${product.productName} (${variantString})` : product.productName,
            selectedVariants
        };

        for (let i = 0; i < quantity; i++) {
            addToCart(cartItemProduct);
        }
        setToastMessage(`Added ${quantity} ${product.productName || product.name} to cart`);
        setTimeout(() => setToastMessage(''), 3000);
    };

    const handleWhatsAppOrder = () => {
        const variantString = Object.values(selectedVariants).map(v => `${v.type}: ${v.value}`).join(', ');
        const displayedName = variantString ? `${product.productName || product.name || 'Item'} (${variantString})` : (product.productName || product.name || 'Item');

        let message = settings?.whatsappMessageTemplate || 'Hi, I want to order {ProductName}. Quantity: {Quantity}. Price: {Price}. Product Link: {Link}';
        const productLink = window.location.href;

        message = message.replace('{ProductName}', displayedName);
        message = message.replace('{Quantity}', quantity);
        message = message.replace('{Price}', `₹${(finalPrice * quantity).toLocaleString('en-IN')}`);
        message = message.replace('{Link}', productLink);

        const waUrl = `https://wa.me/${settings?.whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(waUrl, '_blank');
    };

    const defaultImage = "https://images.unsplash.com/photo-1524230659092-07f99a75c013?q=80&w=1000&auto=format&fit=crop";

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Navbar />
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--color-maroon)' }}>
                    Loading product details...
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Navbar />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <h2 style={{ marginBottom: '1rem' }}>Product not found</h2>
                    <Link href="/shop">
                        <button className="btn-primary">Return to Shop</button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#fdfbf7' }}>
            <Navbar />

            <main className="container" style={{ padding: '2rem 1rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-text-secondary)',
                        marginBottom: '1.5rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.95rem',
                        fontWeight: 500
                    }}
                >
                    ← Back to search results
                </button>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '3rem',
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '2rem',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1.5fr) minmax(300px, 1fr)', gap: '3rem' }}>

                        {/* LEFT COLUMN: Gallery */}
                        <div style={{ display: 'flex', gap: '1rem', height: '500px' }}>
                            {/* Vertical Thumbnails */}
                            {[product.mainImage, product.sideImage, product.backImage, product.dimensionsImage].filter(Boolean).length > 1 && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', overflowY: 'auto', paddingRight: '0.5rem', width: '80px', flexShrink: 0, scrollbarWidth: 'none' }}>
                                    {[product.mainImage, product.sideImage, product.backImage, product.dimensionsImage].filter(Boolean).map((imgUrl, index) => (
                                        <div
                                            key={index}
                                            onClick={() => setActiveImage(imgUrl)}
                                            style={{
                                                position: 'relative',
                                                width: '100%',
                                                aspectRatio: '1/1',
                                                borderRadius: '8px',
                                                overflow: 'hidden',
                                                cursor: 'pointer',
                                                border: activeImage === imgUrl ? '2px solid var(--color-maroon)' : '1px solid #e5e7eb',
                                                opacity: activeImage === imgUrl ? 1 : 0.6,
                                                transition: 'all 0.2s',
                                            }}
                                        >
                                            <Image
                                                src={imgUrl}
                                                alt={`${product.productName} view ${index + 1}`}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Main Large Image */}
                            <div style={{ position: 'relative', flex: 1, borderRadius: '12px', overflow: 'hidden', backgroundColor: '#f9fafb' }}>
                                <Image
                                    src={activeImage || defaultImage}
                                    alt={product.productName}
                                    fill
                                    style={{ objectFit: 'contain' }}
                                    onError={(e) => e.target.src = defaultImage}
                                />
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Content */}
                        <div style={{ display: 'flex', flexDirection: 'column' }}>

                            <h1 style={{ fontSize: '1.75rem', fontWeight: '400', marginBottom: '0.5rem', color: 'var(--color-text-primary)', lineHeight: 1.3 }}>
                                {product.productName}
                            </h1>

                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span>Category: </span>
                                <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>{product.categoryId}</span>
                            </p>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                                    <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
                                        ₹{finalPrice.toLocaleString('en-IN')}
                                    </span>
                                    {product.discountPercentage > 0 && (
                                        <span style={{ color: '#059669', fontSize: '1rem', fontWeight: '600' }}>
                                            {product.discountPercentage}% off
                                        </span>
                                    )}
                                </div>
                                <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: '0.25rem 0 0 0' }}>Local taxes included (where applicable)</p>
                            </div>

                            {/* Options/Variants */}
                            {Object.keys(groupedVariants).length > 0 && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                                    {Object.keys(groupedVariants).map(type => (
                                        <div key={type} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <label style={{ fontWeight: '600', fontSize: '0.95rem', color: 'var(--color-text-primary)' }}>{type}</label>
                                            <select
                                                value={selectedVariants[type]?.id || ''}
                                                onChange={(e) => handleVariantChange(type, e.target.value)}
                                                style={{ padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #d1d5db', background: 'white', cursor: 'pointer', outline: 'none', fontSize: '1rem', width: '100%', appearance: 'none' }}
                                            >
                                                {groupedVariants[type].map(variant => (
                                                    <option key={variant.id} value={variant.id}>
                                                        {variant.value}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Quantity */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
                                <label style={{ fontWeight: '600', fontSize: '0.95rem', color: 'var(--color-text-primary)' }}>Quantity</label>
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    background: 'white',
                                    width: 'fit-content'
                                }}>
                                    <button
                                        style={{ padding: '0.5rem 1rem', background: 'none', border: 'none', cursor: 'pointer', borderRight: '1px solid #d1d5db', fontSize: '1.2rem', color: '#4b5563' }}
                                        onClick={() => updateQuantity(-1)}
                                    >-</button>
                                    <span style={{ padding: '0 1.5rem', fontWeight: '500', minWidth: '3rem', textAlign: 'center' }}>{quantity}</span>
                                    <button
                                        style={{ padding: '0.5rem 1rem', background: 'none', border: 'none', cursor: 'pointer', borderLeft: '1px solid #d1d5db', fontSize: '1.2rem', color: '#4b5563' }}
                                        onClick={() => updateQuantity(1)}
                                    >+</button>
                                </div>
                            </div>

                            {/* Purchase Actions */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {product.enableBulkEnquiry && quantity > product.bulkThreshold ? (
                                    <button
                                        onClick={() => setBulkModalOpen(true)}
                                        style={{ background: 'white', border: '2px solid #222', color: '#222', width: '100%', padding: '1rem', fontSize: '1.1rem', fontWeight: 600, borderRadius: '30px', cursor: 'pointer', transition: 'all 0.2s' }}
                                        onMouseOver={e => { e.currentTarget.style.backgroundColor = '#f9fafb' }}
                                        onMouseOut={e => { e.currentTarget.style.backgroundColor = 'white' }}
                                    >
                                        Submit Bulk Enquiry
                                    </button>
                                ) : settings?.purchaseMode === 'Order via WhatsApp' ? (
                                    <button
                                        onClick={handleWhatsAppOrder}
                                        style={{ background: '#25D366', border: 'none', color: 'white', width: '100%', padding: '1rem', fontSize: '1.1rem', fontWeight: 600, borderRadius: '30px', cursor: 'pointer', boxShadow: '0 2px 4px rgba(37, 211, 102, 0.3)', transition: 'background 0.2s' }}
                                        onMouseOver={e => { e.currentTarget.style.backgroundColor = '#20bd5a' }}
                                        onMouseOut={e => { e.currentTarget.style.backgroundColor = '#25D366' }}
                                    >
                                        Order via WhatsApp
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleAddToCart}
                                        style={{ background: '#222', border: 'none', color: 'white', width: '100%', padding: '1rem', fontSize: '1.1rem', fontWeight: 600, borderRadius: '30px', cursor: 'pointer', transition: 'background 0.2s' }}
                                        onMouseOver={e => { e.currentTarget.style.backgroundColor = '#000' }}
                                        onMouseOut={e => { e.currentTarget.style.backgroundColor = '#222' }}
                                    >
                                        Add to basket
                                    </button>
                                )}
                            </div>

                            {/* Description Toggle (Etsy Style) */}
                            <div style={{ marginTop: '3rem', borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Item details</h3>
                                <p style={{ lineHeight: '1.7', color: 'var(--color-text-secondary)', whiteSpace: 'pre-line', fontSize: '0.95rem' }}>
                                    {product.description || product.shortDescription || "No detailed description provided."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* You May Also Like Section */}
                {randomProducts.length > 0 && (
                    <div style={{ marginTop: '5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', textAlign: 'center', color: 'var(--color-text-primary)' }}>You may also like</h2>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                            gap: '2rem'
                        }}>
                            {randomProducts.map((rp) => (
                                <Link href={`/products/${rp.id}`} key={rp.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div style={{ padding: '0.5rem', transition: 'transform 0.2s', cursor: 'pointer' }}
                                        onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                                        onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                                    >
                                        <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', borderRadius: '8px', overflow: 'hidden', marginBottom: '1rem', backgroundColor: '#f9fafb' }}>
                                            <Image
                                                src={rp.mainImage || defaultImage}
                                                alt={rp.productName || 'Product'}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                        <h4 style={{ fontSize: '1rem', fontWeight: 500, margin: '0 0 0.25rem 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {rp.productName}
                                        </h4>
                                        <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--color-maroon)' }}>
                                            ₹{rp.price?.toLocaleString('en-IN')}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            {/* Toast Notification */}
            {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage('')} />}

            {/* Bulk Enquiry Modal */}
            <BulkEnquiryModal
                isOpen={bulkModalOpen}
                onClose={() => setBulkModalOpen(false)}
                product={product}
                quantity={quantity}
                onSuccess={() => {
                    setToastMessage('Bulk enquiry submitted successfully!');
                    setTimeout(() => setToastMessage(''), 3000);
                }}
            />
        </div>
    );
}
