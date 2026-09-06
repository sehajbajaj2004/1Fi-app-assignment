import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { colors } from '../theme';
import { ProductDetailScreen } from '../screens/shop/ProductDetailScreen';
import { ShopScreen } from '../screens/shop/ShopScreen';

export type ShopStackParamList = {
  Shop: undefined;
  ProductDetail: { productId: string };
  // OrderConfirmation is added in Phase 4.
};

const Stack = createNativeStackNavigator<ShopStackParamList>();

/** Internal stack for the Shop tab: Shop → ProductDetail → Confirmation (Phase 4). */
export function ShopStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Shop" component={ShopScreen} />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{
          headerShown: true,
          headerTitle: '',
          headerBackTitle: '',
          headerTintColor: colors.accent,
          headerStyle: { backgroundColor: colors.background },
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
