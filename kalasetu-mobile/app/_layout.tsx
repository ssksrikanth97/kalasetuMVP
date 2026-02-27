import { Stack } from 'expo-router';
import { AuthProvider } from '../src/context/AuthContext';
import { CartProvider } from '../src/context/CartContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="cart" options={{ presentation: 'modal', title: 'Shopping Cart' }} />
        </Stack>
      </CartProvider>
    </AuthProvider>
  );
}
