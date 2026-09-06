import { SafeAreaView, StyleSheet } from 'react-native';
import { EmptyState } from '../../components/ui';
import { colors, spacing } from '../../theme';

export function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <EmptyState icon="person-outline" title="Profile" subtitle="Not part of this build." />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: spacing.md,
  },
});
