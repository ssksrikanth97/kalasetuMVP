import { Stack } from 'expo-router';
import { AuthProvider } from '../src/context/AuthContext';
import { CartProvider } from '../src/context/CartContext';
import { WishlistProvider } from '../src/context/WishlistContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="cart" options={{ presentation: 'modal', title: 'Shopping Cart' }} />
          </Stack>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
