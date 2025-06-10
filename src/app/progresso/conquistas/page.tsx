'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AppLayout from '@/components/layout/AppLayout';
import { Trophy, Star, Target, Crown, Lock, CheckCircle, Calendar } from 'lucide-react';

function ConquistasPage() {
  const [categoriaAtiva, setCategoriaAtiva] = useState('todas');

  const categorias = [
    { id: 'todas', label: 'Todas', count: 24 },
    { id: 'redacao', label: 'Redação', count: 8 },
    { id: 'estudo', label: 'Estudo', count: 6 },
    { id: 'progresso', label: 'Progresso', count: 5 },
    { id: 'especiais', label: 'Especiais', count: 5 },
  ];

  const conquistas = [
    // Conquistas de Redação
    {
      id: 1,
      titulo: 'Primeira Redação',
      descricao: 'Escreva sua primeira redação na plataforma',
      categoria: 'redacao',
      icone: '🎯',
      conquistada: true,
      dataConquista: '2024-11-15',
      pontos: 50,
      raridade: 'comum',
      progresso: { atual: 1, total: 1 },
    },
    {
      id: 2,
      titulo: 'Redator Iniciante',
      descricao: 'Escreva 5 redações',
      categoria: 'redacao',
      icone: '📝',
      conquistada: true,
      dataConquista: '2024-11-28',
      pontos: 100,
      raridade: 'comum',
      progresso: { atual: 5, total: 5 },
    },
    {
      id: 3,
      titulo: 'Redator Experiente',
      descricao: 'Escreva 10 redações',
      categoria: 'redacao',
      icone: '📚',
      conquistada: true,
      dataConquista: '2024-12-05',
      pontos: 200,
      raridade: 'raro',
      progresso: { atual: 10, total: 10 },
    },
    {
      id: 4,
      titulo: 'Mestre das Palavras',
      descricao: 'Escreva 25 redações',
      categoria: 'redacao',
      icone: '🏆',
      conquistada: false,
      dataConquista: null,
      pontos: 500,
      raridade: 'epico',
      progresso: { atual: 12, total: 25 },
    },

    // Conquistas de Notas
    {
      id: 5,
      titulo: 'Primeira Nota Alta',
      descricao: 'Alcance nota 800+ pela primeira vez',
      categoria: 'progresso',
      icone: '⭐',
      conquistada: true,
      dataConquista: '2024-11-20',
      pontos: 150,
      raridade: 'comum',
      progresso: { atual: 1, total: 1 },
    },
    {
      id: 6,
      titulo: 'Nota de Ouro',
      descricao: 'Alcance nota 900+',
      categoria: 'progresso',
      icone: '🥇',
      conquistada: true,
      dataConquista: '2024-12-07',
      pontos: 300,
      raridade: 'raro',
      progresso: { atual: 1, total: 1 },
    },
    {
      id: 7,
      titulo: 'Perfeccionista',
      descricao: 'Alcance nota 950+',
      categoria: 'progresso',
      icone: '💎',
      conquistada: false,
      dataConquista: null,
      pontos: 750,
      raridade: 'lendario',
      progresso: { atual: 920, total: 950 },
    },

    // Conquistas de Estudo
    {
      id: 8,
      titulo: 'Estudante Dedicado',
      descricao: 'Estude por 7 dias consecutivos',
      categoria: 'estudo',
      icone: '🔥',
      conquistada: true,
      dataConquista: '2024-12-01',
      pontos: 200,
      raridade: 'raro',
      progresso: { atual: 7, total: 7 },
    },
    {
      id: 9,
      titulo: 'Maratonista',
      descricao: 'Estude por 30 dias consecutivos',
      categoria: 'estudo',
      icone: '🏃‍♂️',
      conquistada: false,
      dataConquista: null,
      pontos: 500,
      raridade: 'epico',
      progresso: { atual: 12, total: 30 },
    },
    {
      id: 10,
      titulo: 'Tempo de Qualidade',
      descricao: 'Acumule 50 horas de estudo',
      categoria: 'estudo',
      icone: '⏰',
      conquistada: true,
      dataConquista: '2024-12-08',
      pontos: 300,
      raridade: 'raro',
      progresso: { atual: 50, total: 50 },
    },

    // Conquistas Especiais
    {
      id: 11,
      titulo: 'Bem-vindo!',
      descricao: 'Complete seu perfil',
      categoria: 'especiais',
      icone: '👋',
      conquistada: true,
      dataConquista: '2024-11-15',
      pontos: 25,
      raridade: 'comum',
      progresso: { atual: 1, total: 1 },
    },
    {
      id: 12,
      titulo: 'Explorador',
      descricao: 'Visite todas as seções da plataforma',
      categoria: 'especiais',
      icone: '🗺️',
      conquistada: true,
      dataConquista: '2024-11-16',
      pontos: 100,
      raridade: 'comum',
      progresso: { atual: 1, total: 1 },
    },
    {
      id: 13,
      titulo: 'Colecionador',
      descricao: 'Conquiste 10 conquistas',
      categoria: 'especiais',
      icone: '🏅',
      conquistada: true,
      dataConquista: '2024-12-05',
      pontos: 250,
      raridade: 'raro',
      progresso: { atual: 10, total: 10 },
    },
    {
      id: 14,
      titulo: 'Lenda Viva',
      descricao: 'Conquiste todas as conquistas disponíveis',
      categoria: 'especiais',
      icone: '👑',
      conquistada: false,
      dataConquista: null,
      pontos: 1000,
      raridade: 'lendario',
      progresso: { atual: 8, total: 24 },
    },
  ];

  const getRaridadeColor = (raridade: string) => {
    switch (raridade) {
      case 'comum':
        return 'border-gray-300 bg-gray-50';
      case 'raro':
        return 'border-blue-300 bg-blue-50';
      case 'epico':
        return 'border-purple-300 bg-purple-50';
      case 'lendario':
        return 'border-yellow-300 bg-yellow-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  const getRaridadeLabel = (raridade: string) => {
    switch (raridade) {
      case 'comum':
        return 'Comum';
      case 'raro':
        return 'Raro';
      case 'epico':
        return 'Épico';
      case 'lendario':
        return 'Lendário';
      default:
        return 'Comum';
    }
  };

  const conquistasFiltradas = conquistas.filter(
    (conquista) => categoriaAtiva === 'todas' || conquista.categoria === categoriaAtiva
  );

  const estatisticas = {
    totalConquistas: conquistas.length,
    conquistadas: conquistas.filter((c) => c.conquistada).length,
    pontosTotal: conquistas.filter((c) => c.conquistada).reduce((acc, c) => acc + c.pontos, 0),
    proximaConquista: conquistas.find((c) => !c.conquistada && c.progresso.atual > 0),
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg shadow-sm border border-yellow-200 p-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
                <Trophy className="h-8 w-8 text-yellow-600" />
                <span>Conquistas</span>
              </h1>
              <p className="text-gray-600 mt-2">Acompanhe suas conquistas e marcos alcançados</p>
            </div>

            {/* Estatísticas Rápidas */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-yellow-600">{estatisticas.conquistadas}</p>
                <p className="text-sm text-gray-600">Conquistadas</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{estatisticas.pontosTotal}</p>
                <p className="text-sm text-gray-600">Pontos</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round((estatisticas.conquistadas / estatisticas.totalConquistas) * 100)}%
                </p>
                <p className="text-sm text-gray-600">Progresso</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Próxima Conquista */}
        {estatisticas.proximaConquista && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Target className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Próxima Conquista</h3>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-4xl">{estatisticas.proximaConquista.icone}</div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">
                  {estatisticas.proximaConquista.titulo}
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  {estatisticas.proximaConquista.descricao}
                </p>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(estatisticas.proximaConquista.progresso.atual / estatisticas.proximaConquista.progresso.total) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {estatisticas.proximaConquista.progresso.atual}/
                    {estatisticas.proximaConquista.progresso.total}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filtros de Categoria */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <div className="flex flex-wrap gap-3">
            {categorias.map((categoria) => (
              <button
                key={categoria.id}
                onClick={() => setCategoriaAtiva(categoria.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  categoriaAtiva === categoria.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {categoria.label} ({categoria.count})
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid de Conquistas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {conquistasFiltradas.map((conquista, index) => (
            <motion.div
              key={conquista.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 3) }}
              className={`relative rounded-lg border-2 p-6 transition-all duration-300 hover:shadow-lg ${
                conquista.conquistada
                  ? getRaridadeColor(conquista.raridade)
                  : 'border-gray-200 bg-gray-50 opacity-75'
              }`}
            >
              {/* Badge de Raridade */}
              <div
                className={`absolute top-3 right-3 px-2 py-1 text-xs font-medium rounded-full ${
                  conquista.raridade === 'comum'
                    ? 'bg-gray-200 text-gray-700'
                    : conquista.raridade === 'raro'
                      ? 'bg-blue-200 text-blue-700'
                      : conquista.raridade === 'epico'
                        ? 'bg-purple-200 text-purple-700'
                        : 'bg-yellow-200 text-yellow-700'
                }`}
              >
                {getRaridadeLabel(conquista.raridade)}
              </div>

              {/* Ícone e Status */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl">{conquista.conquistada ? conquista.icone : '🔒'}</div>
                {conquista.conquistada ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                  <Lock className="h-6 w-6 text-gray-400" />
                )}
              </div>

              {/* Informações */}
              <h3
                className={`font-semibold mb-2 ${
                  conquista.conquistada ? 'text-gray-900' : 'text-gray-500'
                }`}
              >
                {conquista.titulo}
              </h3>

              <p
                className={`text-sm mb-4 ${
                  conquista.conquistada ? 'text-gray-600' : 'text-gray-400'
                }`}
              >
                {conquista.descricao}
              </p>

              {/* Progresso */}
              {!conquista.conquistada && conquista.progresso.atual > 0 && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Progresso</span>
                    <span className="text-gray-500">
                      {conquista.progresso.atual}/{conquista.progresso.total}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(conquista.progresso.atual / conquista.progresso.total) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className={conquista.conquistada ? 'text-gray-700' : 'text-gray-400'}>
                    {conquista.pontos} pts
                  </span>
                </div>

                {conquista.conquistada && conquista.dataConquista && (
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(conquista.dataConquista).toLocaleDateString('pt-BR')}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Resumo Final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200"
        >
          <div className="text-center">
            <Crown className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Continue Conquistando!</h3>
            <p className="text-gray-600 mb-4">
              Você já conquistou {estatisticas.conquistadas} de {estatisticas.totalConquistas}{' '}
              conquistas disponíveis. Continue estudando para desbloquear mais conquistas!
            </p>
            <div className="w-full bg-gray-200 rounded-full h-3 max-w-md mx-auto">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${(estatisticas.conquistadas / estatisticas.totalConquistas) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}

ConquistasPage.displayName = "ConquistasPage";

export default ConquistasPage;
