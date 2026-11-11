import {
  JetBrainsMono_400Regular,
  JetBrainsMono_500Medium,
} from '@expo-google-fonts/jetbrains-mono';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from '@expo-google-fonts/poppins';
import { TabList, TabSlot, TabTrigger, Tabs } from 'expo-router/ui';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavHeader, NavItem } from '@/components/layout';
import { AppThemeProvider, useAppTheme } from '@/theme/theme-context';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontesProntas, erroFontes] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    JetBrainsMono_400Regular,
    JetBrainsMono_500Medium,
  });

  useEffect(() => {
    if (fontesProntas || erroFontes) SplashScreen.hideAsync();
  }, [fontesProntas, erroFontes]);

  if (!fontesProntas && !erroFontes) return null;

  return (
    <SafeAreaProvider>
      <AppThemeProvider>
        <AppNavigation />
      </AppThemeProvider>
    </SafeAreaProvider>
  );
}

/**
 * Navegação com Expo Router (abas "headless"): cada <TabTrigger> aponta para
 * uma tela em src/app. A barra fica no topo, como no site.
 */
function AppNavigation() {
  const { colors, scheme } = useAppTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <Tabs style={{ flex: 1 }}>
        <TabList asChild>
          <NavHeader>
            <TabTrigger name="index" href="/" asChild>
              <NavItem label="Início" />
            </TabTrigger>
            <TabTrigger name="projetos" href="/projetos" asChild>
              <NavItem label="Projetos" />
            </TabTrigger>
            <TabTrigger name="formacao" href="/formacao" asChild>
              <NavItem label="Formação" />
            </TabTrigger>
            <TabTrigger name="experiencia" href="/experiencia" asChild>
              <NavItem label="Experiência" />
            </TabTrigger>
            <TabTrigger name="stacks" href="/stacks" asChild>
              <NavItem label="Stacks" />
            </TabTrigger>
            <TabTrigger name="forca" href="/forca" asChild>
              <NavItem label="Forca" />
            </TabTrigger>
          </NavHeader>
        </TabList>
        <TabSlot style={{ flex: 1 }} />
      </Tabs>
    </View>
  );
}
