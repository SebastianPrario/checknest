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

@Controller('cheques')
export class ChequesController {
  constructor(private readonly chequesService: ChequesService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Request() req, @Body() createChequeDto: CreateChequeDto) {
    const user = await req.user;
    return this.chequesService.create(createChequeDto, user.userId);
  }

  @Get()
  @UseGuards(AuthGuard)
  // toma la info del guard y la incorpora al request
  async findChequesByUser(@Request() req) {
    const user = await req.user;
    return await this.chequesService.findAll(user.userId);
  }
  // buscar cheque por ID
  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Request() req: any, @Param('id') id: string) {
    const user = await req.user;
    return await this.chequesService.findOne(user.userId, +id);
  }
  // modificar cheque
  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateChequeDto: UpdateChequeDto,
    @Request() req: any,
  ) {
    const user = await req.user;
    return this.chequesService.update(user.userId, +id, updateChequeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chequesService.remove(+id);
  }
}
