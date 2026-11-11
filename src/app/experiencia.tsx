import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View, useWindowDimensions } from 'react-native';

import { Screen, SocialLinks } from '@/components/layout';
import { AppText, Card, Chip, FadeIn, SectionTitle } from '@/components/ui';
import { IDIOMAS, INTERESSES, PERFIL } from '@/data/perfil';
import { useAppTheme } from '@/theme/theme-context';
import { fonts, radius, space } from '@/theme/tokens';

/** Experiência Profissional: objetivo atual, áreas de interesse e idiomas. */
export default function Experiencia() {
  const { colors } = useAppTheme();
  const { width } = useWindowDimensions();
  const largo = width >= 760;

  return (
    <Screen>
      <FadeIn>
        <SectionTitle
          label="Experiência profissional"
          title="Experiência"
          subtitle="Ainda sem experiência profissional formal: estou em busca do meu primeiro estágio na área de tecnologia."
        />
      </FadeIn>

      <FadeIn delay={100}>
        <Card style={[styles.status, { borderColor: colors.accentBorder }]}>
          <View style={[styles.iconeGrande, { backgroundColor: colors.accentSoft }]}>
            <MaterialCommunityIcons name="rocket-launch-outline" size={26} color={colors.accent} />
          </View>
          <View style={{ flex: 1, minWidth: 220, gap: space.xs }}>
            <View style={styles.statusLinha}>
              <View style={[styles.pulso, { backgroundColor: colors.success }]} />
              <AppText style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.success }}>
                {PERFIL.ficha.status}
              </AppText>
            </View>
            <AppText variant="h3" style={{ fontSize: 22, lineHeight: 30 }}>
              Em busca de estágio
            </AppText>
            <AppText variant="muted" style={{ fontSize: 14, lineHeight: 22 }}>
              Estudante de Ciência da Computação (5º período), com foco em desenvolvimento
              fullstack, back-end e front-end, e interesse em inteligência artificial e análise de
              dados. Quero aplicar meus conhecimentos acadêmicos, gerar valor para a empresa e
              adquirir experiência prática na área de tecnologia.
            </AppText>
          </View>
        </Card>
      </FadeIn>

      <View style={[styles.duas, largo && { flexDirection: 'row' }]}>
        <FadeIn delay={180} style={{ flex: 1 }}>
          <Card style={{ flex: 1, gap: space.lg }}>
            <Titulo icone="target" texto="Áreas de interesse" />
            <View style={styles.chips}>
              {INTERESSES.map((area) => (
                <Chip key={area}>{area}</Chip>
              ))}
            </View>
          </Card>
        </FadeIn>

        <FadeIn delay={240} style={{ flex: 1 }}>
          <Card style={{ flex: 1, gap: space.lg }}>
            <Titulo icone="translate" texto="Idiomas" />
            <View style={{ gap: space.sm }}>
              {IDIOMAS.map((item) => (
                <View key={item.idioma} style={[styles.idioma, { borderColor: colors.border }]}>
                  <AppText variant="body">{item.idioma}</AppText>
                  <AppText style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.textMuted }}>
                    {item.nivel}
                  </AppText>
                </View>
              ))}
            </View>
          </Card>
        </FadeIn>
      </View>

      <FadeIn delay={300} style={{ gap: space.lg }}>
        <AppText variant="muted">Quer conversar sobre uma vaga? Me encontre aqui:</AppText>
        <SocialLinks />
      </FadeIn>
    </Screen>
  );
}

function Titulo({
  icone,
  texto,
}: {
  icone: 'target' | 'translate';
  texto: string;
}) {
  const { colors } = useAppTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.sm }}>
      <MaterialCommunityIcons name={icone} size={18} color={colors.accent} />
      <AppText variant="h3" style={{ fontSize: 16 }}>
        {texto}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  status: { flexDirection: 'row', flexWrap: 'wrap', gap: space.xl, alignItems: 'flex-start' },
  iconeGrande: {
    width: 56,
    height: 56,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusLinha: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  pulso: { width: 8, height: 8, borderRadius: 4 },
  duas: { gap: space.lg },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm },
  idioma: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: space.sm,
    borderBottomWidth: 1,
  },
});
