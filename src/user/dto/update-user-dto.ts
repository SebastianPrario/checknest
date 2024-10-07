import { ApiExtraModels } from '@nestjs/swagger';
import { CreateUserDto } from './create-user-dto';
import { PartialType } from '@nestjs/mapped-types';

@ApiExtraModels(CreateUserDto)
export class UpdateUserDto extends PartialType(CreateUserDto) {
  isActive: boolean;
}
