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
import { ApiTags, ApiOperation } from '@nestjs/swagger';
// distintas rutas y decoradores

@Controller('user')
@ApiTags('User')
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
  @ApiOperation({
    summary: 'Devuelve todos los usuarios (privada)',
  })
  //@UseGuards(AdminGuard)
  getAllUsers() {
    return this.userDbService.getAllUser();
  }

  @Get('admin')
  @HttpCode(418) // modifica el codigo de la respuesta
  @ApiOperation({
    summary:
      'esta ruta devuelve todos los usuarios que son administradores (publica)',
  })
  getUserOnlyAdmin() {
    return this.userDbService.getUserOnlyAdmin();
  }
  @ApiOperation({
    summary: 'esta ruta devuelve los datos de un usuario particular (privada)',
  })
  @Get(':id')
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.userDbService.getUserById(id);
  }
  //crear usuario nuevo solo los administradores pueden crear usuarios
  @Post('signup')
  @ApiOperation({
    summary: 'crea un usuario nuevo (privada)',
  })
  //@UseGuards(AdminGuard)
  createUser(@Body() user: CreateUserDto) {
    if (
      !user.name ||
      !user.email ||
      !user.password ||
      typeof user.role !== 'boolean'
    )
      return 'faltan datos';
    else return this.authService.signIn(user);
  }

  //logearse : devuelve un token
  @Post('signin')
  @ApiOperation({
    summary: 'Logeo de usuario (privada)',
  })
  validateUser(@Body() user: ValidateUserDto) {
    return this.authService.signUp(user.email, user.password);
  }

  // modificar usuario (solo admin)
  @Put()
  @ApiOperation({
    summary: 'modifica usuario. Solo para Admin (privada)',
  })
  @UseGuards(AuthGuard)
  async updateUser(@Request() idUser: any, @Body() user: UpdateUserDto) {
    return this.userDbService.updateUser(user, idUser.user);
  }

  // borrar usuario (solo admin)
  @Delete(':id')
  @ApiOperation({
    summary: 'borrado de usuario. Solo para Admin (privada)',
  })
  @UseGuards(AdminGuard)
  deleteUser(@Param('id') id: string) {
    return this.userDbService.deleteUser(id);
  }
}
