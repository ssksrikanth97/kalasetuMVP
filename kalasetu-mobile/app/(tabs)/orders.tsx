import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

// Dummy Order Data
const DUMMY_ORDERS = [
    {
        id: 'ORD-12001',
        date: '2025-02-15',
        status: 'Delivered',
        total: 12500,
        items: [
            { id: 1, name: 'Handcrafted Terracotta Vase', qty: 1 }
        ]
    },
    {
        id: 'ORD-12098',
        date: '2025-02-28',
        status: 'Processing',
        total: 4500,
        items: [
            { id: 2, name: 'Madhubani Painting - A4', qty: 1 },
            { id: 3, name: 'Brass Diya Stand', qty: 2 }
        ]
    }
];

export default function OrdersScreen() {
    const { user } = useAuth() as any;
    const router = useRouter();
    const [orders, setOrders] = useState(DUMMY_ORDERS);

    if (!user) {
        return (
            <SafeAreaView style={styles.emptyContainer}>
                <View style={styles.emptyIconCircle}>
                    <FontAwesome name="lock" size={40} color="#d1d5db" />
                </View>
                <Text style={styles.emptyTitle}>Login Required</Text>
                <Text style={styles.emptySubtitle}>Please login to view your order history.</Text>
                <TouchableOpacity style={styles.shopBtn} onPress={() => router.push('/profile')}>
                    <Text style={styles.shopBtnText}>Go to Login</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    const renderOrderItem = ({ item }: { item: typeof DUMMY_ORDERS[0] }) => (
        <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
                <Text style={styles.orderId}>{item.id}</Text>
                <View style={[styles.statusBadge, item.status === 'Delivered' ? styles.statusDelivered : styles.statusProcessing]}>
                    <Text style={[styles.statusText, item.status === 'Delivered' ? styles.statusTextDelivered : styles.statusTextProcessing]}>
                        {item.status}
                    </Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.orderDetails}>
                <View>
                    <Text style={styles.detailLabel}>Date Placed</Text>
                    <Text style={styles.detailValue}>{item.date}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.detailLabel}>Total Amount</Text>
                    <Text style={styles.detailValuePrice}>₹{item.total.toLocaleString('en-IN')}</Text>
                </View>
            </View>

            <View style={styles.itemsList}>
                {item.items.map((i, idx) => (
                    <Text key={idx} style={styles.itemRowText} numberOfLines={1}>
                        {i.qty}x {i.name}
                    </Text>
                ))}
            </View>

            <TouchableOpacity style={styles.trackBtn}>
                <Text style={styles.trackBtnText}>Track Order</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>My Orders</Text>
            </View>

            {orders.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <FontAwesome name="archive" size={50} color="#e5e7eb" style={{ marginBottom: 16 }} />
                    <Text style={styles.emptyTitle}>No Orders Yet</Text>
                    <Text style={styles.emptySubtitle}>You haven't placed any orders.</Text>
                </View>
            ) : (
                <FlatList
                    data={orders}
                    keyExtractor={(item) => item.id}
                    renderItem={renderOrderItem}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9fafb' },

    header: { padding: 20, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#eee' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#2C1A1D' },

    listContainer: { padding: 16, paddingBottom: 100 },

    orderCard: { backgroundColor: 'white', borderRadius: 12, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },

    orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    orderId: { fontSize: 16, fontWeight: 'bold', color: '#111' },
    statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
    statusText: { fontSize: 12, fontWeight: 'bold' },

    statusDelivered: { backgroundColor: '#dcfce7' },
    statusTextDelivered: { color: '#16a34a' },

    statusProcessing: { backgroundColor: '#fef3c7' },
    statusTextProcessing: { color: '#d97706' },

    divider: { height: 1, backgroundColor: '#eee', marginVertical: 12 },

    orderDetails: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
    detailLabel: { fontSize: 13, color: '#666', marginBottom: 4 },
    detailValue: { fontSize: 15, fontWeight: '500', color: '#333' },
    detailValuePrice: { fontSize: 16, fontWeight: 'bold', color: '#2C1A1D' },

    itemsList: { backgroundColor: '#f9fafb', padding: 12, borderRadius: 8, marginBottom: 16 },
    itemRowText: { fontSize: 14, color: '#444', marginBottom: 4 },

    trackBtn: { borderWidth: 1, borderColor: '#2C1A1D', borderRadius: 8, paddingVertical: 10, alignItems: 'center' },
    trackBtnText: { color: '#2C1A1D', fontSize: 14, fontWeight: '600' },

    // Empty state
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
    emptyIconCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#f3f4f6', justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
    emptyTitle: { fontSize: 22, fontWeight: 'bold', color: '#2C1A1D', marginBottom: 8 },
    emptySubtitle: { fontSize: 15, color: '#6b7280', textAlign: 'center', marginBottom: 32 },
    shopBtn: { backgroundColor: '#2C1A1D', paddingVertical: 14, paddingHorizontal: 32, borderRadius: 8 },
    shopBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});
