'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import AppLayout from '@/components/layout/AppLayout';
import {
  Calendar,
  FileText,
  Clock,
  Eye,
  Download,
  Filter,
  Search,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  XCircle,
} from 'lucide-react';

// Tipagem explícita para redações
interface Redacao {
  id: number;
  titulo: string;
  data: string;
  status: 'corrigida' | 'em_correcao' | 'pendente' | string;
  nota: number | null;
  tempoEscrita: number;
  palavras: number;
  competencias: number[] | null;
  feedback: string | null;
  professor: string | null;
  categoria: string;
}

function HistoricoPage() {
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');
  const [filtroNota, setFiltroNota] = useState<string>('todas');
  const [busca, setBusca] = useState<string>('');

  const redacoes: Redacao[] = useMemo(
    () => [
      {
        id: 1,
        titulo: 'A importância da educação digital no Brasil contemporâneo',
        data: '2024-12-08',
        status: 'corrigida',
        nota: 920,
        tempoEscrita: 65, // minutos
        palavras: 342,
        competencias: [180, 160, 180, 200, 200],
        feedback: 'Excelente argumentação e proposta de intervenção bem estruturada.',
        professor: 'Prof. Ana Silva',
        categoria: 'Tecnologia',
      },
      {
        id: 2,
        titulo: 'Desafios para a preservação do meio ambiente no século XXI',
        data: '2024-12-07',
        status: 'corrigida',
        nota: 880,
        tempoEscrita: 72,
        palavras: 356,
        competencias: [160, 180, 160, 180, 200],
        feedback: 'Boa estrutura, mas pode melhorar a diversidade de repertórios.',
        professor: 'Prof. Carlos Santos',
        categoria: 'Meio Ambiente',
      },
      {
        id: 3,
        titulo: 'O papel das redes sociais na formação da opinião pública',
        data: '2024-12-05',
        status: 'corrigida',
        nota: 850,
        tempoEscrita: 58,
        palavras: 328,
        competencias: [160, 160, 140, 170, 220],
        feedback: 'Argumentação sólida, atenção à norma culta em alguns trechos.',
        professor: 'Prof. Maria Oliveira',
        categoria: 'Sociedade',
      },
      {
        id: 4,
        titulo: 'Caminhos para combater a desigualdade social no Brasil',
        data: '2024-12-03',
        status: 'corrigida',
        nota: 820,
        tempoEscrita: 68,
        palavras: 341,
        competencias: [140, 160, 160, 160, 200],
        feedback: 'Tema bem desenvolvido, pode aprofundar mais a argumentação.',
        professor: 'Prof. João Pereira',
        categoria: 'Social',
      },
      {
        id: 5,
        titulo: 'A influência da tecnologia nas relações humanas',
        data: '2024-12-08',
        status: 'pendente',
        nota: null,
        tempoEscrita: 45,
        palavras: 298,
        competencias: null,
        feedback: null,
        professor: null,
        categoria: 'Tecnologia',
      },
      {
        id: 6,
        titulo: 'Importância da leitura na formação do cidadão crítico',
        data: '2024-12-08',
        status: 'em_correcao',
        nota: null,
        tempoEscrita: 52,
        palavras: 315,
        competencias: null,
        feedback: null,
        professor: 'Prof. Ana Silva',
        categoria: 'Educação',
      },
    ],
    []
  );

  const redacoesFiltradas = useMemo(
    () =>
      redacoes.filter((redacao: Redacao) => {
        const matchStatus = filtroStatus === 'todos' || redacao.status === filtroStatus;
        const matchNota =
          filtroNota === 'todas' ||
          (filtroNota === 'alta' && redacao.nota !== null && redacao.nota >= 900) ||
          (filtroNota === 'media' &&
            redacao.nota !== null &&
            redacao.nota >= 800 &&
            redacao.nota < 900) ||
          (filtroNota === 'baixa' && redacao.nota !== null && redacao.nota < 800);
        const matchBusca =
          redacao.titulo.toLowerCase().includes(busca.toLowerCase()) ||
          redacao.categoria.toLowerCase().includes(busca.toLowerCase());
        return matchStatus && matchNota && matchBusca;
      }),
    [redacoes, filtroStatus, filtroNota, busca]
  );

  // Função para obter o ícone de status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'corrigida':
        return <CheckCircle className="h-5 w-5 text-green-500" aria-label="Corrigida" />;
      case 'em_correcao':
        return <AlertCircle className="h-5 w-5 text-yellow-500" aria-label="Em correção" />;
      case 'pendente':
        return <Clock className="h-5 w-5 text-gray-500" aria-label="Pendente" />;
      default:
        return <XCircle className="h-5 w-5 text-red-500" aria-label="Erro" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'corrigida':
        return 'Corrigida';
      case 'em_correcao':
        return 'Em Correção';
      case 'pendente':
        return 'Pendente';
      default:
        return 'Erro';
    }
  };

  const getNotaColor = (nota: number) => {
    if (nota >= 900) return 'text-green-600 bg-green-100';
    if (nota >= 800) return 'text-blue-600 bg-blue-100';
    if (nota >= 700) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Histórico de Redações</h1>
              <p className="text-gray-600 mt-2">Acompanhe todas as suas redações e correções</p>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar por tema ou categoria..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </motion.div>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Filtros</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Filtrar por status"
              >
                <option value="todos">Todos os Status</option>
                <option value="corrigida">Corrigidas</option>
                <option value="em_correcao">Em Correção</option>
                <option value="pendente">Pendentes</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nota</label>
              <select
                value={filtroNota}
                onChange={(e) => setFiltroNota(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Filtrar por nota"
              >
                <option value="todas">Todas as Notas</option>
                <option value="alta">900+ (Excelente)</option>
                <option value="media">800-899 (Boa)</option>
                <option value="baixa">Abaixo de 800</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Lista de Redações */}
        <div className="space-y-4">
          {redacoesFiltradas.map((redacao, index) => (
            <motion.div
              key={redacao.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 2) }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Informações Principais */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{redacao.titulo}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(redacao.data).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{redacao.tempoEscrita} min</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FileText className="h-4 w-4" />
                          <span>{redacao.palavras} palavras</span>
                        </div>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          {redacao.categoria}
                        </span>
                      </div>
                    </div>

                    {/* Status e Nota */}
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(redacao.status)}
                        <span className="text-sm font-medium text-gray-700">
                          {getStatusLabel(redacao.status)}
                        </span>
                      </div>

                      {redacao.nota && (
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getNotaColor(redacao.nota)}`}
                        >
                          {redacao.nota}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Competências (se corrigida) */}
                  {redacao.competencias && (
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">Competências:</p>
                      <div className="grid grid-cols-5 gap-2">
                        {redacao.competencias.map((nota, idx) => (
                          <div key={idx} className="text-center">
                            <div
                              className={`w-full h-2 rounded-full ${
                                nota >= 180
                                  ? 'bg-green-500'
                                  : nota >= 160
                                    ? 'bg-blue-500'
                                    : nota >= 140
                                      ? 'bg-yellow-500'
                                      : 'bg-red-500'
                              }`}
                            ></div>
                            <span className="text-xs text-gray-600 mt-1">
                              C{idx + 1}: {nota}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Feedback */}
                  {redacao.feedback && (
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-3">
                      <p className="text-sm text-blue-800">{redacao.feedback}</p>
                      {redacao.professor && (
                        <p className="text-xs text-blue-600 mt-1">— {redacao.professor}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Ações */}
                <div className="flex items-center space-x-2">
                  <button
                    className="flex items-center space-x-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    aria-label={`Ver redação: ${redacao.titulo}`}
                  >
                    <Eye className="h-4 w-4" />
                    <span className="text-sm">Ver</span>
                  </button>
                  {redacao.status === 'corrigida' && (
                    <button
                      className="flex items-center space-x-2 px-3 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      aria-label={`Download da redação: ${redacao.titulo}`}
                    >
                      <Download className="h-4 w-4" />
                      <span className="text-sm">Download</span>
                    </button>
                  )}
                  <ChevronRight className="h-4 w-4 text-gray-400" aria-hidden="true" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {redacoesFiltradas.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma redação encontrada</h3>
            <p className="text-gray-600">Tente ajustar os filtros ou termos de busca</p>
          </motion.div>
        )}

        {/* Resumo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">{redacoes.length}</p>
              <p className="text-sm text-gray-600">Total de Redações</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {redacoes.filter((r) => r.status === 'corrigida').length}
              </p>
              <p className="text-sm text-gray-600">Corrigidas</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">
                {redacoes.filter((r) => r.status === 'em_correcao').length}
              </p>
              <p className="text-sm text-gray-600">Em Correção</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">
                {Math.round(
                  redacoes.filter((r) => r.nota).reduce((acc, r) => acc + (r.nota || 0), 0) /
                    redacoes.filter((r) => r.nota).length
                ) || 0}
              </p>
              <p className="text-sm text-gray-600">Nota Média</p>
            </div>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}

HistoricoPage.displayName = 'HistoricoPage';

export default HistoricoPage;
