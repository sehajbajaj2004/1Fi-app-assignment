import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { EmptyState } from '../../components/ui';
import { colors, radius, spacing, typography } from '../../theme';

/**
 * Stub tab per the assignment scope — intentionally blank, no real store/location
 * data. The shared SearchBar lives in ShopScreen (placeholder text changes per
 * tab); this component only owns its heading + location chip + empty state.
 * Renders as a plain View — ShopScreen is the single scrollable container.
 */
export function NearbyStoresTab() {
  return (
    <View style={styles.container}>
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
    </View>
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
