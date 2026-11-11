import { Screen } from '@/components/layout';
import { SobreAppSection } from '@/components/sections';

/** Sobre: tecnologias e módulos usados no app (requisito da atividade). Link no rodapé. */
export default function Sobre() {
  return (
    <Screen>
      <SobreAppSection borda={false} />
    </Screen>
  );
}
