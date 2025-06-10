// Application Constants

export const APP_NAME = 'Bora Escrever';
export const APP_VERSION = '0.2.0';
export const APP_DESCRIPTION = 'Sua plataforma de preparação para o ENEM e vestibulares';

// API Endpoints
export const API_ENDPOINTS = {
  MARIA: {
    CHAT: '/api/maria/chat',
    CORRECTION: '/api/maria/correction',
    REPERTOIRE: '/api/maria/repertoire',
  },
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  AULAS: '/aulas',
  ESCREVER: '/escrever',
  PROGRESSO: '/progresso',
  PROGRESSO_ESTATISTICAS: '/progresso/estatisticas',
  PROGRESSO_CONQUISTAS: '/progresso/conquistas',
  PROGRESSO_HISTORICO: '/progresso/historico',
  CORRECAO: '/correcao',
  MARIA: '/maria',
  CONFIGURACOES: '/configuracoes',
  SOBRE: '/sobre',
  CONTATO: '/contato',
  COMO_FUNCIONA: '/como-funciona',
  TERMOS_DE_USO: '/termos-de-uso',
  POLITICA_PRIVACIDADE: '/politica-de-privacidade',
  LGPD: '/lgpd',
} as const;

// Essay Status
export const ESSAY_STATUS = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  CORRECTED: 'corrected',
} as const;

// Essay Competencies (ENEM)
export const ESSAY_COMPETENCIES = {
  C1: {
    id: 'C1',
    name: 'Domínio da norma culta',
    maxScore: 200,
    description: 'Demonstrar domínio da modalidade escrita formal da língua portuguesa',
  },
  C2: {
    id: 'C2',
    name: 'Compreensão do tema',
    maxScore: 200,
    description:
      'Compreender a proposta de redação e aplicar conceitos das várias áreas de conhecimento',
  },
  C3: {
    id: 'C3',
    name: 'Argumentação',
    maxScore: 200,
    description:
      'Selecionar, relacionar, organizar e interpretar informações, fatos, opiniões e argumentos',
  },
  C4: {
    id: 'C4',
    name: 'Coesão e coerência',
    maxScore: 200,
    description:
      'Demonstrar conhecimento dos mecanismos linguísticos necessários para a construção da argumentação',
  },
  C5: {
    id: 'C5',
    name: 'Proposta de intervenção',
    maxScore: 200,
    description:
      'Elaborar proposta de intervenção para o problema abordado, respeitando os direitos humanos',
  },
} as const;

// Theme Difficulty
export const THEME_DIFFICULTY = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 'theme',
  USER_PREFERENCES: 'userPreferences',
  DRAFT_ESSAY: 'draftEssay',
  CONVERSATION_HISTORY: 'conversationHistory',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  GENERIC: 'Ocorreu um erro inesperado. Por favor, tente novamente.',
  NETWORK: 'Erro de conexão. Verifique sua internet e tente novamente.',
  FIREBASE_INIT: 'Erro ao inicializar Firebase. Verifique as configurações.',
  ESSAY_SAVE: 'Erro ao salvar redação. Tente novamente.',
  ESSAY_LOAD: 'Erro ao carregar redação.',
  API_ERROR: 'Erro ao comunicar com o servidor.',
  VALIDATION: 'Por favor, verifique os dados informados.',
  UNAUTHORIZED: 'Você não tem permissão para acessar este recurso.',
  NOT_FOUND: 'Recurso não encontrado.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  ESSAY_SAVED: 'Redação salva com sucesso!',
  ESSAY_SUBMITTED: 'Redação enviada para correção!',
  PROFILE_UPDATED: 'Perfil atualizado com sucesso!',
  SETTINGS_SAVED: 'Configurações salvas!',
} as const;

// Validation Rules
export const VALIDATION_RULES = {
  ESSAY: {
    MIN_WORDS: 200,
    MAX_WORDS: 350,
    MIN_PARAGRAPHS: 4,
    MAX_PARAGRAPHS: 6,
  },
  TITLE: {
    MIN_LENGTH: 5,
    MAX_LENGTH: 100,
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
} as const;

// Animation Durations (ms)
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Breakpoints
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// Feature Flags
export const FEATURE_FLAGS = {
  DARK_MODE: true,
  ANALYTICS: true,
  NOTIFICATIONS: false,
  SOCIAL_LOGIN: false,
  PREMIUM_FEATURES: false,
} as const;

// Maria AI Configuration
export const MARIA_CONFIG = {
  MODEL: 'gpt-4o-mini',
  TEMPERATURE: 0.7,
  MAX_TOKENS: 1000,
  CORRECTION_MAX_TOKENS: 1500,
  REPERTOIRE_MAX_TOKENS: 1200,
} as const;

// Rate Limiting
export const RATE_LIMITS = {
  API_CALLS_PER_MINUTE: 60,
  ESSAY_SUBMISSIONS_PER_DAY: 5,
  MARIA_CHATS_PER_HOUR: 30,
} as const;

// Cache TTL (seconds)
export const CACHE_TTL = {
  SHORT: 300, // 5 minutes
  MEDIUM: 3600, // 1 hour
  LONG: 86400, // 24 hours
} as const;

export type RouteKey = keyof typeof ROUTES;
export type EssayStatusType = (typeof ESSAY_STATUS)[keyof typeof ESSAY_STATUS];
export type ThemeDifficultyType = (typeof THEME_DIFFICULTY)[keyof typeof THEME_DIFFICULTY];
export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
