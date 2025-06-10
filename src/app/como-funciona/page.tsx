'use client';

import { motion } from 'framer-motion';
import AppLayout from '@/components/layout/AppLayout';
import {
  Upload,
  Zap,
  BarChart3,
  Target,
  FileText,
  Bot,
  CheckCircle,
  Clock,
  Award,
  Users,
  Lightbulb,
  TrendingUp,
} from 'lucide-react';

function ComoFuncionaPage() {
  const passos = [
    {
      numero: 1,
      icone: Upload,
      titulo: 'Envie sua Redação',
      descricao:
        'Cole ou digite sua redação na nossa plataforma. Aceitamos textos a partir de 100 caracteres.',
      detalhes:
        'Nossa interface é intuitiva e permite que você cole textos de qualquer fonte ou digite diretamente na plataforma.',
    },
    {
      numero: 2,
      icone: Bot,
      titulo: 'IA Analisa seu Texto',
      descricao:
        'Nossa inteligência artificial especializada analisa sua redação em segundos, avaliando todas as competências do ENEM.',
      detalhes:
        'Utilizamos algoritmos avançados treinados especificamente para os critérios de correção do ENEM.',
    },
    {
      numero: 3,
      icone: BarChart3,
      titulo: 'Receba Feedback Detalhado',
      descricao:
        'Obtenha uma análise completa com nota por competência, pontos fortes e sugestões de melhoria.',
      detalhes: 'Cada competência é avaliada individualmente com feedback específico e acionável.',
    },
    {
      numero: 4,
      icone: TrendingUp,
      titulo: 'Melhore Continuamente',
      descricao:
        'Use nosso feedback para aprimorar suas habilidades e acompanhe sua evolução ao longo do tempo.',
      detalhes: 'Histórico completo de redações e progresso para você ver sua evolução.',
    },
  ];

  const competencias = [
    {
      numero: 'C1',
      nome: 'Domínio da Norma Culta',
      descricao: 'Avaliamos gramática, ortografia, pontuação e concordância.',
      cor: 'blue',
    },
    {
      numero: 'C2',
      nome: 'Compreensão do Tema',
      descricao: 'Verificamos se você entendeu e desenvolveu o tema proposto.',
      cor: 'green',
    },
    {
      numero: 'C3',
      nome: 'Argumentação',
      descricao: 'Analisamos a qualidade dos seus argumentos e repertório sociocultural.',
      cor: 'purple',
    },
    {
      numero: 'C4',
      nome: 'Coesão e Coerência',
      descricao: 'Verificamos a organização das ideias e uso de conectivos.',
      cor: 'orange',
    },
    {
      numero: 'C5',
      nome: 'Proposta de Intervenção',
      descricao: 'Avaliamos sua proposta de solução para o problema apresentado.',
      cor: 'red',
    },
  ];

  const vantagens = [
    {
      icone: Clock,
      titulo: 'Correção Instantânea',
      descricao: 'Receba feedback em segundos, não em dias.',
    },
    {
      icone: Target,
      titulo: 'Precisão ENEM',
      descricao: 'Critérios baseados na matriz oficial do ENEM.',
    },
    {
      icone: Award,
      titulo: 'Feedback Detalhado',
      descricao: 'Análise completa de cada competência.',
    },
    {
      icone: Users,
      titulo: 'Suporte Especializado',
      descricao: 'Equipe pedagógica sempre disponível.',
    },
  ];

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Como <span className="text-blue-600">Funciona</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Descubra como nossa plataforma utiliza inteligência artificial para oferecer correções
            precisas e feedback personalizado em segundos.
          </p>
        </motion.div>

        {/* Processo Passo a Passo */}
        <section className="space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-900 text-center"
          >
            Processo Simples em 4 Passos
          </motion.h2>

          <div className="space-y-8">
            {passos.map((passo, index) => (
              <motion.div
                key={passo.numero}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-lg">{passo.numero}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{passo.titulo}</h3>
                  </div>

                  <p className="text-gray-600 mb-4 text-lg">{passo.descricao}</p>
                  <p className="text-gray-500 text-sm">{passo.detalhes}</p>
                </div>

                <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                  <passo.icone className="h-16 w-16 text-blue-600" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* As 5 Competências */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            As 5 Competências do ENEM
          </h2>

          <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
            Nossa IA avalia sua redação baseada nas mesmas competências utilizadas na correção
            oficial do ENEM, garantindo precisão e confiabilidade.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {competencias.map((comp, index) => (
              <motion.div
                key={comp.numero}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-lg border-2 border-${comp.cor}-200 bg-${comp.cor}-50`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div
                    className={`w-10 h-10 bg-${comp.cor}-500 rounded-lg flex items-center justify-center`}
                  >
                    <span className="text-white font-bold">{comp.numero}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">{comp.nome}</h3>
                </div>
                <p className="text-gray-600 text-sm">{comp.descricao}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Vantagens */}
        <section className="space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-900 text-center"
          >
            Por que Escolher o Bora Escrever?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vantagens.map((vantagem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <vantagem.icone className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{vantagem.titulo}</h3>
                <p className="text-gray-600 text-sm">{vantagem.descricao}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tecnologia */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8"
        >
          <div className="text-center space-y-6">
            <Zap className="h-16 w-16 text-blue-600 mx-auto" />
            <h2 className="text-3xl font-bold text-gray-900">Tecnologia de Ponta</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Utilizamos modelos de inteligência artificial treinados especificamente para correção
              de redações ENEM. Nossa tecnologia combina processamento de linguagem natural com
              expertise pedagógica para oferecer feedback preciso e construtivo.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">Análise Textual</h3>
                <p className="text-sm text-gray-600">Processamento avançado de linguagem</p>
              </div>
              <div className="text-center">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">Validação Pedagógica</h3>
                <p className="text-sm text-gray-600">Critérios validados por especialistas</p>
              </div>
              <div className="text-center">
                <Lightbulb className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">Feedback Inteligente</h3>
                <p className="text-sm text-gray-600">Sugestões personalizadas</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pronto para Começar?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Experimente nossa plataforma gratuitamente e veja como podemos ajudar você a melhorar
            suas redações para o ENEM.
          </p>
          <a
            href="/correcao"
            className="inline-flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Zap className="h-5 w-5" />
            <span>Corrigir Redação Agora</span>
          </a>
        </motion.section>
      </div>
    </AppLayout>
  );
}

ComoFuncionaPage.displayName = "ComoFuncionaPage";

export default ComoFuncionaPage;
