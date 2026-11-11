/**
 * Design tokens do app.
 * Visual escuro e minimalista: fundo quase preto, cards com borda fina,
 * destaque em lavanda e detalhes em fonte monoespaçada.
 */

export type Palette = {
  bg: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  borderStrong: string;
  text: string;
  textMuted: string;
  textDim: string;
  accent: string;
  accentSoft: string;
  accentBorder: string;
  onAccent: string;
  success: string;
  successSoft: string;
  danger: string;
  dangerSoft: string;
  codeKey: string;
  codeString: string;
  codeNumber: string;
  glow: string;
  header: string;
};

export const palettes: Record<'dark' | 'light', Palette> = {
  dark: {
    bg: '#0a0a0a',
    surface: '#111111',
    surfaceAlt: '#161616',
    border: 'rgba(255, 255, 255, 0.12)',
    borderStrong: 'rgba(255, 255, 255, 0.2)',
    text: '#f4f4f4',
    textMuted: '#8a8a8a',
    textDim: '#5a5a5a',
    accent: '#8b8cf5',
    accentSoft: 'rgba(139, 140, 245, 0.12)',
    accentBorder: 'rgba(139, 140, 245, 0.28)',
    onAccent: '#0a0a0a',
    success: '#4ade80',
    successSoft: 'rgba(74, 222, 128, 0.12)',
    danger: '#f87171',
    dangerSoft: 'rgba(248, 113, 113, 0.12)',
    codeKey: '#8b8cf5',
    codeString: '#86efac',
    codeNumber: '#fbbf24',
    glow: '#6d6ce0',
    header: 'rgba(10, 10, 12, 0.7)',
  },
  light: {
    bg: '#fafafa',
    surface: '#ffffff',
    surfaceAlt: '#f4f4f5',
    border: '#e4e4e7',
    borderStrong: '#d4d4d8',
    text: '#0a0a0a',
    textMuted: '#52525b',
    textDim: '#71717a',
    accent: '#5b5bd6',
    accentSoft: 'rgba(91, 91, 214, 0.10)',
    accentBorder: 'rgba(91, 91, 214, 0.35)',
    onAccent: '#ffffff',
    success: '#15803d',
    successSoft: 'rgba(21, 128, 61, 0.10)',
    danger: '#dc2626',
    dangerSoft: 'rgba(220, 38, 38, 0.10)',
    codeKey: '#5b5bd6',
    codeString: '#15803d',
    codeNumber: '#b45309',
    glow: '#8b8cf5',
    header: 'rgba(250, 250, 250, 0.8)',
  },
};

/** Famílias carregadas via @expo-google-fonts no layout raiz. */
export const fonts = {
  regular: 'Poppins_400Regular',
  medium: 'Poppins_500Medium',
  semibold: 'Poppins_600SemiBold',
  bold: 'Poppins_700Bold',
  mono: 'JetBrainsMono_400Regular',
  monoMedium: 'JetBrainsMono_500Medium',
} as const;

export const space = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radius = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  pill: 999,
} as const;

/** Largura máxima do conteúdo (fica centralizado em telas largas / web). */
export const MAX_WIDTH = 1300;
