/**
 * Animação de "aparecer ao rolar" (scroll reveal), como no site de referência.
 * A tela (<Screen>) avisa a cada rolagem; cada <Reveal> mede sua posição e,
 * quando entra na área visível, sobe e aparece uma única vez.
 */
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentRef,
  type ReactNode,
} from 'react';
import {
  Animated,
  Easing,
  useWindowDimensions,
  type StyleProp,
  View,
  type ViewStyle,
} from 'react-native';

type Ouvinte = () => void;

export type RevealRegistry = {
  subscribe: (fn: Ouvinte) => () => void;
  notify: () => void;
};

export function createRevealRegistry(): RevealRegistry {
  const ouvintes = new Set<Ouvinte>();
  return {
    subscribe: (fn) => {
      ouvintes.add(fn);
      return () => ouvintes.delete(fn);
    },
    notify: () => ouvintes.forEach((fn) => fn()),
  };
}

export const RevealContext = createContext<RevealRegistry | null>(null);

export function Reveal({
  children,
  delay = 0,
  style,
}: {
  children: ReactNode;
  delay?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const registry = useContext(RevealContext);
  const ref = useRef<ComponentRef<typeof View>>(null);
  const [progresso] = useState(() => new Animated.Value(registry ? 0 : 1));
  const { height } = useWindowDimensions();

  useEffect(() => {
    if (!registry) return;
    let mostrado = false;
    let cancelar: (() => void) | undefined;

    const verificar = () => {
      if (mostrado || !ref.current) return;
      ref.current.measureInWindow((_x, y, _w, h) => {
        if (mostrado || h === 0) return; // h === 0: tela ainda escondida
        if (y < height - 60 && y + h > 0) {
          mostrado = true;
          cancelar?.();
          Animated.timing(progresso, {
            toValue: 1,
            duration: 700,
            delay,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }).start();
        }
      });
    };

    cancelar = registry.subscribe(verificar);
    const id = setTimeout(verificar, 80);
    return () => {
      cancelar?.();
      clearTimeout(id);
    };
  }, [registry, height, delay, progresso]);

  return (
    <Animated.View
      ref={ref}
      collapsable={false}
      style={[
        {
          opacity: progresso,
          transform: [
            { translateY: progresso.interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) },
          ],
        },
        style,
      ]}>
      {children}
    </Animated.View>
  );
}
