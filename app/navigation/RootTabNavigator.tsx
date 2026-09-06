import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EmiDuesScreen } from '../screens/stubs/EmiDuesScreen';
import { HomeScreen } from '../screens/stubs/HomeScreen';
import { LimitScreen } from '../screens/stubs/LimitScreen';
import { ProfileScreen } from '../screens/stubs/ProfileScreen';
import { colors, radius, spacing } from '../theme';
import { ShopStackNavigator } from './ShopStackNavigator';

export type RootTabParamList = {
  Home: undefined;
  Shop: undefined;
  EmiDues: undefined;
  Limit: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const ICONS: Record<keyof RootTabParamList, keyof typeof Ionicons.glyphMap> = {
  Home: 'home',
  Shop: 'bag',
  EmiDues: 'document-text',
  Limit: 'trending-up',
  Profile: 'person',
};

const LABELS: Record<keyof RootTabParamList, string> = {
  Home: 'Home',
  Shop: 'Shop',
  EmiDues: 'EMI Dues',
  Limit: 'Limit',
  Profile: 'Profile',
};

/**
 * 5-item bottom tab bar matching the reference screenshot, styled as a
 * floating rounded pill inset from the screen edges (rather than a bar
 * docked flush to the bottom). Only Shop is functional; the other four
 * render simple disabled/placeholder screens. App launches directly into
 * Shop (initialRouteName).
 */
export function RootTabNavigator() {
  const insets = useSafeAreaInsets();
  // Clears the home indicator on iOS (and any bottom inset generally) with a
  // consistent visual gap above it, rather than sitting flush on the edge.
  const floatingBottom = Math.max(insets.bottom, spacing.sm) + spacing.sm;

  const floatingTabBarStyle = {
    position: 'absolute' as const,
    left: spacing.md,
    right: spacing.md,
    bottom: floatingBottom,
    height: 64,
    borderRadius: radius.lg,
    borderTopWidth: 0,
    backgroundColor: colors.surface,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xs,
    // Shadow so the bar reads as floating above the content, not just inset.
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  };

  return (
    <Tab.Navigator
      initialRouteName="Shop"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarStyle: floatingTabBarStyle,
        tabBarIcon: ({ focused, color, size }) => (
          <View style={styles.iconWrap}>
            {focused ? <View style={styles.indicator} /> : <View style={styles.indicatorPlaceholder} />}
            <Ionicons name={ICONS[route.name as keyof RootTabParamList]} size={size ?? 22} color={color} />
          </View>
        ),
        tabBarLabel: LABELS[route.name as keyof RootTabParamList],
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="Shop"
        component={ShopStackNavigator}
        options={({ route }) => {
          // Hide the bottom tab bar on ProductDetail (competes with the sticky
          // CTA bar) and OrderConfirmation (keeps focus on the confirmation).
          const focusedRoute = getFocusedRouteNameFromRoute(route) ?? 'Shop';
          const hideTabBar = focusedRoute === 'ProductDetail' || focusedRoute === 'OrderConfirmation';
          return {
            tabBarStyle: hideTabBar ? { display: 'none' } : floatingTabBarStyle,
          };
        }}
      />
      <Tab.Screen name="EmiDues" component={EmiDuesScreen} />
      <Tab.Screen name="Limit" component={LimitScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    alignItems: 'center',
  },
  indicator: {
    width: 18,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.accent,
    marginBottom: 4,
  },
  indicatorPlaceholder: {
    width: 18,
    height: 3,
    marginBottom: 4,
  },
});
