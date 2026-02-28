import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { fetchAPI } from '../../src/lib/api';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function EventDetailsScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [event, setEvent] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            if (!id) return;
            try {
                const res = await fetchAPI(`/events/${id}`);
                if (res.success && res.data) {
                    setEvent(res.data);
                }
            } catch (error) {
                console.error("Error fetching event:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    if (loading) {
        return (
            <SafeAreaView style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#f1501c" />
            </SafeAreaView>
        );
    }

    if (!event) {
        return (
            <SafeAreaView style={styles.centerContainer}>
                <Text style={styles.errorText}>Event not found</Text>
                <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                    <Text style={styles.backBtnText}>Go Back</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerBackBtn}>
                    <FontAwesome name="arrow-left" size={20} color="#2C1A1D" />
                </TouchableOpacity>
                <Text style={styles.headerTitle} numberOfLines={1}>{event.eventName}</Text>
                <View style={{ width: 40 }} /> {/* Spacer */}
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {event.image ? (
                    <Image source={{ uri: event.image }} style={styles.heroImage} />
                ) : (
                    <View style={[styles.heroImage, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3f4f6' }]}>
                        <FontAwesome name="picture-o" size={60} color="#9ca3af" />
                    </View>
                )}

                <View style={styles.content}>
                    <Text style={styles.title}>{event.eventName}</Text>

                    <View style={styles.metaContainer}>
                        <View style={styles.metaRow}>
                            <FontAwesome name="calendar" size={16} color="#f1501c" style={styles.metaIcon} />
                            <Text style={styles.metaText}>{event.date}</Text>
                        </View>
                        <View style={styles.metaRow}>
                            <FontAwesome name="clock-o" size={16} color="#f1501c" style={styles.metaIcon} />
                            <Text style={styles.metaText}>{event.time}</Text>
                        </View>
                        <View style={styles.metaRow}>
                            <FontAwesome name="map-marker" size={16} color="#f1501c" style={styles.metaIcon} />
                            <Text style={styles.metaText}>{event.location}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <Text style={styles.sectionTitle}>About Event</Text>
                    <Text style={styles.description}>{event.description}</Text>
                </View>
            </ScrollView>

            {/* Ticket booking button temporarily hidden */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
    errorText: { fontSize: 18, color: '#333', marginBottom: 16 },
    backBtn: { padding: 12, backgroundColor: '#f1501c', borderRadius: 8 },
    backBtnText: { color: 'white', fontWeight: 'bold' },

    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
    headerBackBtn: { padding: 8, marginLeft: -8 },
    headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#2C1A1D', flex: 1, textAlign: 'center' },

    heroImage: { width: '100%', height: 250, backgroundColor: '#eee' },

    content: { padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#2C1A1D', marginBottom: 16, lineHeight: 32 },

    metaContainer: { gap: 12, marginBottom: 24 },
    metaRow: { flexDirection: 'row', alignItems: 'center' },
    metaIcon: { width: 24, textAlign: 'center' },
    metaText: { fontSize: 16, color: '#4b5563', marginLeft: 8 },

    divider: { height: 1, backgroundColor: '#eee', marginVertical: 24 },

    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#2C1A1D', marginBottom: 12 },
    description: { fontSize: 15, lineHeight: 24, color: '#4b5563' },

    footer: { padding: 16, backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#eee', paddingBottom: 30 },
    bookBtn: { backgroundColor: '#f1501c', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
    bookBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' }
});
