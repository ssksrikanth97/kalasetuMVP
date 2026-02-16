'use client';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../../dashboard/admin.module.css';
import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase/firebase';
import { useRouter, useParams } from 'next/navigation';

export default function EditProduct() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                try {
                    const docRef = doc(db, 'products', id);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const product = docSnap.data();
                        setName(product.name);
                        setDescription(product.description);
                        setPrice(product.price);
                        setStock(product.stock);
                        setImageUrl(product.imageUrl);
                    } else {
                        alert('Product not found.');
                        router.push('/admin/products');
                    }
                } catch (error) {
                    console.error('Error fetching product:', error);
                    alert('Failed to fetch product data.');
                } finally {
                    setLoading(false);
                }
            };
            fetchProduct();
        }
    }, [id, router]);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const updateProduct = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            let newImageUrl = imageUrl;
            if (image) {
                const imageRef = ref(storage, `products/${Date.now()}_${image.name}`);
                await uploadBytes(imageRef, image);
                newImageUrl = await getDownloadURL(imageRef);
            }

            const productRef = doc(db, 'products', id);
            await updateDoc(productRef, {
                name,
                description,
                price: parseFloat(price),
                stock: parseInt(stock, 10),
                imageUrl: newImageUrl,
            });

            alert('Product updated successfully!');
            router.push('/admin/products');
        } catch (error) {
            console.error('Error updating product:', error);
            alert(`Failed to update product: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <main className={styles.mainContent}>
            <header className={styles.header}>
                <div className={styles.titleGroup}>
                    <h1>Edit Product</h1>
                    <p>Update the details for this product.</p>
                </div>
                <Link href="/admin/products">
                    <button className="btn-secondary">Back to Products</button>
                </Link>
            </header>

            <div className={styles.contentCard}>
                <form onSubmit={updateProduct} className={styles.formLayout}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Product Name</label>
                        <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className={styles.inputField} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="description">Description</label>
                        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className={styles.inputField} rows="4"></textarea>
                    </div>
                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label htmlFor="price">Price (₹)</label>
                            <input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} className={styles.inputField} required />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="stock">Stock</label>
                            <input id="stock" type="number" value={stock} onChange={(e) => setStock(e.target.value)} className={styles.inputField} required />
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Current Image</label>
                        {imageUrl && <Image src={imageUrl} alt={name} width={100} height={100} style={{ objectFit: 'cover', borderRadius: '8px' }} />}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="image">Upload New Image</label>
                        <input id="image" type="file" onChange={handleImageChange} className={styles.inputField} />
                        {image && <p style={{ marginTop: '0.5rem' }}>Selected: {image.name}</p>}
                    </div>

                    <div className={styles.formActions}>
                        <button type="submit" className="btn-primary" disabled={uploading}>
                            {uploading ? 'Updating Product...' : 'Update Product'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
