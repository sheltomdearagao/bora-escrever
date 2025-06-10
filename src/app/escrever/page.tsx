'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AppLayout from '@/components/layout/AppLayout';
import { useTheme } from '@/contexts/ThemeContext';
import { Save, FileText, Clock, Target, Lightbulb, BookOpen, Send } from 'lucide-react';

function EscreverPage() {
  const [tema, setTema] = useState('');
  const [redacao, setRedacao] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const { theme } = useTheme();

  // Timer para cronometrar o tempo de escrita
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRedacaoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setRedacao(text);
    setWordCount(
      text
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0).length
    );
  };

  const temasSugeridos = [
    'A importância da educação digital no Brasil contemporâneo',
    'Desafios para a preservação do meio ambiente no século XXI',
    'O papel das redes sociais na formação da opinião pública',
    'Caminhos para combater a desigualdade social no Brasil',
    'A influência da tecnologia nas relações humanas',
  ];

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-6">
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
                className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-gray-100 dark:text-gray-100' : 'text-gray-900'
                }`}
              >
                Editor de Redação
              </h1>
              <p
                className={`mt-1 ${
                  theme === 'dark' ? 'text-gray-300 dark:text-gray-300' : 'text-gray-600'
                }`}
              >
                Escreva sua redação e receba feedback personalizado
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div
                className={`flex items-center space-x-2 text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <Clock className="h-4 w-4" />
                <span>
                  {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}
                </span>
              </div>
              <div
                className={`flex items-center space-x-2 text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>{wordCount} palavras</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Editor */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Tema */}
            <div
              className={`rounded-lg shadow-sm border p-6 ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 dark:bg-gray-800 dark:border-gray-700'
                  : 'bg-white border-gray-200'
              }`}
            >
              <label
                className={`block text-sm font-medium mb-3 ${
                  theme === 'dark' ? 'text-gray-200 dark:text-gray-200' : 'text-gray-700'
                }`}
              >
                Tema da Redação
              </label>
              <input
                type="text"
                value={tema}
                onChange={(e) => setTema(e.target.value)}
                placeholder="Digite o tema da sua redação ou escolha um dos sugeridos"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>

            {/* Editor */}
            <div
              className={`rounded-lg shadow-sm border p-6 ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 dark:bg-gray-800 dark:border-gray-700'
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <label
                  className={`block text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-200 dark:text-gray-200' : 'text-gray-700'
                  }`}
                >
                  Sua Redação
                </label>
                <div className="flex items-center space-x-2">
                  <button
                    className={`flex items-center space-x-2 px-3 py-1.5 text-sm rounded-md transition-colors ${
                      theme === 'dark'
                        ? 'text-gray-300 hover:text-gray-100 hover:bg-gray-700 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Save className="h-4 w-4" />
                    <span>Salvar</span>
                  </button>
                </div>
              </div>

              <textarea
                value={redacao}
                onChange={handleRedacaoChange}
                placeholder="Comece a escrever sua redação aqui..."
                className={`w-full h-96 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                style={{ fontFamily: 'Georgia, serif', fontSize: '16px', lineHeight: '1.6' }}
              />

              <div
                className={`flex items-center justify-between mt-4 pt-4 border-t ${
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <div
                  className={`flex items-center space-x-4 text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <span>Mínimo: 30 linhas</span>
                  <span>•</span>
                  <span>Máximo: 30 linhas</span>
                  <span>•</span>
                  <span
                    className={
                      wordCount >= 200 && wordCount <= 400 ? 'text-green-600' : 'text-orange-600'
                    }
                  >
                    {wordCount} palavras
                  </span>
                </div>

                <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  <Send className="h-4 w-4" />
                  <span>Enviar para Correção</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Temas Sugeridos */}
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
                  Temas Sugeridos
                </h3>
              </div>
              <div className="space-y-2">
                {temasSugeridos.map((temaSugerido, index) => (
                  <button
                    key={index}
                    onClick={() => setTema(temaSugerido)}
                    className={`w-full text-left p-3 text-sm rounded-lg transition-colors border ${
                      theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-primary-300 border-gray-600 hover:border-primary-500 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-primary-300 dark:border-gray-600 dark:hover:border-primary-500'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    {temaSugerido}
                  </button>
                ))}
              </div>
            </div>

            {/* Dicas */}
            <div
              className={`rounded-lg shadow-sm border p-6 ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 dark:bg-gray-800 dark:border-gray-700'
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-center space-x-2 mb-4">
                <Lightbulb className="h-5 w-5 text-yellow-600" />
                <h3
                  className={`font-semibold ${
                    theme === 'dark' ? 'text-gray-100 dark:text-gray-100' : 'text-gray-900'
                  }`}
                >
                  Dicas
                </h3>
              </div>
              <div
                className={`space-y-3 text-sm ${
                  theme === 'dark' ? 'text-gray-300 dark:text-gray-300' : 'text-gray-600'
                }`}
              >
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Leia o tema com atenção e identifique as palavras-chave</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Faça um rascunho antes de começar a escrever</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Estruture seu texto: introdução, desenvolvimento e conclusão</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Use repertórios culturais para enriquecer sua argumentação</p>
                </div>
              </div>
            </div>

            {/* Estrutura */}
            <div
              className={`rounded-lg shadow-sm border p-6 ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 dark:bg-gray-800 dark:border-gray-700'
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-5 w-5 text-green-600" />
                <h3
                  className={`font-semibold ${
                    theme === 'dark' ? 'text-gray-100 dark:text-gray-100' : 'text-gray-900'
                  }`}
                >
                  Estrutura
                </h3>
              </div>
              <div className="space-y-3 text-sm">
                <div
                  className={`p-3 rounded-lg border-l-4 border-primary-600 ${
                    theme === 'dark' ? 'bg-primary-900/20' : 'bg-blue-50'
                  }`}
                >
                  <p
                    className={`font-medium ${
                      theme === 'dark' ? 'text-primary-300' : 'text-blue-900'
                    }`}
                  >
                    Introdução
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      theme === 'dark' ? 'text-primary-400' : 'text-blue-700'
                    }`}
                  >
                    Apresente o tema e sua tese
                  </p>
                </div>
                <div
                  className={`p-3 rounded-lg border-l-4 border-green-600 ${
                    theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'
                  }`}
                >
                  <p
                    className={`font-medium ${
                      theme === 'dark' ? 'text-green-300' : 'text-green-900'
                    }`}
                  >
                    Desenvolvimento
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      theme === 'dark' ? 'text-green-400' : 'text-green-700'
                    }`}
                  >
                    2 parágrafos com argumentos
                  </p>
                </div>
                <div
                  className={`p-3 rounded-lg border-l-4 border-purple-600 ${
                    theme === 'dark' ? 'bg-purple-900/20' : 'bg-purple-50'
                  }`}
                >
                  <p
                    className={`font-medium ${
                      theme === 'dark' ? 'text-purple-300' : 'text-purple-900'
                    }`}
                  >
                    Conclusão
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      theme === 'dark' ? 'text-purple-400' : 'text-purple-700'
                    }`}
                  >
                    Retome a tese e proponha solução
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
}

EscreverPage.displayName = "EscreverPage";

export default EscreverPage;
