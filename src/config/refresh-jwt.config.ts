import { registerAs } from '@nestjs/config';

export default registerAs('refresh-jwt', () => ({
  secret: process.env.REFRESH_SECRET_KEY,
  expiresIn: process.env.REFRESH_EXPIRES_IN,
}));
