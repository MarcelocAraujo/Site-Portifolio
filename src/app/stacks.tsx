import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import pkg from '../../package.json';
import { Screen } from '@/components/layout';
import { AppText, Card, FadeIn, SectionTitle } from '@/components/ui';
import { MODULOS_APP, STACKS } from '@/data/perfil';
import { useAppTheme, useThemedStyles } from '@/theme/theme-context';
import { fonts, radius, space, type Palette } from '@/theme/tokens';

const DEPENDENCIAS: Record<string, string> = { ...pkg.dependencies, ...pkg.devDependencies };

function versao(pacote: string) {
  const v = DEPENDENCIAS[pacote];
  return v ? v.replace(/^[~^]/, '') : null;
}

/** Stacks: minhas habilidades + "Sobre este app" (tecnologias e módulos usados). */
export default function Stacks() {
  const { colors } = useAppTheme();
  const s = useThemedStyles(stackStyles);
  const { width } = useWindowDimensions();
  const colunas = width >= 960 ? 4 : width >= 600 ? 2 : 1;
  const base = colunas === 4 ? '23%' : colunas === 2 ? '47%' : '100%';

  return (
    <Screen>
      <FadeIn>
        <SectionTitle
          label="Habilidades técnicas"
          title="Minhas Stacks"
          subtitle="As linguagens e ferramentas que já fazem parte da minha rotina na faculdade e nos projetos, e que sigo estudando."
        />
      </FadeIn>

      <View style={s.grid}>
        {STACKS.map((grupo, i) => (
          <FadeIn key={grupo.titulo} delay={80 * i} style={{ flexBasis: base, flexGrow: 1 }}>
            <Card style={{ flex: 1, gap: space.lg }}>
              <AppText style={s.grupoTitulo}>{grupo.titulo}</AppText>
              <View style={{ gap: space.md }}>
                {grupo.itens.map((item) => (
                  <View key={item.nome} style={s.itemLinha}>
                    <MaterialCommunityIcons name={item.icone} size={20} color={colors.text} />
                    <AppText variant="body">{item.nome}</AppText>
                  </View>
                ))}
              </View>
            </Card>
          </FadeIn>
        ))}
      </View>

      {/* Sobre este app: requisito da atividade (tecnologias e módulos usados) */}
      <FadeIn delay={150} style={{ gap: space.xl }}>
        <SectionTitle
          label="// sobre este app"
          title="Como este app foi feito"
          subtitle="Tecnologias e módulos usados para desenvolver este portfólio. As versões vêm direto do package.json do projeto."
        />

        <View style={s.terminal}>
          <View style={s.terminalHeader}>
            <MaterialCommunityIcons name="console" size={14} color={colors.textDim} />
            <Text style={s.terminalTitulo}>package.json</Text>
          </View>
          {MODULOS_APP.map((mod, i) => {
            const v = versao(mod.pacote);
            return (
              <View key={mod.pacote} style={[s.modulo, i > 0 && s.moduloBorda]}>
                <View style={s.moduloTopo}>
                  <AppText variant="h3" style={{ fontSize: 15, lineHeight: 22 }}>
                    {mod.nome}
                  </AppText>
                  <Text style={s.versao}>{v ? `v${v}` : '—'}</Text>
                </View>
                <Text style={s.pacote}>{mod.pacote}</Text>
                <AppText variant="small">{mod.uso}</AppText>
              </View>
            );
          })}
        </View>
      </FadeIn>
    </Screen>
  );
}

const stackStyles = (c: Palette) =>
  StyleSheet.create({
    grid: { flexDirection: 'row', flexWrap: 'wrap', gap: space.lg },
    grupoTitulo: { fontFamily: fonts.semibold, fontSize: 16, color: c.accent },
    itemLinha: { flexDirection: 'row', alignItems: 'center', gap: space.md },
    terminal: {
      backgroundColor: c.surface,
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: radius.lg,
      overflow: 'hidden',
    },
    terminalHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: space.sm,
      paddingHorizontal: space.xl,
      paddingVertical: space.md,
      backgroundColor: c.surfaceAlt,
      borderBottomWidth: 1,
      borderBottomColor: c.border,
    },
    terminalTitulo: { fontFamily: fonts.mono, fontSize: 12, color: c.textDim },
    modulo: { paddingHorizontal: space.xl, paddingVertical: space.lg, gap: 2 },
    moduloBorda: { borderTopWidth: 1, borderTopColor: c.border },
    moduloTopo: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: space.md,
    },
    versao: {
      fontFamily: fonts.mono,
      fontSize: 11,
      color: c.accent,
      backgroundColor: c.accentSoft,
      paddingHorizontal: space.sm,
      paddingVertical: 2,
      borderRadius: radius.sm,
      overflow: 'hidden',
    },
    pacote: { fontFamily: fonts.mono, fontSize: 12, color: c.textDim },
  });
