import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Security Headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Base Content Security Policy (Production-focused and stricter)
  let cspScriptSrc = "'self' https://www.googletagmanager.com https://www.google-analytics.com";
  let cspStyleSrc = "'self' https://fonts.googleapis.com";
  let cspConnectSrc = "'self' https://firestore.googleapis.com https://firebase.googleapis.com https://www.google-analytics.com https://api.openai.com";
  // Other directives remain mostly the same
  const cspDefaultSrc = "'self'";
  const cspFontSrc = "'self' https://fonts.gstatic.com";
  const cspImgSrc = "'self' data: https: blob:"; // data: and blob: can be reviewed for stricter policy if not needed for general content
  const cspFrameSrc = "'none'";
  const cspObjectSrc = "'none'";
  const cspBaseUri = "'self'";
  const cspFormAction = "'self'";
  const cspFrameAncestors = "'none'";

  if (isDevelopment) {
    cspScriptSrc += " 'unsafe-eval' 'unsafe-inline'";
    cspStyleSrc += " 'unsafe-inline'";
    // Allow WebSocket connections (ws:) and common local dev hosts for HMR, etc.
    // Also adding '*' for general network access during dev if needed by extensions or other tools.
    cspConnectSrc += " ws://localhost:* ws://127.0.0.1:* http://localhost:* http://127.0.0.1:* *";
  }

  const cspDirectives = [
    `default-src ${cspDefaultSrc}`,
    `script-src ${cspScriptSrc}`,
    `style-src ${cspStyleSrc}`,
    `font-src ${cspFontSrc}`,
    `img-src ${cspImgSrc}`,
    `connect-src ${cspConnectSrc}`,
    `frame-src ${cspFrameSrc}`,
    `object-src ${cspObjectSrc}`,
    `base-uri ${cspBaseUri}`,
    `form-action ${cspFormAction}`,
    `frame-ancestors ${cspFrameAncestors}`,
    'upgrade-insecure-requests',
    'block-all-mixed-content',
  ];

  const cspString = cspDirectives.join('; ');
  response.headers.set('Content-Security-Policy', cspString);

  // HSTS - Only in production
  if (!isDevelopment) {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=63072000; includeSubDomains; preload'
    );
  }

  // Basic rate limiting and suspicious activity logging (can be expanded)
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || (request.geo?.ip) || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';

  if (userAgent.includes('bot') && !userAgent.includes('Googlebot') && !userAgent.includes('bingbot')) {
    console.warn(`Suspicious bot activity from IP: ${ip}, User-Agent: ${userAgent}, Path: ${request.nextUrl.pathname}`);
  }

  const url = request.nextUrl.pathname;
  const suspiciousPatterns = [
    '/wp-admin', '/wp-login.php', '/xmlrpc.php', // WordPress
    '/.env', '/.git', '/.vscode', // Sensitive files/folders
    '/config/server', '/admin/', '/phpmyadmin/', // Admin panels
    '/backup/', '/dump.sql', // Backups
    '/.well-known/pki-validation', // Common for exploits if not properly configured
  ];

  if (suspiciousPatterns.some((pattern) => url.toLowerCase().includes(pattern))) {
    console.warn(`Blocked suspicious request to: ${url} from IP: ${ip}`);
    return new NextResponse('Not Found', { status: 404 });
  }

  const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD']; // HEAD is often used by health checkers
  if (!allowedMethods.includes(request.method.toUpperCase())) {
    console.warn(`Blocked disallowed method: ${request.method} for ${url} from IP: ${ip}`);
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
