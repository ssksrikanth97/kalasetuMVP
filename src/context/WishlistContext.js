'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            const stored = localStorage.getItem('kalasetu_wishlist');
            if (stored) {
                try {
                    setWishlistItems(JSON.parse(stored));
                } catch (e) {
                    console.error('Failed to parse wishlist', e);
                }
            }
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded && typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            localStorage.setItem('kalasetu_wishlist', JSON.stringify(wishlistItems));
        }
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
