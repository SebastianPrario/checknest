import {
  IsEnum,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

enum UserRole {
  admin = 'admin',
  user = 'user',
}

export class UpdateUserDto {
  id: string;
  @IsString()
  @Length(3, 80)
  @IsOptional()
  nombre: string;

  @IsEmail()
  @Length(10, 30)
  @IsOptional()
  email: string;

  @MinLength(5)
  @IsOptional()
  password: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role: string;

  isActive: boolean;

  cheques: any;
}
