'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { db, storage } from '@/lib/firebase/firebase';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Link from 'next/link';
import styles from '../new/product-form.module.css';

const CATEGORIES_DEFAULT = [
    { id: 'musical-instruments', name: 'Musical Instruments' },
    { id: 'classical-dance-items', name: 'Classical Dance Items' },
    { id: 'return-gifts', name: 'Return Gifts' },
    { id: 'mementos-awards', name: 'Mementos / Awards' },
    { id: 'traditional-wear', name: 'Traditional Wear' },
    { id: 'books', name: 'Books & Learning' }
];

function EditProductContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const productId = searchParams.get('id');

    const [loading, setLoading] = useState(false);
    const [productLoading, setProductLoading] = useState(true);
    const [imagePreview, setImagePreview] = useState(null);
    const [existingImageUrl, setExistingImageUrl] = useState('');
    const [formData, setFormData] = useState(null);
    const [newImageFile, setNewImageFile] = useState(null);

    useEffect(() => {
        if (!productId) return;

        const fetchProduct = async () => {
            setProductLoading(true);
            try {
                const docRef = doc(db, 'products', productId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setFormData({
                        ...data,
                        tags: Array.isArray(data.tags) ? data.tags.join(', ') : '',
                    });
                    if (data.mainImage) {
                        setExistingImageUrl(data.mainImage);
                        setImagePreview(data.mainImage);
                    }
                } else {
                    console.error("No such product!");
                    router.push('/admin/inventory');
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setProductLoading(false);
            }
        };

        fetchProduct();
    }, [productId, router]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setNewImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData) return;
        setLoading(true);

        try {
            let mainImageUrl = existingImageUrl;

            if (newImageFile) {
                const storageRef = ref(storage, `products/${Date.now()}_${newImageFile.name}`);
                await uploadBytes(storageRef, newImageFile);
                mainImageUrl = await getDownloadURL(storageRef);
            }

            const productRef = doc(db, 'products', productId);

            const { createdAt, createdBy, slug, ...restOfFormData } = formData;

            const updatedData = {
                ...restOfFormData,
                tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
                price: parseFloat(formData.price) || 0,
                stockQuantity: parseInt(formData.stockQuantity) || 0,
                shippingCharges: parseFloat(formData.shippingCharges) || 0,
                discountPercentage: Number(formData.discountPercentage) || 0,
                mainImage: mainImageUrl,
                updatedAt: serverTimestamp(),
            };

            await updateDoc(productRef, updatedData);

            router.push('/admin/inventory');
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Failed to update product: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (productLoading || !formData) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem', background: '#fcfcfc' }}>
            <div className={styles.headerActions}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link href="/admin/inventory" className={styles.backLink}><span>←</span> Back</Link>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>Edit Product</h1>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="submit" disabled={loading} className={styles.submitBtn}>{loading ? 'Saving...' : 'Save Changes'}</button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginTop: '2rem' }}>
                {/* Left Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* Basic Info */}
                    <div className={styles.card} style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Basic Information</h3>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Product Name *</label>
                            <input name="productName" value={formData.productName} onChange={handleChange} className={styles.input} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }} required />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', minHeight: '120px' }} rows="5" />
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className={styles.card} style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Pricing</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Selling Price (₹) *</label>
                                <input type="number" name="price" value={formData.price} onChange={handleChange} className={styles.input} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }} required />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Discount (%)</label>
                                <input type="number" name="discountPercentage" value={formData.discountPercentage} onChange={handleChange} className={styles.input} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }} />
                            </div>
                        </div>
                    </div>

                    {/* Inventory */}
                    <div className={styles.card} style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Inventory</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>SKU</label>
                                <input name="skuCode" value={formData.skuCode} onChange={handleChange} className={styles.input} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Stock Quantity</label>
                                <input type="number" name="stockQuantity" value={formData.stockQuantity} onChange={handleChange} className={styles.input} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* Organization */}
                    <div className={styles.card} style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Organization</h3>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Category *</label>
                            <select name="categoryId" value={formData.categoryId} onChange={handleChange} className={styles.select} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }} required>
                                <option value="">Select Category</option>
                                {CATEGORIES_DEFAULT.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Tags</label>
                            <input name="tags" value={formData.tags} onChange={handleChange} className={styles.input} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="Comma separated" />
                        </div>
                    </div>

                    {/* Image */}
                    <div className={styles.card} style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Product Image</h3>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px dashed #ddd',
                                padding: '2rem',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                minHeight: '200px'
                            }}>
                                <input type="file" onChange={handleFileChange} accept="image/*" style={{ display: 'none' }} />
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }} />
                                ) : (
                                    <div style={{ textAlign: 'center', color: '#666' }}>
                                        <span style={{ fontSize: '2rem' }}>📷</span>
                                        <p>Click to upload image</p>
                                    </div>
                                )}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default function EditProduct() {
    return (
        <Suspense fallback={<div>Loading form...</div>}>
            <EditProductContent />
        </Suspense>
    );
}
