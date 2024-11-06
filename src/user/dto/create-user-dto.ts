import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 80)
  @ApiProperty({
    title: ' nombre de usuario',
    description: 'de 3 a 80 caracteres',
    example: 'juan Perez',
    required: true,
  })
  name: string;

  @IsEmail()
  @Length(10, 50)
  @ApiProperty({
    title: 'email',
    description: 'de 10 a 50 caracteres',
    example: 'juanperez@gmail.com',
    required: true,
  })
  email: string;

  @IsNotEmpty()
  @Length(5, 20)
  @ApiProperty({
    title: ' password',
    description: 'de 5 a 20 caracteres',
    example: '123456',
    required: true,
  })
  password: string;

  role: boolean;
}
