import { SafeAreaView, StyleSheet } from 'react-native';
import { EmptyState } from '../../components/ui';
import { colors, floatingTabBarClearance, spacing } from '../../theme';

export function EmiDuesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <EmptyState icon="document-text-outline" title="EMI Dues" subtitle="Not part of this build." />
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
