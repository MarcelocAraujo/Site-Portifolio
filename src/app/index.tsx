import { Screen } from '@/components/layout';
import {
  ForcaSection,
  FormacaoSection,
  HeroSection,
  ProjetosSection,
  StacksSection,
} from '@/components/sections';

/** Início: página única, com as seções aparecendo conforme a rolagem. */
export default function Inicio() {
  return (
    <Screen>
      <HeroSection />
      <ProjetosSection />
      <FormacaoSection />
      <StacksSection />
      <ForcaSection />
    </Screen>
  );
}
