'use client';

import { motion } from 'framer-motion';
import AppLayout from '@/components/layout/AppLayout';
import { useTheme } from '@/contexts/ThemeContext';
import { TrendingUp, Award, Target, PenTool, Clock, Star, ChevronRight } from 'lucide-react';

function ProgressoPage() {
  const { theme } = useTheme();
  const estatisticas = {
    redacoesEscritas: 12,
    correcoesPendentes: 2,
    notaMedia: 850,
    tempoTotalEstudo: 45, // horas
    sequenciaAtual: 7, // dias consecutivos
    melhorNota: 920,
  };

  const historicoRedacoes = [
    { id: 1, tema: 'Educação Digital', nota: 920, data: '2024-12-07', status: 'corrigida' },
    { id: 2, tema: 'Meio Ambiente', nota: 880, data: '2024-12-05', status: 'corrigida' },
    { id: 3, tema: 'Redes Sociais', nota: 850, data: '2024-12-03', status: 'corrigida' },
    { id: 4, tema: 'Desigualdade Social', nota: null, data: '2024-12-08', status: 'pendente' },
    { id: 5, tema: 'Tecnologia e Relações', nota: null, data: '2024-12-08', status: 'pendente' },
  ];

  const conquistas = [
    {
      id: 1,
      titulo: 'Primeira Redação',
      descricao: 'Escreveu sua primeira redação',
      icone: '🎯',
      conquistada: true,
    },
    {
      id: 2,
      titulo: 'Nota 900+',
      descricao: 'Alcançou nota acima de 900',
      icone: '🏆',
      conquistada: true,
    },
    {
      id: 3,
      titulo: 'Sequência de 7 dias',
      descricao: 'Estudou por 7 dias consecutivos',
      icone: '🔥',
      conquistada: true,
    },
    {
      id: 4,
      titulo: '10 Redações',
      descricao: 'Escreveu 10 redações',
      icone: '📝',
      conquistada: true,
    },
    {
      id: 5,
      titulo: 'Nota 950+',
      descricao: 'Alcançar nota acima de 950',
      icone: '⭐',
      conquistada: false,
    },
    {
      id: 6,
      titulo: '20 Redações',
      descricao: 'Escrever 20 redações',
      icone: '📚',
      conquistada: false,
    },
  ];

  const metasSemanais = [
    { meta: 'Escrever 3 redações', progresso: 2, total: 3 },
    { meta: 'Estudar 5 horas', progresso: 3.5, total: 5 },
    { meta: 'Revisar 2 correções', progresso: 2, total: 2 },
  ];

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-lg shadow-sm border p-6 ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700 dark:bg-gray-800 dark:border-gray-700'
              : 'bg-white border-gray-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1
                className={`text-3xl font-bold ${
                  theme === 'dark' ? 'text-gray-100 dark:text-gray-100' : 'text-gray-900'
                }`}
              >
                Meu Progresso
              </h1>
              <p
                className={`mt-2 ${
                  theme === 'dark' ? 'text-gray-300 dark:text-gray-300' : 'text-gray-600'
                }`}
              >
                Acompanhe sua evolução nos estudos
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">
                  {estatisticas.sequenciaAtual}
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  dias seguidos
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Estatísticas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`rounded-lg shadow-sm border p-6 ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 dark:bg-gray-800 dark:border-gray-700'
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  theme === 'dark' ? 'bg-primary-900/30' : 'bg-blue-100'
                }`}
              >
                <PenTool className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p
                  className={`text-2xl font-bold ${
                    theme === 'dark' ? 'text-gray-100 dark:text-gray-100' : 'text-gray-900'
                  }`}
                >
                  {estatisticas.redacoesEscritas}
                </p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Redações Escritas
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`rounded-lg shadow-sm border p-6 ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 dark:bg-gray-800 dark:border-gray-700'
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  theme === 'dark' ? 'bg-green-900/30' : 'bg-green-100'
                }`}
              >
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p
                  className={`text-2xl font-bold ${
                    theme === 'dark' ? 'text-gray-100 dark:text-gray-100' : 'text-gray-900'
                  }`}
                >
                  {estatisticas.notaMedia}
                </p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Nota Média
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`rounded-lg shadow-sm border p-6 ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 dark:bg-gray-800 dark:border-gray-700'
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-100'
                }`}
              >
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p
                  className={`text-2xl font-bold ${
                    theme === 'dark' ? 'text-gray-100 dark:text-gray-100' : 'text-gray-900'
                  }`}
                >
                  {estatisticas.melhorNota}
                </p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Melhor Nota
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`rounded-lg shadow-sm border p-6 ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 dark:bg-gray-800 dark:border-gray-700'
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  theme === 'dark' ? 'bg-orange-900/30' : 'bg-orange-100'
                }`}
              >
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p
                  className={`text-2xl font-bold ${
                    theme === 'dark' ? 'text-gray-100 dark:text-gray-100' : 'text-gray-900'
                  }`}
                >
                  {estatisticas.tempoTotalEstudo}h
                </p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Tempo de Estudo
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Histórico de Redações */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className={`lg:col-span-2 rounded-lg shadow-sm border p-6 ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 dark:bg-gray-800 dark:border-gray-700'
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <h3
                className={`text-lg font-semibold ${
                  theme === 'dark' ? 'text-gray-100 dark:text-gray-100' : 'text-gray-900'
                }`}
              >
                Histórico de Redações
              </h3>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                Ver todas
              </button>
            </div>

            <div className="space-y-4">
              {historicoRedacoes.map((redacao) => (
                <div
                  key={redacao.id}
                  className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'border-gray-700 hover:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-700'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-3 h-3 rounded-full ${redacao.status === 'corrigida' ? 'bg-green-500' : 'bg-yellow-500'}`}
                    ></div>
                    <div>
                      <p
                        className={`font-medium ${
                          theme === 'dark' ? 'text-gray-100 dark:text-gray-100' : 'text-gray-900'
                        }`}
                      >
                        {redacao.tema}
                      </p>
                      <p
                        className={`text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        {redacao.data}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {redacao.nota ? (
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          redacao.nota >= 900
                            ? 'bg-green-100 text-green-700'
                            : redacao.nota >= 800
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {redacao.nota}
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                        Pendente
                      </span>
                    )}
                    <ChevronRight
                      className={`h-4 w-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Metas Semanais e Conquistas */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-6"
          >
            {/* Metas Semanais */}
            <div
              className={`rounded-lg shadow-sm border p-6 ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 dark:bg-gray-800 dark:border-gray-700'
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-center space-x-2 mb-4">
                <Target className="h-5 w-5 text-primary-600" />
                <h3
                  className={`font-semibold ${
                    theme === 'dark' ? 'text-gray-100 dark:text-gray-100' : 'text-gray-900'
                  }`}
                >
                  Metas da Semana
                </h3>
              </div>
              <div className="space-y-4">
                {metasSemanais.map((meta, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span
                        className={`${
                          theme === 'dark' ? 'text-gray-200 dark:text-gray-200' : 'text-gray-700'
                        }`}
                      >
                        {meta.meta}
                      </span>
                      <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {meta.progresso}/{meta.total}
                      </span>
                    </div>
                    <div
                      className={`w-full rounded-full h-2 ${
                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                      }`}
                    >
                      <div
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                        data-progress={meta.progresso}
                        data-total={meta.total}
                        style={{ width: undefined }}
                        aria-valuenow={meta.progresso}
                        aria-valuemax={meta.total}
                      >
                        <span
                          className="block h-2 rounded-full"
                          style={{ width: `${(meta.progresso / meta.total) * 100}%`, background: 'inherit' }}
                        ></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Conquistas */}
            <div
              className={`rounded-lg shadow-sm border p-6 ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 dark:bg-gray-800 dark:border-gray-700'
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-center space-x-2 mb-4">
                <Award className="h-5 w-5 text-yellow-600" />
                <h3
                  className={`font-semibold ${
                    theme === 'dark' ? 'text-gray-100 dark:text-gray-100' : 'text-gray-900'
                  }`}
                >
                  Conquistas
                </h3>
              </div>
              <div className="space-y-3">
                {conquistas.slice(0, 4).map((conquista) => (
                  <div
                    key={conquista.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg border ${
                      conquista.conquistada
                        ? theme === 'dark'
                          ? 'bg-green-900/20 border-green-700 dark:bg-green-900/20 dark:border-green-700'
                          : 'bg-green-50 border-green-200'
                        : theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 dark:bg-gray-700 dark:border-gray-600'
                          : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <span className="text-2xl">{conquista.icone}</span>
                    <div className="flex-1">
                      <p
                        className={`font-medium ${
                          conquista.conquistada
                            ? theme === 'dark'
                              ? 'text-green-300'
                              : 'text-green-900'
                            : theme === 'dark'
                              ? 'text-gray-400'
                              : 'text-gray-500'
                        }`}
                      >
                        {conquista.titulo}
                      </p>
                      <p
                        className={`text-xs ${
                          conquista.conquistada
                            ? theme === 'dark'
                              ? 'text-green-400'
                              : 'text-green-700'
                            : theme === 'dark'
                              ? 'text-gray-500'
                              : 'text-gray-400'
                        }`}
                      >
                        {conquista.descricao}
                      </p>
                    </div>
                    {conquista.conquistada && (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-center text-primary-600 hover:text-primary-700 text-sm font-medium">
                Ver todas as conquistas
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
}

ProgressoPage.displayName = "ProgressoPage";

export default ProgressoPage;
