import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WishlistContext = createContext({});

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load wishlist from AsyncStorage on mount
    useEffect(() => {
        const loadWishlist = async () => {
            try {
                const storedWishlist = await AsyncStorage.getItem('kalasetu_wishlist');
                if (storedWishlist !== null) {
                    setWishlistItems(JSON.parse(storedWishlist));
                }
            } catch (error) {
                console.error('Failed to parse mobile wishlist data:', error);
            } finally {
                setIsLoaded(true);
            }
        };

        loadWishlist();
    }, []);

    // Save wishlist to AsyncStorage whenever it changes
    useEffect(() => {
        const saveWishlist = async () => {
            if (isLoaded) {
                try {
                    await AsyncStorage.setItem('kalasetu_wishlist', JSON.stringify(wishlistItems));
                } catch (error) {
                    console.error('Failed to save mobile wishlist data:', error);
                }
            }
        };

        saveWishlist();
    }, [wishlistItems, isLoaded]);

    const addToWishlist = (product) => {
        setWishlistItems((prev) => {
            if (!prev.find((item) => item.id === product.id)) {
                return [...prev, product];
            }
            return prev;
        });
    };

    const removeFromWishlist = (productId) => {
        setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
    };

    const isInWishlist = (productId) => {
        return wishlistItems.some((item) => item.id === productId);
    };

    const toggleWishlist = (product) => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <WishlistContext.Provider value={{
            wishlistItems,
            addToWishlist,
            removeFromWishlist,
            isInWishlist,
            toggleWishlist,
            loading: !isLoaded
        }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);
