import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { ProductCard } from '../../components/shop';
import { EmptyState, Skeleton } from '../../components/ui';
import { setSimulateFailure } from '../../data/api/marketplaceApi';
import { useProducts } from '../../data/hooks';
import { colors, spacing, typography } from '../../theme';
import type { Product } from '../../types/marketplace';
import type { ShopStackParamList } from '../../navigation/ShopStackNavigator';

const CATEGORY_ORDER = [
  { id: 'mobiles-laptops', name: 'Mobiles & Laptops' },
  { id: 'two-wheelers', name: 'Two-Wheelers' },
  { id: 'cars', name: 'Cars' },
];

function groupByCategory(products: Product[]) {
  return CATEGORY_ORDER.map((category) => ({
    category,
    products: products.filter((p) => p.categoryId === category.id),
  })).filter((group) => group.products.length > 0);
}

function SkeletonCard() {
  return (
    <View style={styles.skeletonCard}>
      <Skeleton width={56} height={56} borderRadius={12} />
      <View style={styles.skeletonBody}>
        <Skeleton width="70%" height={16} />
        <Skeleton width="45%" height={12} style={{ marginTop: 8 }} />
        <Skeleton width="35%" height={14} style={{ marginTop: 10 }} />
      </View>
    </View>
  );
}

/**
 * The actual deliverable: browse the mock catalog, grouped by category.
 * Handles loading (skeletons), empty, and error (message + retry) states —
 * not just the happy path. Renders as a plain View — ShopScreen is the single
 * scrollable container for the whole page.
 */
export function MarketplaceTab() {
  const { data, isLoading, isError, error, refetch, isRefetching } = useProducts();
  const navigation = useNavigation<NativeStackNavigationProp<ShopStackParamList>>();

  // Dev-only control so error states are easy to trigger for QA — never shown
  // in a production build. Refetches immediately on toggle (in either
  // direction) so flipping it is enough to see the error state, and flipping
  // it back is enough to see recovery — no separate Retry tap needed.
  const [simulateError, setSimulateErrorState] = useState(false);
  const toggleSimulateError = (value: boolean) => {
    setSimulateErrorState(value);
    setSimulateFailure('getProducts', value);
    refetch();
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        {[1, 2, 3, 4].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <EmptyState
          icon="cloud-offline-outline"
          title="Couldn't load products"
          subtitle={error instanceof Error ? error.message : 'Something went wrong. Please try again.'}
          retryLabel="Retry"
          onRetry={() => refetch()}
        />
        {__DEV__ && (
          <DevSimulateErrorToggle value={simulateError} onChange={toggleSimulateError} />
        )}
      </View>
    );
  }

  const groups = groupByCategory(data ?? []);

  if (groups.length === 0) {
    return (
      <View style={styles.container}>
        <EmptyState icon="cube-outline" title="No products yet" subtitle="Check back soon — new listings are on the way." />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isRefetching && <Text style={styles.refetchingHint}>Refreshing…</Text>}
      {groups.map((group) => (
        <View key={group.category.id} style={styles.section}>
          <Text style={styles.sectionTitle}>{group.category.name}</Text>
          <View style={styles.cardStack}>
            {group.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onPress={() => navigation.navigate('ProductDetail', { productId: product.id })}
              />
            ))}
          </View>
        </View>
      ))}
      {__DEV__ && <DevSimulateErrorToggle value={simulateError} onChange={toggleSimulateError} />}
    </View>
  );
}

/** __DEV__-only switch to force getProducts() to fail, for manual QA of the error state. */
function DevSimulateErrorToggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <View style={styles.devRow}>
      <Text style={styles.devLabel}>Simulate error (dev only)</Text>
      <Switch value={value} onValueChange={onChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.subheading,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  cardStack: {
    gap: spacing.sm,
  },
  skeletonCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  skeletonBody: {
    flex: 1,
    marginLeft: spacing.sm,
    justifyContent: 'center',
  },
  refetchingHint: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  devRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
    padding: spacing.sm,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  devLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
});
