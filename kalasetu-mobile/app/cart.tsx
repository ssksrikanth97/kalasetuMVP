import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useCart } from '../src/context/CartContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

export default function CartScreen() {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart() as any;
    const router = useRouter();

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.cartItem}>
            {item.mainImage ? (
                <Image source={{ uri: item.mainImage }} style={styles.itemImage} />
            ) : (
                <View style={[styles.itemImage, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3f4f6' }]}>
                    <FontAwesome name="picture-o" size={30} color="#9ca3af" />
                </View>
            )}
            <View style={styles.itemDetails}>
                <Text style={styles.itemTitle} numberOfLines={2}>{item.name}</Text>

                {/* Variant display string based on context data */}
                {(item.variant?.size || item.variant?.color || item.variant?.material) && (
                    <Text style={styles.itemVariantText}>
                        {[item.variant?.size, item.variant?.color, item.variant?.material].filter(Boolean).join(' • ')}
                    </Text>
                )}

                <Text style={styles.itemPrice}>₹{item.price?.toLocaleString('en-IN')}</Text>

                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                        <FontAwesome name="minus" size={12} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{item.quantity}</Text>
                    <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                        <FontAwesome name="plus" size={12} color="#333" />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => removeFromCart(item.id)}
            >
                <FontAwesome name="trash" size={20} color="#ef4444" />
            </TouchableOpacity>
        </View>
    );

    if (cartItems.length === 0) {
        return (
            <SafeAreaView style={styles.emptyContainer}>
                <View style={styles.emptyIconCircle}>
                    <FontAwesome name="shopping-cart" size={50} color="#d1d5db" />
                </View>
                <Text style={styles.emptyTitle}>Your cart is empty</Text>
                <Text style={styles.emptySubtitle}>Looks like you haven't added any authentic KalaSetu products yet.</Text>
                <TouchableOpacity style={styles.shopBtn} onPress={() => router.back()}>
                    <Text style={styles.shopBtnText}>Start Shopping</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Your Cart</Text>
                <TouchableOpacity onPress={clearCart}>
                    <Text style={styles.clearText}>Clear All</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />

            <View style={styles.checkoutFooter}>
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Grand Total</Text>
                    <Text style={styles.totalValue}>₹{cartTotal.toLocaleString('en-IN')}</Text>
                </View>
                <TouchableOpacity style={styles.checkoutBtn} onPress={() => alert("Checkout flow to be implemented.")}>
                    <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
                    <FontAwesome name="arrow-right" size={16} color="white" style={{ marginLeft: 8 }} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9fafb' },

    // Empty State
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9fafb', padding: 24 },
    emptyIconCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#f3f4f6', justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
    emptyTitle: { fontSize: 24, fontWeight: 'bold', color: '#2C1A1D', marginBottom: 8 },
    emptySubtitle: { fontSize: 16, color: '#6b7280', textAlign: 'center', marginBottom: 32 },
    shopBtn: { backgroundColor: '#2C1A1D', paddingVertical: 14, paddingHorizontal: 32, borderRadius: 8 },
    shopBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },

    // Header
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee', backgroundColor: 'white' },
    title: { fontSize: 20, fontWeight: 'bold', color: '#2C1A1D' },
    clearText: { color: '#ef4444', fontSize: 14, fontWeight: '600' },

    // List
    listContainer: { padding: 16 },
    cartItem: { flexDirection: 'row', backgroundColor: 'white', borderRadius: 12, padding: 12, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2, alignItems: 'center' },
    itemImage: { width: 80, height: 80, borderRadius: 8, backgroundColor: '#eee' },

    itemDetails: { flex: 1, marginLeft: 12 },
    itemTitle: { fontSize: 15, fontWeight: '600', color: '#111', marginBottom: 4 },
    itemPrice: { fontSize: 16, fontWeight: 'bold', color: '#2C1A1D', marginBottom: 8 },

    // Variant info added here
    itemVariantText: { fontSize: 12, color: '#666', marginBottom: 6 },

    quantityContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f3f4f6', alignSelf: 'flex-start', borderRadius: 6 },
    qtyBtn: { padding: 8, paddingHorizontal: 12 },
    qtyText: { fontSize: 14, fontWeight: 'bold', color: '#111', minWidth: 20, textAlign: 'center' },

    removeBtn: { padding: 10 },

    // Footer
    checkoutFooter: { backgroundColor: 'white', padding: 20, borderTopWidth: 1, borderTopColor: '#eee', paddingBottom: 30 },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    totalLabel: { fontSize: 16, color: '#666', fontWeight: '500' },
    totalValue: { fontSize: 24, fontWeight: 'bold', color: '#2C1A1D' },

    checkoutBtn: { flexDirection: 'row', backgroundColor: '#2C1A1D', paddingVertical: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    checkoutBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' }
});
