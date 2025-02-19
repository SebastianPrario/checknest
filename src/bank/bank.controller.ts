import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Request,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BankService } from './bank.service';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/authGuard/authGuard';

@Controller('bank')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear Banco',
  })
  @UseGuards(AuthGuard)
  async create(@Request() req, @Body() createBankDto: CreateBankDto) {
    const userId = await req.user;
    return this.bankService.create(createBankDto, userId);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar Bancos por usuario',
  })
  @UseGuards(AuthGuard)
  async findAll(@Request() req) {
    const userId = await req.user;
    console.log(userId);
    return this.bankService.findAll(userId);
  }

  @ApiOperation({
    summary: 'Editar Banco',
  })
  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateBankDto: UpdateBankDto,
  ) {
    return this.bankService.update(+id, updateBankDto);
  }

  @ApiOperation({
    summary: 'borrar Banco',
  })
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bankService.remove(+id);
  }
}
