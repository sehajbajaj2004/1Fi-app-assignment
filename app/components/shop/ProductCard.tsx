import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Badge } from '../ui';
import { computeEmiPlans } from '../../data/api/marketplaceApi';
import { getDefaultVariant } from '../../data/productHelpers';
import { colors, radius, spacing, typography } from '../../theme';
import type { Product } from '../../types/marketplace';

type Props = {
  product: Product;
  onPress: () => void;
};

function formatRupees(amount: number) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

/** Product row for the Marketplace listing: icon tile, name, price, and an "EMI from" teaser. */
export function ProductCard({ product, onPress }: Props) {
  const variant = getDefaultVariant(product);
  const plans = computeEmiPlans(variant.price);
  const teaserPlan = plans.find((p) => p.noCostEmi) ?? plans[0];

  return (
    <Pressable style={styles.card} onPress={onPress} accessibilityRole="button">
      <View style={styles.tile}>
        <Ionicons name={product.icon as any} size={26} color={colors.accent} />
      </View>
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.spec} numberOfLines={1}>
          {product.brand} &middot; {product.shortSpec}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatRupees(variant.price)}</Text>
          {!variant.inStock && <Badge label="Out of stock" tone="neutral" style={styles.stockBadge} />}
        </View>
        <Text style={styles.emiTeaser}>
          EMI from {formatRupees(teaserPlan.monthlyAmount)}/mo
          {teaserPlan.noCostEmi ? ' · No-cost' : ''}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tile: {
    width: 56,
    height: 56,
    borderRadius: radius.sm,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  body: {
    flex: 1,
  },
  name: {
    ...typography.cardTitle,
    color: colors.textPrimary,
  },
  spec: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  price: {
    ...typography.cardTitle,
    color: colors.textPrimary,
  },
  stockBadge: {
    marginLeft: spacing.xs,
  },
  emiTeaser: {
    ...typography.caption,
    color: colors.accent,
    marginTop: 2,
  },
});
