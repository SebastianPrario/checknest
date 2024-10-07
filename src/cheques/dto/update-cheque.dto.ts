import { PartialType } from '@nestjs/mapped-types';
import { CreateChequeDto } from './create-cheque.dto';
import { ApiExtraModels } from '@nestjs/swagger';

@ApiExtraModels(CreateChequeDto)
export class UpdateChequeDto extends PartialType(CreateChequeDto) {}
