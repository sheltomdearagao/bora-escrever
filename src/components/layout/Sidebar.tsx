'use client';

import { useState } from 'react';
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
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/',
    icon: Home,
  },
  {
    id: 'escrever',
    label: 'Escrever Agora',
    href: '/escrever',
    icon: PenTool,
    badge: 'Novo',
  },
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
  {
    id: 'aulas',
    label: 'Minhas Aulas',
    href: '/aulas',
    icon: BookOpen,
  },
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
  {
    id: 'tutoria',
    label: 'Tutoria Humanizada',
    href: '/tutoria',
    icon: Users,
  },
  {
    id: 'maria',
    label: 'Chat com MarIA',
    href: '/maria',
    icon: Bot,
    badge: 'IA',
  },
  {
    id: 'correcao',
    label: 'Correção Automática',
    href: '/correcao',
    icon: Target,
    badge: 'Novo',
  },
  {
    id: 'configuracoes',
    label: 'Configurações',
    href: '/configuracoes',
    icon: Settings,
  },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>(['estudar']);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const active = isActive(item.href);

    return (
      <div key={item.id}>
        <motion.div
          whileHover={{ x: level === 0 ? 4 : 2 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <a
            href={hasChildren ? '#' : item.href}
            onClick={(e) => {
              if (hasChildren) {
                e.preventDefault();
                toggleExpanded(item.id);
              } else {
                onClose();
              }
            }}
            className={`
              flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
              ${level > 0 ? 'ml-4 pl-8' : ''}
              ${
                active
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }
            `}
          >
            <div className="flex items-center space-x-3">
              <item.icon className={`h-5 w-5 ${active ? 'text-blue-600' : 'text-gray-500'}`} />
              <span>{item.label}</span>
              {item.badge && (
                <span
                  className={`
                  px-2 py-0.5 text-xs font-medium rounded-full
                  ${item.badge === 'Novo' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}
                `}
                >
                  {item.badge}
                </span>
              )}
            </div>

            {hasChildren && (
              <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </motion.div>
            )}
          </a>
        </motion.div>

        {/* Submenu */}
        <AnimatePresence>
          {hasChildren && isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-1 space-y-1">
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
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : -320,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
        className={`
          fixed top-0 left-0 z-50 h-full w-80 bg-white border-r border-gray-200 shadow-lg
          lg:relative lg:translate-x-0 lg:shadow-none
          flex flex-col
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">BE</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Bora Escrever</h2>
              <p className="text-xs text-gray-500">Plataforma Educacional</p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">JM</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">João Marcelo</p>
              <p className="text-xs text-gray-500 truncate">Estudante Premium</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => renderMenuItem(item))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Award className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Plano Premium</p>
                <p className="text-xs text-gray-500">Acesso completo</p>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
