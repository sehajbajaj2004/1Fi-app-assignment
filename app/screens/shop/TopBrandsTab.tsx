import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { EmptyState } from '../../components/ui';
import { colors, spacing, typography } from '../../theme';

/**
 * Stub tab per the assignment scope — intentionally blank, no real data/search
 * logic. The shared SearchBar lives in ShopScreen (placeholder text changes per
 * tab); this component only owns its heading + empty state.
 */
export function TopBrandsTab() {
  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.heading}>Top Brands</Text>
      <EmptyState
        icon="storefront-outline"
        title="Coming soon"
        subtitle="Top Brands isn't part of this build — the 1Fi Marketplace tab is the full experience."
      />
    </ScrollView>
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
