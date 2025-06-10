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

import { useTheme } from '@/contexts/ThemeContext';
import styles from './Sidebar.module.css';

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
    href: '#',
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
  const { theme } = useTheme();
  const [expandedItems, setExpandedItems] = useState<string[]>(['estudar', 'progresso']);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href === '#') return false;
    return pathname.startsWith(href);
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const active = isActive(item.href);

    // Menu items will continue to use CSS Modules for detailed styling including active/hover states
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
        className="w-full"
      >
        <div
          className={linkClasses}
          onClick={(e) => {
            if (hasChildren) {
              e.preventDefault();
              toggleExpanded(item.id);
            } else {
              onClose();
            }
          }}
          role="button" // Added role button for accessibility on div
          tabIndex={0} // Added tabIndex for accessibility
          onKeyDown={(e) => { // Added onKeyDown for accessibility
            if (e.key === 'Enter' || e.key === ' ') {
              if (hasChildren) {
                e.preventDefault();
                toggleExpanded(item.id);
              } else {
                onClose();
                // For actual navigation with Link, this might need to trigger click on Link
              }
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
        {hasChildren || item.href === '#' ? ( // If it has children or href is '#', it's not a direct link
          menuItemContent
        ) : (
          <Link href={item.href} passHref legacyBehavior>
            {/* The motion.div and inner div are part of the link's content and styling */}
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
      {isOpen && <div className={`${styles.mobileOverlay} lg:hidden`} onClick={onClose} />}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -320 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`
          fixed top-0 left-0 z-50 h-full w-80
          shadow-lg lg:relative lg:translate-x-0 lg:shadow-none
          flex flex-col
          ${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}
          border-r
          ${styles.sidebarTransition} // For CSS transitions on properties not covered by motion.aside
        `}
      >
        <div
          className={`
            flex items-center justify-between p-6 border-b
            ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
            ${styles.headerBase} // Keep module class if it has other structural styles like padding
          `}
        >
          <div className={styles.logoContainer}>
            <div className={styles.logoIconBackground}>
              <span className={styles.logoIconText}>BE</span>
            </div>
            <div>
              <h2 className={`text-lg font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                Bora Escrever
              </h2>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Plataforma Educacional
              </p>
            </div>
          </div>
        </div>

        <div
          className={`
            p-4 border-b
            ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}
            ${styles.userInfoBase} // Keep module class if it has other structural styles like padding
          `}
        >
          <div className={styles.userInfoContainer}>
            <div className={styles.avatar}>
              <span className={styles.avatarText}>JM</span>
            </div>
            <div className={styles.userInfoTextContainer}>
              <p className={`text-sm font-medium truncate ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                João Marcelo
              </p>
              <p className={`text-xs truncate ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Estudante Premium
              </p>
            </div>
          </div>
        </div>

        <nav className={styles.navMenu}>
          {menuItems.map((item) => renderMenuItem(item))}
        </nav>

        <div
          className={`
            p-4 border-t
            ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
            ${styles.footerBase} // Keep module class if it has other structural styles like padding
          `}
        >
          <div
            className={`
              p-4 rounded-lg
              ${theme === 'dark' ? 'bg-gradient-to-r from-gray-700 to-gray-800' : 'bg-gradient-to-r from-blue-50 to-purple-50'}
              ${styles.footerCardBase} // Keep module class if it has other structural styles
            `}
          >
            <div className={styles.footerCardContent}>
              <div className={styles.footerIconContainer}>
                <Award className={styles.footerIcon} />
              </div>
              <div className={styles.footerTextContainer}>
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                  Plano Premium
                </p>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
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
