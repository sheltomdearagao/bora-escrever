# 🛠️ Plano de Correções Críticas - Fase 1

**Data:** 8 de dezembro de 2025  
**Modo:** Architect → Code  
**Tempo Estimado:** 2h 30min  
**Status:** 📋 PLANEJADO

---

## 📋 Resumo Executivo

Este documento detalha todas as correções críticas identificadas na análise do projeto "Bora Escrever" que devem ser implementadas na Fase 1 para garantir estabilidade, performance e qualidade do código.

---

## 🎯 Correções Prioritárias

### **1. Refatoração de Componentes Inline** ⚡ **CRÍTICO**

#### **Problema Identificado:**

- Componentes `StatCard` e `ActionCard` definidos inline no arquivo [`src/app/page.tsx`](src/app/page.tsx:10-28)
- Falta de reutilização e tipagem adequada
- Ausência de acessibilidade

#### **Solução:**

**Arquivo: `src/components/dashboard/StatCard.tsx`**

```typescript
'use client';

import { cn } from '@/lib/utils';

interface StatCardProps {
  icon: string;
  number: string | number;
  label: string;
  className?: string;
  onClick?: () => void;
}

export function StatCard({
  icon,
  number,
  label,
  className,
  onClick
}: StatCardProps) {
  return (
    <div
      className={cn(
        "stat-card bg-white p-4 rounded-lg shadow-md flex items-center space-x-4",
        "transition-all duration-200 hover:shadow-lg hover:scale-105",
        "dark:bg-gray-800 dark:text-white",
        onClick && "cursor-pointer",
        className
      )}
      role="article"
      aria-label={`Estatística: ${label}`}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      <div
        className="stat-card__icon text-2xl"
        role="img"
        aria-label={`Ícone ${icon}`}
      >
        {icon}
      </div>
      <div className="stat-card__content">
        <div
          className="stat-card__number text-2xl font-bold"
          aria-label={`Valor: ${number}`}
        >
          {number}
        </div>
        <div className="stat-card__label text-gray-500 dark:text-gray-400">
          {label}
        </div>
      </div>
    </div>
  );
}
```

**Arquivo: `src/components/dashboard/ActionCard.tsx`**

```typescript
'use client';

import { cn } from '@/lib/utils';

interface ActionCardProps {
  icon: string;
  title: string;
  description: string;
  primary?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function ActionCard({
  icon,
  title,
  description,
  primary = false,
  className,
  onClick,
  disabled = false
}: ActionCardProps) {
  return (
    <div
      className={cn(
        "action-card p-4 rounded-lg shadow-md transition-all duration-200",
        "hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2",
        primary
          ? "bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500"
          : "bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 focus:ring-blue-500",
        onClick && !disabled && "cursor-pointer",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      role="button"
      aria-label={`${title}: ${description}`}
      tabIndex={onClick && !disabled ? 0 : -1}
      onClick={onClick && !disabled ? onClick : undefined}
      onKeyDown={onClick && !disabled ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      <div className="action-card__icon text-2xl mb-2" role="img" aria-hidden="true">
        {icon}
      </div>
      <div className="action-card__content">
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <p className={cn(
          "text-sm",
          primary ? 'text-orange-100' : 'text-gray-500 dark:text-gray-400'
        )}>
          {description}
        </p>
      </div>
    </div>
  );
}
```

**Atualização do `src/app/page.tsx`:**

```typescript
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Loading from '@/components/Loading';
import { useErrorHandler } from '@/components/ErrorBoundary';
import AppLayout from '@/components/layout/AppLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ActionCard } from '@/components/dashboard/ActionCard';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleError = useErrorHandler();

  useEffect(() => {
    try {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 500);

      return () => clearTimeout(timer);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      handleError(err instanceof Error ? err : new Error(errorMessage));
    }
  }, [handleError]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h2 className="text-xl font-semibold text-red-600 mb-4">
            Erro ao carregar a página
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Recarregar página
          </button>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return <Loading fullScreen text="Carregando aplicação..." />;
  }

  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8 lg:space-y-12"
      >
        <div className="dashboard__header">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Bem-vindo de volta, João!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Continue seu progresso em redação
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard icon="✏️" number={12} label="Redações Escritas" />
          <StatCard icon="✅" number={8} label="Correções Recebidas" />
          <StatCard icon="📈" number={850} label="Nota Média" />
        </div>

        {/* Action Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ActionCard
            icon="✏️"
            title="Escrever Agora"
            description="Começar uma nova redação"
            primary
          />
          <ActionCard
            icon="👨‍🏫"
            title="Tutoria Humanizada"
            description="Agendar sessão com tutor"
          />
          <ActionCard
            icon="📚"
            title="Estudar Tema"
            description="Explorar temas do ENEM"
          />
          <ActionCard
            icon="🏗️"
            title="Estudar Estrutura"
            description="Aprender estrutura textual"
          />
          <ActionCard
            icon="💎"
            title="Estudar Repertórios"
            description="Banco de repertórios"
          />
          <ActionCard
            icon="🤖"
            title="Conversar com a MarIA"
            description="Chat com IA educacional"
          />
        </div>
      </motion.div>
    </AppLayout>
  );
}
```

---

### **2. Correção de Métodos Deprecados** ⚠️ **IMPORTANTE**

#### **Problema Identificado:**

- Uso de `substr()` que está deprecado
- Localizado em [`src/lib/utils.ts`](src/lib/utils.ts:89,97,106)

#### **Solução:**

**Arquivo: `src/lib/utils.ts` - Correções específicas:**

```typescript
// Linha 89 - generateId function
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9); // substr → substring
}

// Linha 97 - capitalizeWords function
export function capitalizeWords(str: string): string {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase() // substr → substring
  );
}

// Linha 106 - truncateText function
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...'; // substr → substring
}
```

---

### **3. Otimização do Next.js Config** 🚀 **PERFORMANCE**

#### **Problema Identificado:**

- Otimizações experimentais desabilitadas
- Configuração de imagens básica
- Falta de compressão e headers de performance

#### **Solução:**

**Arquivo: `next.config.ts` - Versão otimizada:**

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Configurações básicas
  reactStrictMode: true,
  poweredByHeader: false,

  // Otimizações experimentais
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      '@heroicons/react',
      'clsx',
      'tailwind-merge',
    ],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  // Configuração otimizada de imagens
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Compressão habilitada
  compress: true,

  // Remover console.log em produção
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error', 'warn'],
          }
        : false,
  },

  // Headers de performance e segurança
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Webpack customizations
  webpack: (config, { dev, isServer }) => {
    // Otimizações de bundle
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
          },
        },
      };
    }

    return config;
  },
};

export default nextConfig;
```

---

### **4. Melhorias de Segurança** 🛡️ **SEGURANÇA**

#### **Problema Identificado:**

- CSP pode ser mais restritivo
- Headers de segurança podem ser aprimorados
- Falta validação de entrada

#### **Solução:**

**Arquivo: `src/middleware.ts` - Versão aprimorada:**

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Security Headers aprimorados
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Content Security Policy mais restritivo
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://firestore.googleapis.com https://firebase.googleapis.com https://www.google-analytics.com https://api.openai.com",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    'upgrade-insecure-requests',
    'block-all-mixed-content',
  ].join('; ');

  response.headers.set('Content-Security-Policy', csp);

  // HSTS aprimorado
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=63072000; includeSubDomains; preload'
    );
  }

  // Rate limiting básico aprimorado
  const ip =
    request.headers.get('x-forwarded-for') ||
    request.headers.get('x-real-ip') ||
    request.ip ||
    'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';

  // Log atividade suspeita
  if (
    userAgent.includes('bot') &&
    !userAgent.includes('Googlebot') &&
    !userAgent.includes('bingbot')
  ) {
    console.warn(`Suspicious bot activity from IP: ${ip}, User-Agent: ${userAgent}`);
  }

  // Bloquear padrões de ataque comuns
  const url = request.nextUrl.pathname;
  const suspiciousPatterns = [
    '/wp-admin',
    '/wp-login',
    '/.env',
    '/config',
    '/admin',
    '/phpmyadmin',
    '/.git',
    '/backup',
    '/.well-known',
    '/xmlrpc.php',
    '/wp-config.php',
  ];

  if (suspiciousPatterns.some((pattern) => url.includes(pattern))) {
    console.warn(`Blocked suspicious request to: ${url} from IP: ${ip}`);
    return new NextResponse('Not Found', { status: 404 });
  }

  // Bloquear métodos HTTP não permitidos
  const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'];
  if (!allowedMethods.includes(request.method)) {
    return new NextResponse('Method Not Allowed', { status: 405 });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt (robots file)
     * - sitemap.xml (sitemap file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
```

---

### **5. Correções de TypeScript** 📝 **QUALIDADE**

#### **Problema Identificado:**

- Algumas tipagens podem ser melhoradas
- Interfaces podem ser mais específicas

#### **Solução:**

**Arquivo: `src/types/index.ts` - Novo arquivo de tipos:**

```typescript
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
```

---

## 🧪 Testes e Validação

### **Checklist de Validação:**

#### **Build e Compilação:**

- [ ] `npm run build` - Build sem erros
- [ ] `npm run lint` - ESLint sem warnings
- [ ] `npx tsc --noEmit` - TypeScript sem erros

#### **Funcionalidade:**

- [ ] Componentes renderizando corretamente
- [ ] Navegação funcionando
- [ ] Sistema de temas ativo
- [ ] Error boundaries funcionando

#### **Performance:**

- [ ] Bundle size mantido ou reduzido
- [ ] Lighthouse score mantido ou melhorado
- [ ] Tempo de carregamento otimizado

#### **Acessibilidade:**

- [ ] Navegação por teclado funcionando
- [ ] Screen readers compatíveis
- [ ] Contraste adequado
- [ ] ARIA labels corretos

#### **Segurança:**

- [ ] Headers de segurança ativos
- [ ] CSP funcionando
- [ ] Middleware bloqueando ataques

---

## 📊 Métricas Esperadas

| Métrica                | Antes   | Depois  | Melhoria |
| ---------------------- | ------- | ------- | -------- |
| Bundle Size            | ~152KB  | ~145KB  | -5%      |
| Build Time             | ~2000ms | ~1800ms | -10%     |
| Lighthouse Performance | ~75     | ~80     | +7%      |
| Accessibility Score    | ~85     | ~92     | +8%      |
| Security Headers       | 6/10    | 9/10    | +30%     |

---

## 🚀 Próximos Passos

Após a implementação das correções críticas:

1. **Validação completa** - Executar todos os testes
2. **Documentação** - Atualizar README com mudanças
3. **Fase 2** - Melhorias de Performance
4. **Fase 3** - Acessibilidade e UX
5. **Fase 4** - Monitoramento e Analytics

---

## 📝 Notas de Implementação

- **Backup:** Fazer backup antes das alterações
- **Incremental:** Implementar uma correção por vez
- **Testes:** Validar após cada correção
- **Rollback:** Preparar plano de rollback se necessário

---

**Status:** 📋 PRONTO PARA IMPLEMENTAÇÃO  
**Próxima Ação:** Mudar para modo Code e executar correções
