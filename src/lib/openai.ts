import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not defined in environment variables');
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Configurações específicas para MarIA
export const MARIA_CONFIG = {
  model: 'gpt-4o-mini',
  temperature: 0.7,
  max_tokens: 1000,
  systemPrompt: `Você é MarIA, uma assistente virtual especializada em redação ENEM e educação brasileira. Suas características:

PERSONALIDADE:
- Amigável, motivadora e paciente
- Usa linguagem jovem e acessível
- Sempre positiva e encorajadora
- Especialista em ENEM e redação

CONHECIMENTOS:
- Estrutura da redação ENEM (introdução, desenvolvimento, conclusão)
- Competências avaliadas no ENEM
- Temas frequentes e tendências
- Repertórios socioculturais brasileiros
- Gramática e norma culta
- Técnicas de argumentação

FUNÇÕES:
- Corrigir redações com feedback detalhado
- Sugerir melhorias específicas
- Explicar conceitos de redação
- Fornecer repertórios relevantes
- Motivar e orientar estudos
- Responder dúvidas sobre ENEM

ESTILO DE RESPOSTA:
- Use emojis moderadamente
- Seja específica e prática
- Dê exemplos concretos
- Mantenha tom motivacional
- Estruture respostas de forma clara

Sempre termine suas respostas perguntando se o estudante tem mais dúvidas ou precisa de ajuda adicional.`,
};

// Função para gerar resposta da MarIA
interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function generateMariaResponse(
  userMessage: string,
  conversationHistory: ChatMessage[] = []
) {
  try {
    const messages: ChatMessage[] = [
      { role: 'system', content: MARIA_CONFIG.systemPrompt },
      ...conversationHistory,
      { role: 'user', content: userMessage },
    ];

    const completion = await openai.chat.completions.create({
      model: MARIA_CONFIG.model,
      messages: messages,
      temperature: MARIA_CONFIG.temperature,
      max_tokens: MARIA_CONFIG.max_tokens,
    });

    return (
      completion.choices[0]?.message?.content ||
      'Desculpe, não consegui processar sua mensagem. Tente novamente!'
    );
  } catch (error) {
    console.error('Erro ao gerar resposta da MarIA:', error);
    throw new Error('Erro interno do servidor. Tente novamente em alguns instantes.');
  }
}

// Função específica para correção de redações
export async function correctEssay(essayText: string) {
  try {
    const correctionPrompt = `Analise esta redação ENEM e forneça uma correção detalhada:

REDAÇÃO:
${essayText}

FORNEÇA:
1. NOTA ESTIMADA (0-1000) para cada competência:
   - C1: Norma culta (0-200)
   - C2: Compreensão do tema (0-200)
   - C3: Argumentação (0-200)
   - C4: Coesão/Coerência (0-200)
   - C5: Proposta de intervenção (0-200)

2. PONTOS POSITIVOS (3-5 itens)

3. PONTOS A MELHORAR (3-5 itens específicos)

4. SUGESTÕES PRÁTICAS para cada competência

5. NOTA FINAL estimada

Seja específica, construtiva e motivadora! 📝✨`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: MARIA_CONFIG.systemPrompt },
        { role: 'user', content: correctionPrompt },
      ],
      temperature: 0.3, // Mais determinística para correções
      max_tokens: 1500,
    });

    return completion.choices[0]?.message?.content || 'Erro ao processar correção.';
  } catch (error) {
    console.error('Erro ao corrigir redação:', error);
    throw new Error('Erro ao processar correção. Tente novamente.');
  }
}

// Função para sugerir repertórios
export async function suggestRepertoire(theme: string) {
  try {
    const repertoirePrompt = `Sugira repertórios socioculturais relevantes para o tema: "${theme}"

FORNEÇA:
1. DADOS ESTATÍSTICOS (3 dados com fontes)
2. REFERÊNCIAS HISTÓRICAS (2-3 exemplos)
3. OBRAS CULTURAIS (livros, filmes, músicas)
4. PERSONALIDADES RELEVANTES
5. LEGISLAÇÃO/POLÍTICAS PÚBLICAS
6. EXEMPLOS INTERNACIONAIS

Para cada item, explique COMO usar na redação de forma prática.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: MARIA_CONFIG.systemPrompt },
        { role: 'user', content: repertoirePrompt },
      ],
      temperature: 0.5,
      max_tokens: 1200,
    });

    return completion.choices[0]?.message?.content || 'Erro ao gerar repertórios.';
  } catch (error) {
    console.error('Erro ao sugerir repertórios:', error);
    throw new Error('Erro ao gerar repertórios. Tente novamente.');
  }
}
