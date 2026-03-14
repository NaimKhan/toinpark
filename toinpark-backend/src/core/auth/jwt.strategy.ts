import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtPayload } from '../../common/interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwtSecret,
    });
  }

  async validate(payload: JwtPayload) {
    console.log('Validating JWT payload:', payload);
    // payload.sub may be a string (we store it as string when signing).
    // Prisma client may expect the id as a string; normalize to string for the query.
    const idForQuery = typeof payload.sub === 'string' ? payload.sub : String(payload.sub);

    const user = await this.prisma.user.findUnique({
      where: { id: idForQuery as any },
      select: {
        id: true,
        email: true,
        username: true,
        userRole: true,
        status: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (user.status !== 'ACTIVE') {
      throw new UnauthorizedException('User account is not active');
    }

    // Return the JWT payload with additional user data
    return {
      ...payload,
      id: user.id,
      username: user.username,
      userRole: user.userRole,
      status: user.status,
    };
  }
}