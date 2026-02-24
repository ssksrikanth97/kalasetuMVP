'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
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

    const [quantity, setQuantity] = useState(1);
    const [toastMessage, setToastMessage] = useState('');
    const [bulkModalOpen, setBulkModalOpen] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            try {
                const docRef = doc(db, 'products', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProduct({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.error("No such product!");
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const updateQuantity = (delta) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    const handleAddToCart = () => {
        // Calling addToCart quantity times or adapting it if it takes a quantity arg
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        setToastMessage(`Added ${quantity} ${product.productName || product.name} to cart`);
        setTimeout(() => setToastMessage(''), 3000);
    };

    const handleWhatsAppOrder = () => {
        let message = settings?.whatsappMessageTemplate || 'Hi, I want to order {ProductName}. Quantity: {Quantity}. Price: {Price}. Product Link: {Link}';
        const productLink = window.location.href;

        message = message.replace('{ProductName}', product.productName || product.name || 'Item');
        message = message.replace('{Quantity}', quantity);
        message = message.replace('{Price}', `₹${(product.price * quantity).toLocaleString('en-IN')}`);
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

            <main className="container" style={{ padding: '2rem 1rem 4rem' }}>
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
                        fontSize: '1rem'
                    }}
                >
                    ← Back
                </button>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)',
                    gap: '3rem',
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '2rem',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                }}>
                    {/* Image Section */}
                    <div style={{ position: 'relative', height: '400px', width: '100%', borderRadius: '12px', overflow: 'hidden' }}>
                        <Image
                            src={product.mainImage || defaultImage}
                            alt={product.productName}
                            fill
                            style={{ objectFit: 'cover' }}
                            onError={(e) => e.target.src = defaultImage}
                        />
                    </div>

                    {/* Content Section */}
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            {product.categoryId}
                        </p>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-text-primary)' }}>
                            {product.productName}
                        </h1>

                        <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'var(--color-maroon)', marginBottom: '1.5rem' }}>
                            ₹{product.price?.toLocaleString('en-IN')}
                        </div>

                        <p style={{ lineHeight: '1.7', color: 'var(--color-text-secondary)', marginBottom: '2rem', whiteSpace: 'pre-line' }}>
                            {product.description || product.shortDescription || "No detailed description provided."}
                        </p>

                        {/* Purchase Actions */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: 'auto' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span style={{ fontWeight: '500' }}>Quantity:</span>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '6px',
                                    overflow: 'hidden',
                                    background: '#f9fafb'
                                }}>
                                    <button
                                        style={{ padding: '0.5rem 1rem', background: 'none', border: 'none', cursor: 'pointer', borderRight: '1px solid #e5e7eb', fontSize: '1.2rem' }}
                                        onClick={() => updateQuantity(-1)}
                                    >-</button>
                                    <span style={{ padding: '0 1.5rem', fontWeight: '600' }}>{quantity}</span>
                                    <button
                                        style={{ padding: '0.5rem 1rem', background: 'none', border: 'none', cursor: 'pointer', borderLeft: '1px solid #e5e7eb', fontSize: '1.2rem' }}
                                        onClick={() => updateQuantity(1)}
                                    >+</button>
                                </div>
                            </div>

                            <div style={{ marginTop: '1rem' }}>
                                {product.enableBulkEnquiry && quantity > product.bulkThreshold ? (
                                    <button
                                        className="btn-primary"
                                        onClick={() => setBulkModalOpen(true)}
                                        style={{ background: '#4b5563', borderColor: '#4b5563', width: '100%', padding: '1rem', fontSize: '1.1rem' }}
                                    >
                                        Submit Bulk Enquiry
                                    </button>
                                ) : settings?.purchaseMode === 'Order via WhatsApp' ? (
                                    <button
                                        className="btn-primary"
                                        onClick={handleWhatsAppOrder}
                                        style={{ background: '#25D366', borderColor: '#25D366', width: '100%', padding: '1rem', fontSize: '1.1rem' }}
                                    >
                                        Order via WhatsApp
                                    </button>
                                ) : (
                                    <button
                                        className="btn-primary"
                                        onClick={handleAddToCart}
                                        style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
                                    >
                                        Add to Cart
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
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
