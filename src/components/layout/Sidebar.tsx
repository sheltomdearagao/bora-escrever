'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  PenTool,
  TrendingUp,
  BookOpen,
  Lightbulb,
  Gem,
  Building2,
  Users,
  Bot,
  Settings,
  ChevronRight,
  Target,
  Calendar,
  Award,
} from 'lucide-react';

import { useTheme } from '@/contexts/ThemeContext'; // Import useTheme
import styles from './Sidebar.module.css'; // Import CSS Modules

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', href: '/', icon: Home },
  { id: 'escrever', label: 'Escrever Agora', href: '/escrever', icon: PenTool, badge: 'Novo' },
  {
    id: 'progresso',
    label: 'Meu Progresso',
    href: '/progresso',
    icon: TrendingUp,
    children: [
      { id: 'estatisticas', label: 'Estatísticas', href: '/progresso/estatisticas', icon: Target },
      { id: 'historico', label: 'Histórico', href: '/progresso/historico', icon: Calendar },
      { id: 'conquistas', label: 'Conquistas', href: '/progresso/conquistas', icon: Award },
    ],
  },
  { id: 'aulas', label: 'Minhas Aulas', href: '/aulas', icon: BookOpen },
  {
    id: 'estudar',
    label: 'Estudar',
    href: '#', // Parent items with children often use # or are not actual links
    icon: Lightbulb,
    children: [
      { id: 'temas', label: 'Banco de Temas', href: '/temas', icon: BookOpen },
      { id: 'repertorios', label: 'Repertórios', href: '/repertorios', icon: Gem },
      { id: 'estrutura', label: 'Estrutura Textual', href: '/estrutura', icon: Building2 },
    ],
  },
  { id: 'tutoria', label: 'Tutoria Humanizada', href: '/tutoria', icon: Users },
  { id: 'maria', label: 'Chat com MarIA', href: '/maria', icon: Bot, badge: 'IA' },
  { id: 'correcao', label: 'Correção Automática', href: '/correcao', icon: Target, badge: 'Novo'},
  { id: 'configuracoes', label: 'Configurações', href: '/configuracoes', icon: Settings },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { theme } = useTheme(); // Use theme
  const [expandedItems, setExpandedItems] = useState<string[]>(['estudar', 'progresso']); // Keep 'progresso' expanded by default too

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href === '#') return false; // Parent items with href="#" are not active themselves
    return pathname.startsWith(href);
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const active = isActive(item.href);

    const linkClasses = [
      styles.menuItemLink,
      theme === 'dark' ? styles.menuItemLinkDark : styles.menuItemLinkLight,
      active ? (theme === 'dark' ? styles.menuItemActiveDark : styles.menuItemActiveLight) : '',
      level > 0 ? styles.subItem : '',
    ].join(' ');

    const iconClasses = `${styles.menuItemIcon} ${
      active
        ? (theme === 'dark' ? styles.menuItemIconActiveDark : styles.menuItemIconActiveLight)
        : (theme === 'dark' ? styles.menuItemIconDark : styles.menuItemIconLight)
    }`;

    const badgeClasses = (badgeType?: string) => {
      let base = styles.badgeBase;
      if (badgeType === 'Novo') {
        base += ` ${theme === 'dark' ? styles.badgeNovoDark : styles.badgeNovoLight}`;
      } else if (badgeType === 'IA') {
        base += ` ${theme === 'dark' ? styles.badgeIADark : styles.badgeIALight}`;
      }
      return base;
    };

    const chevronIconClass = theme === 'dark' ? styles.chevronIconDark : styles.chevronIconLight;

    const menuItemContent = (
      <motion.div
        whileHover={{ x: level === 0 ? 4 : 2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="w-full" // Ensure motion div takes full width for hover effect
      >
        <div // Changed from <a> to <div> for items with children, Link handles navigation
          className={linkClasses}
          onClick={(e) => {
            if (hasChildren) {
              e.preventDefault();
              toggleExpanded(item.id);
            } else {
              onClose(); // Close sidebar on navigation for non-parent items
            }
          }}
        >
          <div className={styles.menuItemContent}>
            <item.icon className={iconClasses} />
            <span>{item.label}</span>
            {item.badge && (
              <span className={badgeClasses(item.badge)}>
                {item.badge}
              </span>
            )}
          </div>
          {hasChildren && (
            <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronRight className={`${styles.chevronIcon} ${chevronIconClass}`} />
            </motion.div>
          )}
        </div>
      </motion.div>
    );

    return (
      <div key={item.id}>
        {hasChildren ? (
          menuItemContent // Render div wrapper for parent items
        ) : (
          <Link href={item.href} passHref legacyBehavior>
            {menuItemContent}
          </Link>
        )}

        <AnimatePresence>
          {hasChildren && isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={styles.submenuContainer}
            >
              <div className={styles.submenu}>
                {item.children?.map((child) => renderMenuItem(child, level + 1))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <>
      {isOpen && <div className={styles.mobileOverlay} onClick={onClose} />}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -320 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`${styles.sidebarBase} ${
          theme === 'dark' ? styles.sidebarBaseDark : styles.sidebarBaseLight
        }`}
      >
        <div className={`${styles.header} ${theme === 'dark' ? styles.headerDark : styles.headerLight}`}>
          <div className={styles.logoContainer}>
            <div className={styles.logoIconBackground}>
              <span className={styles.logoIconText}>BE</span>
            </div>
            <div>
              <h2 className={`${styles.logoTitle} ${theme === 'dark' ? styles.logoTitleDark : styles.logoTitleLight}`}>
                Bora Escrever
              </h2>
              <p className={`${styles.logoSubtitle} ${theme === 'dark' ? styles.logoSubtitleDark : styles.logoSubtitleLight}`}>
                Plataforma Educacional
              </p>
            </div>
          </div>
        </div>

        <div className={`${styles.userInfo} ${theme === 'dark' ? styles.userInfoDark : styles.userInfoLight}`}>
          <div className={styles.userInfoContainer}>
            <div className={styles.avatar}>
              <span className={styles.avatarText}>JM</span>
            </div>
            <div className={styles.userInfoTextContainer}>
              <p className={`${styles.userName} ${theme === 'dark' ? styles.userNameDark : styles.userNameLight}`}>
                João Marcelo
              </p>
              <p className={`${styles.userStatus} ${theme === 'dark' ? styles.userStatusDark : styles.userStatusLight}`}>
                Estudante Premium
              </p>
            </div>
          </div>
        </div>

        <nav className={styles.navMenu}>
          {menuItems.map((item) => renderMenuItem(item))}
        </nav>

        <div className={`${styles.footer} ${theme === 'dark' ? styles.footerDark : styles.footerLight}`}>
          <div className={`${styles.footerCard} ${theme === 'dark' ? styles.footerCardDark : styles.footerCardLight}`}>
            <div className={styles.footerCardContent}>
              <div className={styles.footerIconContainer}>
                <Award className={styles.footerIcon} />
              </div>
              <div className={styles.footerTextContainer}>
                <p className={`${styles.footerTitle} ${theme === 'dark' ? styles.footerTitleDark : styles.footerTitleLight}`}>
                  Plano Premium
                </p>
                <p className={`${styles.footerSubtitle} ${theme === 'dark' ? styles.footerSubtitleDark : styles.footerSubtitleLight}`}>
                  Acesso completo
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
