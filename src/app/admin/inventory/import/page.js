'use client';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase/firebase';
import { collection, addDoc, getDocs, serverTimestamp, query, where, updateDoc, doc } from 'firebase/firestore';
import Link from 'next/link';
import Papa from 'papaparse';
import styles from '../../dashboard/admin.module.css';

const REQUIRED_HEADERS = [
    'Product Name', 'SKU', 'Category Name', 'Selling Price'
];

export default function BulkImportProducts() {
    const { user } = useAuth();
    const router = useRouter();
    const fileInputRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [existingProducts, setExistingProducts] = useState([]);

    const [parsedData, setParsedData] = useState(null); // { valid: [], invalid: [], duplicates: [] }
    const [conflictStrategy, setConflictStrategy] = useState('skip'); // 'skip', 'update'

    // Mount tasks: Fetch categories for mapping names to IDs, and existing products for duplicate tracking
    useEffect(() => {
        const fetchInitialData = async () => {
            setLoading(true);
            try {
                // Fetch Categories
                const catSnap = await getDocs(collection(db, 'categories'));
                const cats = catSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setCategories(cats);

                // Fetch existing products for duplicate checking (SKU and Name)
                const prodSnap = await getDocs(collection(db, 'products'));
                const prods = prodSnap.docs.map(doc => ({
                    id: doc.id,
                    skuCode: doc.data().skuCode,
                    productName: doc.data().productName
                }));
                setExistingProducts(prods);
            } catch (error) {
                console.error("Error fetching initial data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchInitialData();
    }, []);

    const generateSlug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const handleDownloadTemplate = () => {
        const headers = [
            'Product Name', 'SKU', 'Category Name', 'Sub-Category Name', 'Selling Price',
            'Discount (%)', 'Short Description', 'Long Description', 'Brand/Maker',
            'Artisan Story', 'Tags (comma separated)', 'Stock Quantity', 'Low Stock Alert Limit',
            'Weight', 'Dimensions', 'Main Image URL', 'Side Image URL', 'Back Image URL', 'Dimensions Image URL',
            'GST Applicable (TRUE/FALSE)', 'GST Percentage', 'Shipping Available (TRUE/FALSE)', 'Shipping Charges', 'Return Policy Days'
        ];

        const sampleRow = [
            'Sample Handwoven Saree', 'SKU12345', 'Sarees', 'Silk', '4500',
            '10', 'A beautiful handwoven saree.', 'Detailed description here...', 'KalaSetu Weavers',
            'Made in Banaras by 3rd generation weavers.', 'Silk,Handwoven,Saree', '20', '5',
            '500g', '5.5m', 'https://example.com/image.jpg', '', '', '',
            'TRUE', '12', 'TRUE', '150', '7'
        ];

        const csvContent = [headers.join(','), sampleRow.join(',')].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'kalasetu_product_import_template.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                validateAndCategorizeData(results.data);
            },
            error: (error) => {
                alert("Error parsing CSV: " + error.message);
            }
        });
    };

    const validateAndCategorizeData = (data) => {
        const valid = [];
        const invalid = [];
        const duplicates = [];

        data.forEach((row, index) => {
            const rowNumber = index + 2; // +1 for 0-index, +1 for header row
            let isValid = true;
            let errorReason = [];

            // 1. Check Required Headers
            for (const header of REQUIRED_HEADERS) {
                if (!row[header] || String(row[header]).trim() === '') {
                    isValid = false;
                    errorReason.push(`Missing required field: ${header}`);
                }
            }

            // 2. Validate Numbers
            const price = parseFloat(row['Selling Price']);
            if (row['Selling Price'] && isNaN(price)) {
                isValid = false;
                errorReason.push('Selling Price must be a valid number');
            }

            // 3. Category Mapping
            let categoryId = null;
            let subCategoryId = null;

            if (row['Category Name']) {
                const matchedCategory = categories.find(c => c.name.toLowerCase() === row['Category Name'].trim().toLowerCase() && !c.parentCategoryId);
                if (matchedCategory) {
                    categoryId = matchedCategory.id;

                    if (row['Sub-Category Name']) {
                        const matchedSub = categories.find(c =>
                            c.name.toLowerCase() === row['Sub-Category Name'].trim().toLowerCase() &&
                            c.parentCategoryId === matchedCategory.id
                        );
                        if (matchedSub) {
                            subCategoryId = matchedSub.id;
                        } else {
                            isValid = false;
                            errorReason.push(`Sub-Category '${row['Sub-Category Name']}' not found under '${row['Category Name']}'`);
                        }
                    }
                } else {
                    isValid = false;
                    errorReason.push(`Top-level Category '${row['Category Name']}' not found in database.`);
                }
            }

            // Add internal tracking data attached to the row
            const processedRow = {
                ...row,
                _internal: {
                    rowNumber,
                    categoryId,
                    subCategoryName: row['Sub-Category Name']?.trim(), // Storing name so it matches product schema expectations for subcategory
                    errorReason: errorReason.join(' | ')
                }
            };

            if (!isValid) {
                invalid.push(processedRow);
                return;
            }

            // 4. Duplicate Check
            const isDuplicate = existingProducts.find(p =>
                (row['SKU'] && p.skuCode && p.skuCode === row['SKU'].trim()) ||
                (p.productName.toLowerCase() === row['Product Name'].trim().toLowerCase())
            );

            if (isDuplicate) {
                processedRow._internal.existingId = isDuplicate.id;
                processedRow._internal.errorReason = `Duplicate matched existing Product Name or SKU`;
                duplicates.push(processedRow);
            } else {
                valid.push(processedRow);
            }
        });

        setParsedData({ valid, invalid, duplicates, total: data.length });
    };

    const handleDownloadErrors = () => {
        if (!parsedData || parsedData.invalid.length === 0) return;

        // Prep rows by adding Error Reason
        const rowsToExport = parsedData.invalid.map(row => {
            const exportRow = { ...row };
            delete exportRow._internal;
            return {
                ...exportRow,
                'Error Reason': row._internal.errorReason
            };
        });

        const csv = Papa.unparse(rowsToExport);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'kalasetu_import_errors.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const processRowToProductData = (row) => {
        return {
            productName: row['Product Name']?.trim() || '',
            categoryId: row._internal.categoryId,
            subCategory: row._internal.subCategoryName || '',
            shortDescription: row['Short Description']?.trim() || '',
            description: row['Long Description']?.trim() || '',
            tags: row['Tags (comma separated)'] ? row['Tags (comma separated)'].split(',').map(t => t.trim()).filter(Boolean) : [],
            skuCode: row['SKU']?.trim() || '',
            brandOrMaker: row['Brand/Maker']?.trim() || '',
            artisanStory: row['Artisan Story']?.trim() || '',
            saleType: 'Sale',
            price: parseFloat(row['Selling Price']) || 0,
            discountPercentage: parseFloat(row['Discount (%)']) || 0,
            gstApplicable: String(row['GST Applicable (TRUE/FALSE)']).toUpperCase() === 'TRUE',
            gstPercentage: parseFloat(row['GST Percentage']) || 18,
            stockQuantity: parseInt(row['Stock Quantity'], 10) || 0,
            lowStockAlertLimit: parseInt(row['Low Stock Alert Limit'], 10) || 0,
            availabilityStatus: parseInt(row['Stock Quantity'], 10) > 0 ? 'In Stock' : 'Out of Stock',
            weight: row['Weight']?.trim() || '',
            dimensions: row['Dimensions']?.trim() || '',
            shippingAvailable: String(row['Shipping Available (TRUE/FALSE)']).toUpperCase() !== 'FALSE', // default true
            shippingCharges: parseFloat(row['Shipping Charges']) || 0,
            returnPolicyDays: parseInt(row['Return Policy Days'], 10) || 7,
            mainImage: row['Main Image URL']?.trim() || '',
            sideImage: row['Side Image URL']?.trim() || '',
            backImage: row['Back Image URL']?.trim() || '',
            dimensionsImage: row['Dimensions Image URL']?.trim() || '',
            slug: generateSlug(row['Product Name']?.trim() || ''),
            isActive: true,
            isApproved: false,
            variants: [],
            updatedAt: serverTimestamp(),
        };
    };

    const handleConfirmImport = async () => {
        if (!parsedData) return;
        setLoading(true);

        const rowsToProcess = [...parsedData.valid];
        if (conflictStrategy === 'update') {
            rowsToProcess.push(...parsedData.duplicates);
        }

        if (rowsToProcess.length === 0) {
            alert('No valid rows to process based on your current settings.');
            setLoading(false);
            return;
        }

        let addedCount = 0;
        let updatedCount = 0;

        try {
            const chunkPromises = rowsToProcess.map(async (row) => {
                const productData = processRowToProductData(row);

                if (row._internal.existingId && conflictStrategy === 'update') {
                    // Update existing
                    await updateDoc(doc(db, 'products', row._internal.existingId), productData);
                    updatedCount++;
                } else {
                    // Add new
                    productData.createdAt = serverTimestamp();
                    productData.createdBy = user?.uid;
                    await addDoc(collection(db, 'products'), productData);
                    addedCount++;
                }
            });

            await Promise.all(chunkPromises);

            alert(`Import Successful! Added ${addedCount} new products, updated ${updatedCount} existing products.`);
            router.push('/admin/inventory');
        } catch (error) {
            console.error('Import Error:', error);
            alert(`Import failed midway: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const resetUpload = () => {
        setParsedData(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <main className={styles.mainContent}>
            <header className={styles.header}>
                <div className={styles.titleGroup}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Link href="/admin/inventory" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>← Back</Link>
                        <h1>Bulk Upload Products</h1>
                    </div>
                    <p>Import products directly into your database using a CSV file.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn-secondary" style={{ padding: '0.75rem 1.25rem', fontSize: '0.9rem' }} onClick={handleDownloadTemplate}>
                        Download Template
                    </button>
                    {parsedData && (
                        <button className="btn-secondary" style={{ padding: '0.75rem 1.25rem', fontSize: '0.9rem' }} onClick={resetUpload}>
                            Start Over
                        </button>
                    )}
                </div>
            </header>

            {!parsedData ? (
                <div className={styles.contentCard} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem', border: '2px dashed #d1d5db', background: '#f9fafb' }}>
                    <div style={{ textAlign: 'center', maxWidth: '500px' }}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Upload your CSV file</h2>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
                            Ensure your CSV adheres perfectly to the column headers specified in the Download Template. Note that Images must be supplied as direct public URLs.
                        </p>

                        <input
                            type="file"
                            accept=".csv"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileUpload}
                        />
                        <button
                            className="btn-primary"
                            onClick={() => fileInputRef.current?.click()}
                            style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}
                            disabled={loading}
                        >
                            {loading ? 'Initializing Data...' : 'Browse CSV File'}
                        </button>


                    </div>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Summary Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                        <div className={styles.contentCard} style={{ padding: '1.5rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{parsedData.total}</div>
                            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Total Rows</div>
                        </div>
                        <div className={styles.contentCard} style={{ padding: '1.5rem', textAlign: 'center', borderLeft: '4px solid #10b981' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>{parsedData.valid.length}</div>
                            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Valid New Records</div>
                        </div>
                        <div className={styles.contentCard} style={{ padding: '1.5rem', textAlign: 'center', borderLeft: '4px solid #f59e0b' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>{parsedData.duplicates.length}</div>
                            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Duplicate Matches</div>
                        </div>
                        <div className={styles.contentCard} style={{ padding: '1.5rem', textAlign: 'center', borderLeft: '4px solid #ef4444' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444' }}>{parsedData.invalid.length}</div>
                            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Invalid Records</div>
                        </div>
                    </div>

                    {/* Invalid Rows Section */}
                    {parsedData.invalid.length > 0 && (
                        <div className={styles.contentCard} style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <h3 style={{ color: '#ef4444', margin: 0 }}>Fix Required: Invalid Records</h3>
                                <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }} onClick={handleDownloadErrors}>
                                    Download Error Report
                                </button>
                            </div>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                These rows cannot be imported due to missing data or unrecognized categories. Please download the error report, fix the issues, and start over, or proceed and only valid rows will be imported.
                            </p>

                            <div style={{ maxHeight: '250px', overflowY: 'auto', background: '#fef2f2', borderRadius: '8px', border: '1px solid #fee2e2' }}>
                                <table className={styles.table} style={{ background: 'transparent' }}>
                                    <thead style={{ background: '#fca5a5', color: '#7f1d1d' }}>
                                        <tr>
                                            <th>Row</th>
                                            <th>Product Name</th>
                                            <th>Error Reason</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {parsedData.invalid.slice(0, 10).map((row, idx) => (
                                            <tr key={idx}>
                                                <td>{row._internal.rowNumber}</td>
                                                <td>{row['Product Name'] || '(Empty)'}</td>
                                                <td style={{ color: '#b91c1c' }}>{row._internal.errorReason}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {parsedData.invalid.length > 10 && (
                                    <div style={{ padding: '0.5rem', textAlign: 'center', color: '#b91c1c', fontSize: '0.85rem' }}>
                                        + {parsedData.invalid.length - 10} more invalid rows...
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Duplicates Options */}
                    {parsedData.duplicates.length > 0 && (
                        <div className={styles.contentCard} style={{ padding: '1.5rem', background: '#fffbeb', border: '1px solid #fde68a' }}>
                            <h3 style={{ color: '#d97706', margin: '0 0 1rem 0' }}>Duplicate Resolution</h3>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', marginBottom: '1rem' }}>
                                We found <strong>{parsedData.duplicates.length}</strong> rows in the CSV that match existing products in your catalog (matched by SKU or Name). How would you like to handle them?
                            </p>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '1rem', background: 'white', border: conflictStrategy === 'skip' ? '2px solid var(--color-maroon)' : '1px solid #d1d5db', borderRadius: '8px', flex: 1 }}>
                                    <input type="radio" name="conflict" checked={conflictStrategy === 'skip'} onChange={() => setConflictStrategy('skip')} style={{ width: '20px', height: '20px' }} />
                                    <div>
                                        <div style={{ fontWeight: 'bold' }}>Skip Duplicates</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Keep my existing products safe. Import only entirely new products.</div>
                                    </div>
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '1rem', background: 'white', border: conflictStrategy === 'update' ? '2px solid var(--color-maroon)' : '1px solid #d1d5db', borderRadius: '8px', flex: 1 }}>
                                    <input type="radio" name="conflict" checked={conflictStrategy === 'update'} onChange={() => setConflictStrategy('update')} style={{ width: '20px', height: '20px' }} />
                                    <div>
                                        <div style={{ fontWeight: 'bold' }}>Update Existing Product</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Overwrite the existing catalog data with the new spreadsheet row.</div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    )}

                    {/* Final Action */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                        <button
                            className="btn-primary"
                            style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}
                            onClick={handleConfirmImport}
                            disabled={loading || (parsedData.valid.length === 0 && (conflictStrategy === 'skip' || parsedData.duplicates.length === 0))}
                        >
                            {loading ? 'Processing...' : `Confirm Import (${parsedData.valid.length + (conflictStrategy === 'update' ? parsedData.duplicates.length : 0)
                                } rows)`}
                        </button>
                    </div>

                </div>
            )}
        </main>
    );
}
