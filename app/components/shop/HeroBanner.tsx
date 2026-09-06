import { Image, StyleSheet, useWindowDimensions, View } from 'react-native';

// Provided asset: the "Shop today, Pay later using Mutual funds." banner from the
// live 1Fi app. This is rendered as-is — no gradient/text/illustration is recreated
// in code.
const HERO_BANNER = require('../../../assets/images/hero-banner.jpg');

// Real asset's native pixel dimensions (1080x640).
const ASSET_ASPECT_RATIO = 1080 / 640;

/**
 * Thin wrapper around the provided hero banner image. Renders full-width,
 * aspect-ratio preserved — not a component built from scratch.
 */
export function HeroBanner() {
  const { width } = useWindowDimensions();
  // Computed explicitly rather than via the CSS `aspectRatio` style — react-native-web
  // doesn't reliably honor aspectRatio together with resizeMode="cover".
  const height = width / ASSET_ASPECT_RATIO;
  return (
    <View style={styles.container}>
      <Image
        source={HERO_BANNER}
        style={{ width, height }}
        resizeMode="cover"
        accessibilityLabel="Shop today, pay later using mutual funds"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
  },
});
