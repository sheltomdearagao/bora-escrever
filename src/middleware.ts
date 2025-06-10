import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Security Headers aprimorados
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Content Security Policy mais restritivo
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://firestore.googleapis.com https://firebase.googleapis.com https://www.google-analytics.com https://api.openai.com",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    'upgrade-insecure-requests',
    'block-all-mixed-content',
  ].join('; ');

  response.headers.set('Content-Security-Policy', csp);

  // HSTS aprimorado
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=63072000; includeSubDomains; preload'
    );
  }

  // Rate limiting básico aprimorado
  const ip =
    request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';

  // Log atividade suspeita
  if (
    userAgent.includes('bot') &&
    !userAgent.includes('Googlebot') &&
    !userAgent.includes('bingbot')
  ) {
    console.warn(`Suspicious bot activity from IP: ${ip}, User-Agent: ${userAgent}`);
  }

  // Bloquear padrões de ataque comuns
  const url = request.nextUrl.pathname;
  const suspiciousPatterns = [
    '/wp-admin',
    '/wp-login',
    '/.env',
    '/config',
    '/admin',
    '/phpmyadmin',
    '/.git',
    '/backup',
    '/.well-known',
    '/xmlrpc.php',
    '/wp-config.php',
  ];

  if (suspiciousPatterns.some((pattern) => url.includes(pattern))) {
    console.warn(`Blocked suspicious request to: ${url} from IP: ${ip}`);
    return new NextResponse('Not Found', { status: 404 });
  }

  // Bloquear métodos HTTP não permitidos
  const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'];
  if (!allowedMethods.includes(request.method)) {
    return new NextResponse('Method Not Allowed', { status: 405 });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt (robots file)
     * - sitemap.xml (sitemap file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
