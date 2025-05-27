import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
// import { GoogleAuthGuard } from './auth/guards/google-auth/google-auth.guard';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @UseGuards(GoogleAuthGuard)
  // @Get('google/login')
  // async googleLogin() {}

  // @UseGuards(GoogleAuthGuard)
  // @Get('google/callback')
  // async googleCallback(@Req() req: Request) {
  //   const res = await this.appService;
  // }
}
