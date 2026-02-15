'use client';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../dashboard/admin.module.css';
import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import { useRouter } from 'next/navigation';

export default function AdminInventory() {
    const { logout } = useAuth();
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
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

        fetchProducts();
    }, []);

    const handleRowClick = (productId) => {
        router.push(`/admin/inventory/edit/${productId}`);
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
                    <Link href="/admin/inventory" className={`${styles.navItem} ${styles.navItemActive}`}>
                        <span className={styles.navIcon}>📦</span> Inventory
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
                        <h1>Inventory Management</h1>
                        <p>Track products, prices, and stock levels.</p>
                    </div>
                    <div>
                        <Link href="/admin/inventory/new">
                            <button className="btn-primary" style={{ padding: '0.75rem 1.25rem', fontSize: '0.9rem' }}>+ Add Product</button>
                        </Link>
                    </div>
                </header>

                <div className={styles.contentCard}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Product List ({products.length})</h2>
                    </div>
                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th style={{ width: '60px' }}>Image</th>
                                    <th>Product Name</th>
                                    <th>Category</th>
                                    <th>ID</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>Loading products...</td>
                                    </tr>
                                ) : products.length > 0 ? (
                                    products.map(p => (
                                        <tr key={p.id} onClick={() => router.push(`/admin/inventory/edit/${p.id}`)}
                                        className={styles.clickableRow}>
                                            <td>
                                                {p.mainImage ? (
                                                    <Image src={p.mainImage} alt={p.productName} width={40} height={40} style={{ objectFit: 'cover', borderRadius: '4px' }} />
                                                ) : (
                                                    <div style={{ width: '40px', height: '40px', background: '#eee', borderRadius: '4px' }}></div>
                                                )}
                                            </td>
                                            <td style={{ fontWeight: 500 }}>{p.productName}</td>
                                            <td>{p.categoryId?.replace('-', ' ')}</td>
                                            <td>{p.id?.replace('-', ' ')}</td>
                                            <td>₹{p.price?.toLocaleString('en-IN')}</td>
                                            <td>
                                                <span style={{ color: p.stockQuantity < 5 ? 'red' : 'inherit' }}>{p.stockQuantity}</span>
                                            </td>
                                            <td>
                                                <span className={`${styles.statusBadge} ${p.stockQuantity > 0 ? styles.statusApproved : styles.statusPending}`}>
                                                    {p.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                                                </span>
                                            </td>
                                            
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
                                            No products found.<br />
                                            <Link href="/admin/inventory/new" style={{ color: 'var(--color-maroon)', fontWeight: 600, marginTop: '1rem', display: 'inline-block' }}>Add your first product</Link>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
            <style jsx>{`
                tbody tr:hover {
                    background-color: #f9fafb;
                }
            `}</style>
        </div>
    );
}
