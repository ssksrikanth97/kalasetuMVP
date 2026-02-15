
'use client';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../dashboard/admin.module.css';
import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase/firebase';
import { useRouter } from 'next/navigation';

export default function AddProduct() {
    const { logout } = useAuth();
    const router = useRouter();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const addProduct = async (e) => {
        e.preventDefault();
        if (!name || !price || !stock || !image) {
            alert('Please fill in all required fields and select an image.');
            return;
        }
        setUploading(true);

        try {
            // Upload image to Firebase Storage
            const imageRef = ref(storage, `products/${Date.now()}_${image.name}`);
            const snapshot = await uploadBytes(imageRef, image);
            const imageUrl = await getDownloadURL(snapshot.ref);

            // Add product to Firestore
            await addDoc(collection(db, 'products'), {
                name,
                description,
                price: parseFloat(price),
                stock: parseInt(stock, 10),
                imageUrl,
                createdAt: serverTimestamp(),
            });

            alert('Product added successfully!');
            router.push('/admin/products');
        } catch (error) {
            console.error('Error adding product:', error);
            alert(`Failed to add product: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className={styles.dashboardContainer}>
            <aside className={styles.sidebar}>
                <div className={styles.logoContainer} style={{ padding: '0 1rem' }}>
                    <div style={{ position: 'relative', width: '100%', height: '40px' }}>
                        <Image
                            src="/logo.png"
                            alt="KalaSetu Admin"
                            fill
                            style={{ objectFit: 'contain', objectPosition: 'left' }}
                        />
                    </div>
                </div>
                <nav className={styles.navLinks}>
                    <Link href="/admin/dashboard" className={styles.navItem}>
                        <span className={styles.navIcon}>📊</span> Dashboard
                    </Link>
                    <Link href="/admin/users" className={styles.navItem}>
                        <span className={styles.navIcon}>👥</span> Users
                    </Link>
                    <Link href="/admin/products" className={`${styles.navItem} ${styles.navItemActive}`}>
                        <span className={styles.navIcon}>📦</span> Products
                    </Link>
                    <Link href="/admin/orders" className={styles.navItem}>
                        <span className={styles.navIcon}>🛍️</span> Orders
                    </Link>
                    <Link href="/admin/bookings" className={styles.navItem}>
                        <span className={styles.navIcon}>📅</span> Bookings
                    </Link>
                    <Link href="/" target="_blank" className={styles.navItem} style={{ marginTop: 'auto' }}>
                        <span className={styles.navIcon}>🌐</span> Live Site
                    </Link>
                    <button onClick={logout} className={styles.navItem} style={{ background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}>
                        <span className={styles.navIcon}>🚪</span> Logout
                    </button>
                </nav>
            </aside>

            <main className={styles.mainContent}>
                <header className={styles.header}>
                    <div className={styles.titleGroup}>
                        <h1>Add New Product</h1>
                        <p>Fill out the form to add a new product to the inventory.</p>
                    </div>
                    <Link href="/admin/products">
                        <button className="btn-secondary">Back to Products</button>
                    </Link>
                </header>

                <div className={styles.contentCard}>
                    <form onSubmit={addProduct} className={styles.formLayout}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Product Name</label>
                            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Hand-painted Saree" className={styles.inputField} required />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="description">Description</label>
                            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Detailed description of the product..." className={styles.inputField} rows="4"></textarea>
                        </div>
                        <div className={styles.formGrid}>
                            <div className={styles.formGroup}>
                                <label htmlFor="price">Price (₹)</label>
                                <input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g., 2500" className={styles.inputField} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="stock">Stock</label>
                                <input id="stock" type="number" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="e.g., 10" className={styles.inputField} required />
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="image">Product Image</label>
                            <input id="image" type="file" onChange={handleImageChange} className={styles.inputField} required />
                            {image && <p style={{ marginTop: '0.5rem' }}>Selected: {image.name}</p>}
                        </div>

                        <div className={styles.formActions}>
                            <button type="submit" className="btn-primary" disabled={uploading}>
                                {uploading ? 'Adding Product...' : 'Add Product'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
