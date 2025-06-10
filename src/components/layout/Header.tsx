'use client';

import { useState } from 'react';
import Link from 'next/link'; // Import Link
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Bell, Search, User, Settings, LogOut, ChevronDown } from 'lucide-react';

import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';

import styles from './Header.module.css';

interface HeaderProps {
  onMenuToggle: () => void;
  isSidebarOpen: boolean;
}

export default function Header({ onMenuToggle, isSidebarOpen }: HeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { theme } = useTheme();

  const notifications = [
    { id: 1, title: 'Nova correção disponível', time: '5 min atrás', unread: true },
    { id: 2, title: 'Aula de estrutura textual', time: '1 hora atrás', unread: true },
    { id: 3, title: 'Lembrete: Redação pendente', time: '2 horas atrás', unread: false },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  const iconButtonClass = theme === 'dark' ? styles.iconButtonDark : styles.iconButtonLight;
  const mobileMenuButtonClass = theme === 'dark' ? styles.mobileMenuButtonDark : styles.mobileMenuButtonLight;
  const searchInputClass = theme === 'dark' ? styles.searchInputDark : styles.searchInputLight;
  const dropdownPanelClass = theme === 'dark' ? styles.dropdownPanelDark : styles.dropdownPanelLight;
  const dropdownHeaderClass = theme === 'dark' ? styles.dropdownHeaderDark : styles.dropdownHeaderLight;
  const dropdownTitleClass = theme === 'dark' ? styles.dropdownTitleDark : styles.dropdownTitleLight;
  const notificationItemHoverClass = theme === 'dark' ? styles.notificationItemDark : styles.notificationItemLight;
  const notificationTitleClass = theme === 'dark' ? styles.notificationTitleDark : styles.notificationTitleLight;
  const notificationTimeClass = theme === 'dark' ? styles.notificationTimeDark : styles.notificationTimeLight;
  const notificationItemUnreadClass = theme === 'dark' ? styles.notificationItemUnreadDark : styles.notificationItemUnreadLight;
  const dropdownFooterClass = theme === 'dark' ? styles.dropdownFooterDark : styles.dropdownFooterLight;
  const viewAllButtonClass = theme === 'dark' ? styles.viewAllButtonDark : styles.viewAllButtonLight;
  const profileNameClass = theme === 'dark' ? styles.profileNameDark : styles.profileNameLight;
  const profileDropdownUserInfoClass = theme === 'dark' ? styles.profileDropdownUserInfoDark : styles.profileDropdownUserInfoLight;
  const profileDropdownNameClass = theme === 'dark' ? styles.profileDropdownNameDark : styles.profileDropdownNameLight;
  const profileDropdownEmailClass = theme === 'dark' ? styles.profileDropdownEmailDark : styles.profileDropdownEmailLight;
  const profileDropdownLinkClass = theme === 'dark' ? styles.profileDropdownLinkDark : styles.profileDropdownLinkLight;
  const profileDropdownLogoutSectionClass = theme === 'dark' ? styles.profileDropdownLogoutSectionDark : styles.profileDropdownLogoutSectionLight;
  const logoutButtonClass = theme === 'dark' ? styles.logoutButtonDark : styles.logoutButtonLight;


  return (
    <header
      className={`${styles.headerBase} ${
        theme === 'dark' ? styles.headerBaseDark : styles.headerBaseLight
      }`}
    >
      <div className={styles.headerContainer}>
        {/* Left Section - Logo and Menu */}
        <div className={styles.leftSection}>
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuToggle}
            className={`${styles.mobileMenuButton} ${mobileMenuButtonClass} lg:hidden`}
            aria-label="Toggle menu"
          >
            {isSidebarOpen ? <X className={styles.menuIcon} /> : <Menu className={styles.menuIcon} />}
          </button>

          {/* Logo */}
          <div className={styles.logoContainer}>
            <div className={styles.logoIconBackground}>
              <span className={styles.logoIconText}>BE</span>
            </div>
            <h1
              className={`${styles.logoText} ${styles.hiddenSm} ${
                theme === 'dark' ? styles.logoTextDark : styles.logoTextLight
              }`}
            >
              Bora Escrever
            </h1>
          </div>
        </div>

        {/* Center Section - Search (Desktop) */}
        <div className={styles.centerSection}>
          <div className={styles.searchInputContainer}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Buscar temas, aulas, repertórios..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`${styles.searchInput} ${searchInputClass}`}
            />
          </div>
        </div>

        {/* Right Section - Actions and Profile */}
        <div className={styles.rightSection}>
          {/* Search Button (Mobile) */}
          <button
            className={`${styles.iconButton} ${iconButtonClass} ${styles.mobileSearchButton}`}
            aria-label="Buscar"
          >
            <Search className={styles.buttonIcon} />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className={`${styles.iconButton} ${iconButtonClass}`}
              aria-label="Notificações"
            >
              <Bell className={styles.buttonIcon} />
              {unreadCount > 0 && (
                <span className={styles.notificationBadge}>
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {isNotificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`${styles.dropdownPanel} ${dropdownPanelClass} ${styles.notificationsDropdown}`}
                >
                  <div className={`${styles.dropdownHeader} ${dropdownHeaderClass}`}>
                    <h3 className={`${styles.dropdownTitle} ${dropdownTitleClass}`}>
                      Notificações
                    </h3>
                  </div>
                  <div className={styles.notificationsList}>
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`${styles.notificationItem} ${notificationItemHoverClass} ${
                          notification.unread ? `${styles.notificationItemUnread} ${notificationItemUnreadClass}` : styles.notificationItemRead
                        }`}
                      >
                        <p className={`${styles.notificationTitle} ${notificationTitleClass}`}>{notification.title}</p>
                        <p className={`${styles.notificationTime} ${notificationTimeClass}`}>{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className={`${styles.dropdownFooter} ${dropdownFooterClass}`}>
                    <button className={`${styles.viewAllButton} ${viewAllButtonClass}`}>
                      Ver todas as notificações
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className={`${styles.iconButton} ${iconButtonClass} ${styles.profileButton}`}
              aria-label="Menu do usuário"
            >
              <div className={styles.profileAvatar}>
                <span className={styles.profileAvatarText}>JM</span>
              </div>
              <span className={`${styles.profileName} ${profileNameClass} ${styles.hiddenSm}`}>
                João Marcelo
              </span>
              <ChevronDown className={styles.chevronIcon} />
            </button>

            {/* Profile Dropdown Menu */}
            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`${styles.dropdownPanel} ${dropdownPanelClass} ${styles.profileDropdown}`}
                >
                  <div className={`${styles.profileDropdownUserInfo} ${profileDropdownUserInfoClass}`}>
                    <p className={`${styles.profileDropdownName} ${profileDropdownNameClass}`}>João Marcelo</p>
                    <p className={`${styles.profileDropdownEmail} ${profileDropdownEmailClass}`}>joao.marcelo@email.com</p>
                  </div>

                  <div className={styles.profileDropdownNav}>
                    <Link href="/perfil" passHref legacyBehavior>
                      <a className={`${styles.profileDropdownLink} ${profileDropdownLinkClass}`}>
                        <User className={styles.profileDropdownIcon} />
                        Meu Perfil
                      </a>
                    </Link>
                    <Link href="/configuracoes" passHref legacyBehavior>
                      <a className={`${styles.profileDropdownLink} ${profileDropdownLinkClass}`}>
                        <Settings className={styles.profileDropdownIcon} />
                        Configurações
                      </a>
                    </Link>
                  </div>

                  <div className={`${styles.profileDropdownLogoutSection} ${profileDropdownLogoutSectionClass}`}>
                    <button className={`${styles.logoutButton} ${logoutButtonClass}`}>
                      <LogOut className={styles.profileDropdownIcon} />
                      Sair
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className={styles.mobileSearchContainer}>
        <div className={styles.searchInputContainer}>
          <Search className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`${styles.searchInput} ${searchInputClass}`}
          />
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(isProfileOpen || isNotificationsOpen) && (
        <div
          className={styles.clickOutsideOverlay}
          onClick={() => {
            setIsProfileOpen(false);
            setIsNotificationsOpen(false);
          }}
        />
      )}
    </header>
  );
}
