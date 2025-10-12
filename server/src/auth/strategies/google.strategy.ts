import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigType } from '@nestjs/config';
import { AuthService } from '../auth.service';
import googleOauthConfig from '../config/googleOauth.config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(googleOauthConfig.KEY)
    private readonly googleConfig: ConfigType<typeof googleOauthConfig>,
    private readonly authService: AuthService,
  ) {
    if (
      !googleConfig.clientID ||
      !googleConfig.clientSecret ||
      !googleConfig.callbackURL
    ) {
      throw new Error('Google OAuth configuration is incomplete.');
    }
    super({
      clientID: googleConfig.clientID,
      clientSecret: googleConfig.clientSecret,
      callbackURL: googleConfig.callbackURL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: { emails: { value: string }[]; displayName: string },
    done: VerifyCallback,
  ) {
    
    const user = await this.authService.validateGoogleUser({
      email: profile.emails?.[0]?.value || '',
      name: profile.displayName,
    });

    done(null, user);
    // return user
    // request.user
  }
}
