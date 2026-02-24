'use client';

import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { StoreSettingsProvider } from '@/context/StoreSettingsContext';

export function Providers({ children }) {
    return (
        <AuthProvider>
            <StoreSettingsProvider>
                <CartProvider>
                    {children}
                </CartProvider>
            </StoreSettingsProvider>
        </AuthProvider>
    );
}
