export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  pill: 999,
};

/**
 * Bottom padding scrollable screens need so their content clears the floating
 * tab bar (64px tall, floated above the safe area with its own margin) instead
 * of sitting behind it. A static approximation rather than reading actual
 * safe-area insets in every screen — slightly generous is harmless here.
 */
export const floatingTabBarClearance = 120;
