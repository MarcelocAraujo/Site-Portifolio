/**
 * Estrutura das telas: barra de navegação, rolagem com largura máxima,
 * botões de redes sociais e rodapé.
 */
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import type { TabListProps, TabTriggerSlotProps } from 'expo-router/ui';
import { type ComponentProps, type ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/ui';
import { LINKS } from '@/data/perfil';
import { abrirLink } from '@/lib/open-link';
import { useAppTheme, useThemedStyles } from '@/theme/theme-context';
import { fonts, MAX_WIDTH, radius, space, type Palette } from '@/theme/tokens';

/* ------------------------------------------------------------------ */
/* Marca "marcelo.caldas.dev"                                          */
/* ------------------------------------------------------------------ */

export function Brand() {
  const { colors } = useAppTheme();
  return (
    <Text style={{ fontFamily: fonts.monoMedium, fontSize: 14, color: colors.text }}>
      marcelo.<Text style={{ color: colors.accent }}>caldas</Text>
      <Text style={{ color: colors.textDim }}>.dev</Text>
    </Text>
  );
}

/* ------------------------------------------------------------------ */
/* Botão de tema claro/escuro                                          */
/* ------------------------------------------------------------------ */

export function ThemeToggle() {
  const { scheme, toggle, colors } = useAppTheme();
  const escuro = scheme === 'dark';
  return (
    <Pressable
      onPress={toggle}
      accessibilityRole="button"
      accessibilityLabel={escuro ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
      style={({ pressed, hovered }: { pressed: boolean; hovered?: boolean }) => ({
        width: 36,
        height: 36,
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: hovered ? colors.accentBorder : colors.border,
        backgroundColor: colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ scale: pressed ? 0.94 : 1 }],
      })}>
      <Ionicons name={escuro ? 'sunny-outline' : 'moon-outline'} size={16} color={colors.text} />
    </Pressable>
  );
}

/* ------------------------------------------------------------------ */
/* Barra de navegação (TabList do Expo Router)                         */
/* ------------------------------------------------------------------ */

/**
 * Recebe os <TabTrigger> como filhos. Em telas largas os links ficam
 * centralizados na mesma linha da marca; no celular viram uma faixa
 * de "pílulas" com rolagem horizontal logo abaixo.
 */
export function NavHeader({ children, style, ...rest }: TabListProps) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const s = useThemedStyles(navStyles);
  const largo = width >= 900;

  return (
    <View {...rest} style={[s.wrapper, { paddingTop: insets.top }, style]}>
      <View style={s.inner}>
        <View style={s.topRow}>
          <Brand />
          {largo ? <View style={s.linksInline}>{children}</View> : null}
          <ThemeToggle />
        </View>
        {!largo ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={s.linksScroll}>
            {children}
          </ScrollView>
        ) : null}
      </View>
    </View>
  );
}

const navStyles = (c: Palette) =>
  StyleSheet.create({
    wrapper: {
      backgroundColor: c.bg,
      borderBottomWidth: 1,
      borderBottomColor: c.border,
    },
    inner: {
      width: '100%',
      maxWidth: MAX_WIDTH,
      alignSelf: 'center',
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: space.xl,
      paddingVertical: space.md,
      gap: space.lg,
    },
    linksInline: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: space.xs,
    },
    linksScroll: {
      paddingHorizontal: space.lg,
      paddingBottom: space.md,
      gap: space.xs,
    },
  });

// O `ref` injetado pelo TabTrigger continua chegando via ...props em tempo de execução;
// só tiramos do tipo porque a tipagem dele no expo-router não bate com a do Pressable.
type NavItemProps = Omit<TabTriggerSlotProps, 'ref'> & {
  label: string;
  icon: ComponentProps<typeof MaterialCommunityIcons>['name'];
};

/** Item da navegação. O Expo Router injeta `isFocused` e `onPress`. */
export function NavItem({ label, icon, isFocused, ...props }: NavItemProps) {
  const { colors } = useAppTheme();
  return (
    <Pressable
      {...props}
      style={({ pressed, hovered }: { pressed: boolean; hovered?: boolean }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: space.md,
        paddingVertical: 7,
        borderRadius: radius.md,
        backgroundColor: isFocused ? colors.accentSoft : hovered ? colors.surfaceAlt : 'transparent',
        opacity: pressed ? 0.75 : 1,
      })}>
      <MaterialCommunityIcons
        name={icon}
        size={15}
        color={isFocused ? colors.accent : colors.textMuted}
      />
      <Text
        style={{
          fontFamily: isFocused ? fonts.medium : fonts.regular,
          fontSize: 14,
          color: isFocused ? colors.accent : colors.text,
        }}>
        {label}
      </Text>
    </Pressable>
  );
}

/* ------------------------------------------------------------------ */
/* Tela com rolagem                                                    */
/* ------------------------------------------------------------------ */

export function Screen({ children }: { children: ReactNode }) {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bg }}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: insets.bottom }}
      keyboardShouldPersistTaps="handled">
      <View
        style={{
          width: '100%',
          maxWidth: MAX_WIDTH,
          alignSelf: 'center',
          paddingHorizontal: space.xl,
          paddingTop: space.xxl,
          paddingBottom: space.xxxl,
          gap: space.xxxl,
          flexGrow: 1,
        }}>
        {children}
      </View>
      <Footer />
    </ScrollView>
  );
}

/* ------------------------------------------------------------------ */
/* GitHub · LinkedIn · Currículo                                       */
/* ------------------------------------------------------------------ */

export function SocialLinks() {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space.md }}>
      <Button
        label="GitHub"
        icon={{ lib: 'ion', name: 'logo-github' }}
        onPress={() => abrirLink(LINKS.github)}
      />
      <Button
        label="LinkedIn"
        icon={{ lib: 'ion', name: 'logo-linkedin' }}
        onPress={() => abrirLink(LINKS.linkedin)}
      />
      <Button
        label="Currículo"
        icon={{ lib: 'ion', name: 'document-text-outline' }}
        onPress={() => abrirLink(LINKS.curriculo)}
      />
    </View>
  );
}

/* ------------------------------------------------------------------ */
/* Rodapé                                                              */
/* ------------------------------------------------------------------ */

export function Footer() {
  const s = useThemedStyles(footerStyles);
  return (
    <View style={s.wrapper}>
      <View style={s.inner}>
        <Brand />
        <Text style={s.made}>Feito com React Native, Expo & TypeScript</Text>
        <Text style={s.made}>Recife/PE · 2026</Text>
      </View>
    </View>
  );
}

const footerStyles = (c: Palette) =>
  StyleSheet.create({
    wrapper: { borderTopWidth: 1, borderTopColor: c.border },
    inner: {
      width: '100%',
      maxWidth: MAX_WIDTH,
      alignSelf: 'center',
      paddingHorizontal: space.xl,
      paddingVertical: space.xl,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: space.md,
    },
    made: { fontFamily: fonts.mono, fontSize: 11, color: c.textDim },
  });
