import { IsEmail, IsNotEmpty, Length, MinLength } from 'class-validator';

export class ValidateUserDto {
  @IsEmail()
  @Length(10, 50)
  email: string;

  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
