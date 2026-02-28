import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { fetchAPI } from '../../src/lib/api';
import { useAuth } from '../../src/context/AuthContext';
import { useWishlist } from '../../src/context/WishlistContext';
const { width, height } = Dimensions.get('window');
export default function HomeScreen() {
    const [homeData, setHomeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { user } = useAuth() as any;
    const { isInWishlist, toggleWishlist } = useWishlist() as any;

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                setLoading(true);
                const res = await fetchAPI('/home');
                setHomeData(res.data);
            } catch (error) {
                console.error("Error fetching homepage REST API data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHomeData();
    }, []);

    if (loading || !homeData) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2C1A1D" />
                <Text style={{ marginTop: 10, color: '#2C1A1D' }}>Loading KalaSetu...</Text>
            </View>
        );
    }

    const { banners, categories, sections } = homeData;

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Custom Header */}
            <View style={styles.header}>
                <View>
                    <Image source={require('../../assets/images/logo.png')} style={{ width: 120, height: 40 }} resizeMode="contain" />
                </View>
                <View style={styles.headerIcons}>
                    <TouchableOpacity style={styles.iconBtn} onPress={() => router.push('/cart')}>
                        <FontAwesome name="shopping-bag" size={20} color="#2C1A1D" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                {/* HERO BANNER SLIDER */}
                {banners && banners.length > 0 && (
                    <View style={styles.heroSection}>
                        <ScrollView
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            style={styles.heroScroll}
                        >
                            {banners.map((banner: any, index: number) => (
                                <TouchableOpacity
                                    key={banner.id || index}
                                    style={styles.bannerContainer}
                                    activeOpacity={0.9}
                                    onPress={() => {
                                        if (banner.linkType === 'product') router.push(`/product/${banner.linkId}`);
                                        else if (banner.linkType === 'event') router.push(`/event/${banner.linkId}`);
                                        // Category linking could go to explore tab with params
                                    }}
                                >
                                    <Image
                                        source={{ uri: banner.imageUrl }}
                                        style={styles.heroImage}
                                        resizeMode="cover"
                                    />
                                    <View style={styles.bannerOverlay}>
                                        {banner.title && (
                                            <Text style={styles.bannerTitle}>{banner.title}</Text>
                                        )}
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        {/* Dot Indicators */}
                        <View style={styles.dotContainer}>
                            {banners.map((_: any, i: number) => (
                                <View key={i} style={[styles.dot, i === 0 ? styles.activeDot : null]} />
                            ))}
                        </View>
                    </View>
                )}

                <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
                    <Text style={styles.greetingText}>Welcome back,</Text>
                    <Text style={styles.userName}>{user ? user.displayName || 'User' : 'Guest'}</Text>
                </View>

                {/* DYNAMIC SECTIONS AND CATEGORIES */}
                {sections.map((section: any, sectionIndex: number) => {
                    if (!section.items || section.items.length === 0) return null;

                    const renderSection = (
                        <View key={section.id || sectionIndex} style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>{section.title}</Text>
                                <TouchableOpacity><Text style={styles.seeAllText}>See all</Text></TouchableOpacity>
                            </View>

                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
                                {section.items.map((product: any, index: number) => (
                                    <TouchableOpacity
                                        key={`${product.id}-${index}`}
                                        style={styles.productCard}
                                        onPress={() => router.push(`/product/${product.id}`)}
                                        activeOpacity={0.8}
                                    >
                                        <View style={styles.productImageContainer}>
                                            {product.mainImage ? (
                                                <Image source={{ uri: product.mainImage }} style={styles.productImage} resizeMode="cover" />
                                            ) : (
                                                <View style={[styles.productImage, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3f4f6' }]}>
                                                    <FontAwesome name="picture-o" size={40} color="#9ca3af" />
                                                </View>
                                            )}

                                            {/* Top badges */}
                                            {section.id === 'discounted' && (
                                                <View style={styles.discountBadge}>
                                                    <Text style={styles.discountText}>-{product.discountPercentage || 50}%</Text>
                                                </View>
                                            )}
                                            {section.id === 'new-arrivals' && (
                                                <View style={styles.newBadge}>
                                                    <Text style={styles.newText}>NEW</Text>
                                                </View>
                                            )}

                                            {/* Wishlist Icon */}
                                            <TouchableOpacity style={styles.wishlistBtn} onPress={() => toggleWishlist(product)}>
                                                <FontAwesome name={isInWishlist(product.id) ? "heart" : "heart-o"} size={16} color={isInWishlist(product.id) ? "#f1501c" : "#666"} />
                                            </TouchableOpacity>
                                        </View>

                                        <View style={styles.productInfo}>
                                            <Text style={styles.productBrand} numberOfLines={1}>{product.brand || 'KalaSetu'}</Text>
                                            <Text style={styles.productTitle} numberOfLines={2}>{product.productName}</Text>

                                            <View style={styles.priceRow}>
                                                <Text style={styles.productPrice}>₹{product.price?.toLocaleString('en-IN')}</Text>
                                                <TouchableOpacity style={styles.addBtn}>
                                                    <FontAwesome name="plus" size={12} color="white" />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    );

                    if (section.id === 'new-arrivals') {
                        return (
                            <View key={`group-${section.id}`}>
                                {renderSection}
                                {/* CATEGORIES GRID SECTION */}
                                <View style={styles.section}>
                                    <View style={styles.sectionHeader}>
                                        <Text style={styles.sectionTitle}>Categories</Text>
                                        <TouchableOpacity><Text style={styles.seeAllText}>See all</Text></TouchableOpacity>
                                    </View>
                                    <View style={styles.categoriesGrid}>
                                        {categories.map((cat: any, index: number) => (
                                            <TouchableOpacity key={cat.id || index} style={styles.categoryGridItem} onPress={() => { }}>
                                                <View style={styles.categoryIconContainer}>
                                                    <FontAwesome name="th-large" size={24} color="#f1501c" />
                                                </View>
                                                <Text style={styles.categoryGridText} numberOfLines={2}>{cat.name}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>
                            </View>
                        );
                    }

                    return renderSection;
                })}

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAFAFA' },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAFAFA' },

    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16, backgroundColor: '#FAFAFA' },
    greetingText: { fontSize: 13, color: '#666' },
    userName: { fontSize: 20, fontWeight: 'bold', color: '#2C1A1D' },
    headerIcons: { flexDirection: 'row', gap: 16 },
    iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },

    heroSection: { height: height * 0.25, marginTop: 10, marginBottom: 20 },
    heroScroll: { flex: 1 },
    bannerContainer: { width: width - 40, marginHorizontal: 20, borderRadius: 16, overflow: 'hidden', backgroundColor: '#e0e0e0' },
    heroImage: { width: '100%', height: '100%' },
    bannerOverlay: { position: 'absolute', bottom: 16, left: 16, right: 16 },
    bannerTitle: { color: 'white', fontSize: 22, fontWeight: 'bold', textShadowColor: 'rgba(0,0,0,0.5)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 4 },

    dotContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 12, gap: 6 },
    dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#ddd' },
    activeDot: { width: 16, height: 6, borderRadius: 3, backgroundColor: '#2C1A1D' },

    section: { marginBottom: 30 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', paddingHorizontal: 20, marginBottom: 16 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#2C1A1D' },
    seeAllText: { fontSize: 13, color: '#888', fontWeight: '500' },

    horizontalScroll: { paddingHorizontal: 20, gap: 12 },

    categoryBadge: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 24, backgroundColor: 'white', borderWidth: 1, borderColor: '#eee', marginRight: 8 },
    categoryText: { fontSize: 14, fontWeight: '500', color: '#444' },

    productCard: { width: 160, backgroundColor: 'white', borderRadius: 16, padding: 10, marginRight: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
    productImageContainer: { width: '100%', height: 140, borderRadius: 12, overflow: 'hidden', backgroundColor: '#F5F5F5', position: 'relative' },
    productImage: { width: '100%', height: '100%' },

    wishlistBtn: { position: 'absolute', top: 8, right: 8, width: 28, height: 28, borderRadius: 14, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 1 },
    discountBadge: { position: 'absolute', bottom: 8, left: 8, backgroundColor: '#bbF7D0', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
    discountText: { color: '#166534', fontSize: 10, fontWeight: 'bold' },
    newBadge: { position: 'absolute', top: 8, left: 8, backgroundColor: '#2C1A1D', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
    newText: { color: 'white', fontSize: 10, fontWeight: 'bold' },

    productInfo: { paddingTop: 12 },
    productBrand: { fontSize: 12, color: '#888', marginBottom: 2 },
    productTitle: { fontSize: 14, fontWeight: '500', color: '#222', marginBottom: 8, height: 40 },

    priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    productPrice: { fontSize: 16, fontWeight: 'bold', color: '#2C1A1D' },
    addBtn: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#2C1A1D', justifyContent: 'center', alignItems: 'center' },

    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 10,
        justifyContent: 'flex-start'
    },
    categoryGridItem: {
        width: '25%',  // 4 items per row
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    categoryIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff8f1',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
        borderWidth: 1,
        borderColor: '#feebc8'
    },
    categoryGridText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#333',
        textAlign: 'center'
    }
});
