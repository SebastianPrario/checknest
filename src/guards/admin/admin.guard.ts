import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

//  este guard permite proteger las rutas que tienen que tener un token valido  //

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];

    try {
      if (!token) throw new BadRequestException('token no encontrado');
      const secret = process.env.JWT_SECRET;
      const decoded = this.jwtService.verify(token, { secret });
      if (decoded.role !== 'admin') throw new BadRequestException();
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token inválido o ruta protegida');
    }
  }
}
