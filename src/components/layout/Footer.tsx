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

import { useTheme } from '@/contexts/ThemeContext'; // Import useTheme
import styles from './Footer.module.css'; // Import CSS Modules

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme(); // Use theme

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

  // Helper to apply theme classes
  const themeClass = (lightClass: string, darkClass: string) =>
    theme === 'dark' ? darkClass : lightClass;

  return (
    <footer className={`${styles.footerBase} ${themeClass(styles.footerBaseLight, styles.footerBaseDark)}`}>
      <div className={styles.container}>
        {/* Conteúdo Principal */}
        <div className={styles.mainContentGrid}>
          {/* Logo e Descrição */}
          <div className={styles.logoSection}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={styles.logoSectionContent}
            >
              <div className={styles.logoHeader}>
                <div className={styles.logoIconContainer}>
                  <span className={styles.logoIconText}>BE</span>
                </div>
                <div>
                  <h3 className={`${styles.logoTitle} ${themeClass(styles.logoTitleLight, styles.logoTitleDark)}`}>
                    Bora Escrever
                  </h3>
                  <p className={`${styles.logoSubtitle} ${themeClass(styles.logoSubtitleLight, styles.logoSubtitleDark)}`}>
                    Plataforma Educacional
                  </p>
                </div>
              </div>

              <p className={`${styles.descriptionText} ${themeClass(styles.descriptionTextLight, styles.descriptionTextDark)}`}>
                A plataforma mais completa para preparação de redação ENEM. Correção automática com
                IA, feedback personalizado e muito mais.
              </p>

              <div className={styles.socialIconsContainer}>
                {redesSociais.map((rede) => (
                  <a
                    key={rede.label}
                    href={rede.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.socialIconLink} ${themeClass(styles.socialIconLinkLight, styles.socialIconLinkDark)}`}
                    aria-label={rede.label}
                  >
                    <rede.icon className={styles.socialIcon} />
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
              <h4 className={`${styles.linksSectionTitle} ${themeClass(styles.linksSectionTitleLight, styles.linksSectionTitleDark)}`}>
                Sobre
              </h4>
              <ul className={styles.linksList}>
                {linksSobre.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`${styles.linkItem} ${themeClass(styles.linkItemLight, styles.linkItemDark)}`}
                    >
                      <link.icon className={styles.linkItemIcon} />
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
              <h4 className={`${styles.linksSectionTitle} ${themeClass(styles.linksSectionTitleLight, styles.linksSectionTitleDark)}`}>
                Legal
              </h4>
              <ul className={styles.linksList}>
                {linksLegais.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`${styles.linkItem} ${themeClass(styles.linkItemLight, styles.linkItemDark)}`}
                    >
                      <link.icon className={styles.linkItemIcon} />
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
              <h4 className={`${styles.linksSectionTitle} ${themeClass(styles.linksSectionTitleLight, styles.linksSectionTitleDark)}`}>
                Contato
              </h4>
              <div className={styles.contactInfoContainer}>
                <div className={`${styles.contactInfoItem} ${themeClass(styles.contactInfoItemLight, styles.contactInfoItemDark)}`}>
                  <Mail className={styles.contactInfoIcon} />
                  <span>contato@boraescrever.com.br</span>
                </div>
                <div className={`${styles.contactInfoItem} ${themeClass(styles.contactInfoItemLight, styles.contactInfoItemDark)}`}>
                  <Phone className={styles.contactInfoIcon} />
                  <span>(11) 99999-9999</span>
                </div>
                <div className={`${styles.contactInfoItem} ${themeClass(styles.contactInfoItemLight, styles.contactInfoItemDark)}`}>
                  <MapPin className={styles.contactInfoIcon} />
                  <span>São Paulo, SP - Brasil</span>
                </div>
              </div>

              <div className={`${styles.protectedDataBox} ${themeClass(styles.protectedDataBoxLight, styles.protectedDataBoxDark)}`}>
                <div className={styles.protectedDataHeader}>
                  <Shield className={`${styles.protectedDataIcon} ${themeClass(styles.protectedDataIconLight, styles.protectedDataIconDark)}`} />
                  <span className={`${styles.protectedDataTitle} ${themeClass(styles.protectedDataTitleLight, styles.protectedDataTitleDark)}`}>
                    Dados Protegidos
                  </span>
                </div>
                <p className={`${styles.protectedDataText} ${themeClass(styles.protectedDataTextLight, styles.protectedDataTextDark)}`}>
                  Seus dados estão seguros conosco. Conforme LGPD.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Linha Divisória */}
        <div className={`${styles.divider} ${themeClass(styles.dividerLight, styles.dividerDark)}`}></div>

        {/* Copyright */}
        <div className={styles.copyrightSection}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={`${styles.copyrightText} ${themeClass(styles.copyrightTextLight, styles.copyrightTextDark)}`}
          >
            © {currentYear} Bora Escrever. Todos os direitos reservados.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={styles.madeWithLoveContainer}
          >
            <span className={`${styles.madeWithLoveText} ${themeClass(styles.madeWithLoveTextLight, styles.madeWithLoveTextDark)}`}>
              Feito com ❤️ para estudantes brasileiros
            </span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
