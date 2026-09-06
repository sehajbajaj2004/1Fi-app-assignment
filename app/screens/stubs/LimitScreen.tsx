import { SafeAreaView, StyleSheet } from 'react-native';
import { EmptyState } from '../../components/ui';
import { colors, floatingTabBarClearance, spacing } from '../../theme';

export function LimitScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <EmptyState icon="trending-up-outline" title="Limit" subtitle="Not part of this build." />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: spacing.md,
    // Clears the floating tab bar.
    paddingBottom: spacing.md + floatingTabBarClearance,
  },
});
