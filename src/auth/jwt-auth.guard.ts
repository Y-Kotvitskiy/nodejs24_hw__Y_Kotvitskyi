import {
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector, REQUEST } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/app.controller';
import { UsersService } from 'src/users/users.service';
import { Headers } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
    private jwtService: JwtService,
    //    @Inject(REQUEST) private readonly request: Request,
  ) {
    super();
  }

  issuedAt: number;

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    } // Add your custom authentication logic here
    this.getIssuedAt(context);
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    const authUser = this.usersService.findByName(user.username);
    if (
      !authUser ||
      authUser.id != user.userId ||
      this.usersService.isExpired(authUser.id, this.issuedAt)
    )
      throw new UnauthorizedException();
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }

  getIssuedAt(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      this.issuedAt = 0;
      return;
    }
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = this.jwtService.decode(jwt, { json: true });
    this.issuedAt = json.iat;
  }
}
