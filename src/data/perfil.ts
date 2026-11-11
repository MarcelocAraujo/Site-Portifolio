/**
 * Todo o conteúdo do portfólio fica aqui, separado das telas.
 * Para atualizar textos, projetos ou cursos, edite só este arquivo.
 */
export const PERFIL = {
  nome: 'Marcelo Caldas de Araújo Filho',
  nomeCurto: 'Marcelo Caldas',
  titulo: 'Estudante de Ciência da Computação — UNICAP',
  /** Título grande do topo (digitado letra a letra). */
  cargo: 'Estudante de Ciência da Computação',
  descricao:
    'Estudante de Ciência da Computação, com interesse na área de desenvolvimento e IA. Este app reúne minha formação, os projetos que venho construindo e um Jogo da Forca que fiz do zero.',
  frasesDigitadas: [
    'Estudante de Ciência da Computação',
    'Desenvolvimento e IA',
    'Disponível para estágio',
  ],
  ficha: {
    local: 'Recife, PE',
    periodo: '5º de 8',
    projetos: 5,
    status: 'disponível p/ estágio',
  },
};

export const LINKS = {
  github: 'https://github.com/MarcelocAraujo',
  linkedin: 'https://www.linkedin.com/in/marcelo-caldas-de-ara%C3%BAjo-filho-4aa669394/',
  curriculo: 'https://marcelocaldas.vercel.app/curriculo-marcelo-caldas.pdf',
};

export type ItemFormacao = {
  tag: string;
  periodo: string;
  titulo: string;
  local: string;
  descricao: string;
};

export const FORMACAO: ItemFormacao[] = [
  {
    tag: 'Graduação',
    periodo: '2024.2 — 2028.1 (previsto)',
    titulo: 'Bacharelado em Ciência da Computação',
    local: 'Universidade Católica de Pernambuco',
    descricao:
      'Graduação em andamento, atualmente no 5º período, com interesse em desenvolvimento de software, inteligência artificial, análise de dados e novas tecnologias.',
  },
  {
    tag: 'Educação básica',
    periodo: '2008 — 2023',
    titulo: 'Ensino Fundamental e Médio',
    local: 'Colégio Damas',
    descricao: 'Formação escolar completa no Colégio Damas, em Recife.',
  },
  {
    tag: 'Curso',
    periodo: 'Udemy',
    titulo: 'Introdução ao Java — Fundamentos para Lógica de Programação',
    local: 'Formação complementar',
    descricao: 'Curso introdutório de Java voltado aos fundamentos da lógica de programação.',
  },
  {
    tag: 'Curso',
    periodo: 'Udemy',
    titulo: 'Do Básico ao Avançado — O Curso Completo de Microsoft Excel',
    local: 'Formação complementar',
    descricao: 'Curso completo de Microsoft Excel, do nível básico ao avançado.',
  },
  {
    tag: 'Curso',
    periodo: 'Udemy',
    titulo: 'Banco de Dados SQL do Zero ao Avançado + Projetos Reais',
    local: 'Formação complementar',
    descricao:
      'Curso de banco de dados SQL com conteúdo progressivo e aplicação em projetos reais.',
  },
];

export type Projeto = {
  /** Resultado de require() de uma imagem local. */
  imagem: number;
  /** "cover" para fotos/capturas, "contain" para logos. */
  enquadramento: 'cover' | 'contain';
  categoria: string;
  titulo: string;
  descricao: string;
  stack: string[];
};

export const PROJETOS: Projeto[] = [
  {
    imagem: require('@/assets/images/projetos/ocupacional-3d.png'),
    enquadramento: 'cover',
    categoria: 'Web',
    titulo: 'Site Ocupacional 3D',
    descricao:
      'Plataforma web criada para a Ocupacional 3D (empresa), na cadeira de Computação, Sociedade e Sustentabilidade.',
    stack: ['Wix', 'Web Design'],
  },
  {
    imagem: require('@/assets/images/projetos/banco-de-dados.png'),
    enquadramento: 'cover',
    categoria: 'Banco de Dados',
    titulo: 'Concessionária de Carros',
    descricao: 'Criação de um banco de dados para a cadeira de Projeto de Banco de Dados.',
    stack: ['SQL', 'MySQL', 'Modelagem Relacional'],
  },
  {
    imagem: require('@/assets/images/projetos/java-logo.png'),
    enquadramento: 'contain',
    categoria: 'Orientação a Objetos',
    titulo: 'Cadastro de Sócios',
    descricao:
      'Construção de um sistema de cadastro de sócios para a cadeira de Programação Orientada a Objetos.',
    stack: ['JAVA', 'POO'],
  },
  {
    imagem: require('@/assets/images/projetos/carrinho.jpeg'),
    enquadramento: 'cover',
    categoria: 'Hardware',
    titulo: 'Robótica',
    descricao: 'Protótipo de robô móvel desenvolvido com Arduino UNO para a cadeira de Robótica.',
    stack: ['Arduino', 'C++', 'Hardware'],
  },
  {
    imagem: require('@/assets/images/projetos/excel-logo.png'),
    enquadramento: 'contain',
    categoria: 'Lógica',
    titulo: 'Tabela Verdade',
    descricao:
      'Simulador de Tabela Verdade desenvolvido para a cadeira de Lógica Matemática Aplicada à Computação.',
    stack: ['Excel', 'Lógica'],
  },
];

/** Nomes de ícones do MaterialCommunityIcons (@expo/vector-icons). */
export type IconeMCI =
  | 'language-python'
  | 'language-c'
  | 'language-java'
  | 'language-javascript'
  | 'language-html5'
  | 'language-css3'
  | 'react'
  | 'triangle'
  | 'database'
  | 'database-outline'
  | 'api'
  | 'git'
  | 'github'
  | 'microsoft-excel'
  | 'server';

export type GrupoStack = {
  titulo: string;
  itens: { nome: string; icone: IconeMCI }[];
};

/** Habilidades técnicas (as mesmas do currículo). */
export const STACKS: GrupoStack[] = [
  {
    titulo: 'Linguagens',
    itens: [
      { nome: 'Python', icone: 'language-python' },
      { nome: 'C', icone: 'language-c' },
      { nome: 'Java', icone: 'language-java' },
      { nome: 'JavaScript', icone: 'language-javascript' },
    ],
  },
  {
    titulo: 'Front-end',
    itens: [
      { nome: 'HTML', icone: 'language-html5' },
      { nome: 'CSS', icone: 'language-css3' },
      { nome: 'React', icone: 'react' },
      { nome: 'Next.js', icone: 'triangle' },
    ],
  },
  {
    titulo: 'Back-end & Dados',
    itens: [
      { nome: 'SQL', icone: 'database' },
      { nome: 'back4app (CRUD)', icone: 'server' },
      { nome: 'Consumo de APIs', icone: 'api' },
    ],
  },
  {
    titulo: 'Ferramentas',
    itens: [
      { nome: 'Git', icone: 'git' },
      { nome: 'GitHub', icone: 'github' },
      { nome: 'Excel', icone: 'microsoft-excel' },
      { nome: 'Vercel', icone: 'triangle' },
    ],
  },
];

export const IDIOMAS = [
  { idioma: 'Português', nivel: 'Nativo' },
  { idioma: 'Inglês', nivel: 'Intermediário' },
];

export const INTERESSES = [
  'Full Stack',
  'Back-end',
  'Front-end',
  'Inteligência Artificial',
  'Análise de Dados',
];

/**
 * Tecnologias e módulos usados para construir ESTE app (tela Stacks → "Sobre este app").
 * A versão de cada pacote é lida do package.json na própria tela.
 */
export const MODULOS_APP: { pacote: string; nome: string; uso: string }[] = [
  { pacote: 'react-native', nome: 'React Native', uso: 'Base do app: componentes nativos para Android, iOS e web.' },
  { pacote: 'expo', nome: 'Expo SDK', uso: 'Ambiente de desenvolvimento, build e publicação.' },
  { pacote: 'expo-router', nome: 'Expo Router', uso: 'Navegação por arquivos entre as telas (src/app).' },
  { pacote: 'react', nome: 'React', uso: 'Componentes, estado e hooks.' },
  { pacote: 'typescript', nome: 'TypeScript', uso: 'Tipagem estática de todo o código.' },
  { pacote: '@expo-google-fonts/poppins', nome: 'Poppins', uso: 'Fonte principal dos textos.' },
  { pacote: '@expo-google-fonts/jetbrains-mono', nome: 'JetBrains Mono', uso: 'Fonte monoespaçada dos detalhes e do código.' },
  { pacote: 'expo-font', nome: 'expo-font', uso: 'Carregamento das fontes antes de exibir o app.' },
  { pacote: '@expo/vector-icons', nome: 'Vector Icons', uso: 'Ícones da navegação, stacks e botões.' },
  { pacote: 'react-native-svg', nome: 'React Native SVG', uso: 'Desenho do boneco do Jogo da Forca.' },
  { pacote: 'expo-haptics', nome: 'expo-haptics', uso: 'Vibração ao acertar ou errar letras no jogo.' },
  { pacote: 'expo-image', nome: 'expo-image', uso: 'Imagens otimizadas da galeria de projetos.' },
  { pacote: 'expo-web-browser', nome: 'expo-web-browser', uso: 'Abre GitHub, LinkedIn e currículo dentro do app.' },
  { pacote: '@react-native-async-storage/async-storage', nome: 'AsyncStorage', uso: 'Salva a escolha de tema claro/escuro.' },
  { pacote: 'react-native-safe-area-context', nome: 'Safe Area Context', uso: 'Respeita notch e barras do sistema.' },
  { pacote: 'expo-updates', nome: 'EAS Update', uso: 'Publicação over-the-air (QR Code do Expo).' },
];

export const PALAVRAS_FORCA = [
  'JAVASCRIPT', 'REACT', 'ALGORITMO', 'PROGRAMACAO', 'COMPUTADOR',
  'DESENVOLVEDOR', 'INTERFACE', 'TECLADO', 'MONITOR', 'INTERNET',
  'BIBLIOTECA', 'COMPONENTE', 'VARIAVEL', 'FUNCAO', 'OBJETO',
  'NAVEGADOR', 'SERVIDOR', 'BANCODADOS', 'PIXEL', 'ANIMAÇÃO',
  'FRAMEWORK', 'DEPURADOR', 'TERMINAL', 'REPOSITORIO', 'MEMORIA',
  'PROCESSADOR', 'GABINETE', 'SOFTWARE', 'HARDWARE', 'CIRCUITO',
  'CURSOR', 'ARQUIVO',
];
