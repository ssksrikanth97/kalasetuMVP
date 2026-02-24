'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { collection, doc, getDoc, getDocs, query, where, documentId } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useStoreSettings } from '@/context/StoreSettingsContext';
import Toast from '@/components/Toast';
import BulkEnquiryModal from '@/components/BulkEnquiryModal';

export default function EventDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const { addToCart } = useCart();
    const { settings } = useStoreSettings();

    const [event, setEvent] = useState(null);
    const [mappedProducts, setMappedProducts] = useState([]); // Array of product objects mixed with mapping data
    const [loading, setLoading] = useState(true);

    const [quantities, setQuantities] = useState({});
    const [toastMessage, setToastMessage] = useState('');
    const [bulkModalOpen, setBulkModalOpen] = useState(false);
    const [selectedProductForBulk, setSelectedProductForBulk] = useState(null);

    useEffect(() => {
        const fetchEventAndProducts = async () => {
            if (!id) return;
            try {
                const docRef = doc(db, 'events', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const eventData = { id: docSnap.id, ...docSnap.data() };
                    setEvent(eventData);

                    if (eventData.mappedProducts && eventData.mappedProducts.length > 0) {
                        // Fetch the actual product documents
                        const productIds = eventData.mappedProducts.map(p => p.productId);
                        // Due to firestore 'in' query limit of 10, chunking might be needed if there are many products. 
                        // Assuming < 10 related products per event for the MVP.
                        if (productIds.length <= 10) {
                            const productsQuery = query(collection(db, 'products'), where(documentId(), 'in', productIds));
                            const productsSnap = await getDocs(productsQuery);
                            const productsList = productsSnap.docs.map(d => ({ id: d.id, ...d.data() }));

                            // Merge the product details with the mapping details
                            const merged = eventData.mappedProducts.map(mapping => {
                                const prodDetails = productsList.find(p => p.id === mapping.productId);
                                return prodDetails ? { ...prodDetails, ...mapping } : null;
                            }).filter(p => p !== null);

                            setMappedProducts(merged);
                        }
                    }
                } else {
                    console.error("No such event!");
                }
            } catch (error) {
                console.error("Error fetching event:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEventAndProducts();
    }, [id]);

    const updateQuantity = (productId, delta) => {
        setQuantities(prev => {
            const current = prev[productId] || 1;
            const newQty = Math.max(1, current + delta);
            return { ...prev, [productId]: newQty };
        });
    };

    const handleAddToCart = (product) => {
        const qty = quantities[product.id] || 1;
        // Apply discount if mapped
        const priceToUse = product.discount > 0 ? product.price * (1 - product.discount / 100) : product.price;
        // In a real app we might pass quantity to addToCart, assuming standard for MVP
        addToCart({ ...product, price: priceToUse });
        setToastMessage(`Added ${qty} ${product.productName || product.name} to cart`);
        setTimeout(() => setToastMessage(''), 3000);
    };

    const handleWhatsAppOrder = (product) => {
        const qty = quantities[product.id] || 1;
        const priceToUse = product.discount > 0 ? product.price * (1 - product.discount / 100) : product.price;

        let message = settings?.whatsappMessageTemplate || 'Hi, I want to order {ProductName}. Quantity: {Quantity}. Price: {Price}. Product Link: {Link}';
        const productLink = `${window.location.origin}/events/${id}`;

        message = message.replace('{ProductName}', product.productName || product.name || 'Item');
        message = message.replace('{Quantity}', qty);
        message = message.replace('{Price}', `₹${(priceToUse * qty).toLocaleString('en-IN')}`);
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
                    Loading event details...
                </div>
            </div>
        );
    }

    if (!event) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Navbar />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <h2 style={{ marginBottom: '1rem' }}>Event not found</h2>
                    <Link href="/">
                        <button className="btn-primary">Return Home</button>
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
                    gridTemplateColumns: '1fr',
                    gap: '2rem',
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                }}>
                    {/* Hero Image Section */}
                    <div style={{ position: 'relative', height: '400px', width: '100%' }}>
                        <Image
                            src={event.imageUrl || defaultImage}
                            alt={event.name}
                            fill
                            style={{ objectFit: 'cover' }}
                            onError={(e) => e.target.src = defaultImage} // Fallback handled by parent usually but Image component handles it differently
                        />
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                            padding: '2rem',
                            color: 'white'
                        }}>
                            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>{event.name}</h1>
                            {event.category && (
                                <span style={{
                                    backgroundColor: 'var(--color-gold)',
                                    color: 'black',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '999px',
                                    fontSize: '0.85rem',
                                    fontWeight: '600',
                                    textTransform: 'uppercase'
                                }}>
                                    {event.category}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Content Section */}
                    <div style={{ padding: '0 2rem 2rem', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>

                        {/* Left Column: Description & Artists */}
                        <div>
                            <div style={{ marginBottom: '2rem' }}>
                                <h3 style={{ color: 'var(--color-maroon)', marginBottom: '1rem', borderBottom: '2px solid #eee', paddingBottom: '0.5rem' }}>About the Event</h3>
                                <p style={{ lineHeight: '1.7', color: 'var(--color-text-secondary)', whiteSpace: 'pre-line' }}>
                                    {event.description || "No description provided."}
                                </p>
                            </div>

                            {event.artists && event.artists.length > 0 && (
                                <div>
                                    <h3 style={{ color: 'var(--color-maroon)', marginBottom: '1rem', borderBottom: '2px solid #eee', paddingBottom: '0.5rem' }}>Performing Artists</h3>
                                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                        {event.artists.map((artist, idx) => (
                                            <div key={idx} style={{
                                                backgroundColor: '#f9fafb',
                                                padding: '0.75rem 1.25rem',
                                                borderRadius: '8px',
                                                border: '1px solid #e5e7eb',
                                                fontWeight: '500'
                                            }}>
                                                {artist}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column: Key Details Sidebar */}
                        <div style={{
                            backgroundColor: '#fff',
                            border: '1px solid #eee',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            height: 'fit-content',
                            position: 'sticky',
                            top: '2rem',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                        }}>
                            <h3 style={{ marginBottom: '1.5rem' }}>Event Details</h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <span style={{ fontSize: '1.25rem' }}>📅</span>
                                    <div>
                                        <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Date & Time</p>
                                        <p style={{ color: '#666' }}>
                                            {event.date ? new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) : 'TBA'}
                                        </p>
                                        {event.time && <p style={{ color: '#666' }}>{event.time}</p>}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <span style={{ fontSize: '1.25rem' }}>📍</span>
                                    <div>
                                        <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Location</p>
                                        <p style={{ color: '#666' }}>{event.location || 'Online / TBA'}</p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <span style={{ fontSize: '1.25rem' }}>🎟️</span>
                                    <div>
                                        <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Ticket Price</p>
                                        <p style={{ fontSize: '1.25rem', color: 'var(--color-maroon)', fontWeight: '700' }}>
                                            {event.price > 0 ? `₹${event.price.toLocaleString('en-IN')}` : 'Free'}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    className="btn-primary"
                                    style={{ width: '100%', marginTop: '1rem', padding: '1rem', display: 'none' }}
                                    onClick={() => alert("Booking functionality coming soon!")}
                                >
                                    Book Tickets
                                </button>
                            </div>
                        </div>

                    </div>

                    {/* Mapped Products Section */}
                    {mappedProducts.length > 0 && (
                        <div style={{ padding: '2rem', borderTop: '1px solid #eee', backgroundColor: '#fafafa' }}>
                            <h3 style={{ color: 'var(--color-maroon)', marginBottom: '1.5rem' }}>Event Essentials & Merchandise</h3>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                                gap: '1.5rem'
                            }}>
                                {mappedProducts.map((product) => {
                                    const qty = quantities[product.id] || 1;
                                    const discountedPrice = product.discount > 0 ? product.price * (1 - product.discount / 100) : product.price;

                                    return (
                                        <div key={product.id} style={{
                                            backgroundColor: 'white',
                                            borderRadius: '8px',
                                            overflow: 'hidden',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            position: 'relative'
                                        }}>
                                            {/* Tag */}
                                            <div style={{
                                                position: 'absolute',
                                                top: '10px',
                                                left: '10px',
                                                backgroundColor: product.type === 'Mandatory' ? '#ef4444' : product.type === 'Recommended' ? '#f59e0b' : '#3b82f6',
                                                color: 'white',
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '4px',
                                                fontSize: '0.75rem',
                                                fontWeight: 'bold',
                                                zIndex: 1
                                            }}>{product.type}</div>

                                            <Link href={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                <div style={{ position: 'relative', height: '150px' }}>
                                                    <Image
                                                        src={product.imageUrl || defaultImage}
                                                        alt={product.name || product.productName}
                                                        fill
                                                        style={{ objectFit: 'cover' }}
                                                    />
                                                </div>

                                                <div style={{ padding: '1rem 1rem 0', display: 'flex', flexDirection: 'column' }}>
                                                    <h4 style={{ marginBottom: '0.5rem', fontSize: '1rem', cursor: 'pointer' }}>{product.name || product.productName}</h4>
                                                </div>
                                            </Link>

                                            <div style={{ padding: '0 1rem 1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                                    <span style={{ fontWeight: 'bold', color: 'var(--color-maroon)', fontSize: '1.1rem' }}>
                                                        ₹{discountedPrice.toLocaleString('en-IN')}
                                                    </span>
                                                    {product.discount > 0 && (
                                                        <>
                                                            <span style={{ textDecoration: 'line-through', color: '#9ca3af', fontSize: '0.9rem' }}>
                                                                ₹{product.price.toLocaleString('en-IN')}
                                                            </span>
                                                            <span style={{ color: '#059669', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                                                (-{product.discount}%)
                                                            </span>
                                                        </>
                                                    )}
                                                </div>

                                                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        border: '1px solid #e5e7eb',
                                                        borderRadius: '6px',
                                                        overflow: 'hidden',
                                                        marginBottom: '0.5rem'
                                                    }}>
                                                        <button
                                                            style={{ padding: '0.4rem 0.8rem', background: '#f9fafb', border: 'none', cursor: 'pointer', borderRight: '1px solid #e5e7eb' }}
                                                            onClick={() => updateQuantity(product.id, -1)}
                                                        >-</button>
                                                        <span style={{ padding: '0 1rem', fontWeight: '600' }}>{qty}</span>
                                                        <button
                                                            style={{ padding: '0.4rem 0.8rem', background: '#f9fafb', border: 'none', cursor: 'pointer', borderLeft: '1px solid #e5e7eb' }}
                                                            onClick={() => updateQuantity(product.id, 1)}
                                                        >+</button>
                                                    </div>

                                                    {product.enableBulkEnquiry && qty > product.bulkThreshold ? (
                                                        <button
                                                            className="btn-primary"
                                                            onClick={() => {
                                                                setSelectedProductForBulk(product);
                                                                setBulkModalOpen(true);
                                                            }}
                                                            style={{ background: '#4b5563', borderColor: '#4b5563', width: '100%', fontSize: '0.9rem', padding: '0.6rem' }}
                                                        >
                                                            Submit Bulk Enquiry
                                                        </button>
                                                    ) : settings?.purchaseMode === 'Order via WhatsApp' ? (
                                                        <button
                                                            className="btn-primary"
                                                            onClick={() => handleWhatsAppOrder(product)}
                                                            style={{ background: '#25D366', borderColor: '#25D366', width: '100%', fontSize: '0.9rem', padding: '0.6rem' }}
                                                        >
                                                            WhatsApp Order
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="btn-primary"
                                                            onClick={() => handleAddToCart(product)}
                                                            style={{ width: '100%', fontSize: '0.9rem', padding: '0.6rem' }}
                                                        >
                                                            Add to Cart
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Toast Notification */}
            {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage('')} />}

            {/* Bulk Enquiry Modal */}
            <BulkEnquiryModal
                isOpen={bulkModalOpen}
                onClose={() => { setBulkModalOpen(false); setSelectedProductForBulk(null); }}
                product={selectedProductForBulk}
                quantity={selectedProductForBulk ? quantities[selectedProductForBulk.id] || 1 : 0}
                onSuccess={() => {
                    setToastMessage('Bulk enquiry submitted successfully!');
                    setTimeout(() => setToastMessage(''), 3000);
                }}
            />
        </div>
    );
}
