import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/authGuard/authGuard';

@Controller('order')
@ApiTags('Order - ruta privada - requiere token')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear Orden',
  })
  @UseGuards(AuthGuard)
  async create(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    const userId = await req.user;
    return this.ordersService.create(createOrderDto, userId);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Lista todos las ordenes de un usuario',
  })
  @Get('/allorders')
  async findAllOrders(@Request() req) {
    const userId = await req.user;
    return this.ordersService.findAllOrders(userId);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Lista la orden pasada por parametro con los cheques relacionados',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({
    summary: 'borrado logico de la orden pasada por parametro',
  })
  async remove(@Request() req, @Param('id') id: string) {
    const userId = await req.user;
    return this.ordersService.remove(+id, userId);
  }
}
