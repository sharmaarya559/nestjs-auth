// import { Inject, Injectable } from '@nestjs/common';
// import { ConfigType } from '@nestjs/config';
// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy, VerifyCallback } from 'passport-google-oauth20';
// import { AppService } from 'src/app.service';
// import googleOauthConfig from 'src/config/google-oauth.config';

// @Injectable()
// export class GoogleStrategy extends PassportStrategy(Strategy) {
//   constructor(
//     @Inject(googleOauthConfig.KEY)
//     private googleConfiguration: ConfigType<typeof googleOauthConfig>,
//     private readonly appService: AppService,
//   ) {
//     super({
//       clientID: googleConfiguration.clientID,
//       clientSecret: googleConfiguration.clientSecret,
//       callbackURL: googleConfiguration.callbackUrl,
//       scope: ['email', 'profile'],
//     });
//   }

//   async validate(
//     accessToken: string,
//     refreshToken: string,
//     profile: any,
//     done: VerifyCallback,
//   ) {
//     console.log({ profile });
//     const user = await this.appService.findUser({
//       email: profile.email[0]?.value,
//       firstName: profile.name.givenName,
//       lastName: profile.name.familyName,
//       avatarUrl: profile.photos[0],
//       password: '',
//     });
//     done(null, user);
//   }
// }
