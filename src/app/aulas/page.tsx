'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AppLayout from '@/components/layout/AppLayout';
import { useTheme } from '@/contexts/ThemeContext';
import { Play } from 'lucide-react';
import { BookOpen } from 'lucide-react';
import { Clock } from 'lucide-react';
import { Users } from 'lucide-react';
import { Star } from 'lucide-react';
import { CheckCircle } from 'lucide-react';
import { Lock } from 'lucide-react';
import { Filter } from 'lucide-react';
import { Search } from 'lucide-react';

function AulasPage() {
  const [filtroAtivo, setFiltroAtivo] = useState('todos');
  const [busca, setBusca] = useState('');
  const { theme } = useTheme();

  const categorias = [
    { id: 'todos', label: 'Todas as Aulas', count: 24 },
    { id: 'estrutura', label: 'Estrutura Textual', count: 8 },
    { id: 'temas', label: 'Temas ENEM', count: 10 },
    { id: 'repertorios', label: 'Repertórios', count: 6 },
  ];

  const aulas = [
    {
      id: 1,
      titulo: 'Introdução à Redação ENEM',
      descricao: 'Aprenda os fundamentos da redação dissertativa-argumentativa',
      categoria: 'estrutura',
      duracao: '45 min',
      nivel: 'Iniciante',
      professor: 'Prof. Ana Silva',
      rating: 4.8,
      assistida: true,
      thumbnail: '/api/placeholder/300/200',
      progresso: 100,
    },
    {
      id: 2,
      titulo: 'Estrutura do Parágrafo Argumentativo',
      descricao: 'Como construir parágrafos convincentes e bem estruturados',
      categoria: 'estrutura',
      duracao: '35 min',
      nivel: 'Intermediário',
      professor: 'Prof. Carlos Santos',
      rating: 4.9,
      assistida: true,
      thumbnail: '/api/placeholder/300/200',
      progresso: 75,
    },
    {
      id: 3,
      titulo: 'Temas de Meio Ambiente no ENEM',
      descricao: 'Análise dos principais temas ambientais cobrados no exame',
      categoria: 'temas',
      duracao: '50 min',
      nivel: 'Intermediário',
      professor: 'Prof. Maria Oliveira',
      rating: 4.7,
      assistida: false,
      thumbnail: '/api/placeholder/300/200',
      progresso: 0,
      premium: true,
    },
    {
      id: 4,
      titulo: 'Repertórios Culturais Essenciais',
      descricao: 'Banco de repertórios para enriquecer suas argumentações',
      categoria: 'repertorios',
      duracao: '60 min',
      nivel: 'Avançado',
      professor: 'Prof. João Pereira',
      rating: 4.9,
      assistida: false,
      thumbnail: '/api/placeholder/300/200',
      progresso: 0,
    },
    {
      id: 5,
      titulo: 'Conectivos e Coesão Textual',
      descricao: 'Domine o uso de conectivos para uma redação mais fluida',
      categoria: 'estrutura',
      duracao: '40 min',
      nivel: 'Intermediário',
      professor: 'Prof. Ana Silva',
      rating: 4.8,
      assistida: false,
      thumbnail: '/api/placeholder/300/200',
      progresso: 0,
    },
    {
      id: 6,
      titulo: 'Proposta de Intervenção Eficaz',
      descricao: 'Como elaborar propostas de intervenção que impressionam',
      categoria: 'estrutura',
      duracao: '55 min',
      nivel: 'Avançado',
      professor: 'Prof. Carlos Santos',
      rating: 4.9,
      assistida: false,
      thumbnail: '/api/placeholder/300/200',
      progresso: 0,
      premium: true,
    },
  ];

  const aulasFiltradas = aulas.filter((aula) => {
    const matchCategoria = filtroAtivo === 'todos' || aula.categoria === filtroAtivo;
    const matchBusca =
      aula.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      aula.descricao.toLowerCase().includes(busca.toLowerCase());
    return matchCategoria && matchBusca;
  });

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case 'Iniciante':
        return theme === 'dark'
          ? 'bg-green-900 text-green-300 dark:bg-green-900 dark:text-green-300'
          : 'bg-green-100 text-green-700';
      case 'Intermediário':
        return theme === 'dark'
          ? 'bg-blue-900 text-blue-300 dark:bg-blue-900 dark:text-blue-300'
          : 'bg-blue-100 text-blue-700';
      case 'Avançado':
        return theme === 'dark'
          ? 'bg-purple-900 text-purple-300 dark:bg-purple-900 dark:text-purple-300'
          : 'bg-purple-100 text-purple-700';
      default:
        return theme === 'dark'
          ? 'bg-gray-700 text-gray-300 dark:bg-gray-700 dark:text-gray-300'
          : 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-6">
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
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1
                className={`text-3xl font-bold ${
                  theme === 'dark' ? 'text-gray-100 dark:text-gray-100' : 'text-gray-900'
                }`}
              >
                Minhas Aulas
              </h1>
              <p
                className={`mt-2 ${
                  theme === 'dark' ? 'text-gray-300 dark:text-gray-300' : 'text-gray-600'
                }`}
              >
                Acesse conteúdos exclusivos e aprimore suas habilidades
              </p>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
                }`}
              />
              <input
                type="text"
                placeholder="Buscar aulas..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
          </div>
        </motion.div>

        {/* Filtros */}
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
          <div className="flex items-center space-x-2 mb-4">
            <Filter className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
            <h3
              className={`font-semibold ${
                theme === 'dark' ? 'text-gray-100 dark:text-gray-100' : 'text-gray-900'
              }`}
            >
              Categorias
            </h3>
          </div>

          <div className="flex flex-wrap gap-3">
            {categorias.map((categoria) => (
              <button
                key={categoria.id}
                onClick={() => setFiltroAtivo(categoria.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filtroAtivo === categoria.id
                    ? 'bg-primary-600 text-white'
                    : theme === 'dark'
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {categoria.label} ({categoria.count})
              </button>
            ))}
          </div>
        </motion.div>

        {/* Lista de Aulas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aulasFiltradas.map((aula, index) => (
            <motion.div
              key={aula.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 2) }}
              className={`rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 dark:bg-gray-800 dark:border-gray-700'
                  : 'bg-white border-gray-200'
              }`}
            >
              {/* Thumbnail */}
              <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    {aula.premium && !aula.assistida ? (
                      <Lock className="h-8 w-8 text-white" />
                    ) : aula.assistida ? (
                      <CheckCircle className="h-8 w-8 text-white" />
                    ) : (
                      <Play className="h-8 w-8 text-white" />
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                {aula.progresso > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-black bg-opacity-20">
                    <div
                      className="h-full bg-white transition-all duration-300"
                      style={{ width: `${aula.progresso}%` }}
                    />
                  </div>
                )}

                {/* Premium Badge */}
                {aula.premium && (
                  <div className="absolute top-3 right-3 px-2 py-1 bg-yellow-500 text-white text-xs font-medium rounded-full">
                    Premium
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getNivelColor(aula.nivel)}`}
                  >
                    {aula.nivel}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">{aula.rating}</span>
                  </div>
                </div>

                <h3
                  className={`font-semibold mb-2 line-clamp-2 ${
                    theme === 'dark' ? 'text-gray-100 dark:text-gray-100' : 'text-gray-900'
                  }`}
                >
                  {aula.titulo}
                </h3>

                <p
                  className={`text-sm mb-4 line-clamp-2 ${
                    theme === 'dark' ? 'text-gray-300 dark:text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {aula.descricao}
                </p>

                <div
                  className={`flex items-center justify-between text-sm mb-4 ${
                    theme === 'dark' ? 'text-gray-400 dark:text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{aula.duracao}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{aula.professor}</span>
                  </div>
                </div>

                <button
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    aula.premium && !aula.assistida
                      ? theme === 'dark'
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                        : 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : aula.assistida
                        ? theme === 'dark'
                          ? 'bg-green-900 text-green-300 hover:bg-green-800 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                  disabled={aula.premium && !aula.assistida}
                >
                  {aula.premium && !aula.assistida
                    ? 'Upgrade para Premium'
                    : aula.assistida
                      ? aula.progresso === 100
                        ? 'Assistir Novamente'
                        : 'Continuar Assistindo'
                      : 'Assistir Aula'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {aulasFiltradas.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpen
              className={`h-16 w-16 mx-auto mb-4 ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
              }`}
            />
            <h3
              className={`text-lg font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-100 dark:text-gray-100' : 'text-gray-900'
              }`}
            >
              Nenhuma aula encontrada
            </h3>
            <p
              className={`${
                theme === 'dark' ? 'text-gray-300 dark:text-gray-300' : 'text-gray-600'
              }`}
            >
              Tente ajustar os filtros ou termos de busca
            </p>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
}

AulasPage.displayName = "AulasPage";

export default AulasPage;
