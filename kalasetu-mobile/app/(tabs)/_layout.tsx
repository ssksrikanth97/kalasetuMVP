import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { TouchableOpacity, View, Text } from 'react-native';
import { useCart } from '../../src/context/CartContext';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import GlobalSearchBar from '../../src/components/GlobalSearchBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
    const { cartCount } = useCart() as any;
    const router = useRouter();
    const [searchVisible, setSearchVisible] = useState(false);

    const renderSearchIcon = () => (
        <TouchableOpacity style={{ marginRight: 16 }} onPress={() => setSearchVisible(true)}>
            <FontAwesome name="search" size={20} color="#2C1A1D" />
        </TouchableOpacity>
    );

    const insets = useSafeAreaInsets();

    return (
        <View style={{ flex: 1 }}>
            {searchVisible && <GlobalSearchBar onClose={() => setSearchVisible(false)} />}
            <Tabs screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#2C1A1D',
                tabBarInactiveTintColor: '#888',
                tabBarStyle: {
                    height: 60 + insets.bottom,
                    paddingBottom: Math.max(10, insets.bottom),
                    paddingTop: 5,
                    backgroundColor: '#fff',
                    borderTopWidth: 1,
                    borderTopColor: '#f0f0f0'
                },
                headerStyle: { backgroundColor: '#fff', elevation: 0, shadowOpacity: 0 },
                headerTitleStyle: { fontWeight: 'bold', color: '#2C1A1D' }
            }}>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ color }) => <FontAwesome size={24} name="home" color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="explore" // We'll map marketplace to explore functionality or create a new route later
                    options={{
                        title: 'Explore',
                        tabBarIcon: ({ color }) => <FontAwesome size={24} name="search" color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="orders"
                    options={{
                        title: 'Orders',
                        tabBarIcon: ({ color }) => <FontAwesome size={24} name="list-alt" color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="events"
                    options={{
                        title: 'Events',
                        tabBarIcon: ({ color }) => <FontAwesome size={24} name="calendar" color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'Profile',
                        tabBarIcon: ({ color }) => <FontAwesome size={24} name="user-o" color={color} />,
                    }}
                />
            </Tabs>
        </View>
    );
}
