// Banco de Temas para Redação ENEM
// Estrutura: cada tema possui título, descrição, ano, e possíveis abordagens

export interface TemaRedacao {
  id: string;
  titulo: string;
  descricao: string;
  ano: number;
  abordagens: string[];
}

export const BANCO_TEMAS: TemaRedacao[] = [
  {
    id: 'enem2024',
    titulo: 'Desafios para a inclusão de pessoas com deficiência no mercado de trabalho no Brasil',
    descricao: 'Refletir sobre as barreiras e soluções para a inclusão de pessoas com deficiência no ambiente profissional brasileiro.',
    ano: 2024,
    abordagens: [
      'Acessibilidade física e digital',
      'Preconceito e capacitismo',
      'Políticas públicas e leis de inclusão',
      'Educação e qualificação profissional',
    ],
  },
  {
    id: 'enem2023',
    titulo: 'O papel do jovem na construção de uma sociedade mais solidária',
    descricao: 'Analisar como a juventude pode contribuir para uma sociedade mais justa e colaborativa.',
    ano: 2023,
    abordagens: [
      'Voluntariado e engajamento social',
      'Educação para valores',
      'Redes sociais e mobilização',
      'Desafios do individualismo',
    ],
  },
  {
    id: 'enem2022',
    titulo: 'Desafios para a valorização de comunidades e povos tradicionais no Brasil',
    descricao: 'Discutir as dificuldades e caminhos para reconhecer e valorizar culturas tradicionais brasileiras.',
    ano: 2022,
    abordagens: [
      'Reconhecimento de direitos',
      'Preservação cultural',
      'Conflitos fundiários',
      'Educação intercultural',
    ],
  },
  // Adicione mais temas conforme necessário
];
