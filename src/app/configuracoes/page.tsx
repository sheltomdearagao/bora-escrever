'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AppLayout from '@/components/layout/AppLayout';
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

  const [tema, setTema] = useState('light');

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
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
              <p className="text-gray-600 mt-2">
                Gerencie suas preferências e informações pessoais
              </p>
            </div>
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>Salvar Alterações</span>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar de Tabs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
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
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {/* Perfil Tab */}
              {activeTab === 'perfil' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">Informações Pessoais</h2>

                  {/* Foto de Perfil */}
                  <div className="flex items-center space-x-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-2xl">JM</span>
                    </div>
                    <div>
                      <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Camera className="h-4 w-4" />
                        <span>Alterar Foto</span>
                      </button>
                      <p className="text-sm text-gray-500 mt-1">JPG, PNG até 5MB</p>
                    </div>
                  </div>

                  {/* Formulário */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome Completo
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          type="text"
                          value={formData.nome}
                          onChange={(e) => handleInputChange('nome', e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Digite seu nome completo"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Digite seu email"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefone
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          type="tel"
                          value={formData.telefone}
                          onChange={(e) => handleInputChange('telefone', e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Digite seu telefone"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Escola/Universidade
                      </label>
                      <div className="relative">
                        <School className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          type="text"
                          value={formData.escola}
                          onChange={(e) => handleInputChange('escola', e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Digite sua escola/universidade"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Data de Nascimento
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          type="date"
                          value={formData.dataNascimento}
                          onChange={(e) => handleInputChange('dataNascimento', e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          title="Selecione sua data de nascimento"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Biografia
                    </label>
                    <textarea
                      value={formData.biografia}
                      onChange={(e) => handleInputChange('biografia', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Conte um pouco sobre você..."
                    />
                  </div>
                </div>
              )}

              {/* Notificações Tab */}
              {activeTab === 'notificacoes' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Preferências de Notificação
                  </h2>

                  <div className="space-y-4">
                    {[
                      {
                        key: 'email',
                        label: 'Notificações por Email',
                        desc: 'Receber atualizações importantes por email',
                      },
                      {
                        key: 'push',
                        label: 'Notificações Push',
                        desc: 'Notificações no navegador',
                      },
                      {
                        key: 'lembretes',
                        label: 'Lembretes de Estudo',
                        desc: 'Lembretes para manter a rotina de estudos',
                      },
                      {
                        key: 'correcoes',
                        label: 'Correções Prontas',
                        desc: 'Avisar quando correções estiverem disponíveis',
                      },
                      {
                        key: 'aulas',
                        label: 'Novas Aulas',
                        desc: 'Notificar sobre novas aulas disponíveis',
                      },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                      >
                        <div>
                          <h3 className="font-medium text-gray-900">{item.label}</h3>
                          <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notificacoes[item.key as keyof typeof notificacoes]}
                            onChange={(e) => handleNotificationChange(item.key, e.target.checked)}
                            className="sr-only peer"
                            aria-label={`Ativar/desativar ${item.label}`}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Aparência Tab */}
              {activeTab === 'aparencia' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">Aparência</h2>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">Tema</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { id: 'light', label: 'Claro', desc: 'Tema claro padrão' },
                        { id: 'dark', label: 'Escuro', desc: 'Tema escuro para os olhos' },
                        { id: 'auto', label: 'Automático', desc: 'Segue o sistema' },
                      ].map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setTema(option.id)}
                          className={`p-4 border-2 rounded-lg text-left transition-colors ${
                            tema === option.id
                              ? 'border-blue-600 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <h4 className="font-medium text-gray-900">{option.label}</h4>
                          <p className="text-sm text-gray-500 mt-1">{option.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Privacidade Tab */}
              {activeTab === 'privacidade' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">Privacidade e Segurança</h2>

                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-2">Alterar Senha</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Mantenha sua conta segura com uma senha forte
                      </p>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Alterar Senha
                      </button>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-2">Dados da Conta</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Baixe uma cópia dos seus dados ou exclua sua conta
                      </p>
                      <div className="flex space-x-3">
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                          Baixar Dados
                        </button>
                        <button className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors">
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

ConfiguracoesPage.displayName = "ConfiguracoesPage";

export default ConfiguracoesPage;
