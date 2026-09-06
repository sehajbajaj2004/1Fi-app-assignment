import { SafeAreaView, StyleSheet } from 'react-native';
import { EmptyState } from '../../components/ui';
import { colors, spacing } from '../../theme';

export function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <EmptyState icon="home-outline" title="Home" subtitle="Not part of this build." />
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
