import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';
import refreshJwtConfig from 'src/config/refresh-jwt.config';
import { UsersService } from 'src/users/users.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private readonly refreshJwtConfiguration: ConfigType<
      typeof refreshJwtConfig
    >,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async validateUser(email: string, password: string) {
    try {
      const user = await this.userService.findUser(email);
      if (!user) {
        throw new UnauthorizedException();
      }
      if (user?.password !== password) {
        throw new UnauthorizedException();
      }
      return user?._id;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async login(user_id: string) {
    try {
      const { access_token, refresh_token } =
        await this.generateTokens(user_id);
      const hashedRefreshtoken = await argon2.hash(refresh_token);
      await this.userService.updateHashedRefreshToken(
        user_id,
        hashedRefreshtoken,
      );
      return { user_id, access_token, refresh_token };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async refreshToken(user_id: string) {
    const payload = { id: user_id };
    const token = await this.jwtService.sign(payload, this.jwtConfiguration);
    return { user_id, token };
  }

  async generateTokens(user_id: string) {
    try {
      const payload = { id: user_id };
      const [access_token, refresh_token] = await Promise.all([
        this.jwtService.sign(payload, this.jwtConfiguration),
        this.jwtService.sign(payload, this.refreshJwtConfiguration),
      ]);
      return { access_token, refresh_token };
    } catch (error) {
      return null;
    }
  }

  async validateRefreshToken(user_id: string, refresh_token: string) {
    try {
      const user = await this.userService.findUserbyId(user_id);
      if (!user || !user?.hashed_refresh_token) {
        throw new UnauthorizedException('Invalid refresh token.');
      }
      const matchToken = await argon2.verify(
        user?.hashed_refresh_token,
        refresh_token,
      );
      if (!matchToken) {
        throw new UnauthorizedException('Invalid refresh token.');
      }
      return { user_id };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token.');
    }
  }

  async signOut(user_id: string) {
    try {
      await this.userService.updateHashedRefreshToken(user_id, null);
      return {
        success: true,
        message: 'Signout successfull.',
      };
    } catch (error) {
      return {
        success: false,
        message: error?.message,
      };
    }
  }
}
