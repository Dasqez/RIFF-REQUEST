export const colors = {
  background: '#0B0A09',
  surface: '#171412',
  surfaceRaised: '#221D19',
  border: '#33291F',
  primary: '#FF6A1A',
  primaryDark: '#9C3A08',
  primarySurface: '#2A1709',
  secondary: '#FFC23D',
  secondarySurface: '#2B2110',
  accent: '#FF8F4D',
  text: '#F7F1EA',
  textMuted: '#B2A596',
  success: '#8EDB4F',
  black: '#1A0900',
  line: '#5A4A38',
} as const;

export const fonts = {
  display: 'BarlowCondensed_800ExtraBold_Italic',
} as const;

export const spacing = { xs: 6, sm: 10, md: 16, lg: 24, xl: 32 } as const;
export const radii = { sm: 12, md: 18, lg: 22, xl: 26, pill: 999 } as const;

export const displayText = {
  fontFamily: fonts.display,
  textTransform: 'uppercase',
} as const;
