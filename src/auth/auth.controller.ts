import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { IAuthUser } from './interface/auth-user-interface.ts';
import { UserSingUpDto } from './dto/user-singup.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from 'src/app.controller';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserSingInDto } from './dto/user-singin.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('sign-up')
  async signUp(@Body() dto: UserSingUpDto) {
    return await this.authService.signUp(dto);
  }

  @Public()
  @Post('sign-in')
  async signIn(@Body() signInDto: UserSingInDto) {
    return await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
  }

  @ApiBearerAuth('JWT')
  @Get('logout')
  async getUser(@Req() req: any) {
    const userId = await req.user.userId;
    return this.authService.logout(Number(userId));
  }

  @ApiBearerAuth('JWT')
  @Get('refresh')
  async refreshTokens(@Req() req: Request) {
    const user = await req.user;
    return this.authService.refreshTokens(<IAuthUser>user);
  }

  @ApiBearerAuth('JWT')
  @Get('profile')
  async getProfile(@Req() req: any) {
    return this.authService.getUser(req.user);
  }
}
