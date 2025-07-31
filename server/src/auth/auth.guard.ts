import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private jwtService: JwtService,
    private authServise: AuthService
  ) {}

  async canActivate(
    context: ExecutionContext
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token){
      throw new UnauthorizedException("authentication required");
    }
    const decoded = this.jwtService.verify(token);
    const user = await this.authServise.validateUser(decoded);
    if (!user) {
      return false;
    }
    request.user = user;
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authorization = request.headers.get('Authorization');
    if (!authorization) return undefined;
    const [type, token] = authorization.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
