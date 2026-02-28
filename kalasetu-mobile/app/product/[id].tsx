import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, ActivityIndicator, Dimensions } from 'react-native';
import { useLocalSearchParams as expoUseLocalSearchParams, useRouter as expoUseRouter, Stack as ExpoStack } from 'expo-router';
import { fetchAPI } from '../../src/lib/api';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useCart } from '../../src/context/CartContext';

const { width } = Dimensions.get('window');

export default function ProductDetailsScreen() {
    const { id } = expoUseLocalSearchParams();
    const router = expoUseRouter();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Variant Selections
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);

    const { addToCart } = useCart() as any;

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            try {
                const res = await fetchAPI(`/products/${id}`);
                if (res.success && res.data) {
                    setProduct(res.data);

                    // Auto-select first available variants if they exist
                    if (res.data.variants?.sizes?.length > 0) setSelectedSize(res.data.variants.sizes[0]);
                    if (res.data.variants?.colors?.length > 0) setSelectedColor(res.data.variants.colors[0]);
                    if (res.data.variants?.materials?.length > 0) setSelectedMaterial(res.data.variants.materials[0]);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <SafeAreaView style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#2C1A1D" />
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

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.productName,
            price: product.price,
            image: product.mainImage,
            variant: {
                size: selectedSize,
                color: selectedColor,
                material: selectedMaterial
            },
            quantity
        });
        alert("Added to cart!");
    };

    // Images array
    const productImages = product.otherImages ? [product.mainImage, ...product.otherImages] : [product.mainImage];

    return (
        <SafeAreaView style={styles.container}>
            <ExpoStack.Screen options={{ headerShown: false }} />

            {/* Custom Header Floating */}
            <View style={styles.headerFloating}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerIconBtn}>
                    <FontAwesome name="arrow-left" size={20} color="#2C1A1D" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerIconBtn} onPress={() => router.push('/cart')}>
                    <FontAwesome name="shopping-bag" size={20} color="#2C1A1D" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                {/* IMAGE SLIDER */}
                <View style={styles.imageSliderContainer}>
                    {productImages[0] ? (
                        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
                            {productImages.map((img, idx) => (
                                <Image key={idx} source={{ uri: img }} style={styles.productImage} resizeMode="cover" />
                            ))}
                        </ScrollView>
                    ) : (
                        <View style={[styles.productImage, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3f4f6' }]}>
                            <FontAwesome name="picture-o" size={60} color="#9ca3af" />
                        </View>
                    )}
                </View>

                {/* PRODUCT INFO PORTION */}
                <View style={styles.infoContainer}>
                    <View style={styles.titlePriceRow}>
                        <View style={{ flex: 1, paddingRight: 16 }}>
                            <Text style={styles.brandText}>{product.brand || 'KalaSetu Exclusive'}</Text>
                            <Text style={styles.productTitle}>{product.productName}</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.productPrice}>₹{product.price?.toLocaleString('en-IN')}</Text>
                            <Text style={styles.taxText}>Incl. of all taxes</Text>
                        </View>
                    </View>

                    {/* REVIEWS & STOCK */}
                    <View style={styles.metricsRow}>
                        <View style={styles.ratingBadge}>
                            <FontAwesome name="star" size={12} color="#f59e0b" />
                            <Text style={styles.ratingText}>4.8 (217 Reviews)</Text>
                        </View>
                        <Text style={styles.stockText}>
                            <FontAwesome name="check-circle" size={12} color="#16a34a" /> In stock
                        </Text>
                    </View>

                    <View style={styles.divider} />

                    {/* VARIANTS */}
                    {product.variants?.sizes?.length > 0 && (
                        <View style={styles.variantSection}>
                            <Text style={styles.variantTitle}>Select Size</Text>
                            <View style={styles.variantRow}>
                                {product.variants.sizes.map((size: string) => (
                                    <TouchableOpacity
                                        key={size}
                                        style={[styles.variantBox, selectedSize === size && styles.variantBoxActive]}
                                        onPress={() => setSelectedSize(size)}
                                    >
                                        <Text style={[styles.variantText, selectedSize === size && styles.variantTextActive]}>{size}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    )}

                    {product.variants?.colors?.length > 0 && (
                        <View style={styles.variantSection}>
                            <Text style={styles.variantTitle}>Select Color</Text>
                            <View style={styles.variantRow}>
                                {product.variants.colors.map((color: string) => (
                                    <TouchableOpacity
                                        key={color}
                                        style={[styles.variantBox, selectedColor === color && styles.variantBoxActive]}
                                        onPress={() => setSelectedColor(color)}
                                    >
                                        <Text style={[styles.variantText, selectedColor === color && styles.variantTextActive]}>{color}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    )}

                    {product.variants?.materials?.length > 0 && (
                        <View style={styles.variantSection}>
                            <Text style={styles.variantTitle}>Select Material</Text>
                            <View style={styles.variantRow}>
                                {product.variants.materials.map((material: string) => (
                                    <TouchableOpacity
                                        key={material}
                                        style={[styles.variantBox, selectedMaterial === material && styles.variantBoxActive]}
                                        onPress={() => setSelectedMaterial(material)}
                                    >
                                        <Text style={[styles.variantText, selectedMaterial === material && styles.variantTextActive]}>{material}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    )}

                    {/* DESCRIPTION */}
                    <Text style={styles.sectionTitle}>Product Details</Text>
                    <Text style={styles.descriptionText}>{product.description}</Text>

                    <View style={styles.deliveryInfo}>
                        <FontAwesome name="truck" size={16} color="#666" style={{ marginRight: 10 }} />
                        <Text style={styles.deliveryText}>Free delivery available in the nearest store</Text>
                    </View>
                </View>
            </ScrollView>

            {/* STICKY FOOTER */}
            <View style={styles.stickyFooter}>
                <TouchableOpacity style={styles.wishlistBtnAction}>
                    <FontAwesome name="heart-o" size={24} color="#2C1A1D" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.addToCartBtn} onPress={handleAddToCart}>
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>

            {/* WHATSAPP BULK INQUIRY FLOAT */}
            <TouchableOpacity style={styles.whatsappFloat} onPress={() => alert("WhatsApp Inquiry Opening...")}>
                <FontAwesome name="whatsapp" size={24} color="white" />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAFAFA' },
    centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAFAFA' },
    errorText: { fontSize: 18, color: '#333', marginBottom: 16 },
    backBtn: { padding: 12, backgroundColor: '#2C1A1D', borderRadius: 8 },
    backBtnText: { color: 'white', fontWeight: 'bold' },

    headerFloating: { position: 'absolute', top: 50, left: 20, right: 20, flexDirection: 'row', justifyContent: 'space-between', zIndex: 10 },
    headerIconBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.9)', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },

    imageSliderContainer: { width: width, height: 400, backgroundColor: '#eee' },
    productImage: { width: width, height: 400 },

    infoContainer: { padding: 24, backgroundColor: 'white', borderTopLeftRadius: 24, borderTopRightRadius: 24, marginTop: -20, shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 5 },

    titlePriceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
    brandText: { fontSize: 13, color: '#888', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
    productTitle: { fontSize: 24, fontWeight: 'bold', color: '#111', lineHeight: 30 },
    productPrice: { fontSize: 22, fontWeight: '900', color: '#2C1A1D' },
    taxText: { fontSize: 11, color: '#888', marginTop: 2 },

    metricsRow: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 20 },
    ratingBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fffbe1', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
    ratingText: { fontSize: 13, fontWeight: '600', color: '#d97706', marginLeft: 4 },
    stockText: { fontSize: 13, color: '#16a34a', fontWeight: '500' },

    divider: { height: 1, backgroundColor: '#eee', marginVertical: 20 },

    variantSection: { marginBottom: 20 },
    variantTitle: { fontSize: 15, fontWeight: 'bold', color: '#333', marginBottom: 10 },
    variantRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    variantBox: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', backgroundColor: '#fff' },
    variantBoxActive: { borderColor: '#2C1A1D', backgroundColor: '#2C1A1D' },
    variantText: { fontSize: 14, color: '#555', fontWeight: '500' },
    variantTextActive: { color: 'white', fontWeight: 'bold' },

    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#111', marginTop: 10, marginBottom: 12 },
    descriptionText: { fontSize: 15, lineHeight: 24, color: '#555', marginBottom: 24 },

    deliveryInfo: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f9fafb', padding: 12, borderRadius: 8 },
    deliveryText: { fontSize: 13, color: '#444' },

    stickyFooter: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'white', paddingHorizontal: 24, paddingVertical: 16, borderTopWidth: 1, borderTopColor: '#f0f0f0', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    wishlistBtnAction: { width: 56, height: 56, borderRadius: 16, borderWidth: 1, borderColor: '#ddd', justifyContent: 'center', alignItems: 'center' },
    addToCartBtn: { flex: 1, height: 56, backgroundColor: '#2C1A1D', borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginLeft: 16 },
    addToCartText: { color: 'white', fontSize: 16, fontWeight: 'bold' },

    whatsappFloat: { position: 'absolute', bottom: 90, right: 20, width: 50, height: 50, borderRadius: 25, backgroundColor: '#25D366', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 5 }
});
