import { StyleSheet, View } from 'react-native';

import { Screen } from '@/components/layout';
import { AppText, Card, Chip, FadeIn, SectionTitle } from '@/components/ui';
import { FORMACAO } from '@/data/perfil';
import { useThemedStyles } from '@/theme/theme-context';
import { fonts, space, type Palette } from '@/theme/tokens';

/** Experiência Acadêmica: linha do tempo da formação e dos cursos. */
export default function Formacao() {
  const s = useThemedStyles(timelineStyles);

  return (
    <Screen>
      <FadeIn>
        <SectionTitle
          label="Experiência acadêmica"
          title="Formação"
          subtitle="Registro cronológico da minha formação e dos cursos que complementam a graduação em Ciência da Computação."
        />
      </FadeIn>

      <View style={s.timeline}>
        {FORMACAO.map((item, i) => (
          <FadeIn key={item.titulo} delay={90 * i} style={s.item}>
            <View style={s.marcador}>
              <View style={s.ponto} />
            </View>
            <Card style={{ flex: 1, gap: space.sm }}>
              <View style={s.topo}>
                <Chip>{item.tag}</Chip>
                <AppText style={s.periodo}>{item.periodo}</AppText>
              </View>
              <AppText variant="h3" style={{ marginTop: space.xs }}>
                {item.titulo}
              </AppText>
              <AppText variant="small" style={s.local}>
                {item.local}
              </AppText>
              <AppText variant="muted" style={{ fontSize: 14, lineHeight: 22 }}>
                {item.descricao}
              </AppText>
            </Card>
          </FadeIn>
        ))}
      </View>
    </Screen>
  );
}

const timelineStyles = (c: Palette) =>
  StyleSheet.create({
    timeline: {
      gap: space.xl,
      borderLeftWidth: 1,
      borderLeftColor: c.border,
      marginLeft: 6,
    },
    item: { flexDirection: 'row', gap: space.lg, marginLeft: -7 },
    marcador: { width: 13, paddingTop: space.xl + 6, alignItems: 'center' },
    ponto: {
      width: 13,
      height: 13,
      borderRadius: 7,
      backgroundColor: c.accent,
      borderWidth: 3,
      borderColor: c.bg,
      boxShadow: `0 0 0 1px ${c.accentBorder}`,
    },
    topo: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: space.sm,
    },
    periodo: { fontFamily: fonts.mono, fontSize: 12, color: c.textDim },
    local: { color: c.accent, fontFamily: fonts.medium },
  });
