import { NextRequest, NextResponse } from 'next/server';
import { generateMariaResponse } from '@/lib/openai';

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error("A variável OPENAI_API_KEY não está definida no ambiente. Por favor, tente novamente em outro momento.");
}
export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Mensagem é obrigatória' }, { status: 400 });
    }

    const response = await generateMariaResponse(message, conversationHistory || []);

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Erro na API do chat MarIA:', error);

    return NextResponse.json(
      {
        error: 'Erro interno do servidor. Tente novamente em alguns instantes.',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: ' do Chat MarIA está funcionando!',
    endpoints: {
      chat: 'POST //maria/chat',
      correction: 'POST //maria/correction',
      repertoire: 'POST /api/maria/repertoire',
    },
  });
}
