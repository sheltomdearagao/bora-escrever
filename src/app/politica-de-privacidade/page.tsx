'use client';

import { motion } from 'framer-motion';
import AppLayout from '@/components/layout/AppLayout';
import {
  Shield,
  Lock,
  Eye,
  Database,
  UserCheck,
  AlertTriangle,
  Clock,
  Mail,
  FileText,
  Settings,
  Trash2,
  Download,
} from 'lucide-react';

function PoliticaPrivacidadePage() {
  const principios = [
    {
      icone: Shield,
      titulo: 'Transparência',
      descricao: 'Informamos claramente como seus dados são coletados e utilizados',
    },
    {
      icone: Lock,
      titulo: 'Segurança',
      descricao: 'Utilizamos as melhores práticas de segurança para proteger seus dados',
    },
    {
      icone: UserCheck,
      titulo: 'Controle',
      descricao: 'Você tem controle total sobre seus dados pessoais',
    },
    {
      icone: Eye,
      titulo: 'Finalidade',
      descricao: 'Coletamos apenas dados necessários para nossos serviços',
    },
  ];

  const dadosColetados = [
    {
      categoria: 'Dados de Identificação',
      exemplos: ['Nome completo', 'E-mail', 'Data de nascimento'],
      finalidade: 'Criação e gerenciamento da conta do usuário',
    },
    {
      categoria: 'Dados de Contato',
      exemplos: ['E-mail', 'Telefone (opcional)'],
      finalidade: 'Comunicação sobre serviços e suporte técnico',
    },
    {
      categoria: 'Dados de Uso',
      exemplos: ['Redações enviadas', 'Histórico de correções', 'Tempo de uso'],
      finalidade: 'Prestação do serviço de correção e análise de progresso',
    },
    {
      categoria: 'Dados Técnicos',
      exemplos: ['Endereço IP', 'Tipo de dispositivo', 'Navegador'],
      finalidade: 'Segurança, análise de performance e melhorias',
    },
  ];

  const direitosUsuario = [
    {
      icone: Eye,
      titulo: 'Acesso',
      descricao: 'Solicitar informações sobre quais dados pessoais possuímos sobre você',
    },
    {
      icone: Settings,
      titulo: 'Correção',
      descricao: 'Corrigir dados pessoais incompletos, inexatos ou desatualizados',
    },
    {
      icone: Trash2,
      titulo: 'Exclusão',
      descricao: 'Solicitar a exclusão de dados pessoais desnecessários ou excessivos',
    },
    {
      icone: Download,
      titulo: 'Portabilidade',
      descricao: 'Receber seus dados em formato estruturado e legível',
    },
    {
      icone: AlertTriangle,
      titulo: 'Oposição',
      descricao: 'Opor-se ao tratamento de dados em determinadas situações',
    },
    {
      icone: Lock,
      titulo: 'Revogação',
      descricao: 'Revogar consentimento a qualquer momento',
    },
  ];

  const medidasSeguranca = [
    'Criptografia de dados em trânsito e em repouso',
    'Controles de acesso rigorosos e autenticação multifator',
    'Monitoramento contínuo de segurança e detecção de ameaças',
    'Backups seguros e planos de recuperação de desastres',
    'Treinamento regular da equipe sobre proteção de dados',
    'Auditorias de segurança periódicas por terceiros especializados',
  ];

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Política de <span className="text-blue-600">Privacidade</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Sua privacidade é nossa prioridade. Conheça como coletamos, utilizamos e protegemos seus
            dados pessoais em conformidade com a LGPD.
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>Última atualização: Janeiro de 2025</span>
          </div>
        </motion.div>

        {/* Princípios */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {principios.map((principio, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <principio.icone className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{principio.titulo}</h3>
              <p className="text-sm text-gray-600">{principio.descricao}</p>
            </div>
          ))}
        </motion.section>

        {/* Introdução LGPD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-blue-50 border border-blue-200 rounded-xl p-8"
        >
          <div className="flex items-start space-x-4">
            <Shield className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">Compromisso com a LGPD</h2>
              <p className="text-blue-800 leading-relaxed mb-4">
                A Bora Escrever está totalmente adequada à Lei Geral de Proteção de Dados (LGPD -
                Lei nº 13.709/2018). Esta política explica como coletamos, usamos, armazenamos e
                protegemos seus dados pessoais.
              </p>
              <p className="text-blue-800 leading-relaxed">
                Nosso compromisso é garantir que seus dados sejam tratados com o máximo cuidado,
                transparência e segurança, respeitando todos os seus direitos como titular de dados
                pessoais.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Dados Coletados */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center">Quais Dados Coletamos</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dadosColetados.map((categoria, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Database className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">{categoria.categoria}</h3>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Exemplos:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {categoria.exemplos.map((exemplo, eIndex) => (
                        <li key={eIndex} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                          <span>{exemplo}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Finalidade:</h4>
                    <p className="text-sm text-gray-600">{categoria.finalidade}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Base Legal */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Base Legal para o Tratamento</h2>

          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <UserCheck className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Consentimento</h3>
                <p className="text-gray-600">
                  Para dados não essenciais, solicitamos seu consentimento expresso, que pode ser
                  revogado a qualquer momento.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <FileText className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Execução de Contrato</h3>
                <p className="text-gray-600">
                  Dados necessários para prestação dos serviços de correção de redação contratados
                  por você.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Shield className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Legítimo Interesse</h3>
                <p className="text-gray-600">
                  Para melhorias dos serviços, segurança da plataforma e prevenção de fraudes,
                  sempre respeitando seus direitos.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Seus Direitos */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            Seus Direitos como Titular
          </h2>

          <p className="text-gray-600 text-center max-w-3xl mx-auto">
            Conforme a LGPD, você possui diversos direitos sobre seus dados pessoais. Facilitamos o
            exercício desses direitos através de nossa plataforma ou contato direto.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {direitosUsuario.map((direito, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <direito.icone className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{direito.titulo}</h3>
                <p className="text-sm text-gray-600">{direito.descricao}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Segurança */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-xl p-8"
        >
          <div className="flex items-center space-x-4 mb-6">
            <Lock className="h-8 w-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Medidas de Segurança</h2>
          </div>

          <p className="text-gray-600 mb-6">
            Implementamos medidas técnicas e organizacionais apropriadas para proteger seus dados
            pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {medidasSeguranca.map((medida, index) => (
              <div key={index} className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm">{medida}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Compartilhamento */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Compartilhamento de Dados</h2>

          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Política de Não Compartilhamento
                </h3>
                <p className="text-gray-600">
                  Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para
                  fins comerciais ou de marketing.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Settings className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Prestadores de Serviço</h3>
                <p className="text-gray-600">
                  Compartilhamos dados apenas com prestadores de serviços essenciais (hospedagem,
                  pagamento, suporte), sempre com contratos de proteção de dados.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <FileText className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Obrigações Legais</h3>
                <p className="text-gray-600">
                  Podemos compartilhar dados quando exigido por lei, ordem judicial ou autoridades
                  competentes.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Retenção de Dados */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
        >
          <div className="flex items-center space-x-4 mb-6">
            <Clock className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Retenção de Dados</h2>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">
              Mantemos seus dados pessoais apenas pelo tempo necessário para as finalidades para as
              quais foram coletados, respeitando os seguintes critérios:
            </p>

            <ul className="space-y-2">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">
                  <strong>Dados de conta:</strong> Mantidos enquanto a conta estiver ativa
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">
                  <strong>Redações:</strong> Mantidas por até 5 anos para fins educacionais
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">
                  <strong>Dados de pagamento:</strong> Conforme exigências fiscais (5 anos)
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">
                  <strong>Logs de segurança:</strong> 6 meses para investigação de incidentes
                </span>
              </li>
            </ul>
          </div>
        </motion.section>

        {/* Contato DPO */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 text-center"
        >
          <Mail className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Encarregado de Proteção de Dados
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Para exercer seus direitos ou esclarecer dúvidas sobre o tratamento de seus dados
            pessoais, entre em contato com nosso Encarregado de Dados.
          </p>
          <div className="space-y-2 mb-6">
            <p className="text-gray-700">
              <strong>E-mail:</strong>
              <a
                href="mailto:lgpd@boraescrever.com.br"
                className="text-blue-600 hover:underline ml-1"
              >
                lgpd@boraescrever.com.br
              </a>
            </p>
            <p className="text-gray-700">
              <strong>Prazo de resposta:</strong> Até 15 dias úteis
            </p>
          </div>
          <a
            href="mailto:lgpd@boraescrever.com.br"
            className="inline-flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Mail className="h-5 w-5" />
            <span>Entrar em Contato</span>
          </a>
        </motion.section>

        {/* Alterações */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Alterações nesta Política</h2>
          <p className="text-gray-600 mb-4">
            Esta Política de Privacidade pode ser atualizada periodicamente para refletir mudanças
            em nossos serviços ou na legislação. Quando isso acontecer:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">
                Notificaremos você por e-mail sobre alterações significativas
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <Eye className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">
                A data da última atualização será sempre indicada no topo da página
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <FileText className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">
                Versões anteriores ficarão disponíveis para consulta
              </span>
            </li>
          </ul>
        </motion.section>
      </div>
    </AppLayout>
  );
}

PoliticaPrivacidadePage.displayName = "PoliticaPrivacidadePage";

export default PoliticaPrivacidadePage;
