import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Badge, EmptyState, PrimaryButton, Skeleton } from '../../components/ui';
import { useEmiPlans, useProductDetail } from '../../data/hooks';
import { colors, radius, spacing, typography } from '../../theme';
import type { ShopStackParamList } from '../../navigation/ShopStackNavigator';

type Props = NativeStackScreenProps<ShopStackParamList, 'OrderConfirmation'>;

function formatRupees(amount: number) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

// A stable-per-mount mock reference number — this is a UI-only confirmation,
// there's no backend order to reference.
function useMockOrderRef() {
  return useMemo(() => `1FI-${Math.floor(100000 + Math.random() * 900000)}`, []);
}

/**
 * Mocked order confirmation — there's no real checkout/payment backend for
 * this assignment, so this screen re-derives the chosen product/variant/plan
 * from the same hooks the rest of the app uses (rather than trusting a
 * snapshot passed through navigation params) and presents it as a receipt.
 */
export function OrderConfirmationScreen({ route, navigation }: Props) {
  const { productId, variantId, tenureMonths } = route.params;
  const orderRef = useMockOrderRef();
  const { data: product, isLoading: isLoadingProduct, isError: isProductError } = useProductDetail(productId);
  const { data: emiPlans, isLoading: isLoadingEmi, isError: isEmiError } = useEmiPlans(productId, variantId);

  const variant = product?.variants.find((v) => v.id === variantId);
  const plan = emiPlans?.find((p) => p.tenureMonths === tenureMonths);

  const isLoading = isLoadingProduct || isLoadingEmi;
  const isError = isProductError || isEmiError || (!isLoading && (!product || !variant || !plan));

  const backToMarketplace = () => navigation.popToTop();

  if (isLoading) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Skeleton width={64} height={64} borderRadius={32} style={styles.skeletonIcon} />
        <Skeleton width="60%" height={20} style={{ marginTop: spacing.md, alignSelf: 'center' }} />
        <Skeleton width="100%" height={140} borderRadius={16} style={{ marginTop: spacing.lg }} />
      </ScrollView>
    );
  }

  if (isError || !product || !variant || !plan) {
    return (
      <View style={styles.container}>
        <EmptyState
          icon="alert-circle-outline"
          title="Couldn't load your order"
          subtitle="Something went wrong pulling up the confirmation details."
        />
        <PrimaryButton label="Back to Marketplace" onPress={backToMarketplace} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.successIcon}>
        <Ionicons name="checkmark" size={36} color={colors.white} />
      </View>
      <Text style={styles.title}>Order placed!</Text>
      <Text style={styles.subtitle}>
        This is a mocked confirmation — there's no real checkout or payment backend in this build.
      </Text>

      <View style={styles.card}>
        <View style={styles.cardRow}>
          <View style={styles.productTile}>
            <Ionicons name={product.icon as any} size={28} color={colors.accent} />
          </View>
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productVariant}>
              {product.brand} · {variant.label}
            </Text>
          </View>
          <Text style={styles.productPrice}>{formatRupees(variant.price)}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>EMI plan</Text>
          <Text style={styles.detailValue}>{plan.tenureMonths} months</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Monthly amount</Text>
          <Text style={styles.detailValue}>{formatRupees(plan.monthlyAmount)}/mo</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Total payable</Text>
          <Text style={styles.detailValue}>{formatRupees(plan.totalPayable)}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Order reference</Text>
          <Text style={styles.detailValue}>{orderRef}</Text>
        </View>

        {plan.noCostEmi && <Badge label="No-cost EMI" tone="success" style={styles.badge} />}
      </View>

      <View style={styles.ctaWrap}>
        <PrimaryButton label="Back to Marketplace" onPress={backToMarketplace} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  skeletonIcon: {
    alignSelf: 'center',
  },
  successIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: spacing.md,
  },
  title: {
    ...typography.heading,
    color: colors.textPrimary,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginTop: spacing.lg,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productTile: {
    width: 48,
    height: 48,
    borderRadius: radius.sm,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    ...typography.cardTitle,
    color: colors.textPrimary,
  },
  productVariant: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: 2,
  },
  productPrice: {
    ...typography.cardTitle,
    color: colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  detailLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  detailValue: {
    ...typography.bodySmall,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  badge: {
    alignSelf: 'flex-start',
    marginTop: spacing.sm,
  },
  ctaWrap: {
    marginTop: spacing.lg,
  },
});
