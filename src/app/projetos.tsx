import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StyleSheet, View, useWindowDimensions } from 'react-native';

import { Screen } from '@/components/layout';
import { AppText, Button, Card, Chip, FadeIn, SectionTitle } from '@/components/ui';
import { PROJETOS, type Projeto } from '@/data/perfil';
import { useThemedStyles } from '@/theme/theme-context';
import { radius, space, type Palette } from '@/theme/tokens';

export default function Projetos() {
  const { width } = useWindowDimensions();
  const colunas = width >= 960 ? 3 : width >= 640 ? 2 : 1;

  return (
    <Screen>
      <FadeIn>
        <SectionTitle
          label="Galeria de projetos"
          title="Projetos"
          subtitle="Trabalhos acadêmicos e projetos pessoais selecionados."
        />
      </FadeIn>

      <View style={styles.grid}>
        {PROJETOS.map((projeto, i) => (
          <FadeIn
            key={projeto.titulo}
            delay={80 * i}
            style={{
              flexBasis: colunas === 3 ? '31%' : colunas === 2 ? '47%' : '100%',
              flexGrow: 1,
            }}>
            <CartaoProjeto projeto={projeto} />
          </FadeIn>
        ))}
      </View>

      <FadeIn delay={200}>
        <Card style={styles.destaque}>
          <View style={{ flex: 1, minWidth: 240, gap: space.xs }}>
            <AppText variant="label">Destaque · projeto pessoal</AppText>
            <AppText variant="h3" style={{ fontSize: 22, lineHeight: 30 }}>
              Jogo da Forca
            </AppText>
            <AppText variant="small" style={{ maxWidth: 520 }}>
              Uma versão interativa do clássico jogo: teclado virtual, lista de letras
              tentadas, boneco desenhado passo a passo e palavras sorteadas a cada partida.
            </AppText>
          </View>
          <Button
            variant="primary"
            label="Jogar agora"
            trailingIcon={{ lib: 'ion', name: 'arrow-forward' }}
            onPress={() => router.navigate('/forca')}
          />
        </Card>
      </FadeIn>
    </Screen>
  );
}

function CartaoProjeto({ projeto }: { projeto: Projeto }) {
  const s = useThemedStyles(cardStyles);
  const logo = projeto.enquadramento === 'contain';

  return (
    <View style={s.card}>
      <View style={[s.imagemBox, logo && s.imagemLogo]}>
        <Image
          source={projeto.imagem}
          contentFit={projeto.enquadramento}
          style={logo ? s.imagemContain : s.imagemCover}
          accessibilityLabel={`Imagem do projeto ${projeto.titulo}`}
          transition={250}
        />
      </View>
      <View style={s.corpo}>
        <AppText variant="label">{projeto.categoria}</AppText>
        <AppText variant="h3" style={{ fontSize: 20, lineHeight: 28 }}>
          {projeto.titulo}
        </AppText>
        <AppText variant="small" style={{ flexGrow: 1 }}>
          {projeto.descricao}
        </AppText>
        <View style={s.chips}>
          {projeto.stack.map((tech) => (
            <Chip key={tech}>{tech}</Chip>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: space.lg },
  destaque: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space.lg,
  },
});

const cardStyles = (c: Palette) =>
  StyleSheet.create({
    card: {
      flex: 1,
      backgroundColor: c.surface,
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: radius.lg,
      overflow: 'hidden',
    },
    imagemBox: {
      aspectRatio: 16 / 10,
      width: '100%',
      backgroundColor: c.surfaceAlt,
      borderBottomWidth: 1,
      borderBottomColor: c.border,
    },
    // Logos ficam sobre fundo claro para não "sumirem" no tema escuro
    imagemLogo: { backgroundColor: '#f4f4f5', padding: space.xl },
    imagemCover: { width: '100%', height: '100%' },
    imagemContain: { flex: 1, width: '100%' },
    corpo: { padding: space.xl, gap: space.sm, flexGrow: 1 },
    chips: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm, marginTop: space.sm },
  });
