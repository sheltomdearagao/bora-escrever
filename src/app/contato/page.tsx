'use client';

import { motion } from 'framer-motion';
import AppLayout from '@/components/layout/AppLayout';
import {
  Mail,
  MessageCircle,
  Phone,
  MapPin,
  Clock,
  Send,
  User,
  FileText,
  HelpCircle,
  Zap,
} from 'lucide-react';

function ContatoPage() {
  const canaisContato = [
    {
      icone: MessageCircle,
      titulo: 'Chat Online',
      descricao: 'Atendimento instantâneo via chat',
      info: 'Disponível 24/7',
      acao: 'Iniciar Chat',
      cor: 'blue',
      link: '/chat',
    },
    {
      icone: Mail,
      titulo: 'E-mail',
      descricao: 'Envie sua dúvida por e-mail',
      info: 'contato@boraescrever.com.br',
      acao: 'Enviar E-mail',
      cor: 'green',
      link: 'mailto:contato@boraescrever.com.br',
    },
    {
      icone: Phone,
      titulo: 'WhatsApp',
      descricao: 'Fale conosco pelo WhatsApp',
      info: '(11) 99999-9999',
      acao: 'Chamar no WhatsApp',
      cor: 'emerald',
      link: 'https://wa.me/5511999999999',
    },
  ];

  const faq = [
    {
      pergunta: 'Como funciona a correção automática?',
      resposta:
        'Nossa IA analisa sua redação baseada nas 5 competências do ENEM, oferecendo feedback detalhado em segundos. O processo é totalmente automatizado e preciso.',
    },
    {
      pergunta: 'A correção é realmente confiável?',
      resposta:
        'Sim! Nossa tecnologia foi desenvolvida com base nos critérios oficiais do ENEM e validada por especialistas em educação. Oferecemos precisão comparável à correção humana.',
    },
    {
      pergunta: 'Posso corrigir quantas redações quiser?',
      resposta:
        'Oferecemos diferentes planos para atender suas necessidades. Desde correções avulsas até planos ilimitados para estudantes que praticam intensivamente.',
    },
    {
      pergunta: 'Meus dados estão seguros?',
      resposta:
        'Absolutamente! Seguimos rigorosamente a LGPD e utilizamos criptografia de ponta para proteger seus dados pessoais e suas redações.',
    },
    {
      pergunta: 'Como acompanho minha evolução?',
      resposta:
        'Nossa plataforma oferece um painel completo de progresso, onde você pode ver sua evolução ao longo do tempo, estatísticas detalhadas e histórico de redações.',
    },
  ];

  const horarios = [
    { dia: 'Segunda a Sexta', horario: '8h às 18h' },
    { dia: 'Sábado', horario: '9h às 15h' },
    { dia: 'Domingo', horario: 'Chat online 24h' },
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
            Entre em <span className="text-blue-600">Contato</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Precisa de ajuda? Tem alguma dúvida? Nossa equipe especializada está pronta para atender
            você da melhor forma possível.
          </p>
        </motion.div>

        {/* Canais de Contato */}
        <section className="space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-900 text-center"
          >
            Como Podemos Ajudar?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {canaisContato.map((canal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all group"
              >
                <div
                  className={`w-16 h-16 bg-${canal.cor}-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                >
                  <canal.icone className={`h-8 w-8 text-${canal.cor}-600`} />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                  {canal.titulo}
                </h3>

                <p className="text-gray-600 text-center mb-3">{canal.descricao}</p>

                <p className={`text-${canal.cor}-600 font-medium text-center mb-4`}>{canal.info}</p>

                <a
                  href={canal.link}
                  className={`w-full inline-flex items-center justify-center space-x-2 px-4 py-2 bg-${canal.cor}-600 text-white rounded-lg hover:bg-${canal.cor}-700 transition-colors`}
                >
                  <span>{canal.acao}</span>
                  <Send className="h-4 w-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Formulário de Contato */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Envie sua Mensagem</h2>

          <form className="max-w-2xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="assunto" className="block text-sm font-medium text-gray-700 mb-2">
                Assunto
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select
                  id="assunto"
                  name="assunto"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Selecione o assunto</option>
                  <option value="duvida-tecnica">Dúvida Técnica</option>
                  <option value="problema-correcao">Problema na Correção</option>
                  <option value="sugestao">Sugestão</option>
                  <option value="parceria">Parceria</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-2">
                Mensagem
              </label>
              <textarea
                id="mensagem"
                name="mensagem"
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Descreva sua dúvida ou mensagem..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Send className="h-5 w-5" />
              <span>Enviar Mensagem</span>
            </button>
          </form>
        </motion.section>

        {/* FAQ */}
        <section className="space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-900 text-center"
          >
            Perguntas Frequentes
          </motion.h2>

          <div className="space-y-4">
            {faq.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <HelpCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.pergunta}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.resposta}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Informações Adicionais */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Horários de Atendimento */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Clock className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">Horários de Atendimento</h3>
            </div>

            <div className="space-y-3">
              {horarios.map((horario, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                >
                  <span className="text-gray-700">{horario.dia}</span>
                  <span className="font-medium text-gray-900">{horario.horario}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Chat Online:</strong> Disponível 24 horas por dia, 7 dias por semana
              </p>
            </div>
          </motion.div>

          {/* Localização */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <MapPin className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">Nossa Localização</h3>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Endereço</h4>
                <p className="text-gray-600">
                  Av. Paulista, 1000 - Sala 1001
                  <br />
                  Bela Vista, São Paulo - SP
                  <br />
                  CEP: 01310-100
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-1">Como Chegar</h4>
                <p className="text-gray-600 text-sm">
                  Estação Trianon-MASP (Linha Verde)
                  <br />A 2 minutos a pé da estação
                </p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-700">
                <strong>Atendimento presencial:</strong> Apenas com agendamento prévio
              </p>
            </div>
          </motion.div>
        </div>

        {/* CTA Final */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 text-center"
        >
          <Zap className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ainda tem dúvidas?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Nossa equipe está sempre pronta para ajudar. Entre em contato conosco através do canal
            que preferir e teremos prazer em atendê-lo.
          </p>
          <a
            href="/chat"
            className="inline-flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <MessageCircle className="h-5 w-5" />
            <span>Falar com Especialista</span>
          </a>
        </motion.section>
      </div>
    </AppLayout>
  );
}

ContatoPage.displayName = "ContatoPage";

export default ContatoPage;
