import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EMIPlanOption, VariantSelector } from '../../components/shop';
import { Badge, EmptyState, PrimaryButton, Skeleton } from '../../components/ui';
import { useEmiPlans, useProductDetail } from '../../data/hooks';
import { getDefaultVariant } from '../../data/productHelpers';
import { colors, radius, spacing, typography } from '../../theme';
import type { EMIPlan, ProductVariant } from '../../types/marketplace';
import type { ShopStackParamList } from '../../navigation/ShopStackNavigator';

type Props = NativeStackScreenProps<ShopStackParamList, 'ProductDetail'>;

function formatRupees(amount: number) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function ProductDetailScreen({ route, navigation }: Props) {
  const { productId } = route.params;
  const insets = useSafeAreaInsets();
  const { data: product, isLoading, isError, error, refetch } = useProductDetail(productId);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<EMIPlan | null>(null);
  const [isProceeding, setIsProceeding] = useState(false);

  // Default to the cheapest in-stock variant once the product loads, or when
  // navigating between products.
  useEffect(() => {
    if (product) setSelectedVariant(getDefaultVariant(product));
  }, [product]);

  // A variant switch invalidates the previous plan selection — its tenure
  // options carry different amounts for the new variant, so nothing should
  // stay silently "selected" against numbers that no longer apply.
  useEffect(() => {
    setSelectedPlan(null);
  }, [selectedVariant?.id]);

  const {
    data: emiPlans,
    isLoading: isLoadingEmi,
    isError: isEmiError,
  } = useEmiPlans(productId, selectedVariant?.id);

  const handleProceed = () => {
    if (!selectedVariant || !selectedPlan) return;
    setIsProceeding(true);
    // Simulated checkout latency — there's no real payment backend for this
    // assignment (see README), so this is a fixed delay rather than a network call.
    setTimeout(() => {
      setIsProceeding(false);
      navigation.navigate('OrderConfirmation', {
        productId,
        variantId: selectedVariant.id,
        tenureMonths: selectedPlan.tenureMonths,
      });
    }, 700);
  };

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
    <View style={styles.screen}>
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

        <Text style={styles.sectionLabel}>Choose an EMI plan</Text>
        {isLoadingEmi && (
          <View style={styles.emiSkeletonRow}>
            <Skeleton width="100%" height={52} borderRadius={12} />
          </View>
        )}
        {isEmiError && <Text style={styles.emiError}>Couldn't load EMI plans for this variant.</Text>}
        {emiPlans?.map((plan) => (
          <EMIPlanOption
            key={plan.tenureMonths}
            plan={plan}
            selected={selectedPlan?.tenureMonths === plan.tenureMonths}
            onSelect={() => setSelectedPlan(plan)}
            variantPrice={selectedVariant.price}
          />
        ))}
      </ScrollView>

      <View style={[styles.ctaBar, { paddingBottom: Math.max(insets.bottom, spacing.sm) }]}>
        <View style={styles.summary}>
          {selectedPlan ? (
            <>
              <Text style={styles.summaryMonthly}>{formatRupees(selectedPlan.monthlyAmount)}/mo</Text>
              <Text style={styles.summaryDetail}>
                {selectedPlan.tenureMonths} months · Total {formatRupees(selectedPlan.totalPayable)}
              </Text>
            </>
          ) : (
            <Text style={styles.summaryPrompt}>Select an EMI plan to continue</Text>
          )}
        </View>
        <View style={styles.ctaButton}>
          <PrimaryButton
            label="Proceed with this plan"
            disabled={!selectedPlan || !selectedVariant.inStock}
            loading={isProceeding}
            onPress={handleProceed}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: spacing.md,
    // Leaves room so the last EMI option isn't hidden behind the sticky CTA bar.
    paddingBottom: 140,
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
  ctaBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
  summary: {
    flex: 1,
    marginRight: spacing.sm,
  },
  summaryMonthly: {
    ...typography.cardTitle,
    fontSize: 17,
    color: colors.textPrimary,
  },
  summaryDetail: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  summaryPrompt: {
    ...typography.bodySmall,
    color: colors.textMuted,
  },
  ctaButton: {
    minWidth: 190,
  },
});
