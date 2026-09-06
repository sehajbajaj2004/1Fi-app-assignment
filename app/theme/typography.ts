// Bold, rounded geometric sans (visually close to Poppins / DM Sans), matching
// the reference screenshots. Falls back to the platform system font — no custom
// font files are bundled for this MVP.
export const typography = {
  fontFamily: undefined as string | undefined, // system default; swap in a loaded font if desired

  heading: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: undefined,
  },
  subheading: {
    fontSize: 18,
    fontWeight: '700' as const,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
  },
  body: {
    fontSize: 14,
    fontWeight: '400' as const,
  },
  bodySmall: {
    fontSize: 13,
    fontWeight: '400' as const,
  },
  caption: {
    fontSize: 12,
    fontWeight: '600' as const,
  },
  button: {
    fontSize: 16,
    fontWeight: '700' as const,
  },
};
