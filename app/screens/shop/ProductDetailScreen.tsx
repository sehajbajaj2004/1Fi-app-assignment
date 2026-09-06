import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { VariantSelector } from '../../components/shop';
import { Badge, EmptyState, Skeleton } from '../../components/ui';
import { useEmiPlans, useProductDetail } from '../../data/hooks';
import { getDefaultVariant } from '../../data/productHelpers';
import { colors, radius, spacing, typography } from '../../theme';
import type { ProductVariant } from '../../types/marketplace';
import type { ShopStackParamList } from '../../navigation/ShopStackNavigator';

type Props = NativeStackScreenProps<ShopStackParamList, 'ProductDetail'>;

function formatRupees(amount: number) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function ProductDetailScreen({ route }: Props) {
  const { productId } = route.params;
  const { data: product, isLoading, isError, error, refetch } = useProductDetail(productId);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);

  // Default to the cheapest in-stock variant once the product loads, or when
  // navigating between products.
  useEffect(() => {
    if (product) setSelectedVariant(getDefaultVariant(product));
  }, [product]);

  const {
    data: emiPlans,
    isLoading: isLoadingEmi,
    isError: isEmiError,
  } = useEmiPlans(productId, selectedVariant?.id);

  if (isLoading || !selectedVariant) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Skeleton width={96} height={96} borderRadius={20} style={styles.skeletonHero} />
        <Skeleton width="60%" height={22} style={{ marginTop: spacing.md }} />
        <Skeleton width="40%" height={16} style={{ marginTop: spacing.sm }} />
        <Skeleton width="30%" height={24} style={{ marginTop: spacing.md }} />
      </ScrollView>
    );
  }

  if (isError || !product) {
    return (
      <View style={styles.container}>
        <EmptyState
          icon="alert-circle-outline"
          title="Couldn't load this product"
          subtitle={error instanceof Error ? error.message : 'Something went wrong. Please try again.'}
          retryLabel="Retry"
          onRetry={() => refetch()}
        />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.heroTile}>
        <Ionicons name={product.icon as any} size={64} color={colors.accent} />
      </View>

      <Text style={styles.brand}>{product.brand}</Text>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{formatRupees(selectedVariant.price)}</Text>
      {!selectedVariant.inStock && <Badge label="Out of stock" tone="neutral" style={styles.stockBadge} />}

      <Text style={styles.sectionLabel}>Choose a variant</Text>
      <VariantSelector
        variants={product.variants}
        selectedId={selectedVariant.id}
        onSelect={setSelectedVariant}
      />

      <Text style={styles.sectionLabel}>Details</Text>
      <Text style={styles.description}>{product.description}</Text>

      <Text style={styles.sectionLabel}>EMI options</Text>
      {isLoadingEmi && (
        <View style={styles.emiSkeletonRow}>
          <Skeleton width="100%" height={52} borderRadius={12} />
        </View>
      )}
      {isEmiError && (
        <Text style={styles.emiError}>Couldn't load EMI plans for this variant.</Text>
      )}
      {emiPlans?.map((plan) => (
        <View key={plan.tenureMonths} style={styles.emiRow}>
          <View>
            <Text style={styles.emiTenure}>{plan.tenureMonths} months</Text>
            <Text style={styles.emiTotal}>Total payable {formatRupees(plan.totalPayable)}</Text>
          </View>
          <View style={styles.emiRight}>
            <Text style={styles.emiMonthly}>{formatRupees(plan.monthlyAmount)}/mo</Text>
            {plan.noCostEmi ? (
              <Badge label="No-cost EMI" tone="success" style={styles.emiBadge} />
            ) : (
              <Badge label={`${((plan.interestAmount / selectedVariant.price) * 100).toFixed(1)}% interest`} tone="neutral" style={styles.emiBadge} />
            )}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  skeletonHero: {
    alignSelf: 'center',
  },
  heroTile: {
    width: 120,
    height: 120,
    borderRadius: radius.lg,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  brand: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  name: {
    ...typography.heading,
    color: colors.textPrimary,
    textAlign: 'center',
    marginTop: 2,
  },
  price: {
    ...typography.heading,
    fontSize: 22,
    color: colors.accent,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  stockBadge: {
    alignSelf: 'center',
    marginTop: spacing.xs,
  },
  sectionLabel: {
    ...typography.subheading,
    fontSize: 15,
    color: colors.textPrimary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  emiSkeletonRow: {
    marginBottom: spacing.xs,
  },
  emiError: {
    ...typography.bodySmall,
    color: colors.danger,
  },
  emiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
    marginBottom: spacing.xs,
  },
  emiTenure: {
    ...typography.cardTitle,
    color: colors.textPrimary,
  },
  emiTotal: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  emiRight: {
    alignItems: 'flex-end',
  },
  emiMonthly: {
    ...typography.cardTitle,
    color: colors.textPrimary,
  },
  emiBadge: {
    marginTop: 4,
  },
});
