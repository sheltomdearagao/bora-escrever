'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';
import { useErrorHandler } from '@/components/ErrorBoundary';
import AppLayout from '@/components/layout/AppLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ActionCard } from '@/components/dashboard/ActionCard';
import { useTheme } from '@/contexts/ThemeContext';
import {
  BookOpen,
  CheckCircle,
  TrendingUp,
  Edit3,
  Users,
  MessageSquare,
  Brain,
  FileText,
  Bot,
} from 'lucide-react';

// Componente interno que usa o tema
function HomeContent() {
  const { theme } = useTheme();
  const router = useRouter();
  const handleError = useErrorHandler();

  // Action handlers for better UX
  const handleActionClick = (action: string) => {
    try {
      switch (action) {
        case 'write':
          router.push('/escrever');
          break;
        case 'tutor':
          // TODO: Implement tutor scheduling
          // console.log('Navigating to tutor scheduling...');
          break;
        case 'study-theme':
          router.push('/aulas');
          break;
        case 'study-structure':
          router.push('/aulas');
          break;
        case 'study-repertoire':
          router.push('/aulas');
          break;
        case 'chat':
          router.push('/maria');
          break;
        default:
        // console.warn(`Unknown action: ${action}`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao navegar';
      handleError(err instanceof Error ? err : new Error(errorMessage));
    }
  };

  return (
    <>
      <div className="dashboard__header">
        <h2
          className={`text-3xl font-bold ${
            theme === 'dark' ? 'text-gray-100 dark:text-gray-100' : 'text-gray-900'
          }`}
        >
          Bem-vindo de volta, João!
        </h2>
        <p
          className={`mt-2 ${
            theme === 'dark' ? 'text-gray-300 dark:text-gray-300' : 'text-gray-600'
          }`}
        >
          Continue seu progresso em redação
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<BookOpen size={24} />} number={12} label="Redações Escritas" />
        <StatCard icon={<CheckCircle size={24} />} number={8} label="Correções Recebidas" />
        <StatCard icon={<TrendingUp size={24} />} number={850} label="Nota Média" />
      </div>

      {/* Action Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ActionCard
          icon={<Edit3 size={24} />}
          title="Escrever Agora"
          description="Começar uma nova redação"
          primary
          onClick={() => handleActionClick('write')}
          aria-label="Começar uma nova redação"
        />
        <ActionCard
          icon={<Users size={24} />}
          title="Tutoria Humanizada"
          description="Agendar sessão com tutor"
          onClick={() => handleActionClick('tutor')}
          aria-label="Agendar sessão com tutor"
        />
        <ActionCard
          icon={<FileText size={24} />}
          title="Estudar Tema"
          description="Explorar temas do ENEM"
          onClick={() => handleActionClick('study-theme')}
          aria-label="Explorar temas do ENEM"
        />
        <ActionCard
          icon={<Brain size={24} />}
          title="Estudar Estrutura"
          description="Aprender estrutura textual"
          onClick={() => handleActionClick('study-structure')}
          aria-label="Aprender estrutura textual"
        />
        <ActionCard
          icon={<MessageSquare size={24} />}
          title="Estudar Repertórios"
          description="Banco de repertórios"
          onClick={() => handleActionClick('study-repertoire')}
          aria-label="Acessar banco de repertórios"
        />
        <ActionCard
          icon={<Bot size={24} />}
          title="Conversar com a MarIA"
          description="Chat com IA educacional"
          onClick={() => handleActionClick('chat')}
          aria-label="Iniciar chat com IA educacional"
        />
      </div>
    </>
  );
}

HomeContent.displayName = "HomeContent";

export default function Page() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleError = useErrorHandler();

  useEffect(() => {
    try {
      // Simulate loading time and potential initialization
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 500);

      return () => clearTimeout(timer);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      handleError(err instanceof Error ? err : new Error(errorMessage));
      return undefined;
    }
  }, [handleError]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Erro ao carregar a página</h2>
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
        <HomeContent />
      </motion.div>
    </AppLayout>
  );
}

Page.displayName = "HomePage";
