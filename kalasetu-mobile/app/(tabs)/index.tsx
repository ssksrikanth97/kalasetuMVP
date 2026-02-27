import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { fetchAPI } from '../../src/lib/api';

export default function HomeScreen() {
    const [featuredEvents, setFeaturedEvents] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [discountedProducts, setDiscountedProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch Events
                const eventsRes = await fetchAPI('/events?limit=3');
                setFeaturedEvents(eventsRes.data);

                // Fetch Categories
                const catsRes = await fetchAPI('/categories');
                setCategories(catsRes.data.slice(0, 8));

                // Fetch Featured Products
                const featuredRes = await fetchAPI('/products?limit=8');
                setFeaturedProducts(featuredRes.data);

                // Fetch Discounted Products
                const discountedRes = await fetchAPI('/products?limit=8&discount=true');
                setDiscountedProducts(discountedRes.data);
            } catch (error) {
                console.error("Error fetching homepage REST API data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#f1501c" />
                <Text style={{ marginTop: 10 }}>Loading KalaSetu...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.appHeader}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={styles.logoImage}
                    resizeMode="contain"
                />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* HERO SECTION */}
                <View style={styles.heroSection}>
                    <Image
                        source={require('../../assets/images/hero.jpg')}
                        style={styles.heroImage}
                        resizeMode="cover"
                    />
                    <View style={styles.heroOverlay} />
                    <View style={styles.heroContent}>
                        <Text style={styles.heroTagline}>WHERE TRADITION MEETS MODERNITY</Text>
                        <Text style={styles.heroTitle}>Discover the Soul of Indian Classical Arts</Text>
                    </View>
                </View>

                {/* UPCOMING EVENTS */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Upcoming Events</Text>
                    <Text style={styles.sectionSubtitle}>Immerse yourself in live performances</Text>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
                        {featuredEvents.map(event => {
                            const dateObj = event.date ? new Date(event.date) : new Date();
                            return (
                                <TouchableOpacity
                                    key={event.id}
                                    style={styles.eventCard}
                                    onPress={() => router.push(`/event/${event.id}`)}
                                >
                                    <View style={styles.imagePlaceholder}>
                                        {event.imageUrl ? (
                                            <Image source={{ uri: event.imageUrl }} style={styles.eventImage} resizeMode="cover" />
                                        ) : (
                                            <View style={[styles.eventImage, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3f4f6' }]}>
                                                <FontAwesome name="picture-o" size={40} color="#9ca3af" />
                                            </View>
                                        )}
                                    </View>
                                    <View style={styles.eventInfo}>
                                        <Text style={styles.eventTitle} numberOfLines={1}>{event.name}</Text>
                                        <View style={styles.iconRow}>
                                            <FontAwesome name="map-marker" size={12} color="#f1501c" />
                                            <Text style={styles.eventLocation} numberOfLines={1}>{event.location || 'Online'}</Text>
                                        </View>
                                        <Text style={styles.eventDate}>
                                            {dateObj.toLocaleString('default', { month: 'short' })} {dateObj.getDate()}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>

                {/* DYNAMIC CATEGORY MARKETPLACE */}
                {categories.map((cat, catIndex) => {
                    const categoryProducts = featuredProducts.filter(p => p.categoryId === cat.name || p.categoryId === cat.id);
                    if (categoryProducts.length === 0) return null;

                    return (
                        <View key={cat.id || catIndex} style={[styles.section, { backgroundColor: catIndex % 2 === 0 ? 'white' : '#FFF9F5' }]}>
                            <Text style={styles.sectionTitle}>{cat.name}</Text>
                            <Text style={styles.sectionSubtitle}>Authentic Hand-Picked Items</Text>

                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
                                {categoryProducts.map((product, index) => (
                                    <TouchableOpacity
                                        key={`${product.id}-${index}`}
                                        style={styles.productCard}
                                        onPress={() => router.push(`/product/${product.id}`)}
                                    >
                                        <View style={styles.imagePlaceholder}>
                                            {product.mainImage ? (
                                                <Image source={{ uri: product.mainImage }} style={styles.productImage} resizeMode="cover" />
                                            ) : (
                                                <View style={[styles.productImage, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3f4f6' }]}>
                                                    <FontAwesome name="picture-o" size={40} color="#9ca3af" />
                                                </View>
                                            )}
                                        </View>
                                        <View style={styles.productInfo}>
                                            <Text style={styles.productTitle} numberOfLines={2}>{product.productName}</Text>
                                            <Text style={styles.productPrice}>₹{product.price?.toLocaleString('en-IN')}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    );
                })}

                {/* DISCOUNTED PRODUCTS */}
                {discountedProducts.length > 0 && (
                    <View style={[styles.section, { paddingBottom: 40 }]}>
                        <Text style={styles.sectionTitle}>50% Discount Products</Text>
                        <Text style={styles.sectionSubtitle}>Grab these exclusive deals</Text>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
                            {discountedProducts.map((product, index) => (
                                <TouchableOpacity
                                    key={`${product.id}-${index}`}
                                    style={styles.productCard}
                                    onPress={() => router.push(`/product/${product.id}`)}
                                >
                                    <View style={styles.imagePlaceholder}>
                                        {product.mainImage ? (
                                            <Image source={{ uri: product.mainImage }} style={styles.productImage} resizeMode="cover" />
                                        ) : (
                                            <View style={[styles.productImage, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3f4f6' }]}>
                                                <FontAwesome name="picture-o" size={40} color="#9ca3af" />
                                            </View>
                                        )}
                                    </View>
                                    <View style={styles.productDiscountBadge}>
                                        <Text style={styles.discountText}>{product.discountPercentage || 50}% OFF</Text>
                                    </View>
                                    <View style={styles.productInfo}>
                                        <Text style={styles.productTitle} numberOfLines={2}>{product.productName}</Text>
                                        <Text style={styles.productPrice}>₹{product.price?.toLocaleString('en-IN')}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },

    appHeader: { height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
    logoImage: { height: 35, width: 150 },

    heroSection: { height: 320, position: 'relative' },
    heroImage: { width: '100%', height: '100%', backgroundColor: '#eee' },
    heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(44, 26, 29, 0.45)' }, // Maroon tint
    heroContent: { position: 'absolute', bottom: 40, left: 24, right: 24 },
    heroTagline: { color: '#e0ae48', fontSize: 13, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 8, letterSpacing: 1 },
    heroTitle: { color: 'white', fontSize: 32, fontWeight: 'bold', lineHeight: 38 },

    section: { paddingVertical: 30, paddingHorizontal: 0, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
    sectionTitle: { fontSize: 24, fontWeight: '800', color: '#111', marginLeft: 20, marginBottom: 4 },
    sectionSubtitle: { fontSize: 15, color: '#666', marginLeft: 20, marginBottom: 20 },

    horizontalScroll: { paddingHorizontal: 20, gap: 16 },

    eventCard: { width: 280, backgroundColor: 'white', borderRadius: 0, overflow: 'hidden', marginRight: 16 },
    imagePlaceholder: { width: '100%', backgroundColor: '#eee' }, // Grey background when loading
    eventImage: { width: '100%', height: 160 },
    eventInfo: { paddingTop: 12, paddingBottom: 8 },
    eventTitle: { fontSize: 18, fontWeight: 'bold', color: '#222', marginBottom: 6 },
    iconRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
    eventLocation: { fontSize: 13, color: '#666', marginLeft: 6 },
    eventDate: { fontSize: 14, color: '#d95a2b', fontWeight: 'bold' },

    productCard: { width: 160, backgroundColor: 'white', overflow: 'hidden', marginRight: 16 },
    productImage: { width: '100%', height: 160 },
    productInfo: { paddingTop: 10, paddingBottom: 8 },
    productTitle: { fontSize: 15, fontWeight: '600', color: '#2C1A1D', marginBottom: 6, lineHeight: 20 },
    productPrice: { fontSize: 16, fontWeight: 'bold', color: '#C89B3C' },
    productDiscountBadge: { position: 'absolute', top: 8, right: 8, backgroundColor: '#059669', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
    discountText: { color: 'white', fontSize: 10, fontWeight: 'bold' }
});
