import { NextRequest, NextResponse } from 'next/server';
import { correctEssay } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const { essayText } = await request.json();

    if (!essayText || typeof essayText !== 'string') {
      return NextResponse.json({ error: 'Texto da redação é obrigatório' }, { status: 400 });
    }

    if (essayText.length < 50) {
      return NextResponse.json(
        { error: 'Redação muito curta. Mínimo de 50 caracteres.' },
        { status: 400 }
      );
    }

    const correction = await correctEssay(essayText);

    return NextResponse.json({
      correction,
      essayLength: essayText.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Erro na correção de redação:', error);

    return NextResponse.json(
      {
        error: 'Erro ao processar correção. Tente novamente em alguns instantes.',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 }
    );
  }
}
