import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class BrowserCheckGuard implements CanActivate {
  private readonly REQUIRED_HEADERS = [
    'accept',
    'accept-language',
    'accept-encoding',
    'sec-ch-ua',
    'sec-ch-ua-mobile',
    'sec-ch-ua-platform',
  ];

  private readonly BROWSER_USER_AGENTS = [
    /Mozilla\/5.0/i,
    /Chrome/i,
    /Safari/i,
    /Firefox/i,
    /Edge/i,
    /Opera/i
  ];

  private readonly SUSPICIOUS_PATTERNS = [
    /bot/i,
    /crawl/i,
    /script/i,
    /automated/i,
    /phantom/i,
    /cypress/i,
  ];

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const headers = request.headers;
    const userAgent = headers['user-agent'] || '';

    // Basic header checks
    if (!this.hasValidHeaders(headers)) {
      throw new ForbiddenException('🖕 ⚍∷ ᒲ𝙹m ⊣ᔑ||');
    }

    // User agent checks
    if (!this.isValidUserAgent(userAgent)) {
      throw new ForbiddenException('🖕 ⚍∷ ᒲ𝙹m ⊣ᔑ||');
    }

    // Referer check for certain endpoints
    if (request.method === 'POST' && !headers.referer) {
      throw new ForbiddenException('🖕 ⚍∷ ᒲ𝙹m ⊣ᔑ||');
    }

    // Screen/window properties check
    if (!this.hasValidClientHints(headers)) {
      throw new ForbiddenException('🖕 ⚍∷ ᒲ𝙹m ⊣ᔑ||');
    }

    return true;
  }

  private hasValidHeaders(headers: any): boolean {
    const hasRequired = this.REQUIRED_HEADERS.every(header => 
      headers[header] !== undefined
    );

    const hasValidContentType = !headers['content-type'] || 
      headers['content-type'].includes('application/json');

    return hasRequired && hasValidContentType;
  }

  private isValidUserAgent(userAgent: string): boolean {
    const isBrowserUA = this.BROWSER_USER_AGENTS.some(pattern => 
      pattern.test(userAgent)
    );

    const isSuspicious = this.SUSPICIOUS_PATTERNS.some(pattern =>
      pattern.test(userAgent)
    );

    const hasValidLength = userAgent.length > 20 && userAgent.length < 300;

    return isBrowserUA && !isSuspicious && hasValidLength;
  }

  private hasValidClientHints(headers: any): boolean {
    const platformHint = headers['sec-ch-ua-platform'];
    const mobileHint = headers['sec-ch-ua-mobile'];
    const validPlatforms = ['Windows', 'macOS', 'Linux', 'Android', 'iOS'];

    return (
      platformHint &&
      mobileHint &&
      (validPlatforms.some(p => platformHint.includes(p)) ||
        ['?0', '?1'].includes(mobileHint))
    );
  }
}
