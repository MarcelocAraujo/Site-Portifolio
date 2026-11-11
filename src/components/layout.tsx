/**
 * Estrutura das telas: barra de navegação, tela com rolagem (com o "aparecer
 * ao rolar"), seção padrão, botões de redes sociais e rodapé.
 */
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect, usePathname } from 'expo-router';
import type { TabListProps, TabTriggerSlotProps } from 'expo-router/ui';
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ComponentRef,
  type ReactNode,
} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { createRevealRegistry, RevealContext } from '@/components/reveal';
import { Icon } from '@/components/ui';
import { LINKS } from '@/data/perfil';
import { abrirLink } from '@/lib/open-link';
import { useAppTheme, useThemedStyles } from '@/theme/theme-context';
import { fonts, MAX_WIDTH, radius, type Palette } from '@/theme/tokens';

/** Ponto em que o layout troca para a versão de celular (igual à referência). */
export const BREAKPOINT = 860;

export function usePaddingLateral() {
  const { width } = useWindowDimensions();
  return width > BREAKPOINT ? 41 : 20;
}

/* ------------------------------------------------------------------ */
/* Marca                                                               */
/* ------------------------------------------------------------------ */

export function Brand() {
  const { colors } = useAppTheme();
  return (
    <Text numberOfLines={1} style={{ fontFamily: fonts.monoMedium, fontSize: 14, color: colors.accent }}>
      marcelo.caldas<Text style={{ color: colors.textMuted }}>.dev</Text>
    </Text>
  );
}

/* ------------------------------------------------------------------ */
/* Botão de tema (no lugar do botão "EN" da referência)                */
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
        width: 42,
        height: 34,
        borderRadius: radius.md,
        borderWidth: 1.5,
        borderColor: hovered ? colors.accent : colors.text,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: pressed ? 0.7 : 1,
      })}>
      <Ionicons name={escuro ? 'sunny-outline' : 'moon-outline'} size={15} color={colors.text} />
    </Pressable>
  );
}

/* ------------------------------------------------------------------ */
/* Barra de navegação (TabList do Expo Router)                         */
/* ------------------------------------------------------------------ */

/**
 * Desktop: marca à esquerda, links centralizados, botão à direita.
 * Celular: botão de menu que abre a lista de links.
 */
export function NavHeader({ children, style, ...rest }: TabListProps) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { colors } = useAppTheme();
  const s = useThemedStyles(navStyles);
  const pathname = usePathname();
  // O menu fica aberto só na tela em que foi aberto (fecha sozinho ao navegar).
  const [abertoEm, setAbertoEm] = useState<string | null>(null);
  const aberto = abertoEm === pathname;
  const largo = width > BREAKPOINT;
  const pad = largo ? 41 : 20;

  return (
    <View {...rest} style={[style, s.wrapper, { paddingTop: insets.top }]}>
      <View style={[s.barra, { paddingHorizontal: pad }]}>
        <View style={s.lado}>
          <Brand />
        </View>
        {largo ? <View style={s.linksCentro}>{children}</View> : null}
        <View style={[s.lado, { alignItems: 'flex-end' }]}>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <ThemeToggle />
            {!largo ? (
              <Pressable
                onPress={() => setAbertoEm(aberto ? null : pathname)}
                accessibilityRole="button"
                accessibilityLabel={aberto ? 'Fechar menu' : 'Abrir menu'}
                style={s.menuBotao}>
                <Ionicons name={aberto ? 'close' : 'menu'} size={20} color={colors.text} />
              </Pressable>
            ) : null}
          </View>
        </View>
      </View>
      {!largo ? (
        <View style={[s.menu, { paddingHorizontal: pad, display: aberto ? 'flex' : 'none' }]}>
          {children}
        </View>
      ) : null}
    </View>
  );
}

const navStyles = (c: Palette) =>
  StyleSheet.create({
    wrapper: {
      // O TabList do Expo Router aplica flexDirection: 'row'; aqui forçamos coluna.
      flexDirection: 'column',
      justifyContent: 'flex-start',
      width: '100%',
      alignSelf: 'stretch',
      backgroundColor: c.header,
      borderBottomWidth: 1,
      borderBottomColor: c.border,
      zIndex: 10,
    },
    barra: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 20,
    },
    lado: { flex: 1, minWidth: 160 },
    linksCentro: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    menuBotao: {
      width: 42,
      height: 34,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: c.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    menu: { paddingBottom: 16, gap: 4 },
  });

type NavItemProps = Omit<TabTriggerSlotProps, 'ref'> & { label: string };

/** Item da navegação. O Expo Router injeta `isFocused` e `onPress`. */
export function NavItem({ label, isFocused, ...props }: NavItemProps) {
  const { colors } = useAppTheme();
  return (
    <Pressable
      {...props}
      style={({ pressed, hovered }: { pressed: boolean; hovered?: boolean }) => ({
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: radius.md,
        backgroundColor: isFocused ? colors.accentSoft : 'transparent',
        opacity: pressed ? 0.7 : 1,
        ...(hovered && !isFocused ? { backgroundColor: colors.surfaceAlt } : null),
      })}>
      <Text
        style={{
          fontFamily: isFocused ? fonts.medium : fonts.regular,
          fontSize: 16,
          lineHeight: 24,
          color: isFocused ? colors.accent : colors.text,
        }}>
        {label}
      </Text>
    </Pressable>
  );
}

/* ------------------------------------------------------------------ */
/* Tela com rolagem + aparecer ao rolar                                */
/* ------------------------------------------------------------------ */

const ScrollTopContext = createContext<() => void>(() => {});

export function Screen({ children }: { children: ReactNode }) {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();
  const [registry] = useState(createRevealRegistry);
  const scrollRef = useRef<ComponentRef<typeof ScrollView>>(null);

  // Ao abrir a tela (ou voltar para ela), revela o que já está visível.
  useFocusEffect(
    useCallback(() => {
      const id = setTimeout(registry.notify, 60);
      return () => clearTimeout(id);
    }, [registry]),
  );

  const voltarAoTopo = useCallback(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }, []);

  return (
    <RevealContext.Provider value={registry}>
      <ScrollTopContext.Provider value={voltarAoTopo}>
        <ScrollView
          ref={scrollRef}
          style={{ flex: 1, backgroundColor: colors.bg }}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: insets.bottom }}
          onScroll={registry.notify}
          onContentSizeChange={registry.notify}
          scrollEventThrottle={32}
          keyboardShouldPersistTaps="handled">
          <View style={{ flexGrow: 1 }}>{children}</View>
          <Footer />
        </ScrollView>
      </ScrollTopContext.Provider>
    </RevealContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/* Seção padrão (padding e largura iguais aos da referência)           */
/* ------------------------------------------------------------------ */

export function Section({
  children,
  borda = true,
  style,
}: {
  children: ReactNode;
  borda?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const { colors } = useAppTheme();
  const { width } = useWindowDimensions();
  const pad = usePaddingLateral();
  return (
    <View
      style={[
        {
          paddingHorizontal: pad,
          paddingVertical: width > BREAKPOINT ? 92 : 64,
          borderTopWidth: borda ? 1 : 0,
          borderTopColor: colors.border,
        },
        style,
      ]}>
      <View style={{ width: '100%', maxWidth: MAX_WIDTH, alignSelf: 'center' }}>{children}</View>
    </View>
  );
}

/* ------------------------------------------------------------------ */
/* GitHub · LinkedIn · Currículo                                       */
/* ------------------------------------------------------------------ */

function SocialButton({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: Parameters<typeof Icon>[0]['icon'];
  onPress: () => void;
}) {
  const { colors } = useAppTheme();
  return (
    <Pressable
      accessibilityRole="link"
      onPress={onPress}
      style={({ pressed, hovered }: { pressed: boolean; hovered?: boolean }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        minWidth: 106,
        paddingVertical: 15,
        paddingHorizontal: 18,
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: hovered ? colors.accentBorder : colors.border,
        backgroundColor: hovered ? colors.accentSoft : 'transparent',
        opacity: pressed ? 0.8 : 1,
      })}>
      {({ hovered }: { hovered?: boolean }) => (
        <>
          <Icon icon={icon} size={16} color={hovered ? colors.accent : colors.text} />
          <Text
            style={{
              fontFamily: fonts.regular,
              fontSize: 14,
              lineHeight: 21,
              color: hovered ? colors.accent : colors.text,
            }}>
            {label}
          </Text>
        </>
      )}
    </Pressable>
  );
}

export function SocialLinks() {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
      <SocialButton
        label="GitHub"
        icon={{ lib: 'ion', name: 'logo-github' }}
        onPress={() => abrirLink(LINKS.github)}
      />
      <SocialButton
        label="LinkedIn"
        icon={{ lib: 'ion', name: 'logo-linkedin' }}
        onPress={() => abrirLink(LINKS.linkedin)}
      />
      <SocialButton
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
  const { colors } = useAppTheme();
  const pad = usePaddingLateral();
  const voltarAoTopo = useContext(ScrollTopContext);
  return (
    <View style={[s.wrapper, { paddingHorizontal: pad }]}>
      <View style={s.inner}>
        <Brand />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 6 }}>
          <Text style={s.made}>Feito com React Native, Expo & TypeScript ·</Text>
          <Pressable onPress={() => router.navigate('/sobre')} accessibilityRole="link">
            {({ hovered }: { hovered?: boolean }) => (
              <Text style={[s.made, { color: hovered ? colors.accent : colors.textMuted, textDecorationLine: 'underline' }]}>
                Sobre este app
              </Text>
            )}
          </Pressable>
        </View>
        <Pressable
          onPress={voltarAoTopo}
          accessibilityRole="button"
          accessibilityLabel="Voltar ao topo"
          style={({ hovered }: { hovered?: boolean }) => [
            s.topo,
            hovered && { borderColor: colors.accent },
          ]}>
          <Ionicons name="arrow-up" size={14} color={colors.text} />
        </Pressable>
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
      paddingVertical: 22,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
    },
    made: { fontFamily: fonts.mono, fontSize: 11, color: c.textDim },
    topo: {
      width: 36,
      height: 36,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: c.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
