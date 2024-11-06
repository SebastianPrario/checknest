import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDbService } from './userDb.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user-dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userDbService: UserDbService,
    private readonly jwtService: JwtService,
  ) {}
  async signIn(user: CreateUserDto) {
    const dbUser = await this.userDbService.getUserByEmail(user.email);
    if (dbUser.length > 0) {
      throw new BadRequestException('email existente');
    }
    const hashPassword = await bcrypt.hash(user.password, 10);
    this.userDbService.saveUser({
      ...user,
      isActive: true,
      password: hashPassword,
    });
    return { message: 'success create user' };
  }
  // autenticacion de usuario comparando password encriptada
  async signUp(email: string, password: string) {
    const [userDb] = await this.userDbService.getUserByEmail(email);
    const validatePassword = userDb
      ? await bcrypt.compare(password, userDb.password)
      : 0;
    if (!validatePassword || !userDb) return 'usuario o password incorrecta';
    const payload = {
      sub: userDb.name,
      userId: userDb.id,
      role: userDb.role,
    };
    const token = this.jwtService.sign(payload);
    return {
      status: 200,
      payload,
      token,
    };
  }
}
