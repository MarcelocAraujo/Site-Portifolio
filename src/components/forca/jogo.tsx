import * as Haptics from 'expo-haptics';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';

import { BonecoForca } from '@/components/forca/boneco';
import { AppText, Button, Card, FadeIn } from '@/components/ui';
import { PALAVRAS_FORCA } from '@/data/perfil';
import { useAppTheme, useThemedStyles } from '@/theme/theme-context';
import { fonts, radius, space, type Palette } from '@/theme/tokens';

const ALFABETO = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const MAX_ERROS = 6;

type Status = 'jogando' | 'vitoria' | 'derrota';

/** Remove acentos: "Ç" → "C", "Ã" → "A". */
function normalizar(texto: string) {
  return texto.normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function sortearPalavra(anterior?: string) {
  let palavra: string;
  do {
    palavra = PALAVRAS_FORCA[Math.floor(Math.random() * PALAVRAS_FORCA.length)]!;
  } while (palavra === anterior && PALAVRAS_FORCA.length > 1);
  return palavra;
}

function vibrar(tipo: 'acerto' | 'erro' | 'fim') {
  if (process.env.EXPO_OS === 'web') return;
  if (tipo === 'acerto') Haptics.selectionAsync().catch(() => {});
  else if (tipo === 'erro') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
  else Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
}

/** Jogo da Forca completo em React Native. */
export function JogoForca({ tecladoFisico = false }: { tecladoFisico?: boolean }) {
  const { colors } = useAppTheme();
  const s = useThemedStyles(forcaStyles);
  const { width } = useWindowDimensions();
  const largo = width >= 900;

  const [palavra, setPalavra] = useState(() => sortearPalavra());
  const [tentadas, setTentadas] = useState<string[]>([]);
  const [entrada, setEntrada] = useState('');

  const palavraNormalizada = useMemo(() => normalizar(palavra), [palavra]);
  const erradas = tentadas.filter((l) => !palavraNormalizada.includes(l));
  const corretas = tentadas.filter((l) => palavraNormalizada.includes(l));
  const restantes = MAX_ERROS - erradas.length;

  const venceu = palavraNormalizada.split('').every((l) => corretas.includes(l));
  const perdeu = erradas.length >= MAX_ERROS;
  const status: Status = venceu ? 'vitoria' : perdeu ? 'derrota' : 'jogando';

  function tentar(bruta: string) {
    const letra = normalizar(bruta.trim().toUpperCase());
    if (letra.length !== 1 || !ALFABETO.includes(letra)) return;

    // Atualização funcional: várias teclas seguidas não se sobrescrevem.
    setTentadas((prev) => {
      const erros = prev.filter((l) => !palavraNormalizada.includes(l)).length;
      const ganhou = palavraNormalizada.split('').every((l) => prev.includes(l));
      if (ganhou || erros >= MAX_ERROS || prev.includes(letra)) return prev;
      return [...prev, letra];
    });
  }

  // Vibração (só no celular) a cada nova letra tentada.
  const ultima = tentadas[tentadas.length - 1];
  useEffect(() => {
    if (!ultima) return;
    vibrar(status !== 'jogando' ? 'fim' : palavraNormalizada.includes(ultima) ? 'acerto' : 'erro');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tentadas.length]);

  function reiniciar() {
    setPalavra((atual) => sortearPalavra(atual));
    setTentadas([]);
    setEntrada('');
  }

  // Na web, a tela do jogo também aceita o teclado físico (só enquanto ela está aberta).
  const [focada, setFocada] = useState(false);
  useFocusEffect(
    useCallback(() => {
      setFocada(true);
      return () => setFocada(false);
    }, []),
  );
  useEffect(() => {
    if (process.env.EXPO_OS !== 'web' || !tecladoFisico || !focada) return;
    function onKey(e: KeyboardEvent) {
      const alvo = e.target as HTMLElement | null;
      if (alvo?.tagName === 'INPUT' || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === 'Enter' && status !== 'jogando') reiniciar();
      else if (e.key.length === 1) tentar(e.key);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const painelPalavra = (
    <Card style={{ gap: space.xl }}>
      <View style={s.linhaTopo}>
        <AppText style={s.rotulo}>Tentativas restantes</AppText>
        <Text style={s.contador}>
          <Text style={{ color: restantes <= 2 ? colors.danger : colors.accent }}>{restantes}</Text>
          <Text style={{ color: colors.textDim, fontSize: 16 }}>/{MAX_ERROS}</Text>
        </Text>
      </View>

      {/* Barra de vidas */}
      <View style={s.vidas}>
        {Array.from({ length: MAX_ERROS }).map((_, i) => (
          <View
            key={i}
            style={[
              s.vida,
              { backgroundColor: i < restantes ? colors.accent : colors.border },
            ]}
          />
        ))}
      </View>

      {/* Palavra */}
      <View style={s.palavra}>
        {palavra.split('').map((letra, i) => {
          const norm = normalizar(letra);
          const acertada = corretas.includes(norm);
          const revelada = acertada || status === 'derrota';
          return (
            <View
              key={i}
              style={[
                s.slot,
                acertada && { borderBottomColor: colors.accent },
                status === 'derrota' && !acertada && { borderBottomColor: colors.danger },
              ]}>
              <Text
                style={[
                  s.letraSlot,
                  status === 'derrota' && !acertada && { color: colors.danger },
                ]}>
                {revelada ? letra : ''}
              </Text>
            </View>
          );
        })}
      </View>

      {status !== 'jogando' ? (
        <FadeIn>
          <View
            style={[
              s.resultado,
              status === 'vitoria'
                ? { backgroundColor: colors.successSoft, borderColor: colors.success }
                : { backgroundColor: colors.dangerSoft, borderColor: colors.danger },
            ]}>
            <Text
              style={[
                s.resultadoTitulo,
                { color: status === 'vitoria' ? colors.success : colors.danger },
              ]}>
              {status === 'vitoria' ? 'Parabéns, você venceu!' : 'Fim de jogo! Você perdeu.'}
            </Text>
            <Text style={s.resultadoPalavra}>A palavra era: {palavra}</Text>
          </View>
        </FadeIn>
      ) : null}

      {/* Entrada por texto */}
      <View style={s.form}>
        <TextInput
          value={entrada}
          onChangeText={(t) => setEntrada(t.slice(-1))}
          onSubmitEditing={() => {
            tentar(entrada);
            setEntrada('');
          }}
          editable={status === 'jogando'}
          maxLength={1}
          autoCapitalize="characters"
          autoCorrect={false}
          placeholder="Digite uma letra"
          placeholderTextColor={colors.textDim}
          returnKeyType="send"
          submitBehavior="submit"
          accessibilityLabel="Digite uma letra"
          style={[s.input, status !== 'jogando' && { opacity: 0.4 }]}
        />
        <Button
          variant="primary"
          label="Enviar"
          disabled={status !== 'jogando'}
          onPress={() => {
            tentar(entrada);
            setEntrada('');
          }}
        />
      </View>

      {/* Teclado virtual */}
      <View style={s.teclado}>
        {ALFABETO.map((letra) => {
          const usada = tentadas.includes(letra);
          const certa = usada && palavraNormalizada.includes(letra);
          const errada = usada && !certa;
          return (
            <Pressable
              key={letra}
              onPress={() => tentar(letra)}
              disabled={usada || status !== 'jogando'}
              accessibilityRole="button"
              accessibilityLabel={`Letra ${letra}`}
              style={({ pressed, hovered }: { pressed: boolean; hovered?: boolean }) => [
                s.tecla,
                hovered && !usada && status === 'jogando' && s.teclaHover,
                certa && { backgroundColor: colors.successSoft, borderColor: colors.success },
                errada && { backgroundColor: colors.dangerSoft, borderColor: colors.dangerSoft },
                !usada && status !== 'jogando' && { opacity: 0.4 },
                pressed && { transform: [{ scale: 0.92 }] },
              ]}>
              <Text
                style={[
                  s.teclaTexto,
                  certa && { color: colors.success },
                  errada && { color: colors.danger, textDecorationLine: 'line-through' },
                ]}>
                {letra}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </Card>
  );

  // No celular o boneco fica menor, para o teclado aparecer sem tanta rolagem.
  const painelBoneco = largo ? (
    <Card style={{ gap: space.md }}>
      <AppText style={s.rotulo}>Boneco</AppText>
      <BonecoForca erros={erradas.length} perdeu={status === 'derrota'} />
    </Card>
  ) : (
    <Card style={{ paddingVertical: space.md }}>
      <BonecoForca erros={erradas.length} perdeu={status === 'derrota'} altura={130} />
    </Card>
  );

  const painelTentadas = (
      <Card style={{ gap: space.lg }}>
        <AppText style={s.rotulo}>Letras tentadas</AppText>
        {tentadas.length === 0 ? (
          <AppText variant="small">Nenhuma letra ainda. Chute a primeira!</AppText>
        ) : (
          <View style={s.tentadas}>
            {tentadas.map((letra) => {
              const certa = palavraNormalizada.includes(letra);
              return (
                <View
                  key={letra}
                  style={[
                    s.tentada,
                    certa
                      ? { backgroundColor: colors.successSoft, borderColor: colors.success }
                      : { backgroundColor: colors.dangerSoft, borderColor: colors.dangerSoft },
                  ]}>
                  <Text
                    style={[
                      s.teclaTexto,
                      { color: certa ? colors.success : colors.danger },
                      !certa && { textDecorationLine: 'line-through' },
                    ]}>
                    {letra}
                  </Text>
                </View>
              );
            })}
          </View>
        )}
        <Button
          label="Reiniciar jogo"
          icon={{ lib: 'ion', name: 'refresh' }}
          onPress={reiniciar}
          variant={status === 'jogando' ? 'outline' : 'primary'}
        />
      </Card>
  );

  return largo ? (
    <View style={{ flexDirection: 'row', gap: space.lg, alignItems: 'flex-start' }}>
      <View style={{ flex: 7 }}>{painelPalavra}</View>
      <View style={{ flex: 5, gap: space.lg }}>
        {painelBoneco}
        {painelTentadas}
      </View>
    </View>
  ) : (
    <View style={{ gap: space.lg }}>
      {/* No celular o boneco vem primeiro, para ficar visível enquanto joga */}
      {painelBoneco}
      {painelPalavra}
      {painelTentadas}
    </View>
  );
}

export const TOTAL_PALAVRAS = PALAVRAS_FORCA.length;
export const TOTAL_VIDAS = MAX_ERROS;

const forcaStyles = (c: Palette) =>
  StyleSheet.create({
    cabecalho: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: space.md,
    },
    info: { fontFamily: fonts.mono, fontSize: 12, color: c.textDim },
    linhaTopo: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    rotulo: {
      fontFamily: fonts.mono,
      fontSize: 11,
      letterSpacing: 0.8,
      textTransform: 'uppercase',
      color: c.textDim,
    },
    contador: { fontFamily: fonts.bold, fontSize: 28 },
    vidas: { flexDirection: 'row', gap: 6 },
    vida: { flex: 1, height: 4, borderRadius: 2 },
    palavra: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm, justifyContent: 'center' },
    slot: {
      minWidth: 30,
      flexGrow: 1,
      flexBasis: 30,
      maxWidth: 52,
      height: 52,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 2,
      borderBottomColor: c.borderStrong,
    },
    letraSlot: { fontFamily: fonts.semibold, fontSize: 24, color: c.text },
    resultado: {
      borderWidth: 1,
      borderRadius: radius.md,
      paddingVertical: space.md,
      paddingHorizontal: space.lg,
      alignItems: 'center',
      gap: 2,
    },
    resultadoTitulo: { fontFamily: fonts.semibold, fontSize: 17 },
    resultadoPalavra: { fontFamily: fonts.mono, fontSize: 12, color: c.textMuted },
    form: { flexDirection: 'row', gap: space.sm },
    input: {
      flex: 1,
      minWidth: 0,
      borderWidth: 1,
      borderColor: c.border,
      backgroundColor: c.surfaceAlt,
      borderRadius: radius.md,
      paddingHorizontal: space.lg,
      paddingVertical: space.md,
      fontFamily: fonts.medium,
      fontSize: 15,
      color: c.text,
    },
    teclado: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, justifyContent: 'center' },
    tecla: {
      flexBasis: '12.4%',
      flexGrow: 1,
      maxWidth: 64,
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: c.border,
      backgroundColor: c.surfaceAlt,
    },
    teclaHover: { borderColor: c.accentBorder, backgroundColor: c.accentSoft },
    teclaTexto: { fontFamily: fonts.semibold, fontSize: 15, color: c.text },
    tentadas: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm },
    tentada: {
      minWidth: 36,
      paddingHorizontal: space.sm,
      paddingVertical: 4,
      borderRadius: radius.sm,
      borderWidth: 1,
      alignItems: 'center',
    },
  });
