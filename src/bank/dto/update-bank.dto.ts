import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBankDto } from './create-bank.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateBankDto extends PartialType(CreateBankDto) {
  @IsNotEmpty()
  @ApiProperty({
    title: 'nombre del banco',
    description: 'numero de banco',
    example: 'Galicia',
    required: true,
  })
  bank: string;
}
