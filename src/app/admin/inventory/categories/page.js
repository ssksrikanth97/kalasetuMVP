'use client';
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import styles from '../../dashboard/admin.module.css';

export default function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ name: '', description: '', parentCategoryId: '' });
    const [isSubCategory, setIsSubCategory] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);

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
            if (editingId) {
                await updateDoc(doc(db, 'categories', editingId), {
                    name: newCategory.name,
                    description: newCategory.description,
                    parentCategoryId: isSubCategory ? newCategory.parentCategoryId : null,
                    updatedAt: new Date().toISOString()
                });
            } else {
                await addDoc(collection(db, 'categories'), {
                    name: newCategory.name,
                    description: newCategory.description,
                    parentCategoryId: isSubCategory ? newCategory.parentCategoryId : null,
                    createdAt: new Date().toISOString()
                });
            }

            setNewCategory({ name: '', description: '', parentCategoryId: '' });
            setIsSubCategory(false);
            setEditingId(null);
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
                {/* Add/Edit Category Card */}
                <div className={styles.contentCard} style={{ height: 'fit-content' }}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>{editingId ? 'Edit Category' : 'Add New Category'}</h2>
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
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button type="submit" className="btn-primary" disabled={isAdding}>
                                {isAdding ? 'Saving...' : (editingId ? 'Update Category' : 'Add Category')}
                            </button>
                            {editingId && (
                                <button
                                    type="button"
                                    className="btn-secondary"
                                    onClick={() => {
                                        setEditingId(null);
                                        setNewCategory({ name: '', description: '', parentCategoryId: '' });
                                        setIsSubCategory(false);
                                    }}
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
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
                                    // Group and display hierarchically
                                    categories.filter(cat => !cat.parentCategoryId).map(parent => (
                                        <React.Fragment key={parent.id}>
                                            {/* Parent Row */}
                                            <tr style={{ backgroundColor: '#f9fafb' }}>
                                                <td style={{ fontWeight: 600 }}>{parent.name}</td>
                                                <td style={{ color: '#666', fontSize: '0.9rem' }}>{parent.description}</td>
                                                <td>
                                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                        <button
                                                            onClick={() => {
                                                                setNewCategory({
                                                                    name: parent.name,
                                                                    description: parent.description || '',
                                                                    parentCategoryId: ''
                                                                });
                                                                setIsSubCategory(false);
                                                                setEditingId(parent.id);
                                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                                            }}
                                                            className="btn-secondary"
                                                            style={{ padding: '0.5rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                                                            title="Edit Category"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(parent.id)}
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
                                                    </div>
                                                </td>
                                            </tr>
                                            {/* Child Rows */}
                                            {categories.filter(child => child.parentCategoryId === parent.id).map(child => (
                                                <tr key={child.id}>
                                                    <td style={{ fontWeight: 500, paddingLeft: '2.5rem' }}>
                                                        <span style={{ color: '#94a3b8', marginRight: '0.5rem' }}>└</span>
                                                        {child.name}
                                                    </td>
                                                    <td style={{ color: '#666', fontSize: '0.9rem', paddingLeft: '1rem' }}>{child.description}</td>
                                                    <td>
                                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                            <button
                                                                onClick={() => {
                                                                    setNewCategory({
                                                                        name: child.name,
                                                                        description: child.description || '',
                                                                        parentCategoryId: child.parentCategoryId || ''
                                                                    });
                                                                    setIsSubCategory(true);
                                                                    setEditingId(child.id);
                                                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                                                }}
                                                                className="btn-secondary"
                                                                style={{ padding: '0.5rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                                                                title="Edit Sub-Category"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                                </svg>
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(child.id)}
                                                                className="btn-danger"
                                                                style={{ padding: '0.5rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                                                                title="Delete Sub-Category"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path d="M3 6h18"></path>
                                                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </React.Fragment>
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
