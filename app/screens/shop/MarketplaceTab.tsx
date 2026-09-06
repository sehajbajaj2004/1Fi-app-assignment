import React from 'react';
import { StyleSheet, View } from 'react-native';
import { EmptyState } from '../../components/ui';
import { spacing } from '../../theme';

/**
 * Placeholder for Phase 1 only. Replaced in Phase 3 with the real product
 * grid/list — this is the actual deliverable of the assignment.
 */
export function MarketplaceTab() {
  return (
    <View style={styles.container}>
      <EmptyState
        icon="construct-outline"
        title="1Fi Marketplace"
        subtitle="Product browsing is coming in Phase 3 of the build."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
  },
});
