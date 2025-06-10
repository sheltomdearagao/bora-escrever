'use client';

import { motion } from 'framer-motion';
import AppLayout from '@/components/layout/AppLayout';
import {
  FileText,
  Shield,
  Users,
  AlertCircle,
  CheckCircle,
  Clock,
  Scale,
  Lock,
} from 'lucide-react';

function TermosDeUsoPage() {
  const secoes = [
    {
      id: 'aceitacao',
      titulo: '1. Aceitação dos Termos',
      icone: CheckCircle,
      conteudo: [
        'Ao acessar e utilizar a plataforma Bora Escrever, você concorda integralmente com estes Termos de Uso.',
        'Se você não concordar com qualquer parte destes termos, não deve utilizar nossos serviços.',
        'Estes termos constituem um acordo legal entre você e a Bora Escrever.',
        'Reservamo-nos o direito de modificar estes termos a qualquer momento, com notificação prévia aos usuários.',
      ],
    },
    {
      id: 'servicos',
      titulo: '2. Descrição dos Serviços',
      icone: FileText,
      conteudo: [
        'A Bora Escrever oferece serviços de correção automática de redações utilizando inteligência artificial.',
        'Nossos serviços incluem análise das 5 competências do ENEM, feedback detalhado e acompanhamento de progresso.',
        'Os serviços são fornecidos "como estão" e podem ser modificados ou descontinuados a nosso critério.',
        'Não garantimos disponibilidade ininterrupta dos serviços, podendo haver manutenções programadas.',
      ],
    },
    {
      id: 'conta',
      titulo: '3. Conta do Usuário',
      icone: Users,
      conteudo: [
        'Para utilizar nossos serviços, você deve criar uma conta fornecendo informações precisas e atualizadas.',
        'Você é responsável por manter a confidencialidade de suas credenciais de acesso.',
        'É proibido compartilhar sua conta com terceiros ou criar múltiplas contas.',
        'Notifique-nos imediatamente sobre qualquer uso não autorizado de sua conta.',
      ],
    },
    {
      id: 'uso-adequado',
      titulo: '4. Uso Adequado da Plataforma',
      icone: Shield,
      conteudo: [
        'Você deve utilizar a plataforma apenas para fins educacionais legítimos.',
        'É proibido tentar burlar, hackear ou comprometer a segurança da plataforma.',
        'Não é permitido usar a plataforma para atividades ilegais ou prejudiciais.',
        'O conteúdo enviado deve ser original e não violar direitos de terceiros.',
      ],
    },
    {
      id: 'propriedade',
      titulo: '5. Propriedade Intelectual',
      icone: Lock,
      conteudo: [
        'Todo o conteúdo da plataforma, incluindo textos, imagens, logos e software, é protegido por direitos autorais.',
        'Você mantém os direitos sobre as redações que envia, mas nos concede licença para processá-las.',
        'É proibida a reprodução, distribuição ou modificação do conteúdo da plataforma sem autorização.',
        'Respeitamos os direitos de propriedade intelectual de terceiros e esperamos o mesmo dos usuários.',
      ],
    },
    {
      id: 'pagamentos',
      titulo: '6. Pagamentos e Reembolsos',
      icone: Scale,
      conteudo: [
        'Os preços dos serviços são claramente informados antes da contratação.',
        'Pagamentos são processados através de parceiros seguros e confiáveis.',
        'Reembolsos podem ser solicitados conforme nossa política específica.',
        'Reservamo-nos o direito de alterar preços com notificação prévia de 30 dias.',
      ],
    },
    {
      id: 'limitacoes',
      titulo: '7. Limitações de Responsabilidade',
      icone: AlertCircle,
      conteudo: [
        'Nossos serviços são fornecidos para fins educacionais e não substituem a avaliação humana oficial.',
        'Não nos responsabilizamos por decisões tomadas com base exclusivamente em nossas correções.',
        'Nossa responsabilidade é limitada ao valor pago pelos serviços.',
        'Não garantimos resultados específicos no ENEM ou outros exames.',
      ],
    },
    {
      id: 'privacidade',
      titulo: '8. Privacidade e Proteção de Dados',
      icone: Shield,
      conteudo: [
        'Coletamos e processamos dados pessoais conforme nossa Política de Privacidade.',
        'Seguimos rigorosamente as diretrizes da LGPD (Lei Geral de Proteção de Dados).',
        'Seus dados são protegidos por medidas de segurança técnicas e organizacionais.',
        'Você tem direito de acessar, corrigir ou excluir seus dados pessoais.',
      ],
    },
    {
      id: 'suspensao',
      titulo: '9. Suspensão e Encerramento',
      icone: AlertCircle,
      conteudo: [
        'Podemos suspender ou encerrar sua conta em caso de violação destes termos.',
        'Você pode encerrar sua conta a qualquer momento através das configurações da plataforma.',
        'Após o encerramento, alguns dados podem ser mantidos conforme exigências legais.',
        'Tentativas de burlar suspensões resultarão em banimento permanente.',
      ],
    },
    {
      id: 'alteracoes',
      titulo: '10. Alterações nos Termos',
      icone: Clock,
      conteudo: [
        'Estes termos podem ser alterados periodicamente para refletir mudanças em nossos serviços.',
        'Usuários serão notificados sobre alterações significativas por e-mail ou através da plataforma.',
        'O uso continuado da plataforma após alterações constitui aceitação dos novos termos.',
        'Versões anteriores dos termos ficam disponíveis para consulta.',
      ],
    },
  ];

  const pontosPrincipais = [
    {
      icone: Shield,
      titulo: 'Segurança Garantida',
      descricao: 'Seus dados e redações são protegidos com criptografia de ponta',
    },
    {
      icone: Scale,
      titulo: 'Transparência Total',
      descricao: 'Termos claros e objetivos, sem pegadinhas ou letras miúdas',
    },
    {
      icone: Users,
      titulo: 'Seus Direitos',
      descricao: 'Você mantém todos os direitos sobre suas redações e dados',
    },
    {
      icone: CheckCircle,
      titulo: 'Conformidade Legal',
      descricao: 'Totalmente adequado à LGPD e legislação brasileira',
    },
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
            Termos de <span className="text-blue-600">Uso</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Conheça seus direitos e responsabilidades ao utilizar a plataforma Bora Escrever. Termos
            claros e transparentes para uma experiência segura.
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>Última atualização: Janeiro de 2025</span>
          </div>
        </motion.div>

        {/* Pontos Principais */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {pontosPrincipais.map((ponto, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ponto.icone className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{ponto.titulo}</h3>
              <p className="text-sm text-gray-600">{ponto.descricao}</p>
            </div>
          ))}
        </motion.section>

        {/* Aviso Importante */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-blue-50 border border-blue-200 rounded-xl p-6"
        >
          <div className="flex items-start space-x-4">
            <AlertCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Importante</h3>
              <p className="text-blue-800 text-sm leading-relaxed">
                Ao utilizar nossa plataforma, você concorda com estes termos de uso. Recomendamos a
                leitura completa para entender seus direitos e responsabilidades. Em caso de
                dúvidas, nossa equipe está disponível para esclarecimentos.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Seções dos Termos */}
        <div className="space-y-8">
          {secoes.map((secao, index) => (
            <motion.section
              key={secao.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <secao.icone className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{secao.titulo}</h2>
              </div>

              <div className="space-y-4">
                {secao.conteudo.map((paragrafo, pIndex) => (
                  <p key={pIndex} className="text-gray-700 leading-relaxed">
                    {paragrafo}
                  </p>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Lei Aplicável */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-xl p-8"
        >
          <div className="flex items-center space-x-4 mb-6">
            <Scale className="h-8 w-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Lei Aplicável e Foro</h2>
          </div>

          <div className="space-y-4 text-gray-700">
            <p>
              Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil,
              especialmente pela Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018) e pelo
              Marco Civil da Internet (Lei nº 12.965/2014).
            </p>
            <p>
              Qualquer controvérsia decorrente destes termos será submetida ao foro da comarca de
              São Paulo, Estado de São Paulo, com exclusão de qualquer outro, por mais privilegiado
              que seja.
            </p>
            <p>
              Para questões relacionadas à proteção de dados pessoais, você pode entrar em contato
              com nosso Encarregado de Dados através do e-mail:
              <a href="mailto:lgpd@boraescrever.com.br" className="text-blue-600 hover:underline">
                lgpd@boraescrever.com.br
              </a>
            </p>
          </div>
        </motion.section>

        {/* Contato */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Dúvidas sobre os Termos?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco. Estamos
            aqui para esclarecer qualquer questão.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contato"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FileText className="h-5 w-5" />
              <span>Fale Conosco</span>
            </a>
            <a
              href="/politica-de-privacidade"
              className="inline-flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Shield className="h-5 w-5" />
              <span>Política de Privacidade</span>
            </a>
          </div>
        </motion.section>
      </div>
    </AppLayout>
  );
}

TermosDeUsoPage.displayName = "TermosDeUsoPage";

export default TermosDeUsoPage;
