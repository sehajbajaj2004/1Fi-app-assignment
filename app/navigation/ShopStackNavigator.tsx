import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../theme';
import { OrderConfirmationScreen } from '../screens/shop/OrderConfirmationScreen';
import { ProductDetailScreen } from '../screens/shop/ProductDetailScreen';
import { ShopScreen } from '../screens/shop/ShopScreen';

export type ShopStackParamList = {
  // Named ShopHome (not "Shop") to avoid colliding with the parent Tab.Screen's
  // "Shop" route name — React Navigation warns about two nested routes sharing
  // a name, since it makes navigate("Shop", ...) ambiguous between them.
  ShopHome: undefined;
  ProductDetail: { productId: string };
  /** Re-derives the chosen plan via useEmiPlans rather than passing the whole
   * EMIPlan object through navigation params — keeps a single source of truth
   * for EMI numbers instead of trusting a snapshot carried across screens. */
  OrderConfirmation: { productId: string; variantId: string; tenureMonths: number };
};

const Stack = createNativeStackNavigator<ShopStackParamList>();

const headerOptions = {
  headerShown: true,
  headerTintColor: colors.accent,
  headerStyle: { backgroundColor: colors.background },
  headerShadowVisible: false,
};

/** Internal stack for the Shop tab: ShopHome → ProductDetail → OrderConfirmation. */
export function ShopStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ShopHome" component={ShopScreen} options={{ title: 'Shop' }} />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ ...headerOptions, headerTitle: '', headerBackTitle: '' }}
      />
      <Stack.Screen
        name="OrderConfirmation"
        component={OrderConfirmationScreen}
        options={{ ...headerOptions, headerTitle: 'Order Confirmed', headerBackVisible: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
}
