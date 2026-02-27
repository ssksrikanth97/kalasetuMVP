import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function GlobalSearchBar({ onClose }) {
    const [query, setQuery] = useState('');
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const handleSearch = () => {
        if (query.trim() !== '') {
            onClose();
            // In a real app we might pass this query via context or push state
            // For now, we redirect them to the marketplace.
            // Ideally: router.push(`/marketplace?search=${encodeURIComponent(query)}`);
            router.push('/marketplace');
        }
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top, height: 60 + insets.top }]}>
            <View style={styles.searchBox}>
                <FontAwesome name="search" size={16} color="#9ca3af" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Search KalaSetu..."
                    placeholderTextColor="#9ca3af"
                    value={query}
                    onChangeText={setQuery}
                    onSubmitEditing={handleSearch}
                    autoFocus
                />
                <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                    <FontAwesome name="times" size={16} color="#9ca3af" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: 'white',
        zIndex: 100,
        justifyContent: 'center',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 40,
    },
    icon: { marginRight: 8 },
    input: { flex: 1, fontSize: 14, color: '#111', height: '100%' },
    closeBtn: { padding: 4, marginLeft: 8 }
});
