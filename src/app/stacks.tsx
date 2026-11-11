import { Screen } from '@/components/layout';
import { SobreAppSection, StacksSection } from '@/components/sections';

/** Stacks + "Sobre este app" (tecnologias e módulos usados no app). */
export default function Stacks() {
  return (
    <Screen>
      <StacksSection borda={false} />
      <SobreAppSection />
    </Screen>
  );
}
