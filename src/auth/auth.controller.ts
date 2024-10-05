import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { Public } from 'src/app.controller';
import { IAuthUser } from './interface/auth-user';
import { ISingUpUser } from './interface/singup-user';
import { UserSingUpDto } from './dto/user-singup.dto';

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
  async signIn(@Body() signInDto: Record<string, any>) {
    return await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
  }

  @Get('logout')
  async getUser(@Req() req: Request) {
    const userId = await req.user.id;
    return this.authService.logout(Number(userId));
  }

  @Get('refresh')
  async refreshTokens(@Req() req: Request) {
    const user = await req.user;
    return this.authService.refreshTokens(<IAuthUser>user);
  }
}
