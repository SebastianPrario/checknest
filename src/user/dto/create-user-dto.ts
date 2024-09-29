import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 80)
  nombre: string;

  @IsEmail()
  @Length(10, 50)
  email: string;

  @IsNotEmpty()
  @MinLength(5)
  password: string;

  @IsEnum(UserRole)
  role: string;
}
