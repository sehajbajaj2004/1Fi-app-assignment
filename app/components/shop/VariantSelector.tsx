import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';
import type { ProductVariant } from '../../types/marketplace';

type Props = {
  variants: ProductVariant[];
  selectedId: string;
  onSelect: (variant: ProductVariant) => void;
};

/** Chip-style variant selector (color/storage/trim) on the product detail screen. */
export function VariantSelector({ variants, selectedId, onSelect }: Props) {
  return (
    <View style={styles.row}>
      {variants.map((variant) => {
        const selected = variant.id === selectedId;
        return (
          <Pressable
            key={variant.id}
            onPress={() => onSelect(variant)}
            disabled={!variant.inStock}
            style={[styles.chip, selected && styles.chipSelected, !variant.inStock && styles.chipDisabled]}
            accessibilityRole="button"
            accessibilityState={{ selected, disabled: !variant.inStock }}
          >
            <Text
              style={[
                styles.label,
                selected && styles.labelSelected,
                !variant.inStock && styles.labelDisabled,
              ]}
              numberOfLines={1}
            >
              {variant.label}
              {!variant.inStock ? ' (out of stock)' : ''}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
  },
  chipSelected: {
    backgroundColor: colors.accentSoft,
    borderColor: colors.accent,
  },
  chipDisabled: {
    opacity: 0.5,
  },
  label: {
    ...typography.bodySmall,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  labelSelected: {
    color: colors.accent,
  },
  labelDisabled: {
    color: colors.textMuted,
  },
});
