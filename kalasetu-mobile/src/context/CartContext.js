import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load cart from AsyncStorage on mount
    useEffect(() => {
        const loadCart = async () => {
            try {
                const storedCart = await AsyncStorage.getItem('kalasetu_cart');
                if (storedCart !== null) {
                    setCartItems(JSON.parse(storedCart));
                }
            } catch (error) {
                console.error('Failed to parse mobile cart data:', error);
            } finally {
                setIsLoaded(true);
            }
        };

        loadCart();
    }, []);

    // Save cart to AsyncStorage whenever it changes
    useEffect(() => {
        const saveCart = async () => {
            if (isLoaded) {
                try {
                    await AsyncStorage.setItem('kalasetu_cart', JSON.stringify(cartItems));
                } catch (error) {
                    console.error('Failed to save mobile cart data:', error);
                }
            }
        };

        saveCart();
    }, [cartItems, isLoaded]);

    const addToCart = (product, quantity = 1) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [...prevItems, { ...product, quantity }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartCount,
            cartTotal,
            loading: !isLoaded
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
