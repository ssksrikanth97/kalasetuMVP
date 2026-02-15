
'use client';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../dashboard/admin.module.css';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';

export default function AdminProducts() {
    const { logout } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const q = query(collection(db, 'products'));
            const querySnapshot = await getDocs(q);
            const list = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProducts(list);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const deleteProduct = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteDoc(doc(db, 'products', productId));
                fetchProducts();
            } catch (error) {
                console.error('Error deleting product: ', error);
                alert('Failed to delete product. Please try again.');
            }
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
                        <h1>Product Management</h1>
                        <p>Add, edit, and manage your products.</p>
                    </div>
                    <Link href="/admin/products/add">
                        <button className="btn-primary">+ Add Product</button>
                    </Link>
                </header>

                <div className={styles.contentCard}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Product List ({products.length})</h2>
                    </div>
                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Product ID</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>Loading products...</td>
                                    </tr>
                                ) : products.length > 0 ? (
                                    products.map(product => (
                                        <tr key={product.id}>
                                            <td>{product.id}</td>
                                            <td>{product.name}</td>
                                            <td>₹{product.price}</td>
                                            <td>{product.stock}</td>
                                            <td>
                                                <Link href={`/admin/products/edit/${product.id}`}>
                                                    <button className="btn-secondary">Edit</button>
                                                </Link>
                                                <button onClick={() => deleteProduct(product.id)} className="btn-danger" style={{ marginLeft: '0.5rem' }}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
                                            No products found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
