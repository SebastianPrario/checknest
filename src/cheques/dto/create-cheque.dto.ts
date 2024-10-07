import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateChequeDto {
  @IsNotEmpty()
  @ApiProperty({
    title: 'numero',
    description: 'numero de cheque de 8 caracteres',
    example: '88247899',
    required: true,
  })
  numero: number;

  @IsNotEmpty()
  @ApiProperty({
    title: 'importe',
    description: 'importe del cheque, hasta 2 decimales',
    example: '222.59',
    required: true,
  })
  @Transform(({ value }) => Number.parseFloat(value).toFixed(2))
  importe: number;

  @IsNotEmpty()
  @Length(2)
  @ApiProperty({
    title: 'librador',
    description: 'nombre del librador del cheque',
    example: 'Juan Perez',
    required: true,
  })
  librador: string;

  @IsNotEmpty()
  @ApiProperty({
    title: 'fecha de Emision',
    description: 'fecha en la que se emitio el cheque (string)',
    example: '17/08/2024',
    required: true,
  })
  fechaEmision: string;

  @IsNotEmpty()
  @ApiProperty({
    title: 'Fecha de Pago',
    description: 'fecha que figura el cheque',
    example: '20/09/25',
    required: true,
  })
  fechaEntrega: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    title: 'Banco',
    description: 'Banco que emite el cheque',
    example: 'Santander',
    required: true,
  })
  banco: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    title: 'Proveedor',
    description: 'es quien entrego el cheque',
    example: 'Pedro Marmol',
    required: true,
  })
  proveedor: string;

  user: any;
}
