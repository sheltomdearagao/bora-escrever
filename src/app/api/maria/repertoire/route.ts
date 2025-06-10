import { NextRequest, NextResponse } from 'next/server';
import { suggestRepertoire } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const { theme } = await request.json();

    if (!theme || typeof theme !== 'string') {
      return NextResponse.json({ error: 'Tema é obrigatório' }, { status: 400 });
    }

    if (theme.length < 3) {
      return NextResponse.json(
        { error: 'Tema muito curto. Mínimo de 3 caracteres.' },
        { status: 400 }
      );
    }

    const repertoire = await suggestRepertoire(theme);

    return NextResponse.json({
      repertoire,
      theme,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Erro ao gerar repertórios:', error);

    return NextResponse.json(
      {
        error: 'Erro ao gerar repertórios. Tente novamente em alguns instantes.',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 }
    );
  }
}
