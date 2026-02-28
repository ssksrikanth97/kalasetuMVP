'use client';

import { useState, useEffect } from 'react';
import { db, storage } from '@/lib/firebase/firebase';
import { collection, query, getDocs, doc, deleteDoc, updateDoc, addDoc, orderBy } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import Image from 'next/image';
import styles from './banners.module.css';

export default function AdminBannersPage() {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [newBanner, setNewBanner] = useState({
        title: '',
        linkType: 'product',
        linkId: '',
        isActive: true,
    });
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        try {
            setLoading(true);
            const q = query(collection(db, 'mobile_banners'), orderBy('order', 'asc'));
            const snapshot = await getDocs(q);
            const bannersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setBanners(bannersData);
        } catch (error) {
            console.error("Error fetching banners:", error);
            alert("Failed to load banners");
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleAddBanner = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            alert("Please select an image for the banner.");
            return;
        }

        try {
            setUploading(true);
            const storageRef = ref(storage, `banners/${Date.now()}_${selectedFile.name}`);
            const uploadTask = await uploadBytesResumable(storageRef, selectedFile);
            const downloadURL = await getDownloadURL(uploadTask.ref);

            const newOrder = banners.length > 0 ? Math.max(...banners.map(b => b.order)) + 1 : 0;

            await addDoc(collection(db, 'mobile_banners'), {
                title: newBanner.title,
                imageUrl: downloadURL,
                linkType: newBanner.linkType,
                linkId: newBanner.linkId,
                isActive: newBanner.isActive,
                order: newOrder,
                createdAt: new Date()
            });

            // Reset form
            setNewBanner({ title: '', linkType: 'product', linkId: '', isActive: true });
            setSelectedFile(null);
            document.getElementById('bannerImageInput').value = '';

            await fetchBanners();
            alert("Banner added successfully!");
        } catch (error) {
            console.error("Error adding banner:", error);
            alert("Failed to add banner.");
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteBanner = async (id, imageUrl) => {
        if (!confirm("Are you sure you want to delete this banner?")) return;

        try {
            // Delete from Firestore
            await deleteDoc(doc(db, 'mobile_banners', id));

            // Attempt to delete from Storage (might fail if URL is external or already deleted)
            try {
                // Determine path from URL
                const fileRef = ref(storage, imageUrl);
                await deleteObject(fileRef);
            } catch (storageErr) {
                console.warn("Could not delete image from storage:", storageErr);
            }

            setBanners(banners.filter(b => b.id !== id));
        } catch (error) {
            console.error("Error deleting banner:", error);
            alert("Failed to delete banner.");
        }
    };

    const toggleStatus = async (id, currentStatus) => {
        try {
            const bannerRef = doc(db, 'mobile_banners', id);
            await updateDoc(bannerRef, { isActive: !currentStatus });
            setBanners(banners.map(b => b.id === id ? { ...b, isActive: !currentStatus } : b));
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status.");
        }
    };

    // Simple Move Up/Down implementation for ordering
    const moveBanner = async (index, direction) => {
        if ((direction === -1 && index === 0) || (direction === 1 && index === banners.length - 1)) return;

        const newBanners = [...banners];
        const temp = newBanners[index];
        newBanners[index] = newBanners[index + direction];
        newBanners[index + direction] = temp;

        // Update order values internally and state immediately for UI response
        newBanners.forEach((b, i) => b.order = i);
        setBanners(newBanners);

        try {
            // Update Firestore
            const updates = newBanners.map((b) => updateDoc(doc(db, 'mobile_banners', b.id), { order: b.order }));
            await Promise.all(updates);
        } catch (err) {
            console.error("Error updating order:", err);
            // Revert state if backend update fails
            fetchBanners();
            alert("Failed to update order.");
        }
    };

    if (loading && banners.length === 0) return <div>Loading Banners...</div>;

    return (
        <div className={styles.container}>
            <h1>Mobile Banner Management</h1>
            <p>Manage the hero slider banners displayed on the mobile app landing page.</p>

            <div className={styles.addBannerSection}>
                <h2>Add New Banner</h2>
                <form onSubmit={handleAddBanner} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>Banner Image (Recommended size: 800x400)</label>
                        <input
                            type="file"
                            accept="image/*"
                            id="bannerImageInput"
                            onChange={handleFileChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Title (Optional)</label>
                        <input
                            type="text"
                            name="title"
                            value={newBanner.title}
                            onChange={(e) => setNewBanner({ ...newBanner, title: e.target.value })}
                            placeholder="Spring Sale 2026"
                        />
                    </div>
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label>Redirect Link Type</label>
                            <select
                                value={newBanner.linkType}
                                onChange={(e) => setNewBanner({ ...newBanner, linkType: e.target.value })}
                            >
                                <option value="product">Product Page</option>
                                <option value="event">Event Page</option>
                                <option value="category">Category Filter</option>
                                <option value="none">No Link</option>
                            </select>
                        </div>
                        {newBanner.linkType !== 'none' && (
                            <div className={styles.formGroup}>
                                <label>Target ID (Product/Event ID or Category Name)</label>
                                <input
                                    type="text"
                                    value={newBanner.linkId}
                                    onChange={(e) => setNewBanner({ ...newBanner, linkId: e.target.value })}
                                    placeholder="Enter respective ID"
                                    required={newBanner.linkType !== 'none'}
                                />
                            </div>
                        )}
                    </div>
                    <button type="submit" disabled={uploading || !selectedFile} className={styles.btnPrimary}>
                        {uploading ? 'Uploading...' : 'Add Banner'}
                    </button>
                </form>
            </div>

            <div className={styles.bannerListSection}>
                <h2>Current Banners</h2>
                {banners.length === 0 ? (
                    <p>No banners added yet.</p>
                ) : (
                    <div className={styles.bannerList}>
                        {banners.map((banner, index) => (
                            <div key={banner.id} className={`${styles.bannerCard} ${!banner.isActive ? styles.inactive : ''}`}>
                                <div className={styles.bannerImageContainer}>
                                    <Image src={banner.imageUrl} alt={banner.title || 'Banner'} fill style={{ objectFit: 'cover' }} />
                                </div>
                                <div className={styles.bannerInfo}>
                                    <h3>{banner.title || 'Untitled Banner'}</h3>
                                    <p className={styles.linkInfo}>
                                        🔗 Link: {banner.linkType !== 'none' ? `${banner.linkType} → ${banner.linkId}` : 'None'}
                                    </p>
                                    <span className={banner.isActive ? styles.statusActive : styles.statusInactive}>
                                        {banner.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                                <div className={styles.bannerActions}>
                                    <div className={styles.orderControls}>
                                        <button onClick={() => moveBanner(index, -1)} disabled={index === 0} title="Move Up">⬆️</button>
                                        <button onClick={() => moveBanner(index, 1)} disabled={index === banners.length - 1} title="Move Down">⬇️</button>
                                    </div>
                                    <button
                                        onClick={() => toggleStatus(banner.id, banner.isActive)}
                                        className={styles.btnToggle}
                                    >
                                        {banner.isActive ? 'Deactivate' : 'Activate'}
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBanner(banner.id, banner.imageUrl)}
                                        className={styles.btnDanger}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
