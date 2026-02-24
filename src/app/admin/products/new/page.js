'use client';
import Link from 'next/link';
import styles from '../../dashboard/admin.module.css';
import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase/firebase';
import { useRouter } from 'next/navigation';

export default function AddProduct() {
    const router = useRouter();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');
    const [enableBulkEnquiry, setEnableBulkEnquiry] = useState(false);
    const [bulkThreshold, setBulkThreshold] = useState('');
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
                enableBulkEnquiry,
                bulkThreshold: enableBulkEnquiry ? parseInt(bulkThreshold) : null,
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

                    <div className={styles.formGroup} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', marginBottom: '1rem' }}>
                        <input
                            id="enableBulkEnquiry"
                            type="checkbox"
                            checked={enableBulkEnquiry}
                            onChange={(e) => setEnableBulkEnquiry(e.target.checked)}
                            style={{ width: '20px', height: '20px' }}
                        />
                        <label htmlFor="enableBulkEnquiry" style={{ margin: 0 }}>Enable Bulk Order Enquiry</label>
                    </div>

                    {enableBulkEnquiry && (
                        <div className={styles.formGroup}>
                            <label htmlFor="bulkThreshold">Bulk Threshold Quantity</label>
                            <input
                                id="bulkThreshold"
                                type="number"
                                value={bulkThreshold}
                                onChange={(e) => setBulkThreshold(e.target.value)}
                                className={styles.inputField}
                                required
                                placeholder="e.g. 10"
                            />
                            <small style={{ color: '#6b7280', display: 'block', marginTop: '0.5rem' }}>
                                If a user selects more than this quantity, they will be prompted to submit a bulk enquiry.
                            </small>
                        </div>
                    )}
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
    );
}
