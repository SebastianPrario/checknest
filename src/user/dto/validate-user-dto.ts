import { IsEmail, IsNotEmpty, Length, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ValidateUserDto {
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
}
