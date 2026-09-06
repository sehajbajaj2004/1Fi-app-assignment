import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Badge } from '../ui';
import { colors, radius, spacing, typography } from '../../theme';
import type { EMIPlan } from '../../types/marketplace';

type Props = {
  plan: EMIPlan;
  selected: boolean;
  onSelect: () => void;
  /** Needed only to render the interest-rate badge for non-no-cost plans. */
  variantPrice: number;
};

function formatRupees(amount: number) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

/** Selectable EMI tenure row — radio-style, used in the ProductDetail plan list. */
export function EMIPlanOption({ plan, selected, onSelect, variantPrice }: Props) {
  return (
    <Pressable
      onPress={onSelect}
      style={[styles.row, selected && styles.rowSelected]}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
    >
      <Ionicons
        name={selected ? 'radio-button-on' : 'radio-button-off'}
        size={20}
        color={selected ? colors.accent : colors.textMuted}
        style={styles.radio}
      />
      <View style={styles.body}>
        <Text style={styles.tenure}>{plan.tenureMonths} months</Text>
        <Text style={styles.total}>Total payable {formatRupees(plan.totalPayable)}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.monthly}>{formatRupees(plan.monthlyAmount)}/mo</Text>
        {plan.noCostEmi ? (
          <Badge label="No-cost EMI" tone="success" style={styles.badge} />
        ) : (
          <Badge label={`${((plan.interestAmount / variantPrice) * 100).toFixed(1)}% interest`} tone="neutral" style={styles.badge} />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
    marginBottom: spacing.xs,
  },
  rowSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.accentSoft,
  },
  radio: {
    marginRight: spacing.sm,
  },
  body: {
    flex: 1,
  },
  tenure: {
    ...typography.cardTitle,
    color: colors.textPrimary,
  },
  total: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  right: {
    alignItems: 'flex-end',
  },
  monthly: {
    ...typography.cardTitle,
    color: colors.textPrimary,
  },
  badge: {
    marginTop: 4,
  },
});
