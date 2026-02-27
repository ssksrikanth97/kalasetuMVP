import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { fetchAPI } from '../../src/lib/api';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

export default function EventsScreen() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetchAPI('/events');
                setEvents(res.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#f1501c" />
                <Text style={{ marginTop: 10 }}>Loading Events...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            <Text style={styles.pageTitle}>Upcoming Events</Text>
            <Text style={styles.pageSubtitle}>Join us for live cultural performances</Text>

            {events.map((event) => {
                const dateObj = event.date ? new Date(event.date) : new Date();
                return (
                    <TouchableOpacity
                        key={event.id}
                        style={styles.eventCard}
                        onPress={() => router.push(`/event/${event.id}`)}
                        activeOpacity={0.9}
                    >
                        {event.imageUrl ? (
                            <Image source={{ uri: event.imageUrl }} style={styles.eventImage} resizeMode="cover" />
                        ) : (
                            <View style={[styles.eventImage, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3f4f6' }]}>
                                <FontAwesome name="picture-o" size={40} color="#9ca3af" />
                            </View>
                        )}
                        <View style={styles.eventInfo}>
                            <View style={styles.dateBox}>
                                <Text style={styles.dateMonth}>{dateObj.toLocaleString('default', { month: 'short' }).toUpperCase()}</Text>
                                <Text style={styles.dateDay}>{dateObj.getDate()}</Text>
                            </View>
                            <View style={styles.eventDetails}>
                                <Text style={styles.eventTitle}>{event.name}</Text>
                                <View style={styles.row}>
                                    <FontAwesome name="map-marker" size={12} color="#f1501c" />
                                    <Text style={styles.eventLocation}>{event.location || 'Online'}</Text>
                                </View>
                                {event.time && (
                                    <View style={[styles.row, { marginTop: 4 }]}>
                                        <FontAwesome name="clock-o" size={12} color="#666" />
                                        <Text style={styles.eventTime}>{event.time}</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                        <View style={styles.bookBtnContainer}>
                            <View style={styles.bookBtn}>
                                <Text style={styles.bookBtnText}>Book Tickets</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            })}

            {events.length === 0 && (
                <Text style={styles.emptyText}>No upcoming events at this time.</Text>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9f9f9' },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    scrollContent: { padding: 16, paddingBottom: 40 },

    pageTitle: { fontSize: 26, fontWeight: 'bold', color: '#2C1A1D', marginBottom: 4 },
    pageSubtitle: { fontSize: 14, color: '#666', marginBottom: 20 },

    eventCard: { backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
    eventImage: { width: '100%', height: 160 },
    eventInfo: { flexDirection: 'row', padding: 16, alignItems: 'center' },

    dateBox: { backgroundColor: '#fff8f1', padding: 10, borderRadius: 8, alignItems: 'center', width: 60, marginRight: 16, borderColor: '#fcd34d', borderWidth: 1 },
    dateMonth: { color: '#f59e0b', fontSize: 12, fontWeight: 'bold' },
    dateDay: { color: '#2C1A1D', fontSize: 20, fontWeight: '900' },

    eventDetails: { flex: 1 },
    eventTitle: { fontSize: 16, fontWeight: 'bold', color: '#111', marginBottom: 6 },
    row: { flexDirection: 'row', alignItems: 'center' },
    eventLocation: { fontSize: 13, color: '#4b5563', marginLeft: 6 },
    eventTime: { fontSize: 13, color: '#6b7280', marginLeft: 6 },

    bookBtnContainer: { paddingHorizontal: 16, paddingBottom: 16 },
    bookBtn: { backgroundColor: '#2C1A1D', paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
    bookBtnText: { color: 'white', fontSize: 14, fontWeight: 'bold' },

    emptyText: { textAlign: 'center', color: '#666', marginTop: 40 }
});
