import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { IAuthUser } from './interface/auth-user-interface.ts';
import { UserSingUpDto } from './dto/user-singup.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from 'src/app.controller';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('sign-up')
  async signUp(@Body() dto: UserSingUpDto) {
    return await this.authService.signUp(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('login')
  async login(@Body() signInDto: Record<string, any>) {
    return await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
  }

  @Public()
  @UseGuards(JwtAuthGuard)
  @Post('sign-in')
  async signIn(@Body() signInDto: Record<string, any>) {
    return await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
  }

  @Get('logout')
  async getUser(@Req() req: any) {
    const userId = await req.user.id;
    return this.authService.logout(Number(userId));
  }

  @Get('refresh')
  async refreshTokens(@Req() req: Request) {
    const user = await req.user;
    return this.authService.refreshTokens(<IAuthUser>user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: Request) {
    console.log('profile');
    return req.user;
  }
}
