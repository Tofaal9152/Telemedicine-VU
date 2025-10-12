import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import refreshConfig from '../config/refresh.config';
import { AuthJwtPayload } from '../types/auth-jwtPayload';
import { Request } from 'express';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy,'refresh-jwt') {
  constructor(
    @Inject(refreshConfig.KEY)
    private refreshConfiguration: ConfigType<typeof refreshConfig>,
    private authService: AuthService,
  ) {
    if (!refreshConfiguration.secret) {
      throw new UnauthorizedException('JWT secret is not defined');
    }
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: refreshConfiguration.secret,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: AuthJwtPayload) {
    const userId = payload.sub;
    const body = req.body as { refreshToken: string };
    const refreshToken = body.refreshToken;
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }
    return this.authService.validateRefreshToken(userId, refreshToken);
  }
}
