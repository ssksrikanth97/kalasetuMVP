'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';

const StoreSettingsContext = createContext();

export function StoreSettingsProvider({ children }) {
    const [settings, setSettings] = useState({
        purchaseMode: 'Standard Checkout', // 'Standard Checkout' | 'Order via WhatsApp'
        whatsappNumber: '',
        whatsappMessageTemplate: 'Hi, I want to order {ProductName}. Quantity: {Quantity}. Price: {Price}. Product Link: {Link}',
        loading: true
    });

    useEffect(() => {
        // Listen to changes in system_settings/store_settings
        const docRef = doc(db, 'system_settings', 'store_settings');
        
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                setSettings({ ...docSnap.data(), loading: false });
            } else {
                setSettings(prev => ({ ...prev, loading: false }));
            }
        }, (error) => {
            console.error("Error fetching store settings:", error);
            setSettings(prev => ({ ...prev, loading: false }));
        });

        return () => unsubscribe();
    }, []);

    return (
        <StoreSettingsContext.Provider value={{ settings }}>
            {children}
        </StoreSettingsContext.Provider>
    );
}

export function useStoreSettings() {
    return useContext(StoreSettingsContext);
}
