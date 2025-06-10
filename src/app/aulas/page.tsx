'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, BookOpen, Clock, Users, Star, CheckCircle, Lock, Filter, Search } from 'lucide-react';

import AppLayout from '@/components/layout/AppLayout';
import { useTheme } from '@/contexts/ThemeContext';

import styles from './AulasPage.module.css';

function AulasPage() {
  const [filtroAtivo, setFiltroAtivo] = useState('todos');
  const [busca, setBusca] = useState('');
  const { theme } = useTheme();

  const categorias = [
    { id: 'todos', label: 'Todas as Aulas', count: 24 },
    { id: 'estrutura', label: 'Estrutura Textual', count: 8 },
    { id: 'temas', label: 'Temas ENEM', count: 10 },
    { id: 'repertorios', label: 'Repertórios', count: 6 },
  ];

  const aulas = [
    {
      id: 1,
      titulo: 'Introdução à Redação ENEM',
      descricao: 'Aprenda os fundamentos da redação dissertativa-argumentativa',
      categoria: 'estrutura',
      duracao: '45 min',
      nivel: 'Iniciante',
      professor: 'Prof. Ana Silva',
      rating: 4.8,
      assistida: true,
      thumbnail: '/api/placeholder/300/200', // Placeholder, actual image handled by CSS background if chosen
      progresso: 100,
    },
    {
      id: 2,
      titulo: 'Estrutura do Parágrafo Argumentativo',
      descricao: 'Como construir parágrafos convincentes e bem estruturados',
      categoria: 'estrutura',
      duracao: '35 min',
      nivel: 'Intermediário',
      professor: 'Prof. Carlos Santos',
      rating: 4.9,
      assistida: true,
      thumbnail: '/api/placeholder/300/200',
      progresso: 75,
    },
    {
      id: 3,
      titulo: 'Temas de Meio Ambiente no ENEM',
      descricao: 'Análise dos principais temas ambientais cobrados no exame',
      categoria: 'temas',
      duracao: '50 min',
      nivel: 'Intermediário',
      professor: 'Prof. Maria Oliveira',
      rating: 4.7,
      assistida: false,
      thumbnail: '/api/placeholder/300/200',
      progresso: 0,
      premium: true,
    },
    {
      id: 4,
      titulo: 'Repertórios Culturais Essenciais',
      descricao: 'Banco de repertórios para enriquecer suas argumentações',
      categoria: 'repertorios',
      duracao: '60 min',
      nivel: 'Avançado',
      professor: 'Prof. João Pereira',
      rating: 4.9,
      assistida: false,
      thumbnail: '/api/placeholder/300/200',
      progresso: 0,
    },
    {
      id: 5,
      titulo: 'Conectivos e Coesão Textual',
      descricao: 'Domine o uso de conectivos para uma redação mais fluida',
      categoria: 'estrutura',
      duracao: '40 min',
      nivel: 'Intermediário',
      professor: 'Prof. Ana Silva',
      rating: 4.8,
      assistida: false,
      thumbnail: '/api/placeholder/300/200',
      progresso: 0,
    },
    {
      id: 6,
      titulo: 'Proposta de Intervenção Eficaz',
      descricao: 'Como elaborar propostas de intervenção que impressionam',
      categoria: 'estrutura',
      duracao: '55 min',
      nivel: 'Avançado',
      professor: 'Prof. Carlos Santos',
      rating: 4.9,
      assistida: false,
      thumbnail: '/api/placeholder/300/200',
      progresso: 0,
      premium: true,
    },
  ];

  const aulasFiltradas = aulas.filter((aula) => {
    const matchCategoria = filtroAtivo === 'todos' || aula.categoria === filtroAtivo;
    const matchBusca =
      aula.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      aula.descricao.toLowerCase().includes(busca.toLowerCase());
    return matchCategoria && matchBusca;
  });

  const getNivelClass = (nivel: string) => {
    switch (nivel) {
      case 'Iniciante':
        return theme === 'dark' ? styles.nivelInicianteDark : styles.nivelInicianteLight;
      case 'Intermediário':
        return theme === 'dark' ? styles.nivelIntermediarioDark : styles.nivelIntermediarioLight;
      case 'Avançado':
        return theme === 'dark' ? styles.nivelAvancadoDark : styles.nivelAvancadoLight;
      default:
        return theme === 'dark' ? styles.nivelDefaultDark : styles.nivelDefaultLight;
    }
  };

  return (
    <AppLayout>
      <div className={`${styles.container} ${styles.spaceY6}`}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${styles.card} ${theme === 'dark' ? styles.cardDark : styles.cardLight} ${styles.header}`}
        >
          <div className={`${styles.flex} ${styles.flexCol} ${styles.lgFlexRow} ${styles.lgItemsCenter} ${styles.lgJustifyBetween} ${styles.gap4}`}>
            <div>
              <h1
                className={`${styles.headerTitle} ${
                  theme === 'dark' ? styles.headerTitleDark : styles.headerTitleLight
                }`}
              >
                Minhas Aulas
              </h1>
              <p
                className={`${styles.headerSubtitle} ${
                  theme === 'dark' ? styles.headerSubtitleDark : styles.headerSubtitleLight
                }`}
              >
                Acesse conteúdos exclusivos e aprimore suas habilidades
              </p>
            </div>

            {/* Search */}
            <div className={styles.searchContainer}>
              <Search className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Buscar aulas..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className={`${styles.searchInput} ${
                  theme === 'dark' ? styles.searchInputDark : styles.searchInputLight
                }`}
              />
            </div>
          </div>
        </motion.div>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`${styles.card} ${theme === 'dark' ? styles.cardDark : styles.cardLight} ${styles.filterSection}`}
        >
          <div className={styles.filterHeader}>
            <Filter
              className={`${styles.filterIcon} ${
                theme === 'dark' ? styles.filterIconDark : styles.filterIconLight
              }`}
            />
            <h3
              className={`${styles.filterTitle} ${
                theme === 'dark' ? styles.filterTitleDark : styles.filterTitleLight
              }`}
            >
              Categorias
            </h3>
          </div>

          <div className={styles.filterButtonsContainer}>
            {categorias.map((categoria) => (
              <button
                key={categoria.id}
                onClick={() => setFiltroAtivo(categoria.id)}
                className={`${styles.filterButton} ${
                  filtroAtivo === categoria.id
                    ? styles.filterButtonActive
                    : theme === 'dark'
                      ? styles.filterButtonInactiveDark
                      : styles.filterButtonInactiveLight
                }`}
              >
                {categoria.label} ({categoria.count})
              </button>
            ))}
          </div>
        </motion.div>

        {/* Lista de Aulas */}
        <div className={styles.aulasGrid}>
          {aulasFiltradas.map((aula, index) => (
            <motion.div
              key={aula.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 2) }}
              className={`${styles.aulaCard} ${
                theme === 'dark' ? styles.aulaCardDark : styles.aulaCardLight
              }`}
            >
              {/* Thumbnail */}
              <div className={styles.aulaThumbnail}> {/* BG Image handled by this class */}
                <div className={styles.thumbnailOverlay}>
                  <div className={styles.thumbnailIconContainer}>
                    {aula.premium && !aula.assistida ? (
                      <Lock className={styles.thumbnailIcon} />
                    ) : aula.assistida ? (
                      <CheckCircle className={styles.thumbnailIcon} />
                    ) : (
                      <Play className={styles.thumbnailIcon} />
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                {aula.progresso > 0 && (
                  <div className={styles.progressBarContainer}>
                    <div
                      className={styles.progressBar}
                      style={{ '--progress-width': `${aula.progresso}%` } as React.CSSProperties}
                    />
                  </div>
                )}

                {/* Premium Badge */}
                {aula.premium && (
                  <div className={styles.premiumBadge}>
                    Premium
                  </div>
                )}
              </div>

              {/* Content */}
              <div className={styles.aulaContent}>
                <div className={styles.aulaNivelBadgeContainer}>
                  <span
                    className={`${styles.aulaNivelBadge} ${getNivelClass(aula.nivel)}`}
                  >
                    {aula.nivel}
                  </span>
                  <div className={styles.ratingContainer}>
                    <Star className={styles.starIcon} />
                    <span className={`${styles.ratingText} ${theme === 'dark' ? styles.ratingTextDark : ''}`}>{aula.rating}</span>
                  </div>
                </div>

                <h3
                  className={`${styles.aulaTitle} ${
                    theme === 'dark' ? styles.aulaTitleDark : styles.aulaTitleLight
                  }`}
                >
                  {aula.titulo}
                </h3>

                <p
                  className={`${styles.aulaDescription} ${
                    theme === 'dark' ? styles.aulaDescriptionDark : styles.aulaDescriptionLight
                  }`}
                >
                  {aula.descricao}
                </p>

                <div
                  className={`${styles.aulaMeta} ${
                    theme === 'dark' ? styles.aulaMetaDark : styles.aulaMetaLight
                  }`}
                >
                  <div className={styles.metaItem}>
                    <Clock className={styles.metaIcon} />
                    <span>{aula.duracao}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <Users className={styles.metaIcon} />
                    <span>{aula.professor}</span>
                  </div>
                </div>

                <button
                  className={`${styles.actionButton} ${
                    aula.premium && !aula.assistida
                      ? theme === 'dark'
                        ? styles.actionButtonPremiumLockedDark
                        : styles.actionButtonPremiumLockedLight
                      : aula.assistida
                        ? theme === 'dark'
                          ? styles.actionButtonAssistidaDark
                          : styles.actionButtonAssistidaLight
                        : styles.actionButtonDefault
                  }`}
                  disabled={aula.premium && !aula.assistida}
                >
                  {aula.premium && !aula.assistida
                    ? 'Upgrade para Premium'
                    : aula.assistida
                      ? aula.progresso === 100
                        ? 'Assistir Novamente'
                        : 'Continuar Assistindo'
                      : 'Assistir Aula'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {aulasFiltradas.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={styles.emptyStateContainer}
          >
            <BookOpen
              className={`${styles.emptyStateIcon} ${
                theme === 'dark' ? styles.emptyStateIconDark : styles.emptyStateIconLight
              }`}
            />
            <h3
              className={`${styles.emptyStateTitle} ${
                theme === 'dark' ? styles.emptyStateTitleDark : styles.emptyStateTitleLight
              }`}
            >
              Nenhuma aula encontrada
            </h3>
            <p
              className={`${
                theme === 'dark' ? styles.emptyStateMessageDark : styles.emptyStateMessageLight
              }`}
            >
              Tente ajustar os filtros ou termos de busca
            </p>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
}

AulasPage.displayName = 'AulasPage';

export default AulasPage;
