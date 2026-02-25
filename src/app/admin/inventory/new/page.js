'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { db, storage } from '@/lib/firebase/firebase';
import { collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Link from 'next/link';
import styles from './product-form.module.css';

export default function AddProduct() {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [imageFiles, setImageFiles] = useState({
        main: { file: null, preview: null },
        side: { file: null, preview: null },
        back: { file: null, preview: null },
        dimensions: { file: null, preview: null }
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const snap = await getDocs(collection(db, 'categories'));
                setCategories(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            } catch (error) {
                console.error("Error fetching categories", error);
            }
        };
        fetchCategories();
    }, []);

    const [formData, setFormData] = useState({
        productName: '',
        categoryId: '',
        subCategory: '',
        shortDescription: '',
        description: '',
        tags: '',
        skuCode: '',
        brandOrMaker: '',
        artisanStory: '',
        saleType: 'Sale',
        price: '',
        rentalPricePerDay: '',
        discountPercentage: 0,
        gstApplicable: false,
        gstPercentage: 18,
        stockQuantity: 10,
        lowStockAlertLimit: 5,
        availabilityStatus: 'In Stock',
        weight: '',
        dimensions: '',
        shippingAvailable: true,
        shippingCharges: 0,
        returnPolicyDays: 7,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleFileChange = (e, type) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFiles(prev => ({
                ...prev,
                [type]: {
                    file: file,
                    preview: URL.createObjectURL(file)
                }
            }));
        }
    };

    const generateSlug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.productName || !formData.categoryId || !formData.price || !imageFiles.main.file) {
            alert('Please fill all required fields and upload a Cover Image.');
            return;
        }
        setLoading(true);

        try {
            const uploadedUrls = {
                mainImage: '',
                sideImage: '',
                backImage: '',
                dimensionsImage: ''
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

            const newProductData = {
                productName: formData.productName,
                categoryId: formData.categoryId,
                subCategory: formData.subCategory,
                shortDescription: formData.shortDescription,
                description: formData.description,
                tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
                skuCode: formData.skuCode,
                brandOrMaker: formData.brandOrMaker,
                artisanStory: formData.artisanStory,
                saleType: formData.saleType,
                price: parseFloat(formData.price) || 0,
                rentalPricePerDay: formData.rentalPricePerDay,
                discountPercentage: Number(formData.discountPercentage) || 0,
                gstApplicable: formData.gstApplicable,
                gstPercentage: Number(formData.gstPercentage) || 0,
                stockQuantity: Number(formData.stockQuantity) || 0,
                lowStockAlertLimit: Number(formData.lowStockAlertLimit) || 0,
                availabilityStatus: formData.availabilityStatus,
                weight: formData.weight,
                dimensions: formData.dimensions,
                shippingAvailable: formData.shippingAvailable,
                shippingCharges: Number(formData.shippingCharges) || 0,
                returnPolicyDays: Number(formData.returnPolicyDays) || 0,
                ...uploadedUrls,
                slug: generateSlug(formData.productName),
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                createdBy: user?.uid,
                isActive: true,
                isApproved: false, // Default to not approved
            };

            await addDoc(collection(db, 'products'), newProductData);

            router.push('/admin/inventory');
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Failed to add product: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem', background: '#fcfcfc' }}>
            <div className={styles.headerActions}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link href="/admin/inventory" className={styles.backLink}><span>←</span> Back</Link>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>Add New Product</h1>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Link href="/admin/inventory"><button type="button" className={styles.cancelBtn}>Cancel</button></Link>
                    <button type="submit" disabled={loading} className={styles.submitBtn}>{loading ? 'Publishing...' : 'Publish'}</button>
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
                                {categories.filter(c => !c.parentCategoryId).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                        {formData.categoryId && categories.some(c => c.parentCategoryId === formData.categoryId) && (
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Sub-Category</label>
                                <select name="subCategory" value={formData.subCategory} onChange={handleChange} className={styles.select}>
                                    <option value="">Select Sub-Category</option>
                                    {categories.filter(c => c.parentCategoryId === formData.categoryId).map(sub => (
                                        <option key={sub.id} value={sub.id}>{sub.name}</option>
                                    ))}
                                </select>
                            </div>
                        )}
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
