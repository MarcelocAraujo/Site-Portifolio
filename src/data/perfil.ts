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
    projetos: 8,
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

export type LinkProjeto = {
  rotulo: string;
  url: string;
  tipo: 'codigo' | 'site';
};

export type Projeto = {
  /** Capa do card. Resultado de require() de uma imagem local. */
  imagem: number;
  /** "cover" para fotos/capturas, "contain" para logos. */
  enquadramento: 'cover' | 'contain';
  categoria: string;
  titulo: string;
  /** Texto curto do card. */
  descricao: string;
  stack: string[];
  /** Conteúdo da janela de detalhes (abre ao clicar no card). */
  detalhes: {
    contexto: string;
    sobre: string[];
    destaques: string[];
    equipe?: string;
    galeria: { imagem: number; legenda: string }[];
    links: LinkProjeto[];
    /** Aviso exibido no lugar dos links (ex.: repositório privado). */
    observacao?: string;
  };
};

export const PROJETOS: Projeto[] = [
  {
    imagem: require('@/assets/images/projetos/sindhospe/capa.jpg'),
    enquadramento: 'cover',
    categoria: 'Full Stack · Projeto Integrador',
    titulo: 'Portal SINDHOSPE',
    descricao:
      'Portal de inteligência de dados para os associados do SINDHOSPE, com indicadores hospitalares calculados a partir de dados reais do CNES/DATASUS.',
    stack: ['Next.js', 'React', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL', 'Firebase'],
    detalhes: {
      contexto: 'Projeto Integrador · UNICAP + SINDHOSPE',
      sobre: [
        'Portal web feito em parceria com o SINDHOSPE. Cada estabelecimento associado entra com a própria conta e acompanha os seus indicadores de estrutura: leitos, serviços, habilitações, equipamentos e profissionais, sempre comparados com o município e com o estado.',
        'Os números vêm de dados públicos e reais do CNES/DATASUS. Um importador no back-end cruza essas bases com a lista de associados do sindicato, calcula os indicadores e publica o resultado para o portal, que também traz relatório de evolução, visão do setor e um painel exclusivo para a equipe do sindicato.',
        'Participei do desenho das telas do portal, dos wireframes ao protótipo navegável, junto com a equipe.',
      ],
      destaques: [
        'Login por estabelecimento: cada associado só enxerga os próprios dados',
        'Comparativos com município, estado e estabelecimentos do mesmo grupo',
        'Relatório de evolução dos leitos e painel administrativo do sindicato',
        'API REST em Node.js/Express sobre PostgreSQL e importador para o Firebase',
        'Acessibilidade: ajuste do tamanho da fonte e modo de alto contraste',
        'Cuidado com a LGPD: dos profissionais só saem contagens',
      ],
      equipe: 'Equipe de 5 alunos da UNICAP',
      galeria: [
        { imagem: require('@/assets/images/projetos/sindhospe/capa.jpg'), legenda: 'Tela de acesso dos associados' },
        { imagem: require('@/assets/images/projetos/sindhospe/indicadores.jpg'), legenda: 'Painel de indicadores (protótipo com dados fictícios)' },
        { imagem: require('@/assets/images/projetos/sindhospe/admin.jpg'), legenda: 'Área administrativa do sindicato (protótipo com dados fictícios)' },
      ],
      links: [
        { rotulo: 'Ver site', url: 'https://sindhospe-frontend.vercel.app', tipo: 'site' },
        { rotulo: 'Código do front-end', url: 'https://github.com/Heitormeira/sindhospe-frontend', tipo: 'codigo' },
        { rotulo: 'Código do back-end', url: 'https://github.com/Heitormeira/sindhospe-backend', tipo: 'codigo' },
      ],
    },
  },
  {
    imagem: require('@/assets/images/projetos/sangue/capa.jpg'),
    enquadramento: 'cover',
    categoria: 'Full Stack',
    titulo: 'Sangue Solidário',
    descricao:
      'Site que conecta quem precisa de sangue a doadores compatíveis e hemocentros nas proximidades.',
    stack: ['Next.js', 'React', 'Node.js', 'Back4App', 'APIs REST'],
    detalhes: {
      contexto: 'Programação Web e Mobile · UNICAP',
      sobre: [
        'Plataforma colaborativa de doação de sangue. Quem precisa escolhe o tipo sanguíneo do receptor e o site mostra os doadores compatíveis e disponíveis mais próximos, além dos hemocentros da região. Quem quer ajudar faz um cadastro simples e pode editá-lo depois.',
        'O front-end e as rotas de API rodam juntos no Next.js. Os cadastros ficam no Back4App (Parse Server), o endereço é preenchido pelo CEP com o ViaCEP e a localização dos hemocentros vem das APIs do OpenStreetMap.',
      ],
      destaques: [
        'Busca de doadores pela tabela de compatibilidade sanguínea',
        'Doadores e hemocentros ordenados pela distância',
        'CRUD completo, com área do doador e acesso de administrador',
        'Preenchimento automático do endereço pelo CEP',
        'A lista pública não expõe os contatos dos doadores',
        'Acessibilidade: tamanho da letra ajustável e alto contraste',
      ],
      equipe: 'Projeto em equipe de 3 alunos',
      galeria: [
        { imagem: require('@/assets/images/projetos/sangue/capa.jpg'), legenda: 'Página inicial' },
        { imagem: require('@/assets/images/projetos/sangue/buscar.jpg'), legenda: 'Busca de doadores compatíveis' },
        { imagem: require('@/assets/images/projetos/sangue/cadastro.jpg'), legenda: 'Cadastro de doador' },
        { imagem: require('@/assets/images/projetos/sangue/doadores.jpg'), legenda: 'Lista de doadores com filtros' },
      ],
      links: [
        { rotulo: 'Ver site', url: 'https://projetowebmobile1gq.vercel.app', tipo: 'site' },
        { rotulo: 'Código', url: 'https://github.com/Heitormeira/projetowebmobile1gq', tipo: 'codigo' },
      ],
    },
  },
  {
    imagem: require('@/assets/images/projetos/liga/capa.jpg'),
    enquadramento: 'cover',
    categoria: 'Full Stack',
    titulo: 'Site de Eventos para Liga Acadêmica',
    descricao:
      'Site institucional com agenda de eventos, inscrições online, pagamento por Pix ou cartão e painel administrativo.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Mercado Pago'],
    detalhes: {
      contexto: 'Projeto real para uma liga acadêmica',
      sobre: [
        'Site oficial de uma liga acadêmica, com páginas institucionais, agenda de eventos e todo o fluxo de inscrição: o participante preenche os dados, paga por Pix ou cartão e recebe o ingresso com QR Code por e-mail.',
        'A organização administra tudo por um painel próprio: cria e edita eventos, acompanha os inscritos, exporta a lista em CSV e faz o check-in no dia do evento.',
        'O controle de vagas acontece dentro do banco de dados, então inscrições simultâneas nunca ultrapassam o limite. O preço sempre vem do servidor, e cada pagamento só é confirmado depois de validado com o Mercado Pago.',
      ],
      destaques: [
        'Inscrições com reserva de vaga por 30 minutos, sem overbooking',
        'Pagamentos via Mercado Pago (Pix e cartão) com webhooks verificados',
        'Ingresso com QR Code e e-mail de confirmação',
        'Painel administrativo: eventos, participantes, exportação CSV e check-in',
        'Banco com regras de segurança por linha (RLS) no Supabase',
        'Testes automatizados de ponta a ponta e foco em LGPD e acessibilidade',
      ],
      galeria: [
        { imagem: require('@/assets/images/projetos/liga/capa.jpg'), legenda: 'Página do evento com o formulário de inscrição' },
        { imagem: require('@/assets/images/projetos/liga/eventos.jpg'), legenda: 'Agenda de eventos' },
      ],
      links: [],
      observacao: 'Repositório privado.',
    },
  },
  {
    imagem: require('@/assets/images/projetos/controle/capa.jpg'),
    enquadramento: 'cover',
    categoria: 'Robótica · Acessibilidade',
    titulo: 'Controle de Acesso Inclusivo',
    descricao:
      'Sistema com RFID e Arduino que destrava a porta de acessibilidade da universidade sem depender de terceiros.',
    stack: ['Arduino', 'C++', 'RFID', 'Impressão 3D'],
    detalhes: {
      contexto: 'Robótica Inclusiva · UNICAP',
      sobre: [
        'Na universidade, estudantes cadeirantes dependiam de alguém para abrir a porta de acessibilidade. O projeto devolve essa autonomia: basta aproximar um cartão autorizado do leitor e a trava se abre sozinha.',
        'Um Arduino Uno lê o cartão pelo módulo RFID RC522 e aciona um servo motor, que move uma trava de cremalheira e pinhão impressa em 3D. A estrutura é de MDF cortado a laser. Os cartões são cadastrados e removidos no próprio aparelho com um Cartão Mestre, e tudo funciona 100% offline.',
      ],
      destaques: [
        'Firmware em C++ organizado como máquina de estados (normal, admin e remoção)',
        'Cadastro de até 10 cartões salvos na EEPROM, que resistem a quedas de energia',
        'Mesma leitura abre ou fecha a porta (modo alternância)',
        'Mecanismo de cremalheira e pinhão impresso em 3D, com arquivos STL abertos',
        'Custo estimado entre R$ 150 e R$ 300',
      ],
      equipe: 'Projeto em equipe de 4 alunos',
      galeria: [
        { imagem: require('@/assets/images/projetos/controle/capa.jpg'), legenda: 'Protótipo em funcionamento' },
        { imagem: require('@/assets/images/projetos/controle/prototipo.jpg'), legenda: 'Leitor RFID e trava impressa em 3D' },
        { imagem: require('@/assets/images/projetos/controle/montagem.jpg'), legenda: 'Primeira montagem em MDF cortado a laser' },
        { imagem: require('@/assets/images/projetos/controle/teste-rfid.jpg'), legenda: 'Primeiros testes com o módulo RC522' },
      ],
      links: [
        { rotulo: 'Código e documentação', url: 'https://github.com/MarcelocAraujo/Controle-de-Acesso-Inclusivo---UNICAP', tipo: 'codigo' },
      ],
    },
  },
  {
    imagem: require('@/assets/images/projetos/ocupacional-3d.png'),
    enquadramento: 'cover',
    categoria: 'Web',
    titulo: 'Site Ocupacional 3D',
    descricao:
      'Loja virtual e site institucional da Ocupacional 3D, empresa de tecnologia assistiva com impressão 3D.',
    stack: ['Wix', 'Web Design', 'E-commerce'],
    detalhes: {
      contexto: 'Computação, Sociedade e Sustentabilidade · UNICAP',
      sobre: [
        'Site criado para a Ocupacional 3D, empresa de Recife que desenvolve produtos e recursos impressos em 3D para facilitar a vida de pessoas com deficiência.',
        'O site reúne a loja virtual, com produtos organizados por categoria (atividades de vida diária, reabilitação, educação, recursos lúdicos e kits), as páginas institucionais (sobre, quem somos e serviços), as perguntas frequentes e os canais de contato.',
      ],
      destaques: [
        'Loja com filtros por categoria e preço, carrinho e vários meios de pagamento',
        'Páginas institucionais apresentando a empresa, a equipe e os serviços',
        'FAQ com busca e atendimento direto pelo WhatsApp',
        'Cadastro de e-mail para novidades',
        'Projeto com impacto social, ligado à acessibilidade',
      ],
      galeria: [
        { imagem: require('@/assets/images/projetos/ocupacional-3d.png'), legenda: 'Loja virtual' },
        { imagem: require('@/assets/images/projetos/ocupacional/inicio.jpg'), legenda: 'Página inicial e seção "Sobre"' },
        { imagem: require('@/assets/images/projetos/ocupacional/faq.jpg'), legenda: 'Perguntas frequentes' },
      ],
      links: [{ rotulo: 'Ver site', url: 'https://www.ocupacional3d.com', tipo: 'site' }],
    },
  },
  {
    imagem: require('@/assets/images/projetos/banco-de-dados.png'),
    enquadramento: 'cover',
    categoria: 'Banco de Dados',
    titulo: 'Concessionária de Carros',
    descricao:
      'Banco de dados relacional completo para uma concessionária, da modelagem às consultas analíticas.',
    stack: ['SQL', 'MySQL', 'Modelagem Relacional'],
    detalhes: {
      contexto: 'Projeto de Banco de Dados · UNICAP',
      sobre: [
        'Modelagem e implementação de um banco de dados para gerenciar uma concessionária de veículos: veículos, clientes, vendas, funcionários, financiamentos e revisões.',
        'O esquema foi normalizado para evitar anomalias de inserção, alteração e exclusão. O projeto vai da criação das tabelas, com as regras de integridade, até consultas avançadas que geram relatórios de negócio.',
      ],
      destaques: [
        'DDL com chaves primárias e estrangeiras, CHECK e UNIQUE (CPF, chassi, contatos)',
        'Script DML com massa de dados consistente para testes',
        'Consultas com múltiplos JOINs, GROUP BY e HAVING',
        'Subconsultas escalares e correlacionadas, incluindo NOT EXISTS',
        'Modelo relacional normalizado e documentado',
      ],
      equipe: 'Projeto em equipe de 3 alunos',
      galeria: [
        { imagem: require('@/assets/images/projetos/banco-de-dados.png'), legenda: 'Banco de dados relacional' },
        { imagem: require('@/assets/images/projetos/concessionaria/modelo-relacional.jpg'), legenda: 'Modelo relacional do sistema' },
      ],
      links: [
        { rotulo: 'Código', url: 'https://github.com/MarcelocAraujo/projeto-concessionaria-banco-de-dados', tipo: 'codigo' },
      ],
    },
  },
  {
    imagem: require('@/assets/images/projetos/socios/capa.jpg'),
    enquadramento: 'cover',
    categoria: 'Orientação a Objetos',
    titulo: 'Cadastro de Sócios',
    descricao:
      'Sistema em Java para gerenciar os sócios e as categorias do Clube Náutico Capibaribe.',
    stack: ['Java', 'POO', 'Threads', 'Serialização'],
    detalhes: {
      contexto: 'Programação Orientada a Objetos · UNICAP',
      sobre: [
        'Sistema de gestão de sócios do Clube Náutico Capibaribe, executado no terminal. O administrador cadastra, edita, exclui e lista sócios e gerencia as categorias oficiais do clube. O sócio entra pelo CPF para ver os seus dados, atualizar informações e consultar os benefícios da categoria.',
        'O projeto aplica na prática os pilares da orientação a objetos, com persistência dos dados em arquivo e salvamento automático em segundo plano.',
      ],
      destaques: [
        'Herança, abstração, polimorfismo e encapsulamento',
        'Padrão Singleton no serviço central do sistema',
        'Thread daemon que salva os dados periodicamente',
        'Persistência por serialização em arquivos .dat',
        'Exceções personalizadas e validação de CPF',
      ],
      equipe: 'Projeto em equipe de 4 alunos',
      galeria: [
        { imagem: require('@/assets/images/projetos/socios/capa.jpg'), legenda: 'Menu principal e menu do administrador' },
        { imagem: require('@/assets/images/projetos/socios/categorias.jpg'), legenda: 'Categorias oficiais do clube' },
      ],
      links: [{ rotulo: 'Código', url: 'https://github.com/joaodafontequeiroz/gestao-socios-cnc', tipo: 'codigo' }],
    },
  },
  {
    imagem: require('@/assets/images/projetos/carrinho.jpeg'),
    enquadramento: 'cover',
    categoria: 'Hardware',
    titulo: 'Robótica',
    descricao: 'Protótipo de robô móvel desenvolvido com Arduino UNO para a cadeira de Robótica.',
    stack: ['Arduino', 'C++', 'Hardware'],
    detalhes: {
      contexto: 'Robótica · UNICAP',
      sobre: [
        'Protótipo de robô móvel de duas rodas montado do zero e programado em C++ para o Arduino UNO.',
        'O chassi é uma placa de MDF cortada a laser. Nela ficam o Arduino, a ponte H que controla os motores e, na frente, um sensor ultrassônico preso em um suporte impresso em 3D, que mede a distância até os obstáculos.',
      ],
      destaques: [
        'Chassi em MDF cortado a laser',
        'Arduino UNO como controlador',
        'Ponte H L298N acionando dois motores DC com rodas',
        'Sensor ultrassônico HC-SR04 em suporte impresso em 3D',
        'Ligações com jumpers e alimentação externa',
      ],
      galeria: [{ imagem: require('@/assets/images/projetos/carrinho.jpeg'), legenda: 'Robô montado' }],
      links: [],
    },
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
