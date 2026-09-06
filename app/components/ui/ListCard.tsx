import React, { ReactNode } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';

type Props = {
  title: string;
  subtitle?: string;
  imageUri?: string;
  imageFallbackText?: string;
  trailing?: ReactNode;
  onPress?: () => void;
};

/**
 * White rounded card: square logo/image tile on the left, bold title, secondary
 * metadata line, optional trailing content (e.g. a distance Badge).
 * Reused for store rows, brand rows and (in Phase 3) product rows.
 */
export function ListCard({ title, subtitle, imageUri, imageFallbackText, trailing, onPress }: Props) {
  const Wrapper = onPress ? Pressable : View;
  return (
    <Wrapper style={styles.card} onPress={onPress} accessibilityRole={onPress ? 'button' : undefined}>
      <View style={styles.tile}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.tileImage} resizeMode="contain" />
        ) : (
          <Text style={styles.tileFallback}>{(imageFallbackText ?? title).slice(0, 2).toUpperCase()}</Text>
        )}
      </View>
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={styles.subtitle} numberOfLines={2}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {trailing ? <View style={styles.trailing}>{trailing}</View> : null}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'flex-start',
  },
  tile: {
    width: 56,
    height: 56,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    overflow: 'hidden',
  },
  tileImage: {
    width: '78%',
    height: '78%',
  },
  tileFallback: {
    ...typography.cardTitle,
    color: colors.accent,
  },
  body: {
    flex: 1,
    paddingRight: spacing.xs,
  },
  title: {
    ...typography.cardTitle,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: 2,
  },
  trailing: {
    marginLeft: spacing.xs,
  },
});
