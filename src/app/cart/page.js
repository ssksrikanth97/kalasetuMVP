'use client';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useStoreSettings } from '@/context/StoreSettingsContext';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { db } from '@/lib/firebase/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from './cart.module.css';

export default function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const { settings } = useStoreSettings();
    const router = useRouter();
    const tax = cartTotal * 0.18; // 18% GST example
    const totalAmount = cartTotal + tax;

    useEffect(() => {
        if (settings && !settings.loading) {
            if (settings.purchaseMode === 'Order via WhatsApp') {
                router.push('/shop');
            }
        }
    }, [settings, router]);

    const handleCheckout = async () => {
        if (!user) {
            alert("Please login to checkout.");
            router.push('/auth/login?redirect=/cart');
            return;
        }

        try {
            // Extract unique artist IDs from cart items for easier querying
            // Fallback to empty string if createdBy is missing to avoid null/undefined issues
            const artistIds = [...new Set(cartItems.map(item => item.createdBy).filter(Boolean))];

            const orderData = {
                customerId: user.uid,
                customerName: user.displayName || user.email,
                items: cartItems,
                amount: totalAmount,
                status: 'Paid', // Simulating successful payment
                artistIds: artistIds,
                createdAt: serverTimestamp(),
            };

            const docRef = await addDoc(collection(db, 'orders'), orderData);
            console.log("Order written with ID: ", docRef.id);

            alert(`Order placed successfully! Order ID: ${docRef.id}`);
            clearCart();
            router.push('/customer/dashboard');

        } catch (e) {
            console.error("Error adding document: ", e);
            alert("Checkout failed: " + e.message);
        }
    };

    return (
        <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <div className={styles.cartContainer}>
                <h1 className={styles.title}>Your Cart</h1>

                {cartItems.length === 0 ? (
                    <div className={styles.emptyCart}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-maroon)' }}>Your cart is empty!</h2>
                        <p style={{ marginBottom: '2rem' }}>Looks like you haven't added any items yet.</p>
                        <Link href="/shop" className={styles.emptyLink}>Browse our Shop</Link>
                    </div>
                ) : (
                    <div className={styles.content}>
                        {/* Cart Items List */}
                        <div className={styles.itemsList}>
                            {cartItems.map((item) => (
                                <div key={item.id} className={styles.itemCard}>
                                    <div className={styles.itemImage}>
                                        <img
                                            src={item.mainImage || "https://placehold.co/100"}
                                            alt={item.productName}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                                        />
                                    </div>
                                    <div className={styles.itemDetails}>
                                        <h3 className={styles.itemName}>{item.productName}</h3>
                                        <p className={styles.itemType}>{item.categoryId}</p>
                                        <p className={styles.itemPrice}>₹{item.price.toLocaleString('en-IN')}</p>
                                        <button
                                            className={styles.removeBtn}
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                    <div className={styles.quantityControls}>
                                        <button
                                            className={styles.qtyBtn}
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            −
                                        </button>
                                        <span className={styles.qtyValue}>{item.quantity}</span>
                                        <button
                                            className={styles.qtyBtn}
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className={styles.summary}>
                            <h2 className={styles.summaryTitle}>Order Summary</h2>
                            <div className={styles.summaryRow}>
                                <span>Subtotal</span>
                                <span>₹{cartTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span>GST (18%)</span>
                                <span>₹{tax.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                            </div>
                            <div className={styles.totalRow}>
                                <span>Total</span>
                                <span>₹{totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                            </div>
                            <button
                                className={styles.checkoutBtn}
                                onClick={handleCheckout}
                            >
                                Process Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
