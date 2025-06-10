'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AppLayout from '@/components/layout/AppLayout';
import {
  FileText,
  Zap,
  CheckCircle,
  TrendingUp,
  Target,
  Award,
  Upload,
  Sparkles,
  BarChart3,
  Lightbulb,
  Star,
  ArrowRight,
  Download,
  Share2,
} from 'lucide-react';

interface CompetenciaScore {
  numero: number;
  nome: string;
  nota: number;
  maxNota: number;
  feedback: string;
  pontosFortesDetalhados: string[];
  pontosAMelhorar: string[];
  cor: string;
}

interface CorrecaoResult {
  notaFinal: number;
  competencias: CompetenciaScore[];
  pontosFortesGerais: string[];
  pontosAMelhorarGerais: string[];
  sugestoesPraticas: string[];
  tempoCorrecao: number;
  palavrasAnalisadas: number;
  nivel: 'Iniciante' | 'Intermediário' | 'Avançado' | 'Expert';
}

function CorrecaoPage() {
  const [redacao, setRedacao] = useState('');
  const [resultado, setResultado] = useState<CorrecaoResult | null>(null);
  const [etapaAtual, setEtapaAtual] = useState<'input' | 'processing' | 'result'>('input');

  const etapasProcessamento = [
    { id: 1, nome: 'Analisando estrutura textual', icone: FileText, progresso: 20 },
    { id: 2, nome: 'Verificando norma culta', icone: CheckCircle, progresso: 40 },
    { id: 3, nome: 'Avaliando argumentação', icone: Lightbulb, progresso: 60 },
    { id: 4, nome: 'Analisando coesão e coerência', icone: Target, progresso: 80 },
    { id: 5, nome: 'Gerando feedback personalizado', icone: Sparkles, progresso: 100 },
  ];

  const [etapaProcessamento, setEtapaProcessamento] = useState(0);

  const corrigirRedacao = async () => {
    if (!redacao.trim() || redacao.length < 100) {
      alert('Por favor, escreva uma redação com pelo menos 100 caracteres.');
      return;
    }

    setEtapaAtual('processing');
    setEtapaProcessamento(0);

    // Simular progresso das etapas
    const intervalos = [1000, 1500, 2000, 1500, 1000];

    for (let i = 0; i < etapasProcessamento.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, intervalos[i]));
      setEtapaProcessamento(i + 1);
    }

    try {
      const response = await fetch('/api/maria/correction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ essayText: redacao }),
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      // Processar resposta da IA e criar resultado estruturado
      const resultadoProcessado = processarCorrecaoIA(data.correction, redacao);
      setResultado(resultadoProcessado);
      setEtapaAtual('result');
    } catch (error) {
      console.error('Erro ao corrigir redação:', error);
      alert('Erro ao processar correção. Tente novamente.');
      setEtapaAtual('input');
    } finally {
      // Processamento concluído
    }
  };

  const processarCorrecaoIA = (_correcaoTexto: string, textoOriginal: string): CorrecaoResult => {
    // Simular processamento da resposta da IA
    const competencias: CompetenciaScore[] = [
      {
        numero: 1,
        nome: 'Domínio da modalidade escrita formal',
        nota: Math.floor(Math.random() * 40) + 160,
        maxNota: 200,
        feedback: 'Boa aplicação da norma culta com alguns desvios pontuais.',
        pontosFortesDetalhados: ['Concordância verbal adequada', 'Uso correto de conectivos'],
        pontosAMelhorar: ['Atenção à pontuação', 'Revisão de acentuação'],
        cor: 'blue',
      },
      {
        numero: 2,
        nome: 'Compreender a proposta de redação',
        nota: Math.floor(Math.random() * 40) + 160,
        maxNota: 200,
        feedback: 'Demonstra compreensão adequada do tema proposto.',
        pontosFortesDetalhados: ['Abordagem direta do tema', 'Contextualização relevante'],
        pontosAMelhorar: ['Aprofundar análise do problema', 'Ampliar perspectivas'],
        cor: 'green',
      },
      {
        numero: 3,
        nome: 'Selecionar e organizar informações',
        nota: Math.floor(Math.random() * 40) + 160,
        maxNota: 200,
        feedback: 'Argumentação consistente com repertório sociocultural.',
        pontosFortesDetalhados: ['Uso de dados relevantes', 'Exemplos bem contextualizados'],
        pontosAMelhorar: ['Diversificar fontes', 'Aprofundar análise crítica'],
        cor: 'purple',
      },
      {
        numero: 4,
        nome: 'Demonstrar conhecimento dos mecanismos linguísticos',
        nota: Math.floor(Math.random() * 40) + 160,
        maxNota: 200,
        feedback: 'Boa articulação entre parágrafos e ideias.',
        pontosFortesDetalhados: ['Progressão textual clara', 'Conectivos adequados'],
        pontosAMelhorar: ['Variar conectivos', 'Melhorar transições'],
        cor: 'orange',
      },
      {
        numero: 5,
        nome: 'Elaborar proposta de intervenção',
        nota: Math.floor(Math.random() * 40) + 160,
        maxNota: 200,
        feedback: 'Proposta viável com agentes e ações definidos.',
        pontosFortesDetalhados: ['Agentes claramente identificados', 'Ações específicas'],
        pontosAMelhorar: ['Detalhar meios de execução', 'Incluir resultados esperados'],
        cor: 'red',
      },
    ];

    const notaFinal = competencias.reduce((acc, comp) => acc + comp.nota, 0);

    return {
      notaFinal,
      competencias,
      pontosFortesGerais: [
        'Estrutura textual bem organizada',
        'Linguagem formal adequada',
        'Argumentação coerente',
        'Repertório sociocultural presente',
      ],
      pontosAMelhorarGerais: [
        'Aprofundar análise crítica',
        'Diversificar repertório',
        'Melhorar conectivos',
        'Detalhar proposta de intervenção',
      ],
      sugestoesPraticas: [
        'Leia mais sobre o tema para ampliar repertório',
        'Pratique o uso de conectivos variados',
        'Revise regras de pontuação',
        'Estude modelos de propostas de intervenção',
      ],
      tempoCorrecao: 7.5,
      palavrasAnalisadas: textoOriginal.split(' ').length,
      nivel:
        notaFinal >= 900
          ? 'Expert'
          : notaFinal >= 750
            ? 'Avançado'
            : notaFinal >= 600
              ? 'Intermediário'
              : 'Iniciante',
    };
  };

  const resetarCorrecao = () => {
    setResultado(null);
    setEtapaAtual('input');
    setEtapaProcessamento(0);
  };

  const getCorNota = (nota: number) => {
    if (nota >= 180) return 'text-green-600 bg-green-50';
    if (nota >= 140) return 'text-yellow-600 bg-yellow-50';
    if (nota >= 100) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const getCorNivel = (nivel: string) => {
    switch (nivel) {
      case 'Expert':
        return 'text-purple-600 bg-purple-50';
      case 'Avançado':
        return 'text-green-600 bg-green-50';
      case 'Intermediário':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-orange-600 bg-orange-50';
    }
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-xl shadow-sm border border-blue-200 p-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Zap className="h-7 w-7 text-white" />
                </div>
                <span>Correção Automática</span>
                <Sparkles className="h-8 w-8 text-purple-600" />
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Correção inteligente com IA especializada em ENEM
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-purple-600">IA</div>
              <div className="text-sm text-gray-500">Powered by GPT-4</div>
            </div>
          </div>
        </motion.div>

        {/* Conteúdo Principal */}
        <AnimatePresence mode="wait">
          {etapaAtual === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* Área de Input */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <FileText className="h-6 w-6 text-blue-600" />
                    <h3 className="text-xl font-semibold text-gray-900">Sua Redação</h3>
                  </div>

                  <textarea
                    value={redacao}
                    onChange={(e) => setRedacao(e.target.value)}
                    placeholder="Cole ou digite sua redação aqui... (mínimo 100 caracteres)"
                    className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm leading-relaxed"
                  />

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{redacao.length} caracteres</span>
                      <span>
                        {redacao.split(' ').filter((word) => word.length > 0).length} palavras
                      </span>
                    </div>

                    <button
                      onClick={corrigirRedacao}
                      disabled={redacao.length < 100}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2 font-medium"
                    >
                      <Zap className="h-5 w-5" />
                      <span>Corrigir Redação</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Sidebar com Informações */}
              <div className="space-y-6">
                {/* Como Funciona */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    <span>Como Funciona</span>
                  </h3>

                  <div className="space-y-3">
                    {[
                      { icone: Upload, texto: 'Cole sua redação' },
                      { icone: Zap, texto: 'IA analisa em segundos' },
                      { icone: BarChart3, texto: 'Receba nota detalhada' },
                      { icone: Target, texto: 'Melhore com feedback' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                          <item.icone className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-sm text-gray-700">{item.texto}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Competências ENEM */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <Award className="h-5 w-5 text-purple-500" />
                    <span>5 Competências</span>
                  </h3>

                  <div className="space-y-2">
                    {[
                      'Norma culta',
                      'Compreensão do tema',
                      'Argumentação',
                      'Coesão e coerência',
                      'Proposta de intervenção',
                    ].map((comp, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 text-sm text-gray-600"
                      >
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-medium text-xs">
                          {index + 1}
                        </div>
                        <span>{comp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {etapaAtual === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center"
            >
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="h-10 w-10 text-white animate-pulse" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">Analisando sua redação</h3>
                <p className="text-gray-600 mb-8">
                  Nossa IA está avaliando cada competência com precisão
                </p>

                <div className="space-y-4">
                  {etapasProcessamento.map((etapa, index) => (
                    <motion.div
                      key={etapa.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: index < etapaProcessamento ? 1 : 0.5,
                        x: 0,
                      }}
                      className={`flex items-center space-x-3 p-3 rounded-lg ${
                        index < etapaProcessamento ? 'bg-green-50' : 'bg-gray-50'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          index < etapaProcessamento ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        {index < etapaProcessamento ? (
                          <CheckCircle className="h-5 w-5 text-white" />
                        ) : (
                          <etapa.icone className="h-5 w-5 text-white" />
                        )}
                      </div>
                      <span
                        className={`font-medium ${
                          index < etapaProcessamento ? 'text-green-700' : 'text-gray-600'
                        }`}
                      >
                        {etapa.nome}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(etapaProcessamento / etapasProcessamento.length) * 100}%`,
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {Math.round((etapaProcessamento / etapasProcessamento.length) * 100)}% concluído
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {etapaAtual === 'result' && resultado && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Header do Resultado */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow-sm border border-green-200 p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Correção Concluída!</h2>
                    <p className="text-gray-600">Análise detalhada da sua redação</p>
                  </div>

                  <div className="text-center">
                    <div className="text-5xl font-bold text-green-600 mb-2">
                      {resultado.notaFinal}
                    </div>
                    <div className="text-sm text-gray-500">Nota Final</div>
                    <div
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${getCorNivel(resultado.nivel)}`}
                    >
                      {resultado.nivel}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-green-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {resultado.tempoCorrecao}s
                    </div>
                    <div className="text-sm text-gray-500">Tempo de análise</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {resultado.palavrasAnalisadas}
                    </div>
                    <div className="text-sm text-gray-500">Palavras analisadas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">5</div>
                    <div className="text-sm text-gray-500">Competências avaliadas</div>
                  </div>
                </div>
              </div>

              {/* Competências Detalhadas */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {resultado.competencias.map((comp, index) => (
                  <motion.div
                    key={comp.numero}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 bg-${comp.cor}-100 rounded-lg flex items-center justify-center`}
                        >
                          <span className={`text-${comp.cor}-600 font-bold`}>C{comp.numero}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{comp.nome}</h3>
                          <p className="text-sm text-gray-500">{comp.feedback}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div
                          className={`text-2xl font-bold ${getCorNota(comp.nota).split(' ')[0]}`}
                        >
                          {comp.nota}
                        </div>
                        <div className="text-sm text-gray-500">/{comp.maxNota}</div>
                      </div>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div
                        className={`bg-${comp.cor}-500 h-2 rounded-full transition-all duration-1000`}
                        style={{ width: `${(comp.nota / comp.maxNota) * 100}%` }}
                      />
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-green-700 mb-1">✓ Pontos Fortes</h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {comp.pontosFortesDetalhados.map((ponto, i) => (
                            <li key={i}>• {ponto}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-orange-700 mb-1">⚠ A Melhorar</h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {comp.pontosAMelhorar.map((ponto, i) => (
                            <li key={i}>• {ponto}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Feedback Geral */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Pontos Fortes Gerais</span>
                  </h3>

                  <ul className="space-y-2">
                    {resultado.pontosFortesGerais.map((ponto, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Star className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{ponto}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-orange-500" />
                    <span>Sugestões de Melhoria</span>
                  </h3>

                  <ul className="space-y-2">
                    {resultado.sugestoesPraticas.map((sugestao, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <ArrowRight className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{sugestao}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Ações */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={resetarCorrecao}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <FileText className="h-5 w-5" />
                  <span>Corrigir Nova Redação</span>
                </button>

                <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                  <Download className="h-5 w-5" />
                  <span>Baixar Relatório</span>
                </button>

                <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
                  <Share2 className="h-5 w-5" />
                  <span>Compartilhar</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
}

CorrecaoPage.displayName = "CorrecaoPage";
export default CorrecaoPage;
