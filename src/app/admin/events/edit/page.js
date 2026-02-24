'use client';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../dashboard/admin.module.css';
import { useEffect, useState, Suspense } from 'react';
import { doc, getDoc, updateDoc, Timestamp, collection, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase/firebase';
import { useRouter, useSearchParams } from 'next/navigation';

// Safely formats a Firestore Timestamp or other date format into 'YYYY-MM-DD'
const formatDateForInput = (timestamp) => {
    if (!timestamp) return '';
    try {
        const date = timestamp instanceof Timestamp ? timestamp.toDate() : new Date(timestamp);
        return date.toISOString().split('T')[0];
    } catch (e) {
        return '';
    }
};

function EditEventContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);

    const [availableProducts, setAvailableProducts] = useState([]);
    const [mappedProducts, setMappedProducts] = useState([]);

    useEffect(() => {
        if (id) {
            const fetchEventAndProducts = async () => {
                setLoading(true);
                try {
                    // Fetch products
                    const prodSnap = await getDocs(collection(db, 'products'));
                    const prods = prodSnap.docs.map(d => ({ id: d.id, ...d.data() }));
                    setAvailableProducts(prods);

                    // Fetch event
                    const docRef = doc(db, 'events', id);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const event = docSnap.data();
                        setName(event.name || '');
                        setDescription(event.description || '');
                        setDate(formatDateForInput(event.date));
                        setLocation(event.location || '');
                        setImageUrl(event.imageUrl || '');
                        setMappedProducts(event.mappedProducts || []);
                    } else {
                        alert('Event not found.');
                        router.push('/admin/events');
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                    alert('Failed to fetch data.');
                } finally {
                    setLoading(false);
                }
            };
            fetchEventAndProducts();
        } else {
            setLoading(false);
        }
    }, [id, router]);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const addMappedProduct = () => {
        setMappedProducts([...mappedProducts, { productId: '', type: 'Optional', discount: 0 }]);
    };

    const updateMappedProduct = (index, field, value) => {
        const updated = [...mappedProducts];
        updated[index][field] = value;
        setMappedProducts(updated);
    };

    const removeMappedProduct = (index) => {
        const updated = [...mappedProducts];
        updated.splice(index, 1);
        setMappedProducts(updated);
    };

    const updateEvent = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            let newImageUrl = imageUrl;
            if (image) {
                // Validate Image
                if (image.size > 5 * 1024 * 1024) { // 5MB limit
                    alert("File size too large. Please upload an image under 5MB.");
                    setUploading(false);
                    return;
                }

                const imageRef = ref(storage, `events/${Date.now()}_${image.name}`);
                await uploadBytes(imageRef, image);
                newImageUrl = await getDownloadURL(imageRef);
            }

            const eventRef = doc(db, 'events', id);
            await updateDoc(eventRef, {
                name,
                description,
                date: new Date(date),
                location,
                imageUrl: newImageUrl,
                mappedProducts: mappedProducts.filter(p => p.productId !== ''),
            });

            alert('Event updated successfully!');
            router.push('/admin/events');
        } catch (error) {
            console.error('Error updating event:', error);
            alert(`Failed to update event: ${error.message} (Code: ${error.code || 'unknown'})`);
        } finally {
            setUploading(false);
        }
    };

    if (loading) {
        return <div className={styles.mainContent}><p>Loading...</p></div>;
    }

    return (
        <div style={{ padding: '0 1rem' }}>
            <header className={styles.header}>
                <div className={styles.titleGroup}>
                    <h1>Edit Event</h1>
                    <p>Update the details for this event.</p>
                </div>
                <Link href="/admin/events" className="btn-secondary">
                    Back to Events
                </Link>
            </header>

            <div className={styles.contentCard}>
                <form onSubmit={updateEvent} className={styles.formLayout}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Event Name</label>
                        <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className={styles.inputField} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="description">Description</label>
                        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className={styles.inputField} rows="4"></textarea>
                    </div>
                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label htmlFor="date">Date</label>
                            <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className={styles.inputField} required />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="location">Location</label>
                            <input id="location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} className={styles.inputField} required />
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Current Image</label>
                        <div className={styles.imagePreview}>
                            {imageUrl ? (
                                <Image src={imageUrl} alt={name || 'Event image'} width={100} height={100} style={{ objectFit: 'cover', borderRadius: '8px' }} />
                            ) : (
                                <p>No image available.</p>
                            )}
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="image">Upload New Image</label>
                        <input id="image" type="file" onChange={handleImageChange} className={styles.inputField} accept="image/*" />
                        {image && <p style={{ marginTop: '0.5rem' }}>Selected: {image.name}</p>}
                    </div>

                    <div className={styles.formGroup} style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Map Related Products</h3>
                        {mappedProducts.map((mappedProd, index) => (
                            <div key={index} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'center', background: '#f9fafb', padding: '1rem', borderRadius: '8px' }}>
                                <div style={{ flex: 2 }}>
                                    <label style={{ fontSize: '0.85rem' }}>Select Product</label>
                                    <select
                                        className={styles.inputField}
                                        value={mappedProd.productId}
                                        onChange={(e) => updateMappedProduct(index, 'productId', e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>-- Choose a Product --</option>
                                        {availableProducts.map(p => (
                                            <option key={p.id} value={p.id}>{p.name || p.productName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ fontSize: '0.85rem' }}>Type</label>
                                    <select
                                        className={styles.inputField}
                                        value={mappedProd.type}
                                        onChange={(e) => updateMappedProduct(index, 'type', e.target.value)}
                                    >
                                        <option value="Recommended">Recommended</option>
                                        <option value="Mandatory">Mandatory</option>
                                        <option value="Optional">Optional</option>
                                    </select>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ fontSize: '0.85rem' }}>Discount (%)</label>
                                    <input
                                        type="number"
                                        className={styles.inputField}
                                        value={mappedProd.discount}
                                        onChange={(e) => updateMappedProduct(index, 'discount', Number(e.target.value))}
                                        min="0" max="100"
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'flex-end', height: '100%', paddingBottom: '0.5rem' }}>
                                    <button type="button" onClick={() => removeMappedProduct(index)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Remove</button>
                                </div>
                            </div>
                        ))}
                        <button type="button" className="btn-secondary" onClick={addMappedProduct} style={{ fontSize: '0.9rem' }}>
                            + Add Product
                        </button>
                    </div>

                    <div className={styles.formActions} style={{ marginTop: '2rem' }}>
                        <button type="submit" className="btn-primary" disabled={uploading}>
                            {uploading ? 'Updating Event...' : 'Update Event'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function EditEvent() {
    return (
        <Suspense fallback={<div>Loading form...</div>}>
            <EditEventContent />
        </Suspense>
    );
}
