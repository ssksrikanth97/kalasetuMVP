import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { TouchableOpacity, View, Text } from 'react-native';
import { useCart } from '../../src/context/CartContext';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import GlobalSearchBar from '../../src/components/GlobalSearchBar';

export default function TabLayout() {
    const { cartCount } = useCart() as any;
    const router = useRouter();
    const [searchVisible, setSearchVisible] = useState(false);

    const renderSearchIcon = () => (
        <TouchableOpacity style={{ marginRight: 16 }} onPress={() => setSearchVisible(true)}>
            <FontAwesome name="search" size={20} color="#2C1A1D" />
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1 }}>
            {searchVisible && <GlobalSearchBar onClose={() => setSearchVisible(false)} />}
            <Tabs screenOptions={{
                tabBarActiveTintColor: '#f1501c',
                tabBarInactiveTintColor: '#888',
                tabBarStyle: { height: 60, paddingBottom: 10, paddingTop: 5, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#f0f0f0' },
                headerStyle: { backgroundColor: '#fff', elevation: 0, shadowOpacity: 0 },
                headerTitleStyle: { fontWeight: 'bold', color: '#2C1A1D' }
            }}>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Home',
                        // Home usually uses a custom native header, but if header is shown:
                        // headerRight: renderSearchIcon, 
                        headerShown: false,
                        tabBarIcon: ({ color }) => <FontAwesome size={24} name="home" color={color} />,
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
                    name="marketplace"
                    options={{
                        title: 'Shop',
                        tabBarIcon: ({ color }) => <FontAwesome size={24} name="shopping-bag" color={color} />,
                        headerRight: () => (
                            <TouchableOpacity style={{ marginRight: 16 }} onPress={() => router.push('/cart')}>
                                <View>
                                    <FontAwesome name="shopping-cart" size={22} color="#2C1A1D" />
                                    {cartCount > 0 && (
                                        <View style={{ position: 'absolute', right: -6, top: -6, backgroundColor: '#dc2626', borderRadius: 10, width: 18, height: 18, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>{cartCount}</Text>
                                        </View>
                                    )}
                                </View>
                            </TouchableOpacity>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'Profile',
                        headerRight: renderSearchIcon,
                        tabBarIcon: ({ color }) => <FontAwesome size={24} name="user" color={color} />,
                    }}
                />
            </Tabs>
        </View>
    );
}
