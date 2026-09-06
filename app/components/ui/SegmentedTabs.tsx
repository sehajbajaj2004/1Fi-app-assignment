import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';

export type SegmentedTab = {
  key: string;
  label: string;
};

type Props = {
  tabs: SegmentedTab[];
  activeKey: string;
  onChange: (key: string) => void;
};

/**
 * Pill segmented switcher matching the Shop page reference:
 * active = white pill, purple text, thin underline; inactive = transparent, gray text.
 */
export function SegmentedTabs({ tabs, activeKey, onChange }: Props) {
  return (
    <View style={styles.track}>
      {tabs.map((tab) => {
        const active = tab.key === activeKey;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onChange(tab.key)}
            style={[styles.pill, active && styles.pillActive]}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
          >
            <Text style={[styles.label, active && styles.labelActive]} numberOfLines={1}>
              {tab.label}
            </Text>
            {active ? <View style={styles.underline} /> : null}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    backgroundColor: colors.segmentTrackBg,
    borderRadius: radius.pill,
    padding: 4,
  },
  pill: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillActive: {
    backgroundColor: colors.segmentActiveBg,
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  label: {
    ...typography.bodySmall,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  labelActive: {
    color: colors.accent,
    fontWeight: '700',
  },
  underline: {
    marginTop: 4,
    height: 2,
    width: 22,
    borderRadius: 1,
    backgroundColor: colors.accent,
  },
});
