import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { EmiDuesScreen } from '../screens/stubs/EmiDuesScreen';
import { HomeScreen } from '../screens/stubs/HomeScreen';
import { LimitScreen } from '../screens/stubs/LimitScreen';
import { ProfileScreen } from '../screens/stubs/ProfileScreen';
import { colors } from '../theme';
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
 * 5-item bottom tab bar matching the reference screenshot. Only Shop is
 * functional; the other four render simple disabled/placeholder screens.
 * App launches directly into Shop (initialRouteName).
 */
export function RootTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Shop"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarStyle: { borderTopColor: colors.border, height: 60, paddingBottom: 6, paddingTop: 6 },
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
          // Hide the bottom tab bar on ProductDetail so it doesn't compete with
          // the sticky CTA bar (Phase 4) — standard "focused product" pattern.
          const focusedRoute = getFocusedRouteNameFromRoute(route) ?? 'Shop';
          return {
            tabBarStyle:
              focusedRoute === 'ProductDetail'
                ? { display: 'none' }
                : { borderTopColor: colors.border, height: 60, paddingBottom: 6, paddingTop: 6 },
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
