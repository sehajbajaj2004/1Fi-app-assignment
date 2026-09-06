import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { EmptyState } from '../../components/ui';
import { colors, spacing, typography } from '../../theme';

/**
 * Stub tab per the assignment scope — intentionally blank, no real data/search
 * logic. The shared SearchBar lives in ShopScreen (placeholder text changes per
 * tab); this component only owns its heading + empty state. Renders as a plain
 * View — ShopScreen is the single scrollable container for the whole page.
 */
export function TopBrandsTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Top Brands</Text>
      <EmptyState
        icon="storefront-outline"
        title="Coming soon"
        subtitle="Top Brands isn't part of this build — the 1Fi Marketplace tab is the full experience."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  heading: {
    ...typography.heading,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
});
