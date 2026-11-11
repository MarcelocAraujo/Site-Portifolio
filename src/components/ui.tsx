/**
 * Componentes visuais básicos: textos, botões, cards, chips e títulos.
 */
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState, type ComponentProps, type ReactNode } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import { useAppTheme, useThemedStyles } from '@/theme/theme-context';
import { fonts, radius, space, type Palette } from '@/theme/tokens';

/* ------------------------------------------------------------------ */
/* Texto                                                               */
/* ------------------------------------------------------------------ */

type Variante = 'h1' | 'h2' | 'h3' | 'body' | 'muted' | 'small' | 'mono' | 'label';

export function AppText({
  variant = 'body',
  style,
  ...rest
}: TextProps & { variant?: Variante }) {
  const s = useThemedStyles(textStyles);
  return <Text {...rest} style={[s[variant], style]} />;
}

const textStyles = (c: Palette) =>
  StyleSheet.create({
    h1: { fontFamily: fonts.semibold, fontSize: 38, lineHeight: 44, color: c.text, letterSpacing: -0.8 },
    h2: { fontFamily: fonts.semibold, fontSize: 30, lineHeight: 38, color: c.text, letterSpacing: -0.5 },
    h3: { fontFamily: fonts.semibold, fontSize: 18, lineHeight: 26, color: c.text },
    body: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 24, color: c.text },
    muted: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 24, color: c.textMuted },
    small: { fontFamily: fonts.regular, fontSize: 13, lineHeight: 20, color: c.textMuted },
    mono: { fontFamily: fonts.mono, fontSize: 13, lineHeight: 20, color: c.accent },
    label: { fontFamily: fonts.mono, fontSize: 12, lineHeight: 18, color: c.accent, letterSpacing: 0.3 },
  });

/* ------------------------------------------------------------------ */
/* Cursor "_" piscando + títulos de seção                              */
/* ------------------------------------------------------------------ */

export function BlinkingCursor({ style }: { style?: StyleProp<TextStyle> }) {
  const { colors } = useAppTheme();
  const [opacity] = useState(() => new Animated.Value(1));

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        // duração 0 com atraso = pisca "seco", como um cursor de terminal
        Animated.timing(opacity, { toValue: 0, duration: 0, delay: 530, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 0, delay: 530, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return <Animated.Text style={[{ color: colors.accent, opacity }, style]}>_</Animated.Text>;
}

/** Título grande de seção no estilo "Projetos_". */
export function SectionTitle({
  label,
  title,
  subtitle,
  align = 'left',
}: {
  label?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}) {
  const s = useThemedStyles(textStyles);
  const center = align === 'center';
  return (
    <View style={{ alignItems: center ? 'center' : 'flex-start', gap: space.sm }}>
      {label ? <AppText variant="label">{label}</AppText> : null}
      <Text style={[s.h2, center && { textAlign: 'center' }]}>
        {title}
        <BlinkingCursor />
      </Text>
      {subtitle ? (
        <AppText variant="muted" style={[{ maxWidth: 640 }, center && { textAlign: 'center' }]}>
          {subtitle}
        </AppText>
      ) : null}
    </View>
  );
}

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */

export function Card({
  children,
  style,
  onPress,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}) {
  const s = useThemedStyles(cardStyles);
  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed, hovered }: { pressed: boolean; hovered?: boolean }) => [
          s.card,
          (hovered || pressed) && s.cardHover,
          pressed && { transform: [{ scale: 0.99 }] },
          style,
        ]}>
        {children}
      </Pressable>
    );
  }
  return <View style={[s.card, style]}>{children}</View>;
}

const cardStyles = (c: Palette) =>
  StyleSheet.create({
    card: {
      backgroundColor: c.surface,
      borderColor: c.border,
      borderWidth: 1,
      borderRadius: radius.lg,
      padding: space.xl,
    },
    cardHover: {
      borderColor: c.accentBorder,
      backgroundColor: c.surfaceAlt,
    },
  });

/* ------------------------------------------------------------------ */
/* Chip (tag de tecnologia)                                            */
/* ------------------------------------------------------------------ */

export function Chip({ children, tone = 'accent' }: { children: ReactNode; tone?: 'accent' | 'neutral' }) {
  const { colors } = useAppTheme();
  const accent = tone === 'accent';
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: accent ? colors.accentBorder : colors.border,
        backgroundColor: accent ? colors.accentSoft : colors.surfaceAlt,
        borderRadius: radius.pill,
        paddingHorizontal: space.md,
        paddingVertical: 4,
      }}>
      <Text
        style={{
          fontFamily: fonts.medium,
          fontSize: 12,
          lineHeight: 18,
          color: accent ? colors.accent : colors.textMuted,
        }}>
        {children}
      </Text>
    </View>
  );
}

/* ------------------------------------------------------------------ */
/* Botão                                                               */
/* ------------------------------------------------------------------ */

type IconSpec =
  | { lib: 'ion'; name: ComponentProps<typeof Ionicons>['name'] }
  | { lib: 'mci'; name: ComponentProps<typeof MaterialCommunityIcons>['name'] };

export function Icon({ icon, size = 16, color }: { icon: IconSpec; size?: number; color: string }) {
  return icon.lib === 'ion' ? (
    <Ionicons name={icon.name} size={size} color={color} />
  ) : (
    <MaterialCommunityIcons name={icon.name} size={size} color={color} />
  );
}

export function Button({
  label,
  onPress,
  variant = 'outline',
  icon,
  trailingIcon,
  disabled,
  style,
}: {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'outline';
  icon?: IconSpec;
  trailingIcon?: IconSpec;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const { colors } = useAppTheme();
  const primary = variant === 'primary';
  const fg = primary ? colors.onAccent : colors.text;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled}
      style={({ pressed, hovered }: { pressed: boolean; hovered?: boolean }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: space.sm,
          paddingHorizontal: space.lg + 2,
          paddingVertical: space.md,
          borderRadius: radius.md,
          borderWidth: 1,
          borderColor: primary ? colors.accent : colors.border,
          backgroundColor: primary ? colors.accent : colors.surface,
          opacity: disabled ? 0.4 : 1,
        },
        primary && hovered && { opacity: 0.9 },
        !primary && hovered && { borderColor: colors.accentBorder, backgroundColor: colors.surfaceAlt },
        pressed && { transform: [{ scale: 0.97 }] },
        style,
      ]}>
      {icon ? <Icon icon={icon} color={fg} /> : null}
      <Text style={{ fontFamily: fonts.medium, fontSize: 14, color: fg }}>{label}</Text>
      {trailingIcon ? <Icon icon={trailingIcon} size={14} color={fg} /> : null}
    </Pressable>
  );
}

/* ------------------------------------------------------------------ */
/* Animação de entrada                                                 */
/* ------------------------------------------------------------------ */

export function FadeIn({
  children,
  delay = 0,
  style,
}: {
  children: ReactNode;
  delay?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const [progress] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 500,
      delay,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [progress, delay]);

  return (
    <Animated.View
      style={[
        {
          opacity: progress,
          transform: [{ translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [14, 0] }) }],
        },
        style,
      ]}>
      {children}
    </Animated.View>
  );
}
