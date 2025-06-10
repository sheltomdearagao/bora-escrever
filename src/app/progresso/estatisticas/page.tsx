'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AppLayout from '@/components/layout/AppLayout';
import { TrendingUp } from 'lucide-react';
import { Award } from 'lucide-react';
import { Clock } from 'lucide-react';
import { PenTool } from 'lucide-react';
import { BarChart3 } from 'lucide-react';
import { LineChart } from 'lucide-react';
import { PieChart } from 'lucide-react';
import { Filter } from 'lucide-react';

function EstatisticasPage() {
  const [periodoSelecionado, setPeriodoSelecionado] = useState('30dias');

  const periodos = [
    { id: '7dias', label: '7 dias' },
    { id: '30dias', label: '30 dias' },
    { id: '3meses', label: '3 meses' },
    { id: '6meses', label: '6 meses' },
    { id: '1ano', label: '1 ano' },
  ];

  const estatisticasGerais = {
    redacoesEscritas: 12,
    tempoTotalEstudo: 45.5, // horas
    notaMedia: 850,
    melhorNota: 920,
    piorNota: 720,
    tendencia: '+12%', // comparado ao período anterior
  };

  const dadosGraficoNotas = [
    { data: '01/12', nota: 720 },
    { data: '03/12', nota: 780 },
    { data: '05/12', nota: 850 },
    { data: '07/12', nota: 820 },
    { data: '10/12', nota: 880 },
    { data: '12/12', nota: 920 },
    { data: '15/12', nota: 890 },
    { data: '17/12', nota: 850 },
  ];

  const distribuicaoCompetencias = [
    { competencia: 'Comp. 1 - Norma Culta', nota: 180, total: 200, cor: 'bg-blue-500' },
    { competencia: 'Comp. 2 - Compreensão', nota: 160, total: 200, cor: 'bg-green-500' },
    { competencia: 'Comp. 3 - Argumentação', nota: 140, total: 200, cor: 'bg-yellow-500' },
    { competencia: 'Comp. 4 - Coesão', nota: 170, total: 200, cor: 'bg-purple-500' },
    { competencia: 'Comp. 5 - Intervenção', nota: 200, total: 200, cor: 'bg-pink-500' },
  ];

  const temposPorDia = [
    { dia: 'Seg', tempo: 2.5 },
    { dia: 'Ter', tempo: 1.8 },
    { dia: 'Qua', tempo: 3.2 },
    { dia: 'Qui', tempo: 2.1 },
    { dia: 'Sex', tempo: 2.8 },
    { dia: 'Sáb', tempo: 4.5 },
    { dia: 'Dom', tempo: 3.1 },
  ];

  const temasMaisEstudados = [
    { tema: 'Meio Ambiente', quantidade: 4, porcentagem: 33 },
    { tema: 'Tecnologia', quantidade: 3, porcentagem: 25 },
    { tema: 'Educação', quantidade: 2, porcentagem: 17 },
    { tema: 'Saúde', quantidade: 2, porcentagem: 17 },
    { tema: 'Política', quantidade: 1, porcentagem: 8 },
  ];

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
              <h1 className="text-3xl font-bold text-gray-900">Estatísticas Detalhadas</h1>
              <p className="text-gray-600 mt-2">Análise completa do seu desempenho</p>
            </div>

            {/* Filtro de Período */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <select
                value={periodoSelecionado}
                onChange={(e) => setPeriodoSelecionado(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Selecionar período"
              >
                {periodos.map((periodo) => (
                  <option key={periodo.id} value={periodo.id}>
                    {periodo.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Cards de Estatísticas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Redações Escritas</p>
                <p className="text-3xl font-bold text-gray-900">
                  {estatisticasGerais.redacoesEscritas}
                </p>
                <p className="text-sm text-green-600 mt-1">
                  {estatisticasGerais.tendencia} vs período anterior
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <PenTool className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Nota Média</p>
                <p className="text-3xl font-bold text-gray-900">{estatisticasGerais.notaMedia}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Min: {estatisticasGerais.piorNota} | Max: {estatisticasGerais.melhorNota}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tempo de Estudo</p>
                <p className="text-3xl font-bold text-gray-900">
                  {estatisticasGerais.tempoTotalEstudo}h
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  ~{(estatisticasGerais.tempoTotalEstudo / 30).toFixed(1)}h por dia
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Melhor Nota</p>
                <p className="text-3xl font-bold text-gray-900">{estatisticasGerais.melhorNota}</p>
                <p className="text-sm text-green-600 mt-1">Excelente desempenho!</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de Evolução das Notas */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center space-x-2 mb-6">
              <LineChart className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Evolução das Notas</h3>
            </div>

            <div className="h-64 flex items-end justify-between space-x-2">
              {dadosGraficoNotas.map((item, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-blue-500 rounded-t-md transition-all duration-500 hover:bg-blue-600"
                    style={{ height: `${(item.nota / 1000) * 100}%` }}
                    title={`${item.data}: ${item.nota} pontos`}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-left">
                    {item.data}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-between text-sm text-gray-500">
              <span>0</span>
              <span>500</span>
              <span>1000</span>
            </div>
          </motion.div>

          {/* Distribuição por Competências */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center space-x-2 mb-6">
              <BarChart3 className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Desempenho por Competência</h3>
            </div>

            <div className="space-y-4">
              {distribuicaoCompetencias.map((comp, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700 font-medium">{comp.competencia}</span>
                    <span className="text-gray-600">
                      {comp.nota}/{comp.total}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(comp.nota / comp.total) * 100}%` }}
                      transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                      className={`h-3 rounded-full ${comp.cor}`}
                    ></motion.div>
                  </div>
                  <div className="text-right text-xs text-gray-500 mt-1">
                    {Math.round((comp.nota / comp.total) * 100)}%
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tempo de Estudo por Dia */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center space-x-2 mb-6">
              <Clock className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Tempo de Estudo Semanal</h3>
            </div>

            <div className="h-48 flex items-end justify-between space-x-3">
              {temposPorDia.map((item, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-purple-500 rounded-t-md transition-all duration-500 hover:bg-purple-600"
                    style={{ height: `${(item.tempo / 5) * 100}%` }}
                    title={`${item.dia}: ${item.tempo}h`}
                  ></div>
                  <span className="text-sm text-gray-600 mt-2">{item.dia}</span>
                  <span className="text-xs text-gray-500">{item.tempo}h</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Temas Mais Estudados */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center space-x-2 mb-6">
              <PieChart className="h-5 w-5 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-900">Temas Mais Estudados</h3>
            </div>

            <div className="space-y-4">
              {temasMaisEstudados.map((tema, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: `hsl(${index * 60}, 70%, 60%)` }}
                    ></div>
                    <span className="text-gray-700 font-medium">{tema.tema}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{tema.quantidade} redações</span>
                    <span className="text-sm font-medium text-gray-900">{tema.porcentagem}%</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
}

EstatisticasPage.displayName = "EstatisticasPage";

export default EstatisticasPage;
