/**
 * Maria AI API service
 */

import { internalApi } from './base';
import { API_ENDPOINTS } from '@/constants';
import type { ChatMessage } from '@/types';

export interface MariaResponse {
  message: string;
  timestamp: string;
}

export interface CorrectionResponse {
  scores: {
    C1: number;
    C2: number;
    C3: number;
    C4: number;
    C5: number;
    total: number;
  };
  feedback: {
    positive: string[];
    improvements: string[];
    suggestions: string[];
  };
  detailedAnalysis: string;
}

export interface RepertoireResponse {
  statistics: Array<{
    data: string;
    source: string;
    relevance: string;
  }>;
  historical: Array<{
    event: string;
    context: string;
    usage: string;
  }>;
  cultural: Array<{
    type: 'book' | 'movie' | 'music' | 'art';
    title: string;
    author: string;
    relevance: string;
  }>;
  personalities: Array<{
    name: string;
    contribution: string;
    quote?: string;
  }>;
  legislation: Array<{
    name: string;
    year: number;
    description: string;
  }>;
}

export const mariaApi = {
  /**
   * Send chat message to Maria
   */
  async chat(message: string, conversationHistory: ChatMessage[] = []): Promise<MariaResponse> {
    const response = await internalApi.post<MariaResponse>(API_ENDPOINTS.MARIA.CHAT, {
      message,
      conversationHistory,
    });

    return response.data;
  },

  /**
   * Get essay correction from Maria
   */
  async correctEssay(essayText: string, theme?: string): Promise<CorrectionResponse> {
    const response = await internalApi.post<CorrectionResponse>(API_ENDPOINTS.MARIA.CORRECTION, {
      essayText,
      theme,
    });

    return response.data;
  },

  /**
   * Get repertoire suggestions from Maria
   */
  async getRepertoire(theme: string): Promise<RepertoireResponse> {
    const response = await internalApi.post<RepertoireResponse>(API_ENDPOINTS.MARIA.REPERTOIRE, {
      theme,
    });

    return response.data;
  },

  /**
   * Stream chat response from Maria
   */
  async *streamChat(
    message: string,
    conversationHistory: ChatMessage[] = [],
    onProgress?: (chunk: string) => void
  ): AsyncGenerator<string, void, unknown> {
    const response = await fetch(API_ENDPOINTS.MARIA.CHAT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        conversationHistory,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('No response body');
    }

    const decoder = new TextDecoder();
    let buffer = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              return;
            }
            try {
              const parsed = JSON.parse(data);
              const chunk = parsed.choices?.[0]?.delta?.content || '';
              if (chunk) {
                onProgress?.(chunk);
                yield chunk;
              }
            } catch (e) {
              console.error('Error parsing SSE data:', e);
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  },
};
