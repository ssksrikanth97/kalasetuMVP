'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { db, storage } from '@/lib/firebase/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Link from 'next/link';
import Image from 'next/image';
import styles from './product-form.module.css';
import adminStyles from '../../dashboard/admin.module.css'; // Import admin layout styles

const CATEGORIES_DEFAULT = [
    { id: 'musical-instruments', name: 'Musical Instruments' },
    { id: 'classical-dance-items', name: 'Classical Dance Items' },
    { id: 'return-gifts', name: 'Return Gifts' },
    { id: 'mementos-awards', name: 'Mementos / Awards' },
    { id: 'traditional-wear', name: 'Traditional Wear' },
    { id: 'books', name: 'Books & Learning' }
];

export default function AddProduct() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    // Form State
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

        saleType: 'Sale', // Sale, Rent, Both
        price: '',
        rentalPricePerDay: '',
        discountPercentage: 0,
        gstApplicable: false,
        gstPercentage: 18,

        stockQuantity: 10,
        lowStockAlertLimit: 5,
        availabilityStatus: 'In Stock',

        mainImage: null,

        weight: '',
        dimensions: '',
        shippingAvailable: true,
        shippingCharges: 0,
        returnPolicyDays: 7,
    });

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
            setFormData(prev => ({ ...prev, mainImage: file }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const generateSlug = (name) => {
        return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let mainImageUrl = '';
            if (formData.mainImage) {
                const storageRef = ref(storage, `products/${Date.now()}_${formData.mainImage.name}`);
                await uploadBytes(storageRef, formData.mainImage);
                mainImageUrl = await getDownloadURL(storageRef);
            }

            const productData = {
                ...formData,
                slug: generateSlug(formData.productName),
                tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
                price: parseFloat(formData.price) || 0,
                stockQuantity: parseInt(formData.stockQuantity) || 0,
                shippingCharges: parseFloat(formData.shippingCharges) || 0,
                mainImage: mainImageUrl,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                createdBy: user?.uid,
                isActive: true,
                isApproved: true,
            };

            delete productData.mainImage; // Don't save File object

            await addDoc(collection(db, 'products'), productData);

            // Use window.confirm instead of alert for better UX flow, or just redirect
            router.push('/admin/inventory');
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Failed to add product: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={adminStyles.dashboardContainer}>
            {/* Sidebar Navigation */}
            <aside className={adminStyles.sidebar}>
                <div className={adminStyles.logoContainer} style={{ padding: '0 1rem' }}>
                    <div style={{ position: 'relative', width: '100%', height: '40px' }}>
                        <Image
                            src="/logo.png"
                            alt="KalaSetu Admin"
                            fill
                            style={{ objectFit: 'contain', objectPosition: 'left' }}
                        />
                    </div>
                </div>
                <nav className={adminStyles.navLinks}>
                    <Link href="/admin/dashboard" className={adminStyles.navItem}>
                        <span className={adminStyles.navIcon}>📊</span> Dashboard
                    </Link>
                    <Link href="/admin/users" className={adminStyles.navItem}>
                        <span className={adminStyles.navIcon}>👥</span> Users
                    </Link>
                    <Link href="/admin/inventory" className={`${adminStyles.navItem} ${adminStyles.navItemActive}`}>
                        <span className={adminStyles.navIcon}>📦</span> Inventory
                    </Link>
                    <Link href="/admin/orders" className={adminStyles.navItem}>
                        <span className={adminStyles.navIcon}>🛍️</span> Orders
                    </Link>
                    <Link href="/admin/bookings" className={adminStyles.navItem}>
                        <span className={adminStyles.navIcon}>📅</span> Bookings
                    </Link>
                    <Link href="/" target="_blank" className={adminStyles.navItem} style={{ marginTop: 'auto' }}>
                        <span className={adminStyles.navIcon}>🌐</span> Live Site
                    </Link>
                    <button onClick={logout} className={adminStyles.navItem} style={{ background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}>
                        <span className={adminStyles.navIcon}>🚪</span> Logout
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className={adminStyles.mainContent} style={{ background: '#fcfcfc' }}>
                <form onSubmit={handleSubmit} style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>

                    {/* Header */}
                    <div className={styles.headerActions}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Link href="/admin/inventory" className={styles.backLink}>
                                <span>←</span> Back to Inventory
                            </Link>
                            <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#1f2937' }}>Add New Product</h1>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Link href="/admin/inventory">
                                <button type="button" className={styles.cancelBtn}>Cancel</button>
                            </Link>
                            <button type="submit" disabled={loading} className={styles.submitBtn}>
                                {loading ? 'Publishing...' : 'Publish Product'}
                            </button>
                        </div>
                    </div>

                    <div className={styles.formGrid}>
                        {/* Left Column - Main Details */}
                        <div>
                            {/* Basic Info */}
                            <div className={styles.card}>
                                <h3 className={styles.cardTitle}>Basic Information</h3>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Product Name *</label>
                                    <input
                                        name="productName"
                                        value={formData.productName}
                                        onChange={handleChange}
                                        className={styles.input}
                                        placeholder="e.g. Traditional Tanjore Painting"
                                        required
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Product Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className={styles.textarea}
                                        rows="5"
                                        placeholder="Describe the product features, history, and usage..."
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Short Description (Summary)</label>
                                    <input
                                        name="shortDescription"
                                        value={formData.shortDescription}
                                        onChange={handleChange}
                                        className={styles.input}
                                        maxLength={150}
                                        placeholder="Brief summary for listings..."
                                    />
                                    <div className={styles.helperText}>{formData.shortDescription.length}/150 characters</div>
                                </div>
                            </div>

                            {/* Pricing */}
                            <div className={styles.card}>
                                <h3 className={styles.cardTitle}>Pricing and Sale</h3>
                                <div className={styles.row2}>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.label}>Selling Price (₹) *</label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            className={styles.input}
                                            placeholder="0.00"
                                            required
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.label}>Discount (%)</label>
                                        <input
                                            type="number"
                                            name="discountPercentage"
                                            value={formData.discountPercentage}
                                            onChange={handleChange}
                                            className={styles.input}
                                            placeholder="0"
                                        />
                                    </div>
                                </div>

                                <div className={styles.row2} style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #f3f4f6' }}>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.checkboxGroup}>
                                            <input
                                                type="checkbox"
                                                name="gstApplicable"
                                                checked={formData.gstApplicable}
                                                onChange={handleChange}
                                                className={styles.checkbox}
                                            />
                                            Is GST Applicable?
                                        </label>
                                    </div>
                                    {formData.gstApplicable && (
                                        <div className={styles.inputGroup}>
                                            <label className={styles.label}>GST Rate (%)</label>
                                            <select name="gstPercentage" value={formData.gstPercentage} onChange={handleChange} className={styles.select}>
                                                <option value="5">5%</option>
                                                <option value="12">12%</option>
                                                <option value="18">18%</option>
                                                <option value="28">28%</option>
                                            </select>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Inventory & Logistics */}
                            <div className={styles.card}>
                                <h3 className={styles.cardTitle}>Inventory & Logistics</h3>
                                <div className={styles.row3}>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.label}>SKU Code</label>
                                        <input
                                            name="skuCode"
                                            value={formData.skuCode}
                                            onChange={handleChange}
                                            className={styles.input}
                                            placeholder="PROD-001"
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.label}>Stock Quantity</label>
                                        <input
                                            type="number"
                                            name="stockQuantity"
                                            value={formData.stockQuantity}
                                            onChange={handleChange}
                                            className={styles.input}
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.label}>Low Stock Alert</label>
                                        <input
                                            type="number"
                                            name="lowStockAlertLimit"
                                            value={formData.lowStockAlertLimit}
                                            onChange={handleChange}
                                            className={styles.input}
                                        />
                                    </div>
                                </div>

                                <div className={styles.row2}>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.label}>Weight (kg)</label>
                                        <input
                                            name="weight"
                                            value={formData.weight}
                                            onChange={handleChange}
                                            className={styles.input}
                                            placeholder="0.5"
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.label}>Shipping Charges (₹)</label>
                                        <input
                                            type="number"
                                            name="shippingCharges"
                                            value={formData.shippingCharges}
                                            onChange={handleChange}
                                            className={styles.input}
                                            placeholder="0"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Artisan Story */}
                            <div className={styles.card}>
                                <h3 className={styles.cardTitle}>Artisan Story (Optional)</h3>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Tell the story behind this product</label>
                                    <textarea
                                        name="artisanStory"
                                        value={formData.artisanStory}
                                        onChange={handleChange}
                                        className={styles.textarea}
                                        rows="4"
                                        placeholder="Share the maker's journey or cultural significance..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Organization & Media */}
                        <div>
                            {/* Status */}
                            <div className={styles.card}>
                                <h3 className={styles.cardTitle}>Status</h3>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Availability</label>
                                    <select
                                        name="availabilityStatus"
                                        value={formData.availabilityStatus}
                                        onChange={handleChange}
                                        className={styles.select}
                                    >
                                        <option value="In Stock">In Stock (Active)</option>
                                        <option value="Out of Stock">Out of Stock</option>
                                        <option value="Preorder">Preorder</option>
                                        <option value="Made to Order">Made to Order</option>
                                    </select>
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Sale Type</label>
                                    <select
                                        name="saleType"
                                        value={formData.saleType}
                                        onChange={handleChange}
                                        className={styles.select}
                                    >
                                        <option value="Sale">For Sale</option>
                                        <option value="Rent">For Rent</option>
                                        <option value="Both">Both</option>
                                    </select>
                                </div>
                            </div>

                            {/* Media */}
                            <div className={styles.card}>
                                <h3 className={styles.cardTitle}>Product Image</h3>
                                <div className={styles.inputGroup}>
                                    <label className={styles.imageUploadBox}>
                                        <input
                                            type="file"
                                            name="mainImage"
                                            onChange={handleFileChange}
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                        />
                                        {imagePreview ? (
                                            <div style={{ position: 'relative' }}>
                                                <img src={imagePreview} alt="Preview" className={styles.previewImage} />
                                                <div style={{ position: 'absolute', bottom: '10px', left: '0', right: '0', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '0.5rem', borderRadius: '0 0 8px 8px', fontSize: '0.8rem' }}>Click to Change</div>
                                            </div>
                                        ) : (
                                            <div className={styles.uploadPlaceholder}>
                                                <span className={styles.uploadIcon}>📷</span>
                                                <span>Click to upload image</span>
                                                <span className={styles.helperText}>(JPG, PNG, WebP)</span>
                                            </div>
                                        )}
                                    </label>
                                </div>
                            </div>

                            {/* Categorization */}
                            <div className={styles.card}>
                                <h3 className={styles.cardTitle}>Organization</h3>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Category *</label>
                                    <select
                                        name="categoryId"
                                        value={formData.categoryId}
                                        onChange={handleChange}
                                        className={styles.select}
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        {CATEGORIES_DEFAULT.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Sub-Category</label>
                                    <input
                                        name="subCategory"
                                        value={formData.subCategory}
                                        onChange={handleChange}
                                        className={styles.input}
                                        placeholder="e.g. Percussion"
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Brand / Maker</label>
                                    <input
                                        name="brandOrMaker"
                                        value={formData.brandOrMaker}
                                        onChange={handleChange}
                                        className={styles.input}
                                        placeholder="e.g. Local Artisan"
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Tags</label>
                                    <input
                                        name="tags"
                                        value={formData.tags}
                                        onChange={handleChange}
                                        className={styles.input}
                                        placeholder="classical, handmade, gift"
                                    />
                                    <div className={styles.helperText}>Separate tags with commas</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
}
