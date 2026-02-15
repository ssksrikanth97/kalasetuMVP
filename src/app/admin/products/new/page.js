
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
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (!image) {
            setError("Please upload a product image.");
            setLoading(false);
            return;
        }

        try {
            // Upload image to Firebase Storage
            const storageRef = ref(storage, `products/${Date.now()}_${image.name}`);
            const snapshot = await uploadBytes(storageRef, image);
            const imageUrl = await getDownloadURL(snapshot.ref);

            // Add product to Firestore
            await addDoc(collection(db, 'products'), {
                name,
                description,
                price: parseFloat(price),
                category,
                stock: parseInt(stock),
                imageUrl,
                createdAt: serverTimestamp()
            });

            router.push('/admin/products');
        } catch (err) {
            setError('Failed to add product.');
            console.error(err);
        } finally {
            setLoading(false);
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
                        <p>Fill in the details to add a new product to your store.</p>
                    </div>
                </header>

                <div className={styles.contentCard}>
                    <form onSubmit={handleAddProduct}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Product Name</label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={styles.inputField}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="description">Product Description</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className={styles.inputField}
                                rows="4"
                                required
                            ></textarea>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="price">Price</label>
                            <input
                                id="price"
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className={styles.inputField}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="category">Category</label>
                            <input
                                id="category"
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className={styles.inputField}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="stock">Stock</label>
                            <input
                                id="stock"
                                type="number"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                className={styles.inputField}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="image">Product Image</label>
                            <input
                                id="image"
                                type="file"
                                onChange={handleImageChange}
                                className={styles.inputField}
                                required
                            />
                        </div>

                        {error && <p className="error" style={{ marginTop: '1rem', color: 'red' }}>{error}</p>}

                        <div className={styles.formActions}>
                            <button type="submit" className="btn-primary" disabled={loading}>
                                {loading ? 'Adding...' : 'Add Product'}
                            </button>
                            <Link href="/admin/products">
                                <button type="button" className="btn-secondary">Cancel</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
