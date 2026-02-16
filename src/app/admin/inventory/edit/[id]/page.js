'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { db, storage } from '@/lib/firebase/firebase';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Link from 'next/link';
import styles from '../../new/product-form.module.css';

const CATEGORIES_DEFAULT = [
    { id: 'musical-instruments', name: 'Musical Instruments' },
    { id: 'classical-dance-items', name: 'Classical Dance Items' },
    { id: 'return-gifts', name: 'Return Gifts' },
    { id: 'mementos-awards', name: 'Mementos / Awards' },
    { id: 'traditional-wear', name: 'Traditional Wear' },
    { id: 'books', name: 'Books & Learning' }
];

export default function EditProduct() {
    const router = useRouter();
    const params = useParams();
    const { id: productId } = params;

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
            <div className={styles.formGrid}>
                <div>
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Basic Information</h3>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Product Name *</label>
                            <input name="productName" value={formData.productName} onChange={handleChange} className={styles.input} required />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} className={styles.textarea} rows="5" />
                        </div>
                    </div>
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Pricing</h3>
                        <div className={styles.row2}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Selling Price (₹) *</label>
                                <input type="number" name="price" value={formData.price} onChange={handleChange} className={styles.input} required />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Discount (%)</label>
                                <input type="number" name="discountPercentage" value={formData.discountPercentage} onChange={handleChange} className={styles.input} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Inventory</h3>
                        <div className={styles.row3}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>SKU</label>
                                <input name="skuCode" value={formData.skuCode} onChange={handleChange} className={styles.input} />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Stock Quantity</label>
                                <input type="number" name="stockQuantity" value={formData.stockQuantity} onChange={handleChange} className={styles.input} />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Organization</h3>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Category *</label>
                            <select name="categoryId" value={formData.categoryId} onChange={handleChange} className={styles.select} required>
                                <option value="">Select Category</option>
                                {CATEGORIES_DEFAULT.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Tags</label>
                            <input name="tags" value={formData.tags} onChange={handleChange} className={styles.input} />
                        </div>
                    </div>
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Product Image</h3>
                        <div className={styles.inputGroup}>
                            <label className={styles.imageUploadBox}>
                                <input type="file" onChange={handleFileChange} accept="image/*" style={{ display: 'none' }} />
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className={styles.previewImage} />
                                ) : (
                                    <div className={styles.uploadPlaceholder}><span>📷</span> Click to upload</div>
                                )}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
