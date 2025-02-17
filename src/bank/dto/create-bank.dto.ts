import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty,  IsString } from 'class-validator';

export class CreateBankDto {
  @IsNotEmpty()
  @ApiProperty({
    title: 'nombre del banco',
    description: 'numero de banco',
    example: 'Galicia',
    required: true,
  })
  @IsString()
  @Transform(({ value }) => (value as string).toUpperCase())
  bank: string;
}
