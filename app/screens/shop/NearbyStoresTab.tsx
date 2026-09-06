import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { EmptyState } from '../../components/ui';
import { colors, radius, spacing, typography } from '../../theme';

/**
 * Stub tab per the assignment scope — intentionally blank, no real store/location
 * data. The shared SearchBar lives in ShopScreen (placeholder text changes per
 * tab); this component only owns its heading + location chip + empty state.
 */
export function NearbyStoresTab() {
  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.headingRow}>
        <Text style={styles.heading}>Nearby Stores</Text>
        <View style={styles.locationChip}>
          <Text style={styles.locationText}>West Delhi</Text>
          <Ionicons name="chevron-down" size={14} color={colors.accent} />
        </View>
      </View>
      <EmptyState
        icon="location-outline"
        title="Coming soon"
        subtitle="Nearby Stores isn't part of this build — the 1Fi Marketplace tab is the full experience."
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  heading: {
    ...typography.heading,
    color: colors.textPrimary,
  },
  locationChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accentSoft,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
  },
  locationText: {
    ...typography.bodySmall,
    fontWeight: '700',
    color: colors.accent,
    marginRight: 2,
  },
});
