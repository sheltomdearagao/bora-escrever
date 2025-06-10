# 🎯 Plataforma de Tutoria em Redação ENEM - Plano Detalhado

## 📋 Visão Geral do Projeto

**Objetivo:** Desenvolver uma plataforma integrada de tutoria personalizada em Redação ENEM dentro do "Bora Escrever", conectando estudantes com professores especialistas nas 5 Competências do ENEM.

**Tecnologias Base:** Next.js 15, React 19, TypeScript, Tailwind CSS, Firebase, Framer Motion

**Foco Especializado:** Todos os tutores são professores de Redação ENEM, especializados em uma, duas ou três das 5 Competências.

---

## 📚 AS 5 COMPETÊNCIAS DO ENEM

### Detalhamento das Competências:

1. **Competência 1:** Demonstrar domínio da modalidade escrita formal da língua portuguesa
2. **Competência 2:** Compreender a proposta de redação e aplicar conceitos das várias áreas de conhecimento
3. **Competência 3:** Selecionar, relacionar, organizar e interpretar informações, fatos, opiniões e argumentos
4. **Competência 4:** Demonstrar conhecimento dos mecanismos linguísticos necessários para a construção da argumentação
5. **Competência 5:** Elaborar proposta de intervenção para o problema abordado

---

## 🏗️ Arquitetura do Sistema

```
Bora Escrever - App Principal
└── Módulo Tutoria (/tutoria)
    ├── Lista de Tutores
    │   ├── Busca e Filtros por Competência
    │   ├── Cards de Tutores Especializados
    │   └── Avaliações por Competência
    ├── Perfis Detalhados
    │   ├── Competências Especializadas
    │   ├── Experiência ENEM
    │   ├── Metodologia por Competência
    │   └── Estatísticas de Alunos
    ├── Sistema de Agendamento
    │   ├── Calendário Integrado
    │   ├── Seleção por Competência
    │   └── Tipos de Sessão
    ├── Dashboard Administrativo
    │   ├── Visão Geral
    │   ├── Gestão de Agenda
    │   ├── Correções Pendentes
    │   ├── Estatísticas por Competência
    │   └── Controle Financeiro
    ├── Sistema de Pagamento
    │   ├── Por Sessão/Correção
    │   ├── Pacotes por Competência
    │   └── Planos Mensais
    ├── Chat e Videoconferência
    │   ├── Chat Pré-Sessão
    │   ├── Compartilhamento de Redações
    │   └── Videoconferência Integrada
    └── Sistema de Notificações
        ├── Lembretes de Sessão
        ├── Correções Disponíveis
        └── Progresso por Competência
```

---

## 🗄️ Estrutura de Dados

### Modelo de Tutor Especializado

```typescript
interface TutorRedacao {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  foto: string;
  titulo: string; // Ex: "Especialista em Redação ENEM"
  bio: string;

  // ESPECIALIZAÇÃO EM COMPETÊNCIAS
  competenciasEspecializadas: {
    competencia1: boolean; // Norma padrão
    competencia2: boolean; // Compreensão da proposta
    competencia3: boolean; // Argumentação
    competencia4: boolean; // Coesão e coerência
    competencia5: boolean; // Proposta de intervenção
  };

  // EXPERIÊNCIA ESPECÍFICA
  experienciaRedacao: number; // anos ensinando redação
  experienciaEnem: number; // anos preparando para ENEM
  redacoesCorrigidas: number; // total de redações já corrigidas
  notaMediaAlunos: number; // média das notas dos alunos

  // METODOLOGIA
  metodologiaEnsino: string;
  especialidadesTematicas: string[]; // Ex: ["Meio Ambiente", "Tecnologia", "Sociedade"]

  // FORMAÇÃO
  formacao: string[];
  certificacoesEnem: string[];

  // DISPONIBILIDADE E VALORES
  valorHora: number;
  valorCorrecao: number; // valor por correção de redação
  valorPacote?: {
    tipo: 'mensal' | 'bimestral' | 'semestral';
    sessoes: number;
    correcoes: number;
    valor: number;
    desconto: number;
  };

  disponibilidade: {
    [dia: string]: {
      inicio: string;
      fim: string;
      intervalos?: string[];
    };
  };

  // AVALIAÇÕES ESPECÍFICAS
  avaliacoes: {
    media: number;
    total: number;
    porCompetencia: {
      competencia1: number;
      competencia2: number;
      competencia3: number;
      competencia4: number;
      competencia5: number;
    };
  };

  // STATUS E CONFIGURAÇÕES
  ativo: boolean;
  verificado: boolean; // tutor verificado pela plataforma
  premium: boolean; // tutor premium
  criadoEm: Date;
  atualizadoEm: Date;
}
```

### Modelo de Sessão Especializada

```typescript
interface SessaoRedacao {
  id: string;
  tutorId: string;
  estudanteId: string;
  dataHora: Date;
  duracao: number;

  // TIPO DE SESSÃO
  tipoSessao: 'orientacao' | 'correcao' | 'pratica' | 'revisao';

  // FOCO DA SESSÃO
  competenciasFoco: {
    competencia1: boolean;
    competencia2: boolean;
    competencia3: boolean;
    competencia4: boolean;
    competencia5: boolean;
  };

  // CONTEÚDO
  temaRedacao?: string;
  redacaoAnexada?: string; // URL do arquivo
  observacoesEstudante: string;

  // CORREÇÃO E FEEDBACK
  correcaoDetalhada?: {
    notaGeral: number;
    notasPorCompetencia: {
      competencia1: number;
      competencia2: number;
      competencia3: number;
      competencia4: number;
      competencia5: number;
    };
    comentarios: {
      pontosForts: string[];
      pontosAMelhorar: string[];
      sugestoes: string[];
    };
    redacaoCorrigida?: string; // URL do arquivo corrigido
  };

  status: 'agendada' | 'confirmada' | 'em_andamento' | 'concluida' | 'cancelada';
  valor: number;
  pagamentoId?: string;
  linkVideoconferencia?: string;

  avaliacaoEstudante?: {
    nota: number;
    comentario: string;
    competenciasAvaliadas: {
      competencia1: number;
      competencia2: number;
      competencia3: number;
      competencia4: number;
      competencia5: number;
    };
  };

  criadaEm: Date;
  atualizadaEm: Date;
}
```

---

## 📁 Estrutura de Arquivos

```
src/app/tutoria/
├── page.tsx                           # Lista de tutores de redação
├── buscar/page.tsx                    # Busca por competências específicas
├── perfil/[id]/page.tsx              # Perfil do tutor com competências
├── agendar/[id]/page.tsx             # Agendamento com foco em competências
├── minhas-sessoes/page.tsx           # Histórico de sessões
├── sala/[id]/page.tsx                # Sala de videoconferência
├── correcao/[id]/page.tsx            # Visualização de correção detalhada
└── dashboard/
    ├── estudante/
    │   ├── page.tsx                  # Dashboard do estudante
    │   ├── progresso/page.tsx        # Progresso por competência
    │   └── redacoes/page.tsx         # Histórico de redações
    └── tutor/
        ├── page.tsx                  # Dashboard principal do tutor
        ├── agenda/page.tsx           # Gestão de agenda
        ├── sessoes/page.tsx          # Gestão de sessões
        ├── correcoes/page.tsx        # Fila de correções
        ├── estatisticas/page.tsx     # Estatísticas e performance
        ├── financeiro/page.tsx       # Gestão financeira
        ├── perfil/page.tsx           # Edição de perfil
        └── configuracoes/page.tsx    # Configurações gerais

src/components/tutoria/
├── TutorCard.tsx                     # Card do tutor na listagem
├── TutorProfile.tsx                  # Perfil completo do tutor
├── CompetenciasBadges.tsx            # Badges das 5 competências
├── NotasPorCompetencia.tsx           # Gráfico radar das notas
├── ProgressoRedacao.tsx              # Evolução nas competências
├── CalendarPicker.tsx                # Seletor de data
├── TimeSlotSelector.tsx              # Seletor de horário
├── CorrecaoInterface.tsx             # Interface de correção para tutores
├── RubricaEnem.tsx                   # Sistema de pontuação ENEM
├── TemaRedacao.tsx                   # Seletor de temas para prática
├── FeedbackStructured.tsx            # Feedback estruturado
├── PaymentForm.tsx                   # Formulário de pagamento
├── ChatInterface.tsx                 # Interface de chat
├── NotificationCenter.tsx            # Central de notificações
├── DashboardTutor.tsx                # Dashboard administrativo completo
├── AgendaManager.tsx                 # Gestão de agenda do tutor
├── FinanceiroTutor.tsx               # Controle financeiro
├── SessionCard.tsx                   # Card de sessão
├── RatingStars.tsx                   # Componente de avaliação
└── AvailabilitySchedule.tsx          # Grade de disponibilidade

src/contexts/
└── TutoriaContext.tsx                # Contexto da tutoria
```

---

## 📅 Cronograma de Desenvolvimento

### FASE 1: Lista de Tutores + Dashboard Admin (Semana 1-3)

#### 1.1 Lista de Tutores Especializada

- **Filtros específicos:** Por competência, experiência ENEM, nota média dos alunos
- **Cards especializados:** Mostrando competências, experiência ENEM, redações corrigidas
- **Badges:** Competências especializadas, tutor verificado, premium
- **Busca avançada:** Por competência específica, metodologia, temas

#### 1.2 Dashboard Administrativo para Tutores

**Funcionalidades do Dashboard:**

- **Visão Geral:**

  - Sessões do mês
  - Redações corrigidas
  - Receita mensal
  - Avaliação média

- **Gestão de Agenda:**

  - Próximas sessões
  - Disponibilidade
  - Reagendamentos
  - Bloqueios de horário

- **Correções Pendentes:**

  - Fila de correções
  - Correções urgentes (>48h)
  - Interface de correção
  - Histórico de correções

- **Estatísticas:**

  - Performance por competência
  - Evolução mensal
  - Comparativo com outros tutores
  - Feedback dos alunos

- **Financeiro:**
  - Saldo disponível
  - Próximo pagamento
  - Histórico de pagamentos
  - Relatórios fiscais

#### 1.3 Perfil Detalhado Especializado

- **Competências em destaque:** Visual claro das especializações
- **Estatísticas ENEM:** Nota média dos alunos, redações corrigidas
- **Metodologia específica:** Como trabalha cada competência
- **Casos de sucesso:** Depoimentos focados em melhoria nas competências
- **Vídeo de apresentação:** Explicando metodologia
- **Certificações:** Validações específicas para ENEM

### FASE 2: Sistema de Agendamento + Correção (Semana 4-5)

#### 2.1 Agendamento Especializado

- **Seleção de foco:** Estudante escolhe quais competências quer trabalhar
- **Tipos de sessão:**
  - Orientação geral
  - Correção ao vivo
  - Prática dirigida
  - Revisão de redação
- **Upload de redação:** Para sessões de correção
- **Objetivos específicos:** O que o estudante quer melhorar
- **Preparação:** Materiais necessários, temas sugeridos

#### 2.2 Sistema de Correção Integrado

- **Interface de correção:** Para tutores corrigirem redações
- **Rubrica ENEM:** Sistema de pontuação por competência (0-200 pontos cada)
- **Comentários estruturados:**
  - Pontos fortes
  - Pontos a melhorar
  - Sugestões específicas
  - Exemplos práticos
- **Redação anotada:** Marcações diretas no texto
- **Comparativo:** Evolução entre redações
- **Banco de comentários:** Templates para agilizar correções

### FASE 3: Sistema de Pagamento + Pacotes (Semana 6-7)

#### 3.1 Modalidades de Pagamento

- **Por sessão:** Valor individual por tipo de sessão
- **Por correção:** Apenas correção de redação (sem videoconferência)
- **Pacotes mensais:** X sessões + Y correções com desconto
- **Planos por competência:** Foco em competências específicas
- **Pacotes intensivos:** Preparação para ENEM (últimos meses)

#### 3.2 Sistema de Pagamento

- **Gateways:** Stripe, PayPal, PIX
- **Parcelamento:** Opções de parcelamento
- **Créditos:** Sistema de créditos pré-pagos
- **Reembolso:** Política clara de reembolso
- **Split:** Divisão automática plataforma/tutor

### FASE 4: Chat + Videoconferência (Semana 8-9)

#### 4.1 Chat Especializado

- **Compartilhamento de redações:** Upload direto no chat
- **Templates de feedback:** Respostas rápidas para tutores
- **Histórico por competência:** Organização das conversas
- **Notificações:** Alertas de novas mensagens
- **Busca:** Busca no histórico de conversas

#### 4.2 Videoconferência Integrada

- **Compartilhamento de tela:** Para correção ao vivo
- **Gravação de sessões:** Para revisão posterior (opcional)
- **Quadro virtual:** Para explicações visuais
- **Chat durante sessão:** Mensagens durante videoconferência
- **Qualidade adaptativa:** Ajuste automático de qualidade

### FASE 5: Notificações + Analytics (Semana 10-11)

#### 5.1 Notificações Específicas

- **Para Estudantes:**

  - Lembrete de sessão (24h, 1h, 15min)
  - Correção disponível
  - Progresso em competência
  - Metas atingidas
  - Novas mensagens

- **Para Tutores:**
  - Nova sessão agendada
  - Correção pendente
  - Pagamento recebido
  - Avaliação recebida
  - Lembretes de disponibilidade

#### 5.2 Analytics Avançado

- **Para Estudantes:**

  - Progresso por competência (gráfico radar)
  - Evolução das notas
  - Comparativo com meta ENEM
  - Tempo médio de melhoria
  - Recomendações personalizadas

- **Para Tutores:**
  - Performance por competência
  - Taxa de retenção
  - Satisfação dos alunos
  - Receita por período
  - Comparativo com outros tutores

---

## 🎨 Design System

### Paleta de Cores Específica

```css
/* Cores específicas para tutoria */
--tutoria-primary: #3b82f6; /* Azul principal */
--tutoria-secondary: #f97316; /* Laranja destaque */
--tutoria-success: #10b981; /* Verde sucesso */
--tutoria-warning: #f59e0b; /* Amarelo aviso */
--tutoria-error: #ef4444; /* Vermelho erro */
--tutoria-info: #06b6d4; /* Ciano informação */

/* Cores por competência */
--comp1-color: #8b5cf6; /* Roxo - Norma Padrão */
--comp2-color: #06b6d4; /* Ciano - Compreensão */
--comp3-color: #10b981; /* Verde - Argumentação */
--comp4-color: #f59e0b; /* Amarelo - Coesão */
--comp5-color: #ef4444; /* Vermelho - Intervenção */
```

### Componentes Especializados

```typescript
// Componentes específicos para redação ENEM
- CompetenciasBadges: Badges das 5 competências
- NotasPorCompetencia: Gráfico radar das notas
- ProgressoRedacao: Evolução nas competências
- CorrecaoInterface: Interface de correção para tutores
- RubricaEnem: Sistema de pontuação ENEM
- TemaRedacao: Seletor de temas para prática
- FeedbackStructured: Feedback estruturado
- DashboardTutor: Dashboard administrativo completo
- AgendaManager: Gestão de agenda do tutor
- FinanceiroTutor: Controle financeiro
```

---

## 📊 Métricas e KPIs

### Para Estudantes:

- **Evolução por competência:** Gráfico radar mostrando progresso
- **Nota média vs. meta ENEM:** Comparativo com objetivo
- **Redações corrigidas no mês:** Quantidade de prática
- **Tempo médio de melhoria:** Por competência
- **Taxa de acerto por tema:** Performance em diferentes temas
- **Consistência:** Variação entre redações

### Para Tutores:

- **Sessões realizadas por competência:** Volume de trabalho
- **Nota média dos alunos:** Eficácia do ensino
- **Taxa de retenção de estudantes:** Satisfação
- **Receita por competência:** Performance financeira
- **Avaliação por tipo de sessão:** Qualidade do serviço
- **Tempo médio de correção:** Eficiência

### Para a Plataforma:

- **Matching tutor-estudante por competência:** Eficácia do algoritmo
- **Competências mais demandadas:** Tendências do mercado
- **Eficácia dos tutores por competência:** Qualidade geral
- **Satisfação geral:** NPS da plataforma
- **Taxa de conversão:** Visitantes para usuários pagantes
- **Retenção mensal:** Churn rate

---

## 🔒 Segurança e Privacidade

### Medidas de Segurança

- ✅ Autenticação Firebase com 2FA
- ✅ Criptografia end-to-end no chat
- ✅ Validação de dados no frontend e backend
- ✅ Rate limiting para APIs
- ✅ Sanitização de uploads de redação
- ✅ HTTPS obrigatório
- ✅ Compliance com LGPD/GDPR
- ✅ Backup automático de dados
- ✅ Monitoramento de segurança

### Privacidade

- ✅ Controle de visibilidade de dados pessoais
- ✅ Opção de anonimização de redações
- ✅ Direito ao esquecimento
- ✅ Consentimento explícito para gravações
- ✅ Auditoria de acesso a dados sensíveis
- ✅ Política de retenção de dados clara

---

## 📱 Responsividade e Acessibilidade

### Breakpoints

- **Mobile:** 320px - 768px (foco em chat e agendamento)
- **Tablet:** 768px - 1024px (dashboard simplificado)
- **Desktop:** 1024px+ (experiência completa)

### Acessibilidade (WCAG 2.1 AA)

- ✅ Contraste adequado (mínimo 4.5:1)
- ✅ Navegação por teclado completa
- ✅ Screen reader support
- ✅ ARIA labels descritivos
- ✅ Focus indicators visíveis
- ✅ Texto alternativo para gráficos
- ✅ Legendas para vídeos
- ✅ Tamanho mínimo de toque (44px)

---

## 🚀 Funcionalidades Avançadas (Futuras)

### Gamificação Específica para Redação

- **Sistema de pontos:** Por melhoria em cada competência
- **Badges de conquista:** "Mestre da Competência 1", "Corretor Dedicado"
- **Rankings:** Melhores alunos por competência
- **Desafios semanais:** Temas específicos para prática
- **Programa de fidelidade:** Descontos por frequência

### IA e Automação

- **Matching inteligente:** Algoritmo que conecta tutor ideal ao estudante
- **Sugestões de horários:** Baseado em histórico e preferências
- **Análise de performance:** Identificação automática de pontos fracos
- **Pré-correção IA:** Primeira análise automática antes do tutor
- **Chatbot especializado:** Suporte técnico e dúvidas básicas

### Integrações Educacionais

- **Google Workspace for Education:** Sincronização de calendários
- **Microsoft Teams:** Videoconferências alternativas
- **Zoom/Meet nativo:** Integração direta
- **Redes sociais:** Compartilhamento de conquistas
- **Sistemas de gestão escolar:** Integração com escolas parceiras
- **Banco de temas ENEM:** Acesso a temas oficiais históricos

---

## 💰 Modelo de Negócio

### Estrutura de Preços Sugerida

#### Para Estudantes:

- **Sessão avulsa (1h):** R$ 80-120
- **Correção simples:** R$ 25-35
- **Pacote mensal:** 4 sessões + 8 correções = R$ 280-350
- **Pacote intensivo ENEM:** 8 sessões + 16 correções = R$ 500-650

#### Para Tutores:

- **Taxa da plataforma:** 20-25% por transação
- **Plano premium tutor:** R$ 49/mês (taxa reduzida para 15%)
- **Ferramentas avançadas:** Incluídas no plano premium

#### Receitas Adicionais:

- **Certificações:** Cursos para tutores (R$ 200-500)
- **Material didático:** Banco de temas e exercícios (R$ 29/mês)
- **Relatórios avançados:** Analytics premium (R$ 19/mês)

---

## 🎯 Próximos Passos

### Implementação Imediata:

1. **Configurar estrutura base** da aplicação tutoria
2. **Criar componentes fundamentais** (TutorCard, CompetenciasBadges)
3. **Implementar lista de tutores** com filtros por competência
4. **Desenvolver dashboard administrativo** básico para tutores
5. **Integrar sistema de temas** existente com novos componentes

### Validação:

- **Testes com tutores reais** de redação ENEM
- **Feedback de estudantes** sobre interface e funcionalidades
- **Validação do modelo de preços** com mercado
- **Testes de performance** com múltiplos usuários simultâneos

### Lançamento:

- **Beta fechado** com 10 tutores e 50 estudantes
- **Coleta de feedback** e ajustes
- **Lançamento público** com marketing direcionado
- **Expansão gradual** de funcionalidades

---

## 📞 Suporte e Manutenção

### Suporte Técnico:

- **Chat 24/7** para questões técnicas
- **Base de conhecimento** com tutoriais
- **Vídeos explicativos** para tutores e estudantes
- **FAQ específico** para redação ENEM

### Manutenção:

- **Updates semanais** de correções
- **Releases mensais** de novas funcionalidades
- **Backup diário** de dados
- **Monitoramento 24/7** de performance

---

_Este plano será implementado de forma iterativa, com releases incrementais e feedback contínuo dos usuários para garantir a melhor experiência possível na plataforma de tutoria em Redação ENEM._
