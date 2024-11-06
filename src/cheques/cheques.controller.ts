import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ChequesService } from './cheques.service';
import { CreateChequeDto } from './dto/create-cheque.dto';
import { UpdateChequeDto } from './dto/update-cheque.dto';
import { AuthGuard } from 'src/guards/authGuard/authGuard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('cheques')
@ApiTags('Check - ruta privada - requiere token')
export class ChequesController {
  constructor(private readonly chequesService: ChequesService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo cheque',
  })
  @UseGuards(AuthGuard)
  async create(@Request() req, @Body() createChequeDto: CreateChequeDto) {
    const userId = await req.user;
    return this.chequesService.create(createChequeDto, userId);
  }

  // obtener cheques no borrados
  @Get()
  @ApiOperation({
    summary: 'Obtener Listado de Cheques que no estan borrados y que estan en cartera',
  })
  @UseGuards(AuthGuard)
  // toma la info del guard y la incorpora al request
  async findChequesByUser(@Request() req) {
    const userId = await req.user;
    return await this.chequesService.findAll(userId);
  }

  @Get('errase')
  @ApiOperation({
    summary: 'Lista cheques borrados por usuario logeado',
  })
  @UseGuards(AuthGuard)
  // toma la info del guard y la incorpora al request
  async findErrase(@Request() req) {
    const userId = await req.user;
    return await this.chequesService.findErrase(userId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Busca cheques por ID',
  })
  @UseGuards(AuthGuard)
  async findOne(@Request() req: any, @Param('id') id: string) {
    const userId = await req.user;
    return await this.chequesService.findOne(userId, +id);
  }
  // modificar cheque
  @Patch(':id')
  @ApiOperation({
    summary: 'Modificar Cheque',
  })
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateChequeDto: UpdateChequeDto,
    @Request() req: any,
  ) {
    const userId = await req.user;
    return this.chequesService.update(userId, +id, updateChequeDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Borrado Logico de Cheque',
  })
  remove(@Param('id') id: string) {
    return this.chequesService.remove(+id);
  }
}
