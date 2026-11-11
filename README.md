# Portfólio — Marcelo Caldas (React Native + Expo)

App de currículo/portfólio feito em **React Native + Expo** com **Expo Router**, para a disciplina **Programação Web e Mobile** (UNICAP). Esta é a versão mobile do portfólio que antes era em Next.js ([marcelocaldas.vercel.app](https://marcelocaldas.vercel.app)).

## Telas (Expo Router, em `src/app`)

| Rota | Tela | Conteúdo |
| --- | --- | --- |
| `/` | Início | Apresentação, ficha rápida, GitHub, LinkedIn e currículo |
| `/projetos` | Projetos | Galeria com os projetos acadêmicos |
| `/formacao` | Formação | Experiência acadêmica: graduação, escola e cursos |
| `/experiencia` | Experiência | Experiência profissional: objetivo, áreas de interesse e idiomas |
| `/stacks` | Stacks | Habilidades técnicas e **Sobre este app** (todas as tecnologias e módulos usados) |
| `/forca` | Forca | Jogo da Forca rodando em React Native (sem WebView) |

## Tecnologias

- React Native, React 19 e TypeScript
- Expo SDK 58 e Expo Router (abas "headless" com barra de navegação própria)
- Fontes Poppins e JetBrains Mono (`@expo-google-fonts`)
- `@expo/vector-icons`, `react-native-svg` (boneco da forca), `expo-image`
- `expo-haptics` (vibração no jogo), `expo-web-browser` (links externos)
- AsyncStorage (salva o tema claro/escuro)
- EAS Update (publicação over-the-air)

## Estrutura

```
src/
  app/                 # telas (cada arquivo é uma rota)
    _layout.tsx        # fontes, tema e navegação
    index.tsx  projetos.tsx  formacao.tsx  experiencia.tsx  stacks.tsx  forca.tsx
  components/
    ui.tsx             # textos, botões, cards, chips, títulos com cursor "_"
    layout.tsx         # barra de navegação, tela com rolagem, redes sociais, rodapé
    forca/boneco.tsx   # boneco da forca em SVG
  data/perfil.ts       # TODO o conteúdo (textos, projetos, cursos, stacks, palavras)
  theme/               # cores, fontes, espaçamentos e tema claro/escuro
  lib/open-link.ts     # abre links externos
```

Para mudar textos, projetos ou cursos, edite só `src/data/perfil.ts`.

## Rodando

```bash
npm install
npx expo start
```

Escaneie o QR Code com o app **Expo Go** (Android/iOS) ou aperte `w` para abrir no navegador.

## Publicando no Expo (EAS Update)

```bash
npx eas-cli@latest login
npx eas-cli@latest init
npx eas-cli@latest update:configure
npx eas-cli@latest update --branch production --message "Portfólio"
```

A página do update no site do Expo mostra o QR Code para abrir o app no Expo Go.
