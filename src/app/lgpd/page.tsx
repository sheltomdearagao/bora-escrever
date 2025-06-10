'use client';

import { motion } from 'framer-motion';
import AppLayout from '@/components/layout/AppLayout';
import {
  Shield,
  Scale,
  Users,
  FileText,
  CheckCircle,
  AlertTriangle,
  Mail,
  Phone,
  Clock,
  Eye,
  Lock,
  Trash2,
  Download,
  Settings,
  UserCheck,
  Gavel,
} from 'lucide-react';

function LGPDPage() {
  const fundamentosLGPD = [
    {
      icone: Users,
      titulo: 'Respeito à Privacidade',
      descricao: 'Tratamento de dados com respeito à privacidade e aos direitos fundamentais',
    },
    {
      icone: Eye,
      titulo: 'Transparência',
      descricao: 'Informações claras sobre o tratamento de dados pessoais',
    },
    {
      icone: Shield,
      titulo: 'Segurança',
      descricao: 'Medidas técnicas e administrativas para proteger os dados',
    },
    {
      icone: Scale,
      titulo: 'Proporcionalidade',
      descricao: 'Tratamento adequado e necessário para as finalidades informadas',
    },
  ];

  const direitosTitular = [
    {
      icone: Eye,
      direito: 'Confirmação e Acesso',
      descricao: 'Confirmar a existência de tratamento e acessar seus dados',
      comoExercer: 'Solicite através do e-mail lgpd@boraescrever.com.br ou pela plataforma',
    },
    {
      icone: Settings,
      direito: 'Correção',
      descricao: 'Corrigir dados incompletos, inexatos ou desatualizados',
      comoExercer: 'Acesse suas configurações de perfil ou entre em contato conosco',
    },
    {
      icone: Trash2,
      direito: 'Eliminação',
      descricao: 'Solicitar a eliminação de dados desnecessários ou excessivos',
      comoExercer: 'Faça a solicitação formal através dos nossos canais oficiais',
    },
    {
      icone: Download,
      direito: 'Portabilidade',
      descricao: 'Receber dados em formato estruturado e de uso comum',
      comoExercer: 'Solicite a exportação dos seus dados através do suporte',
    },
    {
      icone: AlertTriangle,
      direito: 'Oposição',
      descricao: 'Opor-se ao tratamento em casos específicos previstos em lei',
      comoExercer: 'Entre em contato explicando os motivos da oposição',
    },
    {
      icone: Lock,
      direito: 'Revogação do Consentimento',
      descricao: 'Retirar consentimento a qualquer momento',
      comoExercer: 'Acesse as configurações de privacidade na sua conta',
    },
  ];

  const basesLegais = [
    {
      base: 'Consentimento',
      descricao: 'Autorização livre, informada e inequívoca do titular',
      exemplo: 'Newsletter, comunicações promocionais',
    },
    {
      base: 'Execução de Contrato',
      descricao: 'Necessário para execução de contrato do qual o titular é parte',
      exemplo: 'Dados para prestação do serviço de correção',
    },
    {
      base: 'Legítimo Interesse',
      descricao: 'Para atender interesses legítimos do controlador ou terceiros',
      exemplo: 'Segurança da plataforma, prevenção de fraudes',
    },
    {
      base: 'Proteção da Vida',
      descricao: 'Para proteção da vida ou incolumidade física',
      exemplo: 'Situações de emergência médica',
    },
  ];

  const medidas = [
    {
      categoria: 'Técnicas',
      itens: [
        'Criptografia de dados em trânsito e repouso',
        'Controles de acesso baseados em funções',
        'Monitoramento de segurança 24/7',
        'Backups seguros e criptografados',
      ],
    },
    {
      categoria: 'Organizacionais',
      itens: [
        'Políticas internas de proteção de dados',
        'Treinamento regular da equipe',
        'Procedimentos de resposta a incidentes',
        'Auditorias periódicas de conformidade',
      ],
    },
    {
      categoria: 'Administrativas',
      itens: [
        'Designação de Encarregado de Dados',
        'Registro de atividades de tratamento',
        'Avaliação de impacto à proteção de dados',
        'Contratos com fornecedores adequados à LGPD',
      ],
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
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Shield className="h-16 w-16 text-blue-600" />
            <Gavel className="h-16 w-16 text-purple-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            <span className="text-blue-600">LGPD</span> na Bora Escrever
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Conheça como cumprimos a Lei Geral de Proteção de Dados (Lei nº 13.709/2018) e como você
            pode exercer seus direitos como titular de dados pessoais.
          </p>
        </motion.div>

        {/* O que é LGPD */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8"
        >
          <div className="flex items-center space-x-4 mb-6">
            <Scale className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">O que é a LGPD?</h2>
          </div>

          <div className="space-y-4 text-gray-700">
            <p className="text-lg leading-relaxed">
              A Lei Geral de Proteção de Dados (LGPD) é a legislação brasileira que regula o
              tratamento de dados pessoais, garantindo maior controle aos cidadãos sobre suas
              informações pessoais.
            </p>
            <p>
              <strong>Vigência:</strong> A LGPD está em vigor desde setembro de 2020, com sanções
              administrativas aplicáveis desde agosto de 2021.
            </p>
            <p>
              <strong>Objetivo:</strong> Proteger os direitos fundamentais de liberdade e
              privacidade, e o livre desenvolvimento da personalidade da pessoa natural.
            </p>
          </div>
        </motion.section>

        {/* Fundamentos */}
        <section className="space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-900 text-center"
          >
            Fundamentos que Seguimos
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fundamentosLGPD.map((fundamento, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <fundamento.icone className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{fundamento.titulo}</h3>
                <p className="text-sm text-gray-600">{fundamento.descricao}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Seus Direitos */}
        <section className="space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-900 text-center"
          >
            Seus Direitos como Titular
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {direitosTitular.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <item.icone className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.direito}</h3>
                    <p className="text-gray-600 mb-3">{item.descricao}</p>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-sm text-blue-800">
                        <strong>Como exercer:</strong> {item.comoExercer}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Bases Legais */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Bases Legais para Tratamento
          </h2>

          <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
            Tratamos seus dados pessoais apenas com base em fundamentos legais válidos, conforme
            estabelecido pela LGPD.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {basesLegais.map((base, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{base.base}</h3>
                <p className="text-gray-600 mb-3">{base.descricao}</p>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700">
                    <strong>Exemplo:</strong> {base.exemplo}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Medidas de Segurança */}
        <section className="space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-900 text-center"
          >
            Medidas de Segurança Implementadas
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {medidas.map((categoria, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <Shield className="h-6 w-6 text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Medidas {categoria.categoria}
                  </h3>
                </div>

                <ul className="space-y-3">
                  {categoria.itens.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Incidentes de Segurança */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-amber-50 border border-amber-200 rounded-xl p-8"
        >
          <div className="flex items-center space-x-4 mb-6">
            <AlertTriangle className="h-8 w-8 text-amber-600" />
            <h2 className="text-2xl font-bold text-gray-900">Procedimento para Incidentes</h2>
          </div>

          <div className="space-y-4">
            <p className="text-gray-700">
              Em caso de incidente de segurança que possa acarretar risco ou dano relevante aos
              titulares de dados, seguimos o seguinte procedimento:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Detecção</h3>
                <p className="text-sm text-gray-600">
                  Identificação imediata do incidente através de monitoramento contínuo
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Comunicação</h3>
                <p className="text-sm text-gray-600">
                  Notificação à ANPD em até 72h e aos titulares afetados
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Correção</h3>
                <p className="text-sm text-gray-600">
                  Implementação de medidas corretivas e preventivas
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Encarregado de Dados */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
        >
          <div className="flex items-center space-x-4 mb-6">
            <UserCheck className="h-8 w-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              Encarregado de Proteção de Dados (DPO)
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Responsabilidades</h3>
              <ul className="space-y-2">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">
                    Orientar funcionários sobre práticas de proteção de dados
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">
                    Atender solicitações dos titulares de dados
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">
                    Interagir com a Autoridade Nacional de Proteção de Dados
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">
                    Elaborar relatórios de impacto à proteção de dados
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contato</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">E-mail</p>
                    <a
                      href="mailto:lgpd@boraescrever.com.br"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      lgpd@boraescrever.com.br
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Prazo de Resposta</p>
                    <p className="text-gray-600 text-sm">Até 15 dias úteis</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Telefone</p>
                    <p className="text-gray-600 text-sm">(11) 99999-9999</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Formulário de Solicitação */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8"
        >
          <div className="text-center mb-8">
            <FileText className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Exercer Seus Direitos</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Para exercer qualquer um dos seus direitos previstos na LGPD, entre em contato conosco
              através dos canais oficiais.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:lgpd@boraescrever.com.br"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span>Enviar Solicitação</span>
            </a>
            <a
              href="/contato"
              className="inline-flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Phone className="h-5 w-5" />
              <span>Outros Contatos</span>
            </a>
          </div>
        </motion.section>

        {/* Informações Adicionais */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
            Informações Importantes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Autoridade Competente</h3>
              <p className="text-gray-600 text-sm mb-2">
                A Autoridade Nacional de Proteção de Dados (ANPD) é o órgão responsável por zelar
                pela proteção dos dados pessoais no Brasil.
              </p>
              <p className="text-gray-600 text-sm">
                <strong>Site:</strong>
                <a
                  href="https://www.gov.br/anpd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline ml-1"
                >
                  www.gov.br/anpd
                </a>
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Legislação Aplicável</h3>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• Lei nº 13.709/2018 (LGPD)</li>
                <li>• Decreto nº 10.474/2020</li>
                <li>• Regulamentações da ANPD</li>
                <li>• Constituição Federal (Art. 5º, X e XII)</li>
              </ul>
            </div>
          </div>
        </motion.section>
      </div>
    </AppLayout>
  );
}

LGPDPage.displayName = "LGPDPage";

export default LGPDPage;
