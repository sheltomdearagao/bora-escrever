'use client';

import { motion } from 'framer-motion';
import AppLayout from '@/components/layout/AppLayout';
import { Users, Target, Heart, Award, BookOpen, Zap, Shield, TrendingUp } from 'lucide-react';

function SobrePage() {
  const valores = [
    {
      icone: Target,
      titulo: 'Excelência',
      descricao: 'Buscamos sempre a melhor qualidade em nossos serviços educacionais.',
    },
    {
      icone: Heart,
      titulo: 'Paixão pela Educação',
      descricao: 'Acreditamos no poder transformador da educação na vida das pessoas.',
    },
    {
      icone: Users,
      titulo: 'Foco no Estudante',
      descricao: 'Cada decisão é tomada pensando no sucesso dos nossos estudantes.',
    },
    {
      icone: Shield,
      titulo: 'Transparência',
      descricao: 'Mantemos total transparência em nossos processos e políticas.',
    },
  ];

  const numeros = [
    { numero: '50K+', label: 'Estudantes Ativos' },
    { numero: '200K+', label: 'Redações Corrigidas' },
    { numero: '95%', label: 'Satisfação dos Usuários' },
    { numero: '24/7', label: 'Suporte Disponível' },
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
            Sobre o <span className="text-blue-600">Bora Escrever</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Somos uma plataforma educacional brasileira dedicada a revolucionar o ensino de redação
            ENEM através da tecnologia e inovação.
          </p>
        </motion.div>

        {/* Nossa História */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Nossa História</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  O Bora Escrever nasceu da necessidade de democratizar o acesso a uma educação de
                  qualidade em redação ENEM. Percebemos que muitos estudantes brasileiros não tinham
                  acesso a correções detalhadas e feedback personalizado.
                </p>
                <p>
                  Em 2024, decidimos unir tecnologia de ponta com expertise educacional para criar
                  uma plataforma que oferece correção automática com inteligência artificial,
                  mantendo a qualidade e precisão de uma correção humana.
                </p>
                <p>
                  Hoje, somos referência em educação digital, ajudando milhares de estudantes a
                  alcançarem seus sonhos no ENEM e vestibulares.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6">
              <div className="grid grid-cols-2 gap-4">
                {numeros.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl font-bold text-blue-600">{item.numero}</div>
                    <div className="text-sm text-gray-600">{item.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Missão, Visão e Valores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-blue-50 rounded-xl p-6 text-center"
          >
            <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Missão</h3>
            <p className="text-gray-600">
              Democratizar o acesso à educação de qualidade em redação ENEM, utilizando tecnologia
              para oferecer feedback personalizado e eficiente a todos os estudantes brasileiros.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-purple-50 rounded-xl p-6 text-center"
          >
            <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Visão</h3>
            <p className="text-gray-600">
              Ser a principal plataforma educacional do Brasil, reconhecida pela excelência em
              ensino de redação e pela transformação positiva na vida dos estudantes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-green-50 rounded-xl p-6 text-center"
          >
            <Heart className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Valores</h3>
            <p className="text-gray-600">
              Excelência, inovação, transparência e foco no estudante. Acreditamos que a educação é
              um direito fundamental e trabalhamos para torná-la acessível a todos.
            </p>
          </motion.div>
        </div>

        {/* Nossos Valores Detalhados */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">O que nos Move</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {valores.map((valor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <valor.icone className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{valor.titulo}</h3>
                  <p className="text-gray-600">{valor.descricao}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Tecnologia e Inovação */}
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
              Utilizamos inteligência artificial avançada para oferecer correções precisas e
              feedback personalizado. Nossa plataforma é desenvolvida com as mais modernas
              tecnologias, garantindo segurança, velocidade e uma experiência excepcional para
              nossos usuários.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">IA Educacional</h3>
                <p className="text-sm text-gray-600">Correção inteligente e precisa</p>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">Segurança Total</h3>
                <p className="text-sm text-gray-600">Dados protegidos conforme LGPD</p>
              </div>
              <div className="text-center">
                <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">Qualidade Garantida</h3>
                <p className="text-sm text-gray-600">Padrão ENEM de correção</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Compromisso com a Privacidade */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
        >
          <div className="text-center space-y-4">
            <Shield className="h-12 w-12 text-green-600 mx-auto" />
            <h2 className="text-2xl font-bold text-gray-900">Compromisso com a Privacidade</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Levamos a sério a proteção dos seus dados. Seguimos rigorosamente as diretrizes da
              LGPD (Lei Geral de Proteção de Dados) e utilizamos as melhores práticas de segurança
              para garantir que suas informações estejam sempre protegidas.
            </p>
          </div>
        </motion.section>
      </div>
    </AppLayout>
  );
}

SobrePage.displayName = "SobrePage";

export default SobrePage;
