// Tipos globais da aplicação

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Essay {
  id: string;
  title: string;
  content: string;
  theme: string;
  score?: number;
  feedback?: string;
  status: 'draft' | 'submitted' | 'corrected';
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Statistics {
  essaysWritten: number;
  correctionsReceived: number;
  averageScore: number;
  improvementRate: number;
}

export interface Theme {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

// Tipos de componentes
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface LoadingProps extends ComponentProps {
  fullScreen?: boolean;
  text?: string;
  size?: 'sm' | 'md' | 'lg';
}

export interface ErrorProps extends ComponentProps {
  error?: Error;
  resetError?: () => void;
  title?: string;
  description?: string;
}

// Tipos de API
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T = unknown> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Tipos de eventos
export interface ActionEvent {
  type: string;
  payload?: unknown;
  timestamp: Date;
}

// Tipos de configuração
export interface AppConfig {
  apiUrl: string;
  environment: 'development' | 'production' | 'test';
  features: {
    darkMode: boolean;
    analytics: boolean;
    notifications: boolean;
  };
}

// Chat types
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

// Maria AI types
export interface MariaConversation {
  id: string;
  userId: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}
