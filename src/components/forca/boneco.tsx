import Svg, { Circle, Line } from 'react-native-svg';

import { useAppTheme } from '@/theme/theme-context';

/** Forca desenhada em SVG; cada erro "acende" uma parte do boneco. */
export function BonecoForca({
  erros,
  perdeu,
  altura = 190,
}: {
  erros: number;
  perdeu: boolean;
  altura?: number;
}) {
  const { colors } = useAppTheme();
  const base = colors.textDim;
  const ativa = perdeu ? colors.danger : colors.accent;
  const inativa = colors.border;
  const cor = (parte: number) => (erros >= parte ? ativa : inativa);

  return (
    <Svg
      viewBox="0 0 140 170"
      width="100%"
      height={altura}
      accessibilityLabel={`Boneco da forca com ${erros} erros`}>
      {/* Estrutura */}
      <Line x1="10" y1="165" x2="130" y2="165" stroke={base} strokeWidth={4} strokeLinecap="round" />
      <Line x1="25" y1="165" x2="25" y2="10" stroke={base} strokeWidth={4} strokeLinecap="round" />
      <Line x1="25" y1="10" x2="95" y2="10" stroke={base} strokeWidth={4} strokeLinecap="round" />
      <Line x1="95" y1="10" x2="95" y2="32" stroke={base} strokeWidth={4} strokeLinecap="round" />
      {/* 1: cabeça */}
      <Circle cx="95" cy="46" r="14" fill="none" stroke={cor(1)} strokeWidth={3.5} />
      {/* 2: tronco */}
      <Line x1="95" y1="60" x2="95" y2="110" stroke={cor(2)} strokeWidth={3.5} strokeLinecap="round" />
      {/* 3: braço esquerdo */}
      <Line x1="95" y1="72" x2="72" y2="90" stroke={cor(3)} strokeWidth={3.5} strokeLinecap="round" />
      {/* 4: braço direito */}
      <Line x1="95" y1="72" x2="118" y2="90" stroke={cor(4)} strokeWidth={3.5} strokeLinecap="round" />
      {/* 5: perna esquerda */}
      <Line x1="95" y1="110" x2="76" y2="138" stroke={cor(5)} strokeWidth={3.5} strokeLinecap="round" />
      {/* 6: perna direita */}
      <Line x1="95" y1="110" x2="114" y2="138" stroke={cor(6)} strokeWidth={3.5} strokeLinecap="round" />
    </Svg>
  );
}
