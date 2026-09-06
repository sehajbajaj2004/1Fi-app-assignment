import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ShopScreen } from '../screens/shop/ShopScreen';

export type ShopStackParamList = {
  Shop: undefined;
  // ProductDetail and OrderConfirmation are added in Phase 3/4.
};

const Stack = createNativeStackNavigator<ShopStackParamList>();

/** Internal stack for the Shop tab: Shop → ProductDetail → Confirmation (Phase 3/4). */
export function ShopStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Shop" component={ShopScreen} />
    </Stack.Navigator>
  );
}
