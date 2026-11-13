/**
 * Janela de detalhes do projeto (abre ao clicar no card), no mesmo estilo
 * da referência: fundo escurecido e painel central com galeria e descrição.
 */
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import {
  Animated,
  Easing,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Chip } from '@/components/ui';
import type { LinkProjeto, Projeto } from '@/data/perfil';
import { abrirLink } from '@/lib/open-link';
import { useAppTheme, useThemedStyles } from '@/theme/theme-context';
import { fonts, radius, type Palette } from '@/theme/tokens';

export function ProjetoModal({ projeto, onFechar }: { projeto: Projeto | null; onFechar: () => void }) {
  const s = useThemedStyles(modalStyles);
  const { colors } = useAppTheme();
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const celular = width < 700;
  const [indice, setIndice] = useState(0);
  const [entrada] = useState(() => new Animated.Value(0));

  // Ao abrir outro projeto: volta para a primeira imagem e anima a entrada.
  const [ultimo, setUltimo] = useState<Projeto | null>(null);
  if (projeto && projeto !== ultimo) {
    setUltimo(projeto);
    setIndice(0);
  }

  useEffect(() => {
    if (!projeto) return;
    entrada.setValue(0);
    Animated.timing(entrada, {
      toValue: 1,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [projeto, entrada]);

  if (!projeto) return null;
  const { detalhes } = projeto;
  const galeria = detalhes.galeria;
  const atual = galeria[Math.min(indice, galeria.length - 1)]!;
  const varias = galeria.length > 1;
  const mudar = (passo: number) => setIndice((i) => (i + passo + galeria.length) % galeria.length);

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onFechar} statusBarTranslucent>
      <View style={[s.backdrop, celular && { padding: 0 }]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onFechar} accessibilityLabel="Fechar detalhes" />
        <Animated.View
          style={[
            s.painel,
            celular
              ? { width: '100%', height: '100%', maxHeight: '100%', borderRadius: 0, paddingTop: insets.top }
              : { maxHeight: height * 0.9 },
            {
              opacity: entrada,
              transform: [{ scale: entrada.interpolate({ inputRange: [0, 1], outputRange: [0.97, 1] }) }],
            },
          ]}>
          <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 8 }}>
            {/* Galeria */}
            <View style={s.imagemBox}>
              <Image
                source={atual.imagem}
                contentFit="contain"
                style={{ width: '100%', height: '100%' }}
                accessibilityLabel={atual.legenda}
                transition={200}
              />
              {varias ? (
                <>
                  <SetaGaleria lado="esquerda" onPress={() => mudar(-1)} />
                  <SetaGaleria lado="direita" onPress={() => mudar(1)} />
                </>
              ) : null}
            </View>
            <Text style={s.legenda}>
              {atual.legenda}
              {varias ? `  ·  ${indice + 1}/${galeria.length}` : ''}
            </Text>
            {varias ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.miniaturas}>
                {galeria.map((item, i) => (
                  <Pressable
                    key={i}
                    onPress={() => setIndice(i)}
                    accessibilityLabel={`Ver imagem: ${item.legenda}`}
                    style={[s.miniatura, i === indice && { borderColor: colors.accent, opacity: 1 }]}>
                    <Image source={item.imagem} contentFit="cover" style={{ width: '100%', height: '100%' }} />
                  </Pressable>
                ))}
              </ScrollView>
            ) : null}

            {/* Conteúdo */}
            <View style={[s.corpo, celular && { padding: 20 }]}>
              <Text style={s.categoria}>{projeto.categoria}</Text>
              <Text style={[s.titulo, celular && { fontSize: 24, lineHeight: 32 }]}>{projeto.titulo}</Text>
              <Text style={s.contexto}>
                {detalhes.contexto}
                {detalhes.equipe ? `  ·  ${detalhes.equipe}` : ''}
              </Text>

              <Text style={s.subtitulo}>Sobre o projeto</Text>
              {detalhes.sobre.map((p, i) => (
                <Text key={i} style={s.paragrafo}>
                  {p}
                </Text>
              ))}

              <Text style={s.subtitulo}>Destaques</Text>
              <View style={{ gap: 10 }}>
                {detalhes.destaques.map((d) => (
                  <View key={d} style={{ flexDirection: 'row', gap: 10 }}>
                    <Ionicons name="checkmark-circle" size={18} color={colors.accent} style={{ marginTop: 3 }} />
                    <Text style={[s.paragrafo, { flex: 1, marginBottom: 0 }]}>{d}</Text>
                  </View>
                ))}
              </View>

              <Text style={s.subtitulo}>Tecnologias</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {projeto.stack.map((tech) => (
                  <Chip key={tech}>{tech}</Chip>
                ))}
              </View>

              {detalhes.links.length > 0 ? (
                <View style={s.links}>
                  {detalhes.links.map((link) => (
                    <BotaoLink key={link.url} link={link} />
                  ))}
                </View>
              ) : null}
              {detalhes.observacao ? (
                <View style={s.observacao}>
                  <Ionicons name="lock-closed-outline" size={14} color={colors.textMuted} />
                  <Text style={s.observacaoTexto}>{detalhes.observacao}</Text>
                </View>
              ) : null}
            </View>
          </ScrollView>

          <Pressable
            onPress={onFechar}
            accessibilityRole="button"
            accessibilityLabel="Fechar"
            style={({ hovered }: { hovered?: boolean }) => [
              s.fechar,
              { top: (celular ? insets.top : 0) + 14 },
              hovered && { borderColor: colors.accent },
            ]}>
            <Ionicons name="close" size={20} color="#f4f4f4" />
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );
}

function SetaGaleria({ lado, onPress }: { lado: 'esquerda' | 'direita'; onPress: () => void }) {
  const s = useThemedStyles(modalStyles);
  return (
    <Pressable
      onPress={onPress}
      accessibilityLabel={lado === 'esquerda' ? 'Imagem anterior' : 'Próxima imagem'}
      style={[s.seta, lado === 'esquerda' ? { left: 12 } : { right: 12 }]}>
      <Ionicons name={lado === 'esquerda' ? 'chevron-back' : 'chevron-forward'} size={20} color="#f4f4f4" />
    </Pressable>
  );
}

function BotaoLink({ link }: { link: LinkProjeto }) {
  const { colors } = useAppTheme();
  const site = link.tipo === 'site';
  const cor = site ? colors.onAccent : colors.text;
  return (
    <Pressable
      accessibilityRole="link"
      onPress={() => abrirLink(link.url)}
      style={({ hovered, pressed }: { hovered?: boolean; pressed: boolean }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 13,
        paddingHorizontal: 20,
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: site ? colors.accent : hovered ? colors.accentBorder : colors.border,
        backgroundColor: site ? colors.accent : hovered ? colors.accentSoft : 'transparent',
        opacity: pressed ? 0.8 : site && hovered ? 0.9 : 1,
      })}>
      <Ionicons name={site ? 'open-outline' : 'logo-github'} size={16} color={cor} />
      <Text style={{ fontFamily: fonts.medium, fontSize: 14, color: cor }}>{link.rotulo}</Text>
    </Pressable>
  );
}

const modalStyles = (c: Palette) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    },
    painel: {
      width: '100%',
      maxWidth: 880,
      backgroundColor: c.surface,
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: 16,
      overflow: 'hidden',
    },
    imagemBox: { width: '100%', aspectRatio: 16 / 10, backgroundColor: c.bg },
    seta: {
      position: 'absolute',
      top: '50%',
      marginTop: -20,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(10, 10, 10, 0.65)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    legenda: {
      fontFamily: fonts.mono,
      fontSize: 12,
      color: c.textMuted,
      textAlign: 'center',
      paddingHorizontal: 16,
      paddingTop: 12,
    },
    miniaturas: { gap: 10, paddingHorizontal: 20, paddingTop: 12, justifyContent: 'center', flexGrow: 1 },
    miniatura: {
      width: 96,
      aspectRatio: 16 / 10,
      borderRadius: radius.sm,
      overflow: 'hidden',
      borderWidth: 2,
      borderColor: 'transparent',
      opacity: 0.6,
      backgroundColor: c.bg,
    },
    corpo: { padding: 32, paddingTop: 24 },
    categoria: { fontFamily: fonts.regular, fontSize: 14, color: c.accent },
    titulo: { fontFamily: fonts.semibold, fontSize: 30, lineHeight: 38, color: c.text, marginTop: 4 },
    contexto: { fontFamily: fonts.mono, fontSize: 12, lineHeight: 18, color: c.textMuted, marginTop: 6 },
    subtitulo: { fontFamily: fonts.semibold, fontSize: 17, color: c.text, marginTop: 28, marginBottom: 12 },
    paragrafo: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 25, color: c.textMuted, marginBottom: 10 },
    links: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 30 },
    observacao: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 26 },
    observacaoTexto: { fontFamily: fonts.regular, fontSize: 13, color: c.textMuted },
    fechar: {
      position: 'absolute',
      right: 14,
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor: 'rgba(10, 10, 10, 0.75)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.18)',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
