/**
 * Seções do portfólio, no mesmo modelo visual do site de referência.
 * O Início mostra todas em sequência; cada aba mostra a sua.
 */
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useEffect, useState, type ReactNode } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';

import pkg from '../../package.json';
import { JogoForca, TOTAL_PALAVRAS, TOTAL_VIDAS } from '@/components/forca/jogo';
import { BREAKPOINT, Section, SocialLinks, usePaddingLateral } from '@/components/layout';
import { Reveal } from '@/components/reveal';
import { BlinkingCursor, Chip } from '@/components/ui';
import {
  FORMACAO,
  IDIOMAS,
  INTERESSES,
  MODULOS_APP,
  PERFIL,
  PROJETOS,
  STACKS,
  type Projeto,
} from '@/data/perfil';
import { useAppTheme, useThemedStyles } from '@/theme/theme-context';
import { fonts, MAX_WIDTH, type Palette } from '@/theme/tokens';

/* ------------------------------------------------------------------ */
/* Título de seção: "Projetos_"                                        */
/* ------------------------------------------------------------------ */

function Titulo({ children, align = 'center' }: { children: string; align?: 'center' | 'left' }) {
  const { colors } = useAppTheme();
  const { width } = useWindowDimensions();
  return (
    <Text
      style={{
        fontFamily: fonts.semibold,
        fontSize: width > BREAKPOINT ? 41 : 32,
        lineHeight: width > BREAKPOINT ? 50 : 40,
        color: colors.text,
        textAlign: align,
        letterSpacing: -0.5,
      }}>
      {children}
      <BlinkingCursor />
    </Text>
  );
}

/* ------------------------------------------------------------------ */
/* HERO                                                                */
/* ------------------------------------------------------------------ */

/** Digita o texto uma vez (como no título da referência). */
function useDigitacao(texto: string, atrasoInicial = 500, velocidade = 70) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= texto.length) return;
    const id = setTimeout(() => setN((v) => v + 1), n === 0 ? atrasoInicial : velocidade);
    return () => clearTimeout(id);
  }, [n, texto, atrasoInicial, velocidade]);
  return texto.slice(0, n);
}

/** Brilho roxo no canto superior direito e cinza no inferior esquerdo. */
function BrilhoFundo() {
  const { colors } = useAppTheme();
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Svg width="100%" height="100%">
        <Defs>
          <RadialGradient id="brilhoRoxo" cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor={colors.glow} stopOpacity={0.22} />
            <Stop offset="1" stopColor={colors.glow} stopOpacity={0} />
          </RadialGradient>
          <RadialGradient id="brilhoCinza" cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor="#3c3c46" stopOpacity={0.35} />
            <Stop offset="1" stopColor="#3c3c46" stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Circle cx="85%" cy="8%" r="45%" fill="url(#brilhoRoxo)" />
        <Circle cx="0%" cy="100%" r="30%" fill="url(#brilhoCinza)" />
      </Svg>
    </View>
  );
}

/** Avatar que vira (passar o mouse ou tocar) e mostra "Olá, eu sou Marcelo Caldas". */
function AvatarVirar({ tamanho }: { tamanho: number }) {
  const { colors } = useAppTheme();
  const [giro] = useState(() => new Animated.Value(0));
  const [fixado, setFixado] = useState(false);
  const [hover, setHover] = useState(false);
  const virado = fixado || hover;

  useEffect(() => {
    Animated.timing(giro, {
      toValue: virado ? 1 : 0,
      duration: 600,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [virado, giro]);

  const frente = giro.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });
  const verso = giro.interpolate({ inputRange: [0, 1], outputRange: ['180deg', '360deg'] });
  const face = {
    position: 'absolute' as const,
    width: tamanho,
    height: tamanho,
    borderRadius: tamanho / 2,
    overflow: 'hidden' as const,
    backfaceVisibility: 'hidden' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  return (
    <Pressable
      onPress={() => setFixado((v) => !v)}
      onHoverIn={() => setHover(true)}
      onHoverOut={() => setHover(false)}
      accessibilityRole="button"
      accessibilityLabel="Virar cartão entre a foto e uma saudação"
      style={{ width: tamanho, height: tamanho }}>
      <Animated.View
        style={[face, { backgroundColor: '#f4f4f4', transform: [{ perspective: 1200 }, { rotateY: frente }] }]}>
        {/* Troque por <Image source={require('@/assets/images/perfil.png')} /> quando tiver a foto */}
        <Text style={{ fontFamily: fonts.semibold, fontSize: tamanho * 0.3, color: '#0a0a0a', letterSpacing: -2 }}>
          MC
        </Text>
      </Animated.View>
      <Animated.View
        style={[
          face,
          {
            backgroundColor: colors.bg,
            borderWidth: 1,
            borderColor: colors.border,
            gap: 6,
            transform: [{ perspective: 1200 }, { rotateY: verso }],
          },
        ]}>
        <Text style={{ fontFamily: fonts.bold, fontSize: 16, color: colors.text }}>Olá, eu sou</Text>
        <Text style={{ fontFamily: fonts.bold, fontSize: 22, color: colors.accent }}>
          {PERFIL.nomeCurto}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

export function HeroSection() {
  const { colors } = useAppTheme();
  const { width, height } = useWindowDimensions();
  const pad = usePaddingLateral();
  const largo = width > BREAKPOINT;
  const titulo = PERFIL.cargo;
  const digitado = useDigitacao(titulo);
  const fs = Math.min(88, Math.max(40, width * 0.06));
  const estiloTitulo = {
    fontFamily: fonts.semibold,
    fontSize: fs,
    lineHeight: fs * 1.0,
    color: colors.text,
    letterSpacing: -1,
  };

  return (
    <View
      style={{
        minHeight: largo ? Math.max(height - 75, 600) : undefined,
        justifyContent: 'center',
        paddingHorizontal: pad,
        paddingTop: largo ? 80 : 48,
        paddingBottom: largo ? 90 : 64,
        overflow: 'hidden',
      }}>
      <BrilhoFundo />
      <View
        style={{
          width: '100%',
          maxWidth: MAX_WIDTH,
          alignSelf: 'center',
          flexDirection: largo ? 'row' : 'column',
          alignItems: largo ? 'center' : 'flex-start',
          justifyContent: 'space-between',
          gap: largo ? 48 : 40,
        }}>
        <View style={{ flex: largo ? 1 : undefined, maxWidth: 760, gap: 18 }}>
          <Text style={{ fontFamily: fonts.mono, fontSize: 16, lineHeight: 24, color: colors.accent }}>
            Bem-vindo ao meu portfólio
          </Text>
          {/* Texto invisível reserva o espaço do título, para nada "pular" enquanto digita */}
          <View>
            <Text style={[estiloTitulo, { opacity: 0 }]} accessibilityElementsHidden>
              {titulo}_
            </Text>
            <Text style={[estiloTitulo, { position: 'absolute', top: 0, left: 0, right: 0 }]} accessibilityLabel={titulo}>
              {digitado}
              <BlinkingCursor />
            </Text>
          </View>
          <Text
            style={{
              fontFamily: fonts.regular,
              fontSize: largo ? 19 : 16,
              lineHeight: largo ? 31 : 26,
              color: colors.textMuted,
              maxWidth: 520,
            }}>
            {PERFIL.descricao}
          </Text>
          <View style={{ marginTop: 10 }}>
            <SocialLinks />
          </View>
        </View>

        <View style={{ alignSelf: 'center' }}>
          <AvatarVirar tamanho={largo ? 360 : Math.min(260, width - 80)} />
        </View>
      </View>
    </View>
  );
}

/* ------------------------------------------------------------------ */
/* PROJETOS                                                            */
/* ------------------------------------------------------------------ */

function CartaoProjeto({ projeto }: { projeto: Projeto }) {
  const s = useThemedStyles(projetoStyles);
  const [hover, setHover] = useState(false);
  const logo = projeto.enquadramento === 'contain';

  return (
    <Pressable
      onHoverIn={() => setHover(true)}
      onHoverOut={() => setHover(false)}
      style={[s.card, hover && s.cardHover]}>
      <View style={[s.imagemBox, logo && s.imagemLogo]}>
        <Image
          source={projeto.imagem}
          contentFit={projeto.enquadramento}
          style={{ width: '100%', height: '100%' }}
          accessibilityLabel={`Imagem do projeto ${projeto.titulo}`}
          transition={250}
        />
      </View>
      <View style={s.corpo}>
        <Text style={s.categoria}>{projeto.categoria}</Text>
        <Text style={s.titulo}>{projeto.titulo}</Text>
        <Text style={s.descricao}>{projeto.descricao}</Text>
        <View style={s.chips}>
          {projeto.stack.map((tech) => (
            <Chip key={tech}>{tech}</Chip>
          ))}
        </View>
      </View>
    </Pressable>
  );
}

const projetoStyles = (c: Palette) =>
  StyleSheet.create({
    card: {
      flex: 1,
      backgroundColor: c.surface,
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: 16,
      overflow: 'hidden',
    },
    cardHover: { borderColor: c.accentBorder, transform: [{ translateY: -4 }] },
    imagemBox: { aspectRatio: 16 / 10, width: '100%', backgroundColor: c.surfaceAlt },
    imagemLogo: { backgroundColor: '#f4f4f5', padding: 28 },
    corpo: { padding: 24, gap: 10, flexGrow: 1 },
    categoria: { fontFamily: fonts.regular, fontSize: 14, color: c.accent },
    titulo: { fontFamily: fonts.semibold, fontSize: 24, lineHeight: 32, color: c.text },
    descricao: { fontFamily: fonts.regular, fontSize: 16, lineHeight: 26, color: c.textMuted },
    chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  });

export function ProjetosSection({ borda = true }: { borda?: boolean }) {
  const { width } = useWindowDimensions();
  const colunas = width >= 1000 ? 3 : width >= 640 ? 2 : 1;
  const base = colunas === 3 ? '31%' : colunas === 2 ? '47%' : '100%';

  return (
    <Section borda={borda}>
      <Reveal>
        <Titulo>Projetos</Titulo>
      </Reveal>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 24, marginTop: 48 }}>
        {PROJETOS.map((projeto, i) => (
          <Reveal key={projeto.titulo} delay={(i % colunas) * 120} style={{ flexBasis: base, flexGrow: 1 }}>
            <CartaoProjeto projeto={projeto} />
          </Reveal>
        ))}
      </View>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* FORMAÇÃO / EXPERIÊNCIA (layout da seção "Sobre" da referência)      */
/* ------------------------------------------------------------------ */

function CartaoCodigo() {
  const { colors } = useAppTheme();
  const s = useThemedStyles(codigoStyles);
  const { ficha } = PERFIL;

  const linha = (chave: string, valor: string | number) => (
    <Text style={s.code}>
      {'  '}
      <Text style={{ color: colors.codeKey }}>{chave}</Text>
      <Text style={{ color: colors.textMuted }}>: </Text>
      {typeof valor === 'number' ? (
        <Text style={{ color: colors.codeNumber }}>{valor}</Text>
      ) : (
        <Text style={{ color: colors.codeString }}>&apos;{valor}&apos;</Text>
      )}
      <Text style={{ color: colors.textMuted }}>,</Text>
    </Text>
  );

  return (
    <View style={s.card}>
      <View style={s.header}>
        <View style={{ flexDirection: 'row', gap: 6 }}>
          <View style={[s.dot, { backgroundColor: '#f87171' }]} />
          <View style={[s.dot, { backgroundColor: '#fbbf24' }]} />
          <View style={[s.dot, { backgroundColor: '#4ade80' }]} />
        </View>
        <Text style={s.arquivo}>marcelo-portfolio.ts</Text>
      </View>
      <View style={s.corpo}>
        <Text style={s.code}>
          <Text style={{ color: colors.accent }}>const</Text> marcelo{' '}
          <Text style={{ color: colors.textMuted }}>= {'{'}</Text>
        </Text>
        {linha('local', ficha.local)}
        {linha('curso', 'Ciência da Computação')}
        {linha('periodo', ficha.periodo)}
        {linha('projetos', ficha.projetos)}
        {linha('status', ficha.status)}
        <Text style={[s.code, { color: colors.textMuted }]}>{'};'}</Text>
        <Text style={[s.code, { marginTop: 18 }]}>
          marcelo.<Text style={{ color: colors.accent }}>aprender</Text>(
          <BlinkingCursor />
        </Text>
      </View>
    </View>
  );
}

const codigoStyles = (c: Palette) =>
  StyleSheet.create({
    card: {
      width: '100%',
      maxWidth: 380,
      aspectRatio: 3 / 4,
      alignSelf: 'center',
      backgroundColor: c.surface,
      borderWidth: 1,
      borderColor: c.accentBorder,
      borderRadius: 16,
      overflow: 'hidden',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingHorizontal: 18,
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: c.border,
    },
    dot: { width: 10, height: 10, borderRadius: 5 },
    arquivo: { fontFamily: fonts.mono, fontSize: 12, color: c.textMuted },
    corpo: { padding: 22, gap: 2, flex: 1, justifyContent: 'center' },
    code: { fontFamily: fonts.mono, fontSize: 13.5, lineHeight: 24, color: c.text },
  });

type Aba = 'formacao' | 'experiencia';

function ItemLinhaTempo({ periodo, titulo, local, descricao, ultimo }: {
  periodo: string;
  titulo: string;
  local: string;
  descricao: string;
  ultimo: boolean;
}) {
  const { colors } = useAppTheme();
  return (
    <View style={{ flexDirection: 'row', gap: 18 }}>
      <View style={{ width: 11, alignItems: 'center' }}>
        <View style={{ width: 11, height: 11, borderRadius: 6, backgroundColor: colors.accent, marginTop: 6 }} />
        {!ultimo ? <View style={{ width: 1, flex: 1, backgroundColor: colors.border, marginTop: 6 }} /> : null}
      </View>
      <View style={{ flex: 1, paddingBottom: ultimo ? 0 : 28, gap: 4 }}>
        <Text style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.textMuted }}>{periodo}</Text>
        <Text style={{ fontFamily: fonts.semibold, fontSize: 17, lineHeight: 24, color: colors.text }}>{titulo}</Text>
        <Text style={{ fontFamily: fonts.medium, fontSize: 14, color: colors.accent }}>{local}</Text>
        <Text style={{ fontFamily: fonts.regular, fontSize: 15, lineHeight: 24, color: colors.textMuted }}>
          {descricao}
        </Text>
      </View>
    </View>
  );
}

function CartaoInfo({ icone, titulo, texto }: {
  icone: 'school-outline' | 'briefcase-outline';
  titulo: string;
  texto: string;
}) {
  const { colors } = useAppTheme();
  return (
    <View
      style={{
        flex: 1,
        minWidth: 200,
        alignItems: 'center',
        gap: 8,
        paddingVertical: 24,
        paddingHorizontal: 18,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 12,
      }}>
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: colors.accentSoft,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <MaterialCommunityIcons name={icone} size={20} color={colors.accent} />
      </View>
      <Text style={{ fontFamily: fonts.semibold, fontSize: 15, color: colors.text }}>{titulo}</Text>
      <Text style={{ fontFamily: fonts.regular, fontSize: 13, lineHeight: 20, color: colors.textMuted, textAlign: 'center' }}>
        {texto}
      </Text>
    </View>
  );
}

export function FormacaoSection({ abaInicial = 'formacao', borda = true }: { abaInicial?: Aba; borda?: boolean }) {
  const { colors } = useAppTheme();
  const { width } = useWindowDimensions();
  const largo = width > BREAKPOINT;
  const [aba, setAba] = useState<Aba>(abaInicial);

  const botaoAba = (id: Aba, rotulo: string) => {
    const ativa = aba === id;
    return (
      <Pressable key={id} onPress={() => setAba(id)} accessibilityRole="tab" accessibilityState={{ selected: ativa }}>
        <Text
          style={{
            fontFamily: fonts.semibold,
            fontSize: largo ? 32 : 26,
            lineHeight: largo ? 40 : 34,
            color: ativa ? colors.text : colors.textDim,
          }}>
          {rotulo}
          {ativa ? <BlinkingCursor /> : null}
        </Text>
      </Pressable>
    );
  };

  return (
    <Section borda={borda}>
      <View style={{ flexDirection: largo ? 'row' : 'column', gap: largo ? 64 : 40, alignItems: 'flex-start' }}>
        <Reveal style={{ width: largo ? 380 : '100%' }}>
          <CartaoCodigo />
        </Reveal>

        <Reveal delay={150} style={{ flex: largo ? 1 : undefined, width: largo ? undefined : '100%', gap: 28 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 28, borderBottomWidth: 1, borderBottomColor: colors.border, paddingBottom: 14 }}>
            {botaoAba('formacao', 'Formação')}
            {botaoAba('experiencia', 'Experiência')}
          </View>

          {aba === 'formacao' ? (
            <View key="formacao">
              {FORMACAO.map((item, i) => (
                <ItemLinhaTempo key={item.titulo} {...item} ultimo={i === FORMACAO.length - 1} />
              ))}
            </View>
          ) : (
            <View key="experiencia" style={{ gap: 22 }}>
              <ItemLinhaTempo
                periodo="Agora"
                titulo="Em busca do primeiro estágio"
                local={PERFIL.ficha.status}
                descricao="Ainda sem experiência profissional formal. Estudante de Ciência da Computação (5º período), com foco em desenvolvimento fullstack, back-end e front-end, e interesse em inteligência artificial e análise de dados. Quero aplicar meus conhecimentos acadêmicos, gerar valor para a empresa e adquirir experiência prática na área de tecnologia."
                ultimo
              />
              <View style={{ gap: 10 }}>
                <Text style={{ fontFamily: fonts.semibold, fontSize: 15, color: colors.text }}>Áreas de interesse</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                  {INTERESSES.map((area) => (
                    <Chip key={area}>{area}</Chip>
                  ))}
                </View>
              </View>
              <View style={{ gap: 10 }}>
                <Text style={{ fontFamily: fonts.semibold, fontSize: 15, color: colors.text }}>Idiomas</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                  {IDIOMAS.map((item) => (
                    <Chip key={item.idioma} tone="neutral">{`${item.idioma} · ${item.nivel}`}</Chip>
                  ))}
                </View>
              </View>
            </View>
          )}

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
            <CartaoInfo icone="school-outline" titulo="Graduação" texto="Ciência da Computação · UNICAP · 5º período" />
            <CartaoInfo icone="briefcase-outline" titulo="Status" texto="Disponível para estágio" />
          </View>
        </Reveal>
      </View>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* STACKS                                                              */
/* ------------------------------------------------------------------ */

function Destaque({ children }: { children: ReactNode }) {
  const { colors } = useAppTheme();
  return <Text style={{ fontFamily: fonts.semibold, color: colors.accent }}>{children}</Text>;
}

export function StacksSection({ borda = true }: { borda?: boolean }) {
  const { colors } = useAppTheme();
  const s = useThemedStyles(stackStyles);
  const { width } = useWindowDimensions();
  const colunas = width >= 1100 ? 4 : width >= 640 ? 2 : 1;
  const base = colunas === 4 ? '23%' : colunas === 2 ? '47%' : '100%';

  return (
    <Section borda={borda}>
      <Reveal style={{ alignItems: 'center', gap: 20 }}>
        <Titulo>Minhas Stacks</Titulo>
        <Text style={s.paragrafo}>
          Minha base de programação vem da graduação em Ciência da Computação, com{' '}
          <Destaque>Python, C, Java e JavaScript</Destaque>. No front-end trabalho com{' '}
          <Destaque>HTML, CSS, React e Next.js</Destaque>, e também uso <Destaque>SQL</Destaque>,
          back4app e consumo de APIs nos projetos.
        </Text>
        <Text style={s.paragrafo}>
          No dia a dia uso Git, GitHub, Excel e Vercel, e sigo estudando para evoluir como
          desenvolvedor.
        </Text>
      </Reveal>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 20, marginTop: 44 }}>
        {STACKS.map((grupo, i) => (
          <Reveal key={grupo.titulo} delay={(i % colunas) * 120} style={{ flexBasis: base, flexGrow: 1 }}>
            <View style={s.card}>
              <Text style={s.grupo}>{grupo.titulo}</Text>
              <View style={s.itens}>
                {grupo.itens.map((item) => (
                  <View key={item.nome} style={s.item}>
                    <MaterialCommunityIcons name={item.icone} size={20} color={colors.textMuted} />
                    <Text style={s.itemTexto}>{item.nome}</Text>
                  </View>
                ))}
              </View>
            </View>
          </Reveal>
        ))}
      </View>
    </Section>
  );
}

const stackStyles = (c: Palette) =>
  StyleSheet.create({
    paragrafo: {
      fontFamily: fonts.regular,
      fontSize: 15,
      lineHeight: 26,
      color: c.textMuted,
      textAlign: 'center',
      maxWidth: 820,
    },
    card: {
      flex: 1,
      backgroundColor: c.surface,
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: 12,
      paddingVertical: 20,
      paddingHorizontal: 20,
      gap: 18,
    },
    grupo: { fontFamily: fonts.semibold, fontSize: 16, color: c.accent },
    itens: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 14 },
    item: { flexDirection: 'row', alignItems: 'center', gap: 10, width: '50%', paddingRight: 8 },
    itemTexto: { fontFamily: fonts.regular, fontSize: 15, color: c.text, flexShrink: 1 },
  });

/* ------------------------------------------------------------------ */
/* SOBRE ESTE APP (tecnologias e módulos usados — pedido da atividade) */
/* ------------------------------------------------------------------ */

const DEPENDENCIAS: Record<string, string> = { ...pkg.dependencies, ...pkg.devDependencies };

export function SobreAppSection() {
  const { colors } = useAppTheme();
  const { width } = useWindowDimensions();
  const colunas = width >= 1000 ? 3 : width >= 640 ? 2 : 1;
  const base = colunas === 3 ? '31%' : colunas === 2 ? '47%' : '100%';

  return (
    <Section>
      <Reveal style={{ alignItems: 'center', gap: 16 }}>
        <Titulo>Sobre este app</Titulo>
        <Text
          style={{
            fontFamily: fonts.regular,
            fontSize: 15,
            lineHeight: 26,
            color: colors.textMuted,
            textAlign: 'center',
            maxWidth: 720,
          }}>
          Tecnologias e módulos usados para desenvolver este portfólio. As versões vêm direto do
          package.json do projeto.
        </Text>
      </Reveal>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginTop: 40 }}>
        {MODULOS_APP.map((mod, i) => {
          const v = DEPENDENCIAS[mod.pacote]?.replace(/^[~^]/, '');
          return (
            <Reveal key={mod.pacote} delay={(i % colunas) * 100} style={{ flexBasis: base, flexGrow: 1 }}>
              <View
                style={{
                  flex: 1,
                  gap: 4,
                  padding: 18,
                  backgroundColor: colors.surface,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 12,
                }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                  <Text style={{ fontFamily: fonts.semibold, fontSize: 15, color: colors.text }}>{mod.nome}</Text>
                  <Text style={{ fontFamily: fonts.mono, fontSize: 11, color: colors.accent }}>{v ? `v${v}` : '—'}</Text>
                </View>
                <Text style={{ fontFamily: fonts.mono, fontSize: 11, color: colors.textDim }}>{mod.pacote}</Text>
                <Text style={{ fontFamily: fonts.regular, fontSize: 13, lineHeight: 20, color: colors.textMuted }}>
                  {mod.uso}
                </Text>
              </View>
            </Reveal>
          );
        })}
      </View>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* JOGO DA FORCA                                                       */
/* ------------------------------------------------------------------ */

export function ForcaSection({ borda = true, tecladoFisico = false }: { borda?: boolean; tecladoFisico?: boolean }) {
  const { colors } = useAppTheme();
  return (
    <Section borda={borda}>
      <Reveal style={{ alignItems: 'center', gap: 12 }}>
        <Titulo>Jogo da Forca</Titulo>
        <Text style={{ fontFamily: fonts.mono, fontSize: 13, color: colors.textMuted }}>
          Projeto pessoal · React Native · {TOTAL_PALAVRAS} palavras · {TOTAL_VIDAS} vidas
        </Text>
      </Reveal>
      <Reveal delay={150} style={{ marginTop: 44 }}>
        <JogoForca tecladoFisico={tecladoFisico} />
      </Reveal>
    </Section>
  );
}
