import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateChequeDto {
  @IsNotEmpty()
  numero: number;

  @IsNotEmpty()
  @Transform(({ value }) => Number.parseFloat(value).toFixed(2))
  importe: number;

  @IsNotEmpty()
  @Length(2)
  librador: string;

  @IsNotEmpty()
  fechaEmision: string;

  @IsNotEmpty()
  fechaEntrega: string;

  @IsNotEmpty()
  @IsString()
  banco: string;

  @IsNotEmpty()
  @IsString()
  proveedor: string;

  user: any;
}
