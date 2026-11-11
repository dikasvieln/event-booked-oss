import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';
import { IS_PUBLIC_ROUTE } from '../decorators/public.decorator.js';
import { SupabaseAuthService } from '../../modules/auth/supabase-auth.service.js';

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: SupabaseAuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_ROUTE,
      [context.getHandler(), context.getClass()],
    );
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const authorization = request.headers.authorization;
    const match = authorization?.match(/^Bearer\s+([^\s]+)$/i);
    if (!match) {
      throw new UnauthorizedException('A valid bearer token is required.');
    }

    const user = await this.authService.getUser(match[1]);
    if (!user) {
      throw new UnauthorizedException(
        'The bearer token is invalid or expired.',
      );
    }

    request.user = user;
    return true;
  }
}
