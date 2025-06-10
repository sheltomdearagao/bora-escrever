'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Shield,
  FileText,
  Users,
  HelpCircle,
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const linksSobre = [
    { href: '/sobre', label: 'Sobre Nós', icon: Users },
    { href: '/como-funciona', label: 'Como Funciona', icon: HelpCircle },
    { href: '/contato', label: 'Contato', icon: Mail },
  ];

  const linksLegais = [
    { href: '/termos-de-uso', label: 'Termos de Uso', icon: FileText },
    { href: '/politica-de-privacidade', label: 'Política de Privacidade', icon: Shield },
    { href: '/lgpd', label: 'LGPD', icon: Shield },
  ];

  const redesSociais = [
    { href: 'https://facebook.com/boraescrever', icon: Facebook, label: 'Facebook' },
    { href: 'https://instagram.com/boraescrever', icon: Instagram, label: 'Instagram' },
    { href: 'https://twitter.com/boraescrever', icon: Twitter, label: 'Twitter' },
    { href: 'https://youtube.com/boraescrever', icon: Youtube, label: 'YouTube' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Conteúdo Principal */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">BE</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Bora Escrever</h3>
                  <p className="text-sm text-gray-400">Plataforma Educacional</p>
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed">
                A plataforma mais completa para preparação de redação ENEM. Correção automática com
                IA, feedback personalizado e muito mais.
              </p>

              <div className="flex space-x-3">
                {redesSociais.map((rede) => (
                  <a
                    key={rede.label}
                    href={rede.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                    aria-label={rede.label}
                  >
                    <rede.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Sobre */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-4">Sobre</h4>
              <ul className="space-y-3">
                {linksSobre.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      <link.icon className="h-4 w-4" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Links Legais */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-3">
                {linksLegais.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      <link.icon className="h-4 w-4" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contato */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-lg font-semibold mb-4">Contato</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-300 text-sm">
                  <Mail className="h-4 w-4" />
                  <span>contato@boraescrever.com.br</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300 text-sm">
                  <Phone className="h-4 w-4" />
                  <span>(11) 99999-9999</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>São Paulo, SP - Brasil</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="h-4 w-4 text-green-400" />
                  <span className="text-sm font-medium">Dados Protegidos</span>
                </div>
                <p className="text-xs text-gray-400">
                  Seus dados estão seguros conosco. Conforme LGPD.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Linha Divisória */}
        <div className="border-t border-gray-800"></div>

        {/* Copyright */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400 text-sm"
          >
            © {currentYear} Bora Escrever. Todos os direitos reservados.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center space-x-4 mt-4 md:mt-0"
          >
            <span className="text-xs text-gray-500">Feito com ❤️ para estudantes brasileiros</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
