'use client';
import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import styles from '../../dashboard/admin.module.css';

export default function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ name: '', description: '', parentCategoryId: '' });
    const [isSubCategory, setIsSubCategory] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

    const fetchCategories = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'categories'));
            const list = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setCategories(list);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (isSubCategory && !newCategory.parentCategoryId) {
            alert("Please select a parent category for the sub-category.");
            return;
        }
        setIsAdding(true);
        try {
            await addDoc(collection(db, 'categories'), {
                name: newCategory.name,
                description: newCategory.description,
                parentCategoryId: isSubCategory ? newCategory.parentCategoryId : null,
                createdAt: new Date().toISOString()
            });
            setNewCategory({ name: '', description: '', parentCategoryId: '' });
            setIsSubCategory(false);
            fetchCategories(); // Refresh list
        } catch (error) {
            console.error("Error adding category:", error);
            alert("Failed to add category");
        } finally {
            setIsAdding(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this category?")) return;
        try {
            await deleteDoc(doc(db, 'categories', id));
            setCategories(prev => prev.filter(c => c.id !== id));
        } catch (error) {
            console.error("Error deleting category:", error);
            alert("Failed to delete category");
        }
    };

    return (
        <main className={styles.mainContent}>
            <header className={styles.header}>
                <div className={styles.titleGroup}>
                    <h1>Inventory Categories</h1>
                    <p>Manage product categories.</p>
                </div>
            </header>

            <div className={styles.dashboardGrid}>
                {/* Add New Category Card */}
                <div className={styles.contentCard} style={{ height: 'fit-content' }}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Add New Category</h2>
                    </div>
                    <form onSubmit={handleAddCategory} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Category Name</label>
                            <input
                                type="text"
                                value={newCategory.name}
                                onChange={e => setNewCategory({ ...newCategory, name: e.target.value })}
                                required
                                className={styles.inputField}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid #e2e8f0'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Description</label>
                            <textarea
                                value={newCategory.description}
                                onChange={e => setNewCategory({ ...newCategory, description: e.target.value })}
                                rows="3"
                                className={styles.inputField}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid #e2e8f0',
                                    resize: 'vertical'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Type</label>
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                    <input
                                        type="radio"
                                        name="categoryType"
                                        checked={!isSubCategory}
                                        onChange={() => {
                                            setIsSubCategory(false);
                                            setNewCategory({ ...newCategory, parentCategoryId: '' });
                                        }}
                                        style={{
                                            accentColor: 'var(--color-maroon)', width: '16px', height: '16px'
                                        }}
                                    />
                                    Category
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                    <input
                                        type="radio"
                                        name="categoryType"
                                        checked={isSubCategory}
                                        onChange={() => setIsSubCategory(true)}
                                        style={{
                                            accentColor: 'var(--color-maroon)', width: '16px', height: '16px'
                                        }}
                                    />
                                    Sub Category
                                </label>
                            </div>
                        </div>
                        {isSubCategory && (
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Select Parent Category</label>
                                <select
                                    value={newCategory.parentCategoryId}
                                    onChange={e => setNewCategory({ ...newCategory, parentCategoryId: e.target.value })}
                                    className={styles.inputField}
                                    required={isSubCategory}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '0.5rem',
                                        border: '1px solid #e2e8f0',
                                        background: 'white'
                                    }}
                                >
                                    <option value="" disabled>Select a Top-Level Category</option>
                                    {categories.filter(c => !c.parentCategoryId).map(parent => (
                                        <option key={parent.id} value={parent.id}>{parent.name}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <button type="submit" className="btn-primary" disabled={isAdding}>
                            {isAdding ? 'Adding...' : 'Add Category'}
                        </button>
                    </form>
                </div>

                {/* List Categories Card */}
                <div className={styles.contentCard}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Current Categories ({categories.length})</h2>
                    </div>
                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="3" style={{ textAlign: 'center', padding: '2rem' }}>Loading...</td></tr>
                                ) : categories.length === 0 ? (
                                    <tr><td colSpan="3" style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>No categories found.</td></tr>
                                ) : (
                                    categories.map(cat => (
                                        <tr key={cat.id}>
                                            <td style={{ fontWeight: 500 }}>{cat.name}</td>
                                            <td style={{ color: '#666', fontSize: '0.9rem' }}>
                                                {cat.description}
                                                {cat.parentCategoryId && (
                                                    <div style={{ marginTop: '0.5rem' }}>
                                                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-maroon)' }}>
                                                            Parent Category: {categories.find(c => c.id === cat.parentCategoryId)?.name || 'Unknown'}
                                                        </span>
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => handleDelete(cat.id)}
                                                    className="btn-danger"
                                                    style={{ padding: '0.5rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                                                    title="Delete Category"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M3 6h18"></path>
                                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}
