# Bora Escrever - Plataforma Educacional

Uma plataforma moderna de preparação para o ENEM e vestibulares, com foco em redação, utilizando IA e tutoria humanizada.

## 🚀 Tecnologias

- **Next.js 15.3.3** - Framework React com App Router
- **React 19** - Biblioteca de interface de usuário
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework de CSS utilitário
- **Framer Motion** - Animações e transições
- **Firebase** - Backend como serviço (Firestore, Analytics)
- **DND Kit** - Drag and drop funcional
- **Lucide React** - Ícones modernos

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta Firebase (opcional, para funcionalidades completas)

## 🛠️ Instalação

1. **Clone o repositório**

```bash
git clone <repository-url>
cd bora-escrever-nextjs
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local` com suas configurações:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# OpenAI API Keys
OPENAI_API_KEY_CHAT=your_openai_api_key_for_chat
OPENAI_API_KEY_CORRECTION=your_openai_api_key_for_correction
OPENAI_API_KEY_ANALYSIS=your_openai_api_key_for_analysis
```

4. **Execute o projeto em desenvolvimento**

```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:3000`

## 🏗️ Estrutura do Projeto

```
src/
├── app/                    # App Router do Next.js
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
├── components/            # Componentes reutilizáveis
│   ├── ErrorBoundary.tsx  # Tratamento de erros
│   ├── Loading.tsx        # Componentes de carregamento
│   └── features/          # Componentes específicos
│       └── dashboard/
│           └── StudyPlan.tsx
└── lib/                   # Utilitários e configurações
    ├── firebase.ts        # Configuração Firebase
    └── openai.ts          # Configuração OpenAI
```

## 🎯 Funcionalidades

### ✅ Implementadas

- [x] Interface responsiva e moderna
- [x] Sistema de plano de estudos com drag & drop
- [x] Tratamento robusto de erros
- [x] Componentes de carregamento
- [x] Configuração Firebase
- [x] Suporte a temas claro/escuro
- [x] Animações suaves
- [x] Acessibilidade (WCAG)

### 🚧 Em Desenvolvimento

- [ ] Sistema de autenticação
- [ ] Editor de redação
- [ ] Correção automática com IA
- [ ] Chat com MarIA (IA educacional)
- [ ] Sistema de progresso
- [ ] Tutoria humanizada

### 📋 Planejadas

- [ ] PWA (Progressive Web App)
- [ ] Notificações push
- [ ] Modo offline
- [ ] Integração com APIs educacionais
- [ ] Sistema de gamificação

## 🧪 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar em produção
npm run start

# Linting
npm run lint
```

## 🎨 Personalização

### Cores e Temas

As cores podem ser personalizadas no arquivo `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: { /* cores primárias */ },
      accent: { /* cores de destaque */ }
    }
  }
}
```

### Componentes

Todos os componentes seguem o padrão de design system e podem ser facilmente customizados.

## 🔧 Configuração do Firebase

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
2. Ative o Firestore Database
3. Configure as regras de segurança
4. Copie as configurações para o `.env.local`

## 🚀 Deploy

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Upload da pasta .next para Netlify
```

### Docker

```bash
docker build -t bora-escrever .
docker run -p 3000:3000 bora-escrever
```

## 🐛 Solução de Problemas

### Erro de Tailwind CSS

Se as classes do Tailwind não estiverem funcionando:

1. Verifique se o `content` no `tailwind.config.js` está correto
2. Reinicie o servidor de desenvolvimento

### Erro do Firebase

Se houver erros relacionados ao Firebase:

1. Verifique se todas as variáveis de ambiente estão configuradas
2. Confirme se o projeto Firebase está ativo

### Problemas de Performance

- Use `npm run build` para verificar o tamanho do bundle
- Considere lazy loading para componentes pesados

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte, envie um email para suporte@boraescrever.com ou abra uma issue no GitHub.

## 🙏 Agradecimentos

- Equipe Next.js pelo framework incrível
- Comunidade React pelo ecossistema
- Tailwind CSS pela facilidade de estilização
- Firebase pela infraestrutura robusta
