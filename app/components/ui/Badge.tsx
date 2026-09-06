import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, radius, typography } from '../../theme';

type Tone = 'neutral' | 'success' | 'accent';

type Props = {
  label: string;
  tone?: Tone;
  style?: ViewStyle;
};

const TONE_STYLES: Record<Tone, { bg: string; text: string }> = {
  neutral: { bg: colors.badgeBg, text: colors.badgeText },
  success: { bg: colors.successBg, text: colors.success },
  accent: { bg: colors.accentSoft, text: colors.accent },
};

/** Small rounded pill — used for distance ("24 KM"), EMI tenure, and "No-cost EMI" tags. */
export function Badge({ label, tone = 'neutral', style }: Props) {
  const toneStyle = TONE_STYLES[tone];
  return (
    <View style={[styles.badge, { backgroundColor: toneStyle.bg }, style]}>
      <Text style={[styles.text, { color: toneStyle.text }]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
  },
  text: {
    ...typography.caption,
  },
});
