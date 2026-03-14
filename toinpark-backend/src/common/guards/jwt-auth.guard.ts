import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  private readonly _logger = new Logger(JwtAuthGuard.name);

  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

   handleRequest(err: any, user: any, info: any) {
    // Enhanced error messages
    if (info?.name === 'TokenExpiredError') {
      this._logger.warn('Expired token attempt detected.');
      throw new UnauthorizedException('Token has expired. Please login again.');
    }
    
    if (info?.name === 'JsonWebTokenError') {
      this._logger.warn('Invalid token attempt detected.');
      throw new UnauthorizedException('Invalid token. Please login again.');
    }
    
    if (info?.name === 'NotBeforeError') {
      this._logger.warn('Token not active yet attempt detected.');
      throw new UnauthorizedException('Token not active yet.');
    }

    if (err || !user) {
      this._logger.warn('Authentication failed.', err || info);
      throw err || new UnauthorizedException('Authentication failed. Please login again.');
    }

    return user;
  }
  
}