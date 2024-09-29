import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateChequeDto {
  @IsNotEmpty()
  @Length(10)
  numero: number;

  @IsNotEmpty()
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
