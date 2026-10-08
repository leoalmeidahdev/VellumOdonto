/*
 * Conteúdo do site em um só lugar.
 *
 * Itens marcados com PROVISÓRIO são exemplos: troque pelos dados reais da
 * clínica antes de publicar (o CFO exige nome e CRO do responsável técnico
 * em toda divulgação, e números/depoimentos precisam ser verdadeiros).
 */

// Cópias otimizadas (WebP) das imagens do briefing original, servidas de /public.
export const HERO_IMAGE = '/images/hero.webp';
export const SECTION2_IMAGE = '/images/s2.webp';
export const SECTION3_IMG1 = '/images/s3a.webp';
export const SECTION3_IMG1_SM = '/images/s3a-sm.webp';
export const SECTION3_IMG2 = '/images/s3b.webp';
export const SECTION3_IMG2_SM = '/images/s3b-sm.webp';
export const SECTION3_BG = '/images/s3bg.webp';
export const SECTION3_BG_SM = '/images/s3bg-sm.webp';

export const navLinks = [
  { label: 'Tratamentos', href: '#tratamentos' },
  { label: 'Sorrisos', href: '#sorrisos' },
  { label: 'Implantes', href: '#implantes' },
  { label: 'Jornada', href: '#jornada' },
  { label: 'Contato', href: '#contato' },
];

export const featureBars = ['Odontologia avançada', 'Tecnologia de precisão', 'Equipe acolhedora'];

export const services = [
  { name: 'Lentes de\ncontato', num: '01' },
  { name: 'Coroas\ndentárias', num: '02' },
  { name: 'Clareamento\ndental', num: '03' },
  { name: 'Implantes\ndentários', num: null },
];

export const marqueeItems = [
  'Lentes de contato dental',
  'Implantes',
  'Clareamento',
  'Alinhadores invisíveis',
  'Coroas em porcelana',
  'Prevenção',
];

// PROVISÓRIO: números de exemplo.
export const stats = [
  { value: 15, prefix: '+', suffix: '', label: 'anos de experiência clínica', bar: 0.75 },
  { value: 4800, prefix: '+', suffix: '', label: 'sorrisos transformados', bar: 0.88 },
  { value: 98, prefix: '', suffix: '%', label: 'dos pacientes nos recomendam', bar: 0.98 },
];

export type TreatmentIcon = 'veneer' | 'whitening' | 'implant' | 'aligner' | 'crown' | 'prevention';

export const treatments: { icon: TreatmentIcon; tag: string; title: string; text: string; light?: boolean }[] = [
  {
    icon: 'veneer',
    tag: 'Estética',
    title: 'Lentes de contato dental',
    text: 'Lâminas ultrafinas de porcelana que corrigem cor, forma e alinhamento com o mínimo de desgaste.',
  },
  {
    icon: 'whitening',
    tag: 'Estética',
    title: 'Clareamento dental',
    text: 'Protocolos de consultório e caseiro supervisionado para um branco natural e uniforme.',
    light: true,
  },
  {
    icon: 'implant',
    tag: 'Reabilitação',
    title: 'Implantes dentários',
    text: 'Reposição de dentes com implantes de titânio e coroas que devolvem função e estética.',
  },
  {
    icon: 'aligner',
    tag: 'Ortodontia',
    title: 'Alinhadores invisíveis',
    text: 'Ortodontia transparente planejada em 3D, sem bráquetes metálicos e com trocas programadas.',
  },
  {
    icon: 'crown',
    tag: 'Restauração',
    title: 'Coroas e restaurações',
    text: 'Cerâmicas e resinas que imitam a translucidez do dente natural, feitas sob medida.',
    light: true,
  },
  {
    icon: 'prevention',
    tag: 'Prevenção',
    title: 'Limpeza e check-up',
    text: 'Profilaxia, avaliação periódica e orientação para manter o sorriso saudável por muito mais tempo.',
  },
];

export const journey = [
  {
    title: 'Primeira consulta',
    text: 'Conversamos sobre o que você deseja, fazemos exame clínico completo, fotografias e escaneamento intraoral 3D — sem moldagens desconfortáveis.',
    tags: ['Escuta', 'Escaneamento 3D', 'Fotos'],
  },
  {
    title: 'Planejamento digital',
    text: 'Com os dados do seu sorriso, desenhamos o resultado no computador. Você vê a proposta antes de começar e decide com segurança.',
    tags: ['Simulação', 'Plano sob medida', 'Orçamento claro'],
  },
  {
    title: 'Tratamento',
    text: 'Sessões pontuais, com anestesia confortável e materiais de alto padrão. Cada etapa é explicada antes de acontecer.',
    tags: ['Conforto', 'Precisão', 'Transparência'],
  },
  {
    title: 'Acompanhamento',
    text: 'Depois do resultado, seguimos juntos: retornos programados, manutenção e orientação para o sorriso durar.',
    tags: ['Retornos', 'Manutenção', 'Suporte'],
  },
];

// PROVISÓRIO: depoimentos de exemplo. Use apenas relatos reais, com autorização do paciente.
export const testimonials = [
  {
    tag: 'Lentes de contato',
    quote: 'Eu escondia o sorriso nas fotos. Hoje é a primeira coisa que as pessoas notam — e ficou tão natural que ninguém acredita.',
    name: 'Mariana A.',
  },
  {
    tag: 'Implantes',
    quote: 'Tinha medo de cirurgia. Me explicaram cada passo e foi muito mais tranquilo do que imaginei. Voltei a comer de tudo.',
    name: 'Roberto L.',
  },
  {
    tag: 'Clareamento',
    quote: 'Resultado bonito, sem aquele branco artificial. O acompanhamento fez toda a diferença na sensibilidade.',
    name: 'Fernanda S.',
  },
  {
    tag: 'Alinhadores',
    quote: 'Corrigi os dentes sem ninguém perceber que eu estava em tratamento. Planejamento impecável do começo ao fim.',
    name: 'Lucas M.',
  },
  {
    tag: 'Check-up',
    quote: 'Atendimento pontual, consultório lindo e uma equipe que realmente se importa. Virei paciente da família toda.',
    name: 'Patrícia R.',
  },
  {
    tag: 'Coroas',
    quote: 'A coroa ficou idêntica aos outros dentes. Atenção aos detalhes que eu nunca tinha visto em outro consultório.',
    name: 'Eduardo T.',
  },
];

// PROVISÓRIO: dados de contato de exemplo.
export const contact = {
  whatsapp: 'https://wa.me/5500000000000',
  phone: '(00) 0000-0000',
  phoneHref: 'tel:+550000000000',
  email: 'contato@vellumodonto.com.br',
  address: 'Rua Exemplo, 123 — Sala 45',
  city: 'Sua cidade — UF',
  hours: 'Seg a sex, 8h às 20h · Sáb, 8h às 13h',
  instagram: 'https://instagram.com/',
  responsible: 'Responsável técnico: Dr(a). Nome Sobrenome — CRO-UF 00000',
};
