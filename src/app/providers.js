'use client';

import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { StoreSettingsProvider } from '@/context/StoreSettingsContext';
import MaintenanceWrapper from '@/components/MaintenanceWrapper';

export function Providers({ children }) {
    return (
        <AuthProvider>
            <StoreSettingsProvider>
                <CartProvider>
                    <MaintenanceWrapper>
                        {children}
                    </MaintenanceWrapper>
                </CartProvider>
            </StoreSettingsProvider>
        </AuthProvider>
    );
}
