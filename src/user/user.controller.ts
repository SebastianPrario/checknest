import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UserDbService } from './userDb.service';
import { UpdateUserDto } from './dto/update-user-dto';
import { AuthService } from './auth.service';
import { AdminGuard } from 'src/guards/admin/admin.guard';
import { ValidateUserDto } from './dto/validate-user-dto';
import { AuthGuard } from 'src/guards/authGuard/authGuard';
// distintas rutas y decoradores

@Controller('user')
export class UserController {
  constructor(
    private userDbService: UserDbService,
    private authService: AuthService,
  ) {}

  // @UseGuards(AdminGuard)
  // getUserProfile(@Req() request: Request, @Res() response: Response) {
  //   response.status(200).send('esta es la respuesta');
  // }
  @Get()
  //@UseGuards(AdminGuard)
  getAllUsers() {
    return this.userDbService.getAllUser();
  }

  // esta ruta devuelve todos los usuarios que son administradores (publica)
  @Get('admin')
  @HttpCode(418) // modifica el codigo de la respuesta
  getUserOnlyAdmin() {
    return this.userDbService.getUserOnlyAdmin();
  }
  // devuelve los datos de un usuario particular
  @Get(':id')
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.userDbService.getUserById(id);
  }
  //crear usuario nuevo solo los administradores pueden crear usuarios
  @Post('signin')
  //@UseGuards(AdminGuard)
  createUser(@Body() user: CreateUserDto) {
    if (!user.nombre || !user.email || !user.password || !user.role)
      return 'faltan datos';
    return this.authService.signIn(user);
  }

  //logearse : devuelve un token
  @Post('signup')
  validateUser(@Body() user: ValidateUserDto) {
    return this.authService.signUp(user.email, user.password);
  }

  // modificar usuario (solo admin)
  @Put()
  @UseGuards(AuthGuard)
  async updateUser(@Request() idUser: any, @Body() user: UpdateUserDto) {
    return this.userDbService.updateUser(user, idUser.user);
  }

  // borrar usuario (solo admin)
  @Delete(':id')
  @UseGuards(AdminGuard)
  deleteUser(@Param('id') id: string) {
    return this.userDbService.deleteUser(id);
  }
}
