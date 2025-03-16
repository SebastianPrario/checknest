import { PartialType } from '@nestjs/mapped-types';
import { CreateEmisorDto } from './create-emisor.dto';

export class UpdateEmisorDto extends PartialType(CreateEmisorDto) {}
