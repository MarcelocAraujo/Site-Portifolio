import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, type Href } from 'expo-router';
import { useEffect, useState, type ComponentProps } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import { Screen, SocialLinks } from '@/components/layout';
import { AppText, BlinkingCursor, Button, Card, FadeIn, SectionTitle } from '@/components/ui';
import { PERFIL } from '@/data/perfil';
import { useAppTheme, useThemedStyles } from '@/theme/theme-context';
import { fonts, radius, space, type Palette } from '@/theme/tokens';

type Destaque = {
  href: Href;
  tag: string;
  titulo: string;
  descricao: string;
  icone: ComponentProps<typeof MaterialCommunityIcons>['name'];
};

const DESTAQUES: Destaque[] = [
  {
    href: '/formacao',
    tag: 'Formação',
    titulo: 'Formação acadêmica',
    descricao: 'Graduação em Ciência da Computação, cursos e certificações.',
    icone: 'school-outline',
  },
  {
    href: '/projetos',
    tag: 'Trabalho',
    titulo: 'Projetos',
    descricao: 'Trabalhos acadêmicos e projetos pessoais selecionados.',
    icone: 'folder-outline',
  },
  {
    href: '/experiencia',
    tag: 'Carreira',
    titulo: 'Experiência profissional',
    descricao: 'Objetivos, áreas de interesse e idiomas.',
    icone: 'briefcase-outline',
  },
  {
    href: '/stacks',
    tag: 'Tecnologias',
    titulo: 'Stacks',
    descricao: 'Linguagens, ferramentas e tudo que foi usado neste app.',
    icone: 'layers-outline',
  },
];

export default function Inicio() {
  const { width } = useWindowDimensions();
  const largo = width >= 900;

  return (
    <Screen>
      {/* Hero */}
      <View style={[styles.hero, largo && styles.heroLargo]}>
        <FadeIn style={[styles.heroTexto, largo && { flex: 1.15 }]}>
          <AppText variant="label">Bem-vindo ao meu portfólio</AppText>
          <AppText variant="h1" style={largo && { fontSize: 52, lineHeight: 60 }}>
            {PERFIL.nome}
          </AppText>
          <TextoDigitado frases={PERFIL.frasesDigitadas} />
          <AppText variant="muted" style={{ maxWidth: 520 }}>
            {PERFIL.descricao}
          </AppText>
          <View style={{ marginTop: space.sm }}>
            <SocialLinks />
          </View>
        </FadeIn>

        <FadeIn delay={150} style={largo ? { flex: 1 } : undefined}>
          <CartaoCodigo />
        </FadeIn>
      </View>

      {/* Explore */}
      <FadeIn delay={250} style={{ gap: space.xl }}>
        <SectionTitle
          label="// navegue pelo app"
          title="Explore o portfólio"
          subtitle="Tudo o que eu venho estudando e construindo, organizado em telas."
        />
        <View style={styles.grid}>
          {DESTAQUES.map((item) => (
            <CartaoDestaque key={item.titulo} item={item} colunas={largo ? 2 : 1} />
          ))}
        </View>
        <CartaoForca />
      </FadeIn>
    </Screen>
  );
}

/* ------------------------------------------------------------------ */

/** Efeito de "máquina de escrever" que alterna entre as frases. */
function TextoDigitado({ frases }: { frases: string[] }) {
  const s = useThemedStyles(heroStyles);
  const [indice, setIndice] = useState(0);
  const [texto, setTexto] = useState('');
  const [apagando, setApagando] = useState(false);

  useEffect(() => {
    const frase = frases[indice % frases.length]!;
    let atraso = apagando ? 35 : 70;
    if (!apagando && texto === frase) atraso = 1600;
    if (apagando && texto === '') atraso = 300;

    const id = setTimeout(() => {
      if (!apagando && texto === frase) {
        setApagando(true);
      } else if (apagando && texto === '') {
        setApagando(false);
        setIndice((i) => i + 1);
      } else {
        setTexto(apagando ? frase.slice(0, texto.length - 1) : frase.slice(0, texto.length + 1));
      }
    }, atraso);
    return () => clearTimeout(id);
  }, [texto, apagando, indice, frases]);

  return (
    <Text style={s.digitado} accessibilityLabel={frases.join(', ')}>
      {texto}
      <BlinkingCursor />
    </Text>
  );
}

/** Cartão estilo editor de código com a "ficha rápida". */
function CartaoCodigo() {
  const { colors } = useAppTheme();
  const s = useThemedStyles(heroStyles);
  const { ficha } = PERFIL;

  const linha = (chave: string, valor: string | number) => (
    <Text style={s.code}>
      {'  '}
      <Text style={{ color: colors.codeKey }}>{chave}</Text>
      <Text style={{ color: colors.textDim }}>: </Text>
      {typeof valor === 'number' ? (
        <Text style={{ color: colors.codeNumber }}>{valor}</Text>
      ) : (
        <Text style={{ color: colors.codeString }}>&quot;{valor}&quot;</Text>
      )}
      <Text style={{ color: colors.textDim }}>,</Text>
    </Text>
  );

  return (
    <View style={s.codeCard}>
      <View style={s.codeHeader}>
        <View style={s.dots}>
          <View style={[s.dot, { backgroundColor: '#f87171' }]} />
          <View style={[s.dot, { backgroundColor: '#fbbf24' }]} />
          <View style={[s.dot, { backgroundColor: '#4ade80' }]} />
        </View>
        <Text style={s.codeFile}>marcelo.ts</Text>
      </View>
      <View style={s.codeBody}>
        <Text style={s.code}>
          <Text style={{ color: colors.accent }}>const</Text> marcelo{' '}
          <Text style={{ color: colors.textDim }}>= {'{'}</Text>
        </Text>
        {linha('local', ficha.local)}
        {linha('periodo', ficha.periodo)}
        {linha('projetos', ficha.projetos)}
        {linha('status', ficha.status)}
        <Text style={[s.code, { color: colors.textDim }]}>{'};'}</Text>
        <Text style={[s.code, { color: colors.textDim, marginTop: space.md }]}>
          {'// Ficha rápida'}
        </Text>
      </View>
    </View>
  );
}

function CartaoDestaque({ item, colunas }: { item: Destaque; colunas: number }) {
  const { colors } = useAppTheme();
  return (
    <Card
      onPress={() => router.navigate(item.href)}
      style={{ flexBasis: colunas === 2 ? '48%' : '100%', flexGrow: 1, gap: space.sm }}>
      <View style={styles.cardTopo}>
        <View style={[styles.iconeBox, { backgroundColor: colors.accentSoft }]}>
          <MaterialCommunityIcons name={item.icone} size={18} color={colors.accent} />
        </View>
        <MaterialCommunityIcons name="arrow-right" size={18} color={colors.textDim} />
      </View>
      <AppText variant="label" style={{ marginTop: space.sm }}>
        {item.tag}
      </AppText>
      <AppText variant="h3">{item.titulo}</AppText>
      <AppText variant="small">{item.descricao}</AppText>
    </Card>
  );
}

function CartaoForca() {
  const { colors } = useAppTheme();
  return (
    <Card style={{ borderColor: colors.accentBorder, gap: space.lg }}>
      <View style={{ gap: space.xs }}>
        <AppText variant="label">Destaque · projeto pessoal</AppText>
        <AppText variant="h3" style={{ fontSize: 22, lineHeight: 30 }}>
          Jogo da Forca
        </AppText>
        <AppText variant="small" style={{ maxWidth: 560 }}>
          Feito do zero e rodando em React Native, direto numa tela do app.
        </AppText>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Button
          variant="primary"
          label="Jogar Forca"
          trailingIcon={{ lib: 'ion', name: 'arrow-forward' }}
          onPress={() => router.navigate('/forca')}
        />
      </View>
    </Card>
  );
}

/* ------------------------------------------------------------------ */

const styles = StyleSheet.create({
  hero: { gap: space.xxl },
  heroLargo: { flexDirection: 'row', alignItems: 'center', minHeight: 440 },
  heroTexto: { gap: space.lg },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: space.lg },
  cardTopo: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  iconeBox: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const heroStyles = (c: Palette) =>
  StyleSheet.create({
    digitado: {
      fontFamily: fonts.medium,
      fontSize: 20,
      lineHeight: 28,
      color: c.textMuted,
      // reserva 2 linhas para o texto não "empurrar" o layout enquanto digita
      minHeight: 56,
    },
    codeCard: {
      backgroundColor: c.surface,
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: radius.xl,
      overflow: 'hidden',
      boxShadow: `0 20px 60px ${c.accentSoft}`,
    },
    codeHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: space.md,
      paddingHorizontal: space.lg,
      paddingVertical: space.md,
      borderBottomWidth: 1,
      borderBottomColor: c.border,
      backgroundColor: c.surfaceAlt,
    },
    dots: { flexDirection: 'row', gap: 6 },
    dot: { width: 10, height: 10, borderRadius: 5 },
    codeFile: { fontFamily: fonts.mono, fontSize: 12, color: c.textDim },
    codeBody: { padding: space.xl, gap: 2 },
    code: { fontFamily: fonts.mono, fontSize: 14, lineHeight: 24, color: c.text },
  });
