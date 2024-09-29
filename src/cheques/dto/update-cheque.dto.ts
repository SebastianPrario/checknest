import { PartialType } from '@nestjs/mapped-types';
import { CreateChequeDto } from './create-cheque.dto';

export class UpdateChequeDto extends PartialType(CreateChequeDto) {}
