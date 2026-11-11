import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';

/** Abre um link externo: nova aba na web, navegador interno no celular. */
export async function abrirLink(url: string) {
  if (process.env.EXPO_OS === 'web') {
    window.open(url, '_blank', 'noopener,noreferrer');
    return;
  }
  await openBrowserAsync(url, {
    presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
  });
}
