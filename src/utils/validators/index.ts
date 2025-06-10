/**
 * Validation utilities
 */

import { VALIDATION_RULES } from '@/constants';

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  return VALIDATION_RULES.EMAIL.PATTERN.test(email);
}

/**
 * Validate essay content
 */
export function validateEssay(content: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  const wordCount = countWords(content);
  const paragraphCount = countParagraphs(content);

  if (wordCount < VALIDATION_RULES.ESSAY.MIN_WORDS) {
    errors.push(
      `A redação deve ter no mínimo ${VALIDATION_RULES.ESSAY.MIN_WORDS} palavras. Atual: ${wordCount}`
    );
  }

  if (wordCount > VALIDATION_RULES.ESSAY.MAX_WORDS) {
    errors.push(
      `A redação deve ter no máximo ${VALIDATION_RULES.ESSAY.MAX_WORDS} palavras. Atual: ${wordCount}`
    );
  }

  if (paragraphCount < VALIDATION_RULES.ESSAY.MIN_PARAGRAPHS) {
    errors.push(
      `A redação deve ter no mínimo ${VALIDATION_RULES.ESSAY.MIN_PARAGRAPHS} parágrafos. Atual: ${paragraphCount}`
    );
  }

  if (paragraphCount > VALIDATION_RULES.ESSAY.MAX_PARAGRAPHS) {
    errors.push(
      `A redação deve ter no máximo ${VALIDATION_RULES.ESSAY.MAX_PARAGRAPHS} parágrafos. Atual: ${paragraphCount}`
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate title
 */
export function validateTitle(title: string): {
  isValid: boolean;
  error?: string;
} {
  if (!title || title.trim().length === 0) {
    return { isValid: false, error: 'O título é obrigatório' };
  }

  if (title.length < VALIDATION_RULES.TITLE.MIN_LENGTH) {
    return {
      isValid: false,
      error: `O título deve ter no mínimo ${VALIDATION_RULES.TITLE.MIN_LENGTH} caracteres`,
    };
  }

  if (title.length > VALIDATION_RULES.TITLE.MAX_LENGTH) {
    return {
      isValid: false,
      error: `O título deve ter no máximo ${VALIDATION_RULES.TITLE.MAX_LENGTH} caracteres`,
    };
  }

  return { isValid: true };
}

/**
 * Validate required field
 */
export function isRequired(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

/**
 * Validate minimum length
 */
export function minLength(value: string, min: number): boolean {
  return value.length >= min;
}

/**
 * Validate maximum length
 */
export function maxLength(value: string, max: number): boolean {
  return value.length <= max;
}

/**
 * Validate number range
 */
export function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate phone number (Brazilian format)
 */
export function isValidPhone(phone: string): boolean {
  const cleanPhone = phone.replace(/\D/g, '');
  return cleanPhone.length === 10 || cleanPhone.length === 11;
}

/**
 * Validate CPF (Brazilian document)
 */
export function isValidCPF(cpf: string): boolean {
  const cleanCPF = cpf.replace(/\D/g, '');

  if (cleanCPF.length !== 11) return false;

  // Check for known invalid patterns
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;

  // Validate check digits
  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.substring(10, 11))) return false;

  return true;
}

/**
 * Validate date format (DD/MM/YYYY)
 */
export function isValidDate(dateStr: string): boolean {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = dateStr.match(regex);

  if (!match) return false;

  const day = parseInt(match[1]!, 10);
  const month = parseInt(match[2]!, 10);
  const year = parseInt(match[3]!, 10);

  const date = new Date(year, month - 1, day);

  return date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year;
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): {
  isValid: boolean;
  strength: 'weak' | 'medium' | 'strong';
  suggestions: string[];
} {
  const suggestions: string[] = [];
  let strength: 'weak' | 'medium' | 'strong' = 'weak';
  let score = 0;

  if (password.length >= 8) {
    score++;
  } else {
    suggestions.push('Use pelo menos 8 caracteres');
  }

  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
    score++;
  } else {
    suggestions.push('Use letras maiúsculas e minúsculas');
  }

  if (/\d/.test(password)) {
    score++;
  } else {
    suggestions.push('Inclua pelo menos um número');
  }

  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score++;
  } else {
    suggestions.push('Inclua pelo menos um caractere especial');
  }

  if (score >= 4) {
    strength = 'strong';
  } else if (score >= 2) {
    strength = 'medium';
  }

  return {
    isValid: score >= 3,
    strength,
    suggestions,
  };
}

// Helper functions (should be imported from formatters in real implementation)
function countWords(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
}

function countParagraphs(text: string): number {
  return text
    .trim()
    .split(/\n\s*\n/)
    .filter((para) => para.trim().length > 0).length;
}
