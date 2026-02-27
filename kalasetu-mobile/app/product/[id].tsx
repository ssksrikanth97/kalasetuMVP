import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, ActivityIndicator, Alert, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { fetchAPI } from '../../src/lib/api';
import { useCart } from '../../src/context/CartContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

export default function ProductDetailsScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { addToCart, cartCount } = useCart() as any;

    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedVariants, setSelectedVariants] = useState<any>({});

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            try {
                const res = await fetchAPI(`/products/${id}`);
                if (res.success && res.data) {
                    let data: any = res.data;

                    if (data.variants && Array.isArray(data.variants)) {
                        data.variants = data.variants.map((v: any, i: number) => ({ ...v, id: v.id || `v-${i}` }));

                        // Set Initial Variants
                        const initialSelections: any = {};
                        const grouped = data.variants.reduce((acc: any, variant: any) => {
                            if (!acc[variant.type]) acc[variant.type] = [];
                            acc[variant.type].push(variant);
                            return acc;
                        }, {});

                        Object.keys(grouped).forEach(type => {
                            initialSelections[type] = grouped[type][0];
                        });
                        setSelectedVariants(initialSelections);
                    }

                    setProduct(data);
                }
            } catch (error) {
                console.error("Error fetching product details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleVariantChange = (type: string, variant: any) => {
        setSelectedVariants((prev: any) => ({ ...prev, [type]: variant }));
    };

    const updateQuantity = (delta: number) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#f1501c" />
            </SafeAreaView>
        );
    }

    if (!product) {
        return (
            <SafeAreaView style={styles.centerContainer}>
                <Text style={styles.errorText}>Product not found</Text>
                <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                    <Text style={styles.backBtnText}>Go Back</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    const groupedVariants = product.variants?.reduce((acc: any, variant: any) => {
        if (!acc[variant.type]) acc[variant.type] = [];
        acc[variant.type].push(variant);
        return acc;
    }, {}) || {};

    const activeExtraPrice: number = Object.values(selectedVariants).reduce((sum: any, v: any) => Number(sum) + (Number(v?.extraPrice) || 0), 0) as number;
    const finalPrice: number = Number(product.price || 0) + activeExtraPrice;

    const handleAddToCart = () => {
        const variantString = Object.values(selectedVariants).map((v: any) => `${v.type}: ${v.value}`).join(' | ');
        const cartItemProduct = {
            ...product,
            price: finalPrice,
            productName: variantString ? `${product.productName} (${variantString})` : product.productName,
            selectedVariants
        };

        addToCart(cartItemProduct, quantity);
        Alert.alert("Added to Cart", `Added ${quantity}x ${product.productName} to your cart.`);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerIcon}>
                    <FontAwesome name="arrow-left" size={20} color="#2C1A1D" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/cart')} style={styles.headerIcon}>
                    <View>
                        <FontAwesome name="shopping-cart" size={22} color="#2C1A1D" />
                        {cartCount > 0 && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{cartCount}</Text>
                            </View>
                        )}
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Image Gallery Mock (Swipeable later) */}
                {product.mainImage ? (
                    <Image
                        source={{ uri: product.mainImage }}
                        style={styles.heroImage}
                        resizeMode="contain"
                    />
                ) : (
                    <View style={[styles.heroImage, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3f4f6' }]}>
                        <FontAwesome name="picture-o" size={80} color="#9ca3af" />
                    </View>
                )}

                <View style={styles.content}>
                    <Text style={styles.title}>{product.productName}</Text>

                    <View style={styles.priceRow}>
                        <Text style={styles.price}>₹{finalPrice.toLocaleString('en-IN')}</Text>
                        {product.discountPercentage > 0 && (
                            <Text style={styles.discountBadge}>{product.discountPercentage}% OFF</Text>
                        )}
                    </View>

                    {/* Variants */}
                    {Object.keys(groupedVariants).length > 0 && (
                        <View style={styles.variantSection}>
                            {Object.keys(groupedVariants).map(type => (
                                <View key={type} style={styles.variantGroup}>
                                    <Text style={styles.variantTitle}>{type}</Text>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                        <View style={styles.variantChipsContainer}>
                                            {groupedVariants[type].map((variant: any) => {
                                                const isSelected = selectedVariants[type]?.id === variant.id;
                                                return (
                                                    <TouchableOpacity
                                                        key={variant.id}
                                                        style={[styles.variantChip, isSelected && styles.variantChipSelected]}
                                                        onPress={() => handleVariantChange(type, variant)}
                                                    >
                                                        <Text style={[styles.variantText, isSelected && styles.variantTextSelected]}>
                                                            {variant.value}
                                                        </Text>
                                                    </TouchableOpacity>
                                                );
                                            })}
                                        </View>
                                    </ScrollView>
                                </View>
                            ))}
                        </View>
                    )}

                    <View style={styles.divider} />

                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.description}>{product.description || product.shortDescription || "No detailed description available."}</Text>
                </View>
            </ScrollView>

            {/* Bottom Floating Bar */}
            <View style={styles.floatingBottomBar}>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantity(-1)}>
                        <FontAwesome name="minus" size={14} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{quantity}</Text>
                    <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantity(1)}>
                        <FontAwesome name="plus" size={14} color="#333" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.addCartBtn} onPress={handleAddToCart}>
                    <Text style={styles.addCartText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
    errorText: { fontSize: 18, color: '#333', marginBottom: 16 },
    backBtn: { padding: 12, backgroundColor: '#f1501c', borderRadius: 8 },
    backBtnText: { color: 'white', fontWeight: 'bold' },

    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee', backgroundColor: '#fff' },
    headerIcon: { padding: 8 },
    badge: { position: 'absolute', right: -6, top: -6, backgroundColor: '#dc2626', borderRadius: 10, width: 18, height: 18, justifyContent: 'center', alignItems: 'center' },
    badgeText: { color: 'white', fontSize: 10, fontWeight: 'bold' },

    heroImage: { width: width, height: width, backgroundColor: '#f9fafb' },

    content: { padding: 20 },
    title: { fontSize: 22, fontWeight: 'bold', color: '#111', marginBottom: 12 },

    priceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
    price: { fontSize: 26, fontWeight: 'bold', color: '#800000', marginRight: 12 },
    discountBadge: { backgroundColor: '#e8f5e9', color: '#2e7d32', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, fontWeight: 'bold', overflow: 'hidden' },

    variantSection: { marginBottom: 16 },
    variantGroup: { marginBottom: 16 },
    variantTitle: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 8 },
    variantChipsContainer: { flexDirection: 'row', gap: 8 },
    variantChip: { borderWidth: 1, borderColor: '#d1d5db', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, backgroundColor: '#fff' },
    variantChipSelected: { borderColor: '#800000', backgroundColor: '#fff5f5' },
    variantText: { color: '#4b5563', fontWeight: '500' },
    variantTextSelected: { color: '#800000', fontWeight: 'bold' },

    divider: { height: 1, backgroundColor: '#eee', marginVertical: 24 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#111', marginBottom: 12 },
    description: { fontSize: 15, lineHeight: 24, color: '#4b5563' },

    floatingBottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'white', flexDirection: 'row', padding: 16, borderTopWidth: 1, borderTopColor: '#eee', paddingBottom: 34 },
    quantityContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#eee', borderRadius: 8, marginRight: 16 },
    qtyBtn: { padding: 14 },
    qtyText: { fontSize: 16, fontWeight: 'bold', minWidth: 30, textAlign: 'center' },
    addCartBtn: { flex: 1, backgroundColor: '#2C1A1D', borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
    addCartText: { color: 'white', fontSize: 16, fontWeight: 'bold' }
});
