import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator, TextInput, Linking, Alert } from 'react-native';
import { useCart } from '../../src/context/CartContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { fetchAPI } from '../../src/lib/api';

export default function MarketplaceScreen() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart() as any;
    const router = useRouter();

    // Advanced Shop State
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Products
                const productRes = await fetchAPI('/products');
                const fetchedProducts = productRes.data;
                setProducts(fetchedProducts);

                // Fetch Categories
                const catRes = await fetchAPI('/categories');
                setCategories(catRes.data);

                // Initialize Quantities
                const initialQty = {};
                fetchedProducts.forEach(p => initialQty[p.id] = 1);
                setQuantities(initialQty);

            } catch (error) {
                console.error("Error fetching marketplace REST API data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleQuantityChange = (productId, delta) => {
        setQuantities(prev => ({
            ...prev,
            [productId]: Math.max(1, (prev[productId] || 1) + delta)
        }));
    };

    const handleAddToCart = (product: any) => {
        const qty = quantities[product.id] || 1;
        addToCart(product, qty);
        Alert.alert("Added to Cart", `Added ${qty}x ${product.productName} to your cart.`);
    };

    const handleWhatsAppOrder = (product) => {
        const qty = quantities[product.id] || 1;
        const message = `Hi, I want to order ${product.productName}. Quantity: ${qty}. Price: ₹${(product.price * qty).toLocaleString('en-IN')}.`;

        // Use a generic WhatsApp string or try to redirect
        const waUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;
        Linking.canOpenURL(waUrl)
            .then((supported) => {
                if (!supported) {
                    Alert.alert("Error", "WhatsApp is not installed on this device");
                } else {
                    return Linking.openURL(waUrl);
                }
            })
            .catch((err) => console.error("An error occurred", err));
    };

    // Derived State
    const filteredProducts = products.filter(p => {
        // Filter by Category
        const categoryMatch = activeFilter === "All" || p.categoryId === activeFilter || p.subCategory === activeFilter;

        // Filter by Search
        const searchRegex = new RegExp(searchQuery, 'i');
        const searchMatch = !searchQuery || searchRegex.test(p.productName) || searchRegex.test(p.categoryId) || searchRegex.test(p.shortDescription);

        return categoryMatch && searchMatch;
    });

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#f1501c" />
                <Text style={styles.loadingText}>Loading Bazaar...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <View style={styles.searchBar}>
                    <FontAwesome name="search" size={16} color="#9ca3af" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search for products, categories..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholderTextColor="#9ca3af"
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearSearchBtn}>
                            <FontAwesome name="times-circle" size={16} color="#9ca3af" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Horizontal Category Filters */}
            <View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
                    <TouchableOpacity
                        style={[styles.categoryBtn, activeFilter === 'All' && styles.categoryBtnActive]}
                        onPress={() => setActiveFilter('All')}
                    >
                        <Text style={[styles.categoryBtnText, activeFilter === 'All' && styles.categoryBtnTextActive]}>All Products</Text>
                    </TouchableOpacity>
                    {categories.map(cat => (
                        <TouchableOpacity
                            key={cat.id}
                            style={[styles.categoryBtn, activeFilter === cat.id && styles.categoryBtnActive]}
                            onPress={() => setActiveFilter(cat.id)}
                        >
                            <Text style={[styles.categoryBtnText, activeFilter === cat.id && styles.categoryBtnTextActive]}>{cat.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Main Product Grid */}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {searchQuery.length > 0 && (
                    <Text style={styles.resultsText}>Found {filteredProducts.length} items</Text>
                )}

                <View style={styles.grid}>
                    {filteredProducts.map((product) => {
                        const qty = quantities[product.id] || 1;

                        // Just as implemented on the website, if it allows bulk, try whatsapp
                        // We will allow WhatsApp as a generic fallback test button too
                        const isBulk = product.enableBulkEnquiry && qty > (product.bulkThreshold || 10);

                        return (
                            <TouchableOpacity
                                key={product.id}
                                style={styles.productCard}
                                onPress={() => router.push(`/product/${product.id}`)}
                                activeOpacity={0.9}
                            >
                                <View style={[styles.imageContainer, { backgroundColor: '#eee' }]}>
                                    {product.mainImage ? (
                                        <Image source={{ uri: product.mainImage }} style={styles.productImage} resizeMode="cover" />
                                    ) : (
                                        <View style={[styles.productImage, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3f4f6' }]}>
                                            <FontAwesome name="picture-o" size={40} color="#9ca3af" />
                                        </View>
                                    )}
                                    {Number(product.discountPercentage) > 0 && (
                                        <View style={styles.discountBadge}>
                                            <Text style={styles.discountText}>{product.discountPercentage}% OFF</Text>
                                        </View>
                                    )}

                                    {/* Web-Parity Hover Overlay Actions -> Mapped as always-visible UI elements for Mobile touch */}
                                    <View style={styles.mobileQuantityAdjuster}>
                                        <TouchableOpacity style={styles.qtyBtn} onPress={() => handleQuantityChange(product.id, -1)}>
                                            <FontAwesome name="minus" size={10} color="#333" />
                                        </TouchableOpacity>
                                        <Text style={styles.qtyText}>{qty}</Text>
                                        <TouchableOpacity style={styles.qtyBtn} onPress={() => handleQuantityChange(product.id, 1)}>
                                            <FontAwesome name="plus" size={10} color="#333" />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={styles.productInfo}>
                                    <Text style={styles.categoryText}>{product.categoryId}</Text>
                                    <Text style={styles.productTitle} numberOfLines={2}>{product.productName}</Text>
                                    <Text style={styles.productPrice}>₹{product.price?.toLocaleString('en-IN')}</Text>

                                    {isBulk ? (
                                        <TouchableOpacity style={[styles.cartButton, { backgroundColor: '#4b5563' }]}>
                                            <FontAwesome name="envelope" size={14} color="white" style={{ marginRight: 6 }} />
                                            <Text style={styles.cartButtonText}>Bulk Enquiry</Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity style={styles.cartButton} onPress={() => handleAddToCart(product)}>
                                            <FontAwesome name="shopping-cart" size={14} color="white" style={{ marginRight: 6 }} />
                                            <Text style={styles.cartButtonText}>Add to Cart</Text>
                                        </TouchableOpacity>
                                    )}

                                    {/* Alternate Direct Action Test */}
                                    <TouchableOpacity style={styles.waButton} onPress={() => handleWhatsAppOrder(product)}>
                                        <FontAwesome name="whatsapp" size={14} color="#15803d" style={{ marginRight: 6 }} />
                                        <Text style={styles.waButtonText}>WhatsApp</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        );
                    })}

                    {filteredProducts.length === 0 && (
                        <View style={styles.emptyContainer}>
                            <FontAwesome name="search" size={40} color="#ccc" style={{ marginBottom: 16 }} />
                            <Text style={styles.emptyText}>No products found matching your criteria.</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9fafb' },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    loadingText: { marginTop: 12, fontSize: 14, color: '#666' },

    header: { padding: 16, paddingTop: 10, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#eee' },

    searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f3f4f6', borderRadius: 8, paddingHorizontal: 12, height: 44 },
    searchIcon: { marginRight: 8 },
    searchInput: { flex: 1, fontSize: 14, color: '#111' },
    clearSearchBtn: { padding: 4 },

    categoryScroll: { paddingHorizontal: 16, paddingVertical: 12, gap: 10 },
    categoryBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#d1d5db', backgroundColor: 'white' },
    categoryBtnActive: { borderColor: '#2C1A1D', backgroundColor: '#fff0f3' },
    categoryBtnText: { fontSize: 13, fontWeight: '600', color: '#374151' },
    categoryBtnTextActive: { color: '#2C1A1D' },

    scrollContent: { padding: 16 },
    resultsText: { fontSize: 13, color: '#6b7280', marginBottom: 16, fontWeight: '500' },

    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },

    productCard: { width: '48%', backgroundColor: 'white', borderRadius: 12, marginBottom: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
    imageContainer: { position: 'relative', width: '100%', aspectRatio: 1 },
    productImage: { width: '100%', height: '100%' },
    discountBadge: { position: 'absolute', top: 8, left: 8, backgroundColor: '#059669', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
    discountText: { color: 'white', fontSize: 10, fontWeight: 'bold' },

    mobileQuantityAdjuster: { position: 'absolute', bottom: 8, right: 8, backgroundColor: 'white', borderRadius: 6, flexDirection: 'row', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 3 },
    qtyBtn: { padding: 6, paddingHorizontal: 8 },
    qtyText: { fontSize: 12, fontWeight: 'bold', color: '#111', minWidth: 16, textAlign: 'center' },

    productInfo: { padding: 12 },
    categoryText: { fontSize: 10, color: '#C89B3C', textTransform: 'uppercase', marginBottom: 4, fontWeight: 'bold' },
    productTitle: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8, height: 38 },
    productPrice: { fontSize: 16, fontWeight: 'bold', color: '#2C1A1D', marginBottom: 12 },

    cartButton: { flexDirection: 'row', backgroundColor: '#f1501c', paddingVertical: 8, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
    cartButtonText: { color: 'white', fontSize: 12, fontWeight: 'bold' },

    waButton: { flexDirection: 'row', backgroundColor: '#ecfdf5', borderWidth: 1, borderColor: '#a7f3d0', paddingVertical: 8, borderRadius: 6, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
    waButtonText: { color: '#15803d', fontSize: 12, fontWeight: 'bold' },

    emptyContainer: { width: '100%', alignItems: 'center', justifyContent: 'center', paddingVertical: 40 },
    emptyText: { fontSize: 14, color: '#666', textAlign: 'center' }
});
