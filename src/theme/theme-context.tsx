import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { palettes, type Palette } from './tokens';

type Scheme = 'dark' | 'light';

type ThemeValue = {
  scheme: Scheme;
  colors: Palette;
  toggle: () => void;
};

const STORAGE_KEY = 'tema';

const ThemeContext = createContext<ThemeValue | null>(null);

/**
 * Tema escuro por padrão (é a identidade do app), com opção de modo claro.
 * A escolha fica salva no AsyncStorage (localStorage na web).
 */
export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [scheme, setScheme] = useState<Scheme>('dark');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((salvo) => {
        if (salvo === 'dark' || salvo === 'light') setScheme(salvo);
      })
      .catch(() => {});
  }, []);

  const value = useMemo<ThemeValue>(
    () => ({
      scheme,
      colors: palettes[scheme],
      toggle: () => {
        const proximo: Scheme = scheme === 'dark' ? 'light' : 'dark';
        setScheme(proximo);
        AsyncStorage.setItem(STORAGE_KEY, proximo).catch(() => {});
      },
    }),
    [scheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useAppTheme precisa estar dentro de <AppThemeProvider>');
  return ctx;
}

/** Cria estilos dependentes da paleta, memorizados por tema. */
export function useThemedStyles<T>(factory: (c: Palette) => T): T {
  const { colors } = useAppTheme();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => factory(colors), [colors]);
}
