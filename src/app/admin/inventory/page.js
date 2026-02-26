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
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('newest');
    const [stockFilter, setStockFilter] = useState('all');

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

    const filteredProducts = products.filter(p => {
        // Search Filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const matchesName = p.productName?.toLowerCase().includes(query);
            const matchesSku = p.skuCode?.toLowerCase().includes(query);
            if (!matchesName && !matchesSku) return false;
        }

        // Stock Filter
        if (stockFilter === 'in-stock' && p.stockQuantity <= 0) return false;
        if (stockFilter === 'out-of-stock' && p.stockQuantity > 0) return false;
        if (stockFilter === 'low-stock' && (p.stockQuantity <= 0 || p.stockQuantity >= 5)) return false;

        return true;
    }).sort((a, b) => {
        if (sortOption === 'newest') return (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0);
        if (sortOption === 'oldest') return (a.createdAt?.toMillis?.() || 0) - (b.createdAt?.toMillis?.() || 0);
        if (sortOption === 'price-low') return (a.price || 0) - (b.price || 0);
        if (sortOption === 'price-high') return (b.price || 0) - (a.price || 0);
        if (sortOption === 'stock-low') return (a.stockQuantity || 0) - (b.stockQuantity || 0);
        if (sortOption === 'stock-high') return (b.stockQuantity || 0) - (a.stockQuantity || 0);
        return 0;
    });

    return (
        <main className={styles.mainContent}>
            <header className={styles.header}>
                <div className={styles.titleGroup}>
                    <h1>Inventory Management</h1>
                    <p>Track products, prices, and stock levels.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Link href="/admin/inventory/categories">
                        <button className="btn-secondary" style={{ padding: '0.75rem 1.25rem', fontSize: '0.9rem' }}>Manage Categories</button>
                    </Link>
                    <Link href="/admin/inventory/new">
                        <button className="btn-primary" style={{ padding: '0.75rem 1.25rem', fontSize: '0.9rem' }}>+ Add Product</button>
                    </Link>
                </div>
            </header>

            <div className={styles.contentCard} style={{ marginBottom: '1.5rem', padding: '1rem 1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ flex: '1 1 300px' }}>
                    <input
                        type="text"
                        placeholder="Search products by Name or SKU..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.input}
                        style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: '6px', border: '1px solid #d1d5db' }}
                    />
                </div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <select
                        value={stockFilter}
                        onChange={(e) => setStockFilter(e.target.value)}
                        className={styles.select}
                        style={{ padding: '0.6rem 2rem 0.6rem 1rem', borderRadius: '6px', border: '1px solid #d1d5db', background: 'white', minWidth: '150px' }}
                    >
                        <option value="all">All Stock Status</option>
                        <option value="in-stock">In Stock</option>
                        <option value="out-of-stock">Out of Stock</option>
                        <option value="low-stock">Low Stock (&lt; 5)</option>
                    </select>

                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className={styles.select}
                        style={{ padding: '0.6rem 2rem 0.6rem 1rem', borderRadius: '6px', border: '1px solid #d1d5db', background: 'white', minWidth: '150px' }}
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="stock-low">Stock: Low to High</option>
                        <option value="stock-high">Stock: High to Low</option>
                    </select>
                </div>
            </div>

            <div className={styles.contentCard}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>Product List ({filteredProducts.length})</h2>
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
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: 'center', padding: '2rem' }}>Loading products...</td>
                                </tr>
                            ) : filteredProducts.length > 0 ? (
                                filteredProducts.map(p => (
                                    <tr key={p.id}>
                                        <td>
                                            {p.mainImage ? (
                                                <Image src={p.mainImage} alt={p.productName} width={40} height={40} style={{ objectFit: 'cover', borderRadius: '4px' }} />
                                            ) : (
                                                <div style={{ width: '40px', height: '40px', background: '#eee', borderRadius: '4px' }}></div>
                                            )}
                                        </td>
                                        <td style={{ fontWeight: 500 }}>{p.productName}</td>
                                        <td>{p.categoryId || 'N/A'} {p.subCategory ? `(${p.subCategory})` : ''}</td>
                                        <td>{p.skuCode || p.id?.substring(0, 8)}</td>
                                        <td>₹{p.price?.toLocaleString('en-IN')}</td>
                                        <td>
                                            <span style={{ color: p.stockQuantity < 5 && p.stockQuantity > 0 ? '#d97706' : p.stockQuantity <= 0 ? '#dc2626' : 'inherit', fontWeight: p.stockQuantity < 5 ? 'bold' : 'normal' }}>
                                                {p.stockQuantity}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`${styles.statusBadge} ${p.stockQuantity > 0 ? styles.statusApproved : styles.statusPending}`}>
                                                {p.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                                            </span>
                                        </td>
                                        <td>
                                            <Link href={`/admin/inventory/edit?id=${p.id}`}>
                                                <button className={styles.actionButton}>Edit</button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
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
    );
}
