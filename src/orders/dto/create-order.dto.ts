import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
 } from 'class-validator';

class DataOtherPaymentDto {
  @IsString()
  property: string;

  @IsNumber()
  number: number;
}
export class CreateOrderDto {
  @IsNotEmpty()
  @ApiProperty({
    title: 'destino',
    description: 'destino de la orden',
    example: 'Juan Perez',
    required: true,
  })
  destination: string;

  @IsNotEmpty()
  @ApiProperty({
    title: 'importe de la orden',
    description: 'importe de la orden, hasta 2 decimales',
    example: '222.59',
    required: true,
  })
  @Transform(({ value }) => Number.parseFloat(value).toFixed(2))
  totalAmount: number;

  @IsNotEmpty()
  @ApiProperty({
    title: 'detalle',
    description: 'detalle o leyenda de la orden',
    example: 'Pago factura 0001-00000011',
    required: true,
  })
  detail: string;

  @IsOptional()
  @IsArray()
  //@ValidateNested({ each: true })
  @Type(() => DataOtherPaymentDto)
  @ApiProperty({
    title: 'otros pagos ',
    description: 'incluir otros pagos y retenciones',
    example: '2025/04-04',
    required: true,
  })
  otherPayment: DataOtherPaymentDto[];

  @IsNotEmpty()
  @ApiProperty({
    title: 'fecha de la orden',
    description: 'fecha de creacion de la orden',
    example: '2025/04-04',
    required: true,
  })
  creationDate: string;
  @IsNotEmpty()
  @ApiProperty({
    title: 'Cheques incluidos',
    description: 'Listado con los Id de los cheques incluidos en la orden',
    example: '21 - 22 -22  ',
    required: true,
  })
  chequesId: number[];

  user: any;
}
