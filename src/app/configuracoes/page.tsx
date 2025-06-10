'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Bell,
  Shield,
  Palette,
  Save,
  Camera,
  Mail,
  Phone,
  School,
  Calendar,
} from 'lucide-react';

import AppLayout from '@/components/layout/AppLayout';

import styles from './ConfiguracoesPage.module.css';

function ConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState('perfil');
  const [formData, setFormData] = useState({
    nome: 'João Marcelo',
    email: 'joao.marcelo@email.com',
    telefone: '(11) 99999-9999',
    escola: 'Colégio São Paulo',
    dataNascimento: '2005-03-15',
    biografia: 'Estudante dedicado preparando-se para o ENEM 2025.',
  });

  const [notificacoes, setNotificacoes] = useState({
    email: true,
    push: false,
    lembretes: true,
    correcoes: true,
    aulas: true,
  });

  const [tema, setTema] = useState('light'); // Local state for theme selection

  const tabs = [
    { id: 'perfil', label: 'Perfil', icon: User },
    { id: 'notificacoes', label: 'Notificações', icon: Bell },
    { id: 'aparencia', label: 'Aparência', icon: Palette },
    { id: 'privacidade', label: 'Privacidade', icon: Shield },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotificacoes((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Simular salvamento
    // console.log('Configurações salvas:', { formData, notificacoes, tema });
    // Aqui você implementaria a lógica de salvamento real
  };

  return (
    <AppLayout>
      <div className={`${styles.container} ${styles.spaceY6}`}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${styles.card} ${styles.cardPadding} ${styles.headerCard}`}
        >
          <div className={styles.headerContent}>
            <div>
              <h1 className={styles.headerTitle}>Configurações</h1>
              <p className={styles.headerSubtitle}>
                Gerencie suas preferências e informações pessoais
              </p>
            </div>
            <button
              onClick={handleSave}
              className={styles.saveButton}
            >
              <Save className={styles.saveButtonIcon} />
              <span>Salvar Alterações</span>
            </button>
          </div>
        </motion.div>

        <div className={styles.mainGrid}>
          {/* Sidebar de Tabs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className={styles.sidebarColumn}
          >
            <div className={`${styles.card} ${styles.cardPaddingSmall} ${styles.tabsNavCard}`}>
              <nav className={styles.tabsNav}>
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${styles.tabButton} ${
                      activeTab === tab.id
                        ? styles.tabButtonActive
                        : styles.tabButtonInactive
                    }`}
                  >
                    <tab.icon className={styles.tabButtonIcon} />
                    <span className={styles.tabButtonLabel}>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Content Area */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={styles.contentColumn}
          >
            <div className={`${styles.card} ${styles.cardPadding} ${styles.tabContentCard}`}>
              {/* Perfil Tab */}
              {activeTab === 'perfil' && (
                <div className={styles.tabContentInner}>
                  <h2 className={styles.tabTitle}>Informações Pessoais</h2>

                  <div className={styles.profileAvatarContainer}>
                    <div className={styles.profileAvatar}>
                      <span className={styles.profileAvatarInitials}>JM</span>
                    </div>
                    <div>
                      <button className={styles.changePhotoButton}>
                        <Camera className={styles.changePhotoButtonIcon} />
                        <span>Alterar Foto</span>
                      </button>
                      <p className={styles.photoHint}>JPG, PNG até 5MB</p>
                    </div>
                  </div>

                  <div className={styles.formGrid}>
                    <div>
                      <label className={styles.formLabel}>Nome Completo</label>
                      <div className={styles.inputWrapper}>
                        <User className={styles.inputIcon} />
                        <input
                          type="text"
                          value={formData.nome}
                          onChange={(e) => handleInputChange('nome', e.target.value)}
                          className={`${styles.formInput} ${styles.formInputWithIcon}`}
                          placeholder="Digite seu nome completo"
                        />
                      </div>
                    </div>

                    <div>
                      <label className={styles.formLabel}>Email</label>
                      <div className={styles.inputWrapper}>
                        <Mail className={styles.inputIcon} />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`${styles.formInput} ${styles.formInputWithIcon}`}
                          placeholder="Digite seu email"
                        />
                      </div>
                    </div>

                    <div>
                      <label className={styles.formLabel}>Telefone</label>
                      <div className={styles.inputWrapper}>
                        <Phone className={styles.inputIcon} />
                        <input
                          type="tel"
                          value={formData.telefone}
                          onChange={(e) => handleInputChange('telefone', e.target.value)}
                          className={`${styles.formInput} ${styles.formInputWithIcon}`}
                          placeholder="Digite seu telefone"
                        />
                      </div>
                    </div>

                    <div>
                      <label className={styles.formLabel}>Escola/Universidade</label>
                      <div className={styles.inputWrapper}>
                        <School className={styles.inputIcon} />
                        <input
                          type="text"
                          value={formData.escola}
                          onChange={(e) => handleInputChange('escola', e.target.value)}
                          className={`${styles.formInput} ${styles.formInputWithIcon}`}
                          placeholder="Digite sua escola/universidade"
                        />
                      </div>
                    </div>

                    <div>
                      <label className={styles.formLabel}>Data de Nascimento</label>
                      <div className={styles.inputWrapper}>
                        <Calendar className={styles.inputIcon} />
                        <input
                          type="date"
                          value={formData.dataNascimento}
                          onChange={(e) => handleInputChange('dataNascimento', e.target.value)}
                          className={`${styles.formInput} ${styles.formInputWithIcon}`}
                          title="Selecione sua data de nascimento"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className={styles.formLabel}>Biografia</label>
                    <textarea
                      value={formData.biografia}
                      onChange={(e) => handleInputChange('biografia', e.target.value)}
                      rows={4}
                      className={styles.formTextarea}
                      placeholder="Conte um pouco sobre você..."
                    />
                  </div>
                </div>
              )}

              {/* Notificações Tab */}
              {activeTab === 'notificacoes' && (
                <div className={styles.tabContentInner}>
                  <h2 className={styles.tabTitle}>Preferências de Notificação</h2>
                  <div className={styles.flexColumnWithGap}>
                    {[
                      { key: 'email', label: 'Notificações por Email', desc: 'Receber atualizações importantes por email'},
                      { key: 'push', label: 'Notificações Push', desc: 'Notificações no navegador' },
                      { key: 'lembretes', label: 'Lembretes de Estudo', desc: 'Lembretes para manter a rotina de estudos'},
                      { key: 'correcoes', label: 'Correções Prontas', desc: 'Avisar quando correções estiverem disponíveis'},
                      { key: 'aulas', label: 'Novas Aulas', desc: 'Notificar sobre novas aulas disponíveis'},
                    ].map((item) => (
                      <div key={item.key} className={styles.notificationItem}>
                        <div className={styles.notificationTextContent}>
                          <h3 className={styles.notificationLabel}>{item.label}</h3>
                          <p className={styles.notificationDescription}>{item.desc}</p>
                        </div>
                        <label className={styles.toggleSwitchLabel}>
                          <input
                            type="checkbox"
                            checked={notificacoes[item.key as keyof typeof notificacoes]}
                            onChange={(e) => handleNotificationChange(item.key, e.target.checked)}
                            className={styles.toggleSwitchInput}
                            aria-label={`Ativar/desativar ${item.label}`}
                          />
                          <div className={styles.toggleSwitchTrack}></div>
                          <div className={styles.toggleSwitchThumbContainer}>
                             <div className={styles.toggleSwitchThumb}></div>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Aparência Tab */}
              {activeTab === 'aparencia' && (
                <div className={styles.tabContentInner}>
                  <h2 className={styles.tabTitle}>Aparência</h2>
                  <div>
                    <h3 className={styles.appearanceSectionTitle}>Tema</h3>
                    <div className={styles.themeOptionsGrid}>
                      {[
                        { id: 'light', label: 'Claro', desc: 'Tema claro padrão' },
                        { id: 'dark', label: 'Escuro', desc: 'Tema escuro para os olhos' },
                        { id: 'auto', label: 'Automático', desc: 'Segue o sistema' },
                      ].map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setTema(option.id)}
                          className={`${styles.themeOptionButton} ${
                            tema === option.id
                              ? styles.themeOptionSelected
                              : styles.themeOptionUnselected
                          }`}
                        >
                          <h4 className={styles.themeOptionTitle}>{option.label}</h4>
                          <p className={styles.themeOptionDescription}>{option.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Privacidade Tab */}
              {activeTab === 'privacidade' && (
                <div className={styles.tabContentInner}>
                  <h2 className={styles.tabTitle}>Privacidade e Segurança</h2>
                  <div className={styles.flexColumnWithGap}>
                    <div className={styles.privacySection}>
                      <h3 className={styles.privacySectionTitle}>Alterar Senha</h3>
                      <p className={styles.privacySectionDescription}>
                        Mantenha sua conta segura com uma senha forte
                      </p>
                      <button className={styles.primaryButton}>
                        Alterar Senha
                      </button>
                    </div>

                    <div className={styles.privacySection}>
                      <h3 className={styles.privacySectionTitle}>Dados da Conta</h3>
                      <p className={styles.privacySectionDescription}>
                        Baixe uma cópia dos seus dados ou exclua sua conta
                      </p>
                      <div className={styles.buttonGroup}>
                        <button className={styles.secondaryButton}>
                          Baixar Dados
                        </button>
                        <button className={styles.dangerButton}>
                          Excluir Conta
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
}

ConfiguracoesPage.displayName = 'ConfiguracoesPage';

export default ConfiguracoesPage;
