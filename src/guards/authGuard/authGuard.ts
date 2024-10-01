import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

//  este guard permite proteger las rutas que tienen que tener un token valido  //

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = request.headers['authorization']?.split(' ')[1];
      if (!token) throw new BadRequestException('token no encontrado');
      const secret = process.env.JWT_SECRET;
      const payload = await this.jwtService.verifyAsync(token, { secret });
      if (payload) {
        request['user'] = payload.userId;
      }
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token inválido o ruta protegida');
    }
  }
}
