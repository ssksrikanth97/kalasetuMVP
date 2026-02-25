'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { db, storage } from '@/lib/firebase/firebase';
import { doc, getDoc, updateDoc, serverTimestamp, collection, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Link from 'next/link';
import styles from '../new/product-form.module.css';

function EditProductContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const productId = searchParams.get('id');

    const [loading, setLoading] = useState(false);
    const [productLoading, setProductLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
    const [existingImageUrl, setExistingImageUrl] = useState('');

    // Multiple images state
    const [imageFiles, setImageFiles] = useState({
        main: { file: null, preview: null, existing: '' },
        side: { file: null, preview: null, existing: '' },
        back: { file: null, preview: null, existing: '' },
        dimensions: { file: null, preview: null, existing: '' }
    });

    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const snap = await getDocs(collection(db, 'categories'));
                setCategories(snap.docs.map(c => ({ id: c.id, ...c.data() })));
            } catch (error) {
                console.error("Error fetching categories", error);
            }
        };
        fetchCategories();
    }, []);

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
                    if (data.mainImage || data.sideImage || data.backImage || data.dimensionsImage) {
                        setImageFiles(prev => ({
                            ...prev,
                            main: { ...prev.main, existing: data.mainImage || '', preview: data.mainImage || null },
                            side: { ...prev.side, existing: data.sideImage || '', preview: data.sideImage || null },
                            back: { ...prev.back, existing: data.backImage || '', preview: data.backImage || null },
                            dimensions: { ...prev.dimensions, existing: data.dimensionsImage || '', preview: data.dimensionsImage || null }
                        }));
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

    const handleFileChange = (e, type) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFiles(prev => ({
                ...prev,
                [type]: {
                    ...prev[type],
                    file: file,
                    preview: URL.createObjectURL(file)
                }
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData) return;
        setLoading(true);

        try {
            const uploadedUrls = {
                mainImage: imageFiles.main.existing,
                sideImage: imageFiles.side.existing,
                backImage: imageFiles.back.existing,
                dimensionsImage: imageFiles.dimensions.existing,
            };

            const uploadPromises = Object.keys(imageFiles).map(async (key) => {
                if (imageFiles[key].file) {
                    const storageRef = ref(storage, `products/${Date.now()}_${key}_${imageFiles[key].file.name}`);
                    await uploadBytes(storageRef, imageFiles[key].file);
                    const url = await getDownloadURL(storageRef);
                    if (key === 'main') uploadedUrls.mainImage = url;
                    if (key === 'side') uploadedUrls.sideImage = url;
                    if (key === 'back') uploadedUrls.backImage = url;
                    if (key === 'dimensions') uploadedUrls.dimensionsImage = url;
                }
            });

            await Promise.all(uploadPromises);

            const productRef = doc(db, 'products', productId);

            const { createdAt, createdBy, slug, mainImage, sideImage, backImage, dimensionsImage, ...restOfFormData } = formData;

            const updatedData = {
                ...restOfFormData,
                tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
                price: parseFloat(formData.price) || 0,
                stockQuantity: parseInt(formData.stockQuantity) || 0,
                shippingCharges: parseFloat(formData.shippingCharges) || 0,
                discountPercentage: Number(formData.discountPercentage) || 0,
                ...uploadedUrls,
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
                            <select name="categoryId" value={formData.categoryId || ''} onChange={handleChange} className={styles.select} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }} required>
                                <option value="">Select Category</option>
                                {categories.filter(c => !c.parentCategoryId).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                        {formData.categoryId && categories.some(c => c.parentCategoryId === formData.categoryId) && (
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Sub-Category</label>
                                <select name="subCategory" value={formData.subCategory || ''} onChange={handleChange} className={styles.select} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}>
                                    <option value="">Select Sub-Category</option>
                                    {categories.filter(c => c.parentCategoryId === formData.categoryId).map(sub => (
                                        <option key={sub.id} value={sub.id}>{sub.name}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Tags</label>
                            <input name="tags" value={formData.tags} onChange={handleChange} className={styles.input} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="Comma separated" />
                        </div>
                    </div>

                    {/* Images */}
                    <div className={styles.card} style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Product Images</h3>

                        {/* Cover Image */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Cover Image (Required)</label>
                            <label style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                border: '2px dashed #ddd', padding: '1rem', borderRadius: '8px', cursor: 'pointer', minHeight: '150px'
                            }}>
                                <input type="file" onChange={(e) => handleFileChange(e, 'main')} accept="image/*" style={{ display: 'none' }} />
                                {imageFiles.main.preview ? (
                                    <img src={imageFiles.main.preview} alt="Cover Preview" style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'contain' }} />
                                ) : (
                                    <div style={{ textAlign: 'center', color: '#666' }}>
                                        <span style={{ fontSize: '1.5rem' }}>📷</span>
                                        <p style={{ margin: 0 }}>Click to update Cover Image</p>
                                    </div>
                                )}
                            </label>
                        </div>

                        {/* Side Image */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Side / Different Angle Image</label>
                            <label style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                border: '2px dashed #ddd', padding: '1rem', borderRadius: '8px', cursor: 'pointer', minHeight: '150px'
                            }}>
                                <input type="file" onChange={(e) => handleFileChange(e, 'side')} accept="image/*" style={{ display: 'none' }} />
                                {imageFiles.side.preview ? (
                                    <img src={imageFiles.side.preview} alt="Side Preview" style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'contain' }} />
                                ) : (
                                    <div style={{ textAlign: 'center', color: '#666' }}>
                                        <span style={{ fontSize: '1.5rem' }}>📷</span>
                                        <p style={{ margin: 0 }}>Click to upload/update Side Image</p>
                                    </div>
                                )}
                            </label>
                        </div>

                        {/* Back Image */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Backside Image</label>
                            <label style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                border: '2px dashed #ddd', padding: '1rem', borderRadius: '8px', cursor: 'pointer', minHeight: '150px'
                            }}>
                                <input type="file" onChange={(e) => handleFileChange(e, 'back')} accept="image/*" style={{ display: 'none' }} />
                                {imageFiles.back.preview ? (
                                    <img src={imageFiles.back.preview} alt="Back Preview" style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'contain' }} />
                                ) : (
                                    <div style={{ textAlign: 'center', color: '#666' }}>
                                        <span style={{ fontSize: '1.5rem' }}>📷</span>
                                        <p style={{ margin: 0 }}>Click to upload/update Backside Image</p>
                                    </div>
                                )}
                            </label>
                        </div>

                        {/* Dimensions Image */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Dimensions Image</label>
                            <label style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                border: '2px dashed #ddd', padding: '1rem', borderRadius: '8px', cursor: 'pointer', minHeight: '150px'
                            }}>
                                <input type="file" onChange={(e) => handleFileChange(e, 'dimensions')} accept="image/*" style={{ display: 'none' }} />
                                {imageFiles.dimensions.preview ? (
                                    <img src={imageFiles.dimensions.preview} alt="Dimensions Preview" style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'contain' }} />
                                ) : (
                                    <div style={{ textAlign: 'center', color: '#666' }}>
                                        <span style={{ fontSize: '1.5rem' }}>📷</span>
                                        <p style={{ margin: 0 }}>Click to upload/update Dimensions Image</p>
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
