import { Injectable } from '@nestjs/common';
import { CreateChequeDto } from './dto/create-cheque.dto';
import { UpdateChequeDto } from './dto/update-cheque.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cheque } from './entities/cheque.entity';
import { State } from './enum/state.enum';

@Injectable()
export class ChequesService {
 
  constructor(
    @InjectRepository(Cheque)
    private chequesRepository: Repository<Cheque>,
  ) {}
  // crear cheques en BD relacionado con ID del usuario
  async create(createChequeDto: CreateChequeDto, req: string) {
    const newCheck = { ...createChequeDto };
    newCheck.user = req;
    await this.chequesRepository.save(newCheck);
    return 'cheque creado';
  }

  async findAll(
    userId: string,
    orderBy?: string,
    orderDirection?: 'ASC' | 'DESC',
  ): Promise<Cheque[]> {
    const validOrderFields = [
      'numero',
      'importe',
      'cliente',
      'librador',
      'fechaEmision',
      'fechaEntrega',
      'banco',
    ];
    const orderField = validOrderFields.includes(orderBy) ? orderBy : 'id';
    const direction = orderDirection === 'DESC' ? 'DESC' : 'ASC';
    return await this.chequesRepository.find({
      where: {
        user: userId,
        borrado: false,
        estado: State.encartera,
      },
      order: {
        [orderField]: direction,
      },
    });
  }
  async ObtenerChequesPorCliente(
    userId: string,
    cliente: string,
  ): Promise<Cheque[]> {
    console.log(cliente);
    return await this.chequesRepository.find({
      where: {
        user: userId,
        borrado: false,
        cliente: cliente,
      },
    });
  }
  async findErrase(userId: string): Promise<Cheque[]> {
    return await this.chequesRepository.find({
      where: {
        user: userId,
        borrado: true,
      },
    });
  }

  async findOne(userId: string, idCheck: number) {
    try {
      const foundCheck = await this.chequesRepository.findOne({
        where: {
          user: userId,
          borrado: false,
          id: idCheck,
        },
      });
      if (foundCheck) {
        return foundCheck;
      } else {
        return 'Cheque no encontrado';
      }
    } catch (error) {
      console.error('Error al buscar el cheque:', error.message);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(
    userId: string,
    idCheck: number,
    updateChequeDto: UpdateChequeDto,
  ) {
    try {
      const updatecheck = await this.chequesRepository.findOne({
        where: {
          user: userId,
          id: idCheck,
        },
      });
      Object.assign(updatecheck, updateChequeDto);
      console.log(updatecheck);
      if (updatecheck) {
        await this.chequesRepository.save(updatecheck);
        return 'cheque modificado';
      } else {
        return 'Cheque no encontrado';
      }
    } catch (error) {
      console.error('Error al buscar el cheque:', error.message);
    }
  }

  async findByNumber(userId: any, number: number) {
    try {
      const foundCheck = await this.chequesRepository.find({
        where: {
          user: userId,
          numero: number,
        },
        relations: ['order'],
      });
      if (foundCheck) {
        return foundCheck;
      } else {
        return 'Cheque no encontrado';
      }
    } catch (error) {
      console.error('Error al buscar el cheque:', error.message);
    }
  }

  async remove(idCheck: number) {
    try {
      const remove = await this.chequesRepository.findOne({
        where: {
          id: idCheck,
        },
      });

      if (remove.borrado) {
        remove.borrado = false;
        this.chequesRepository.save(remove);
      } else {
        remove.borrado = true;
        this.chequesRepository.save(remove);
      }
    } catch (error) {
      console.error('Error al buscar el cheque:', error.message);
    }
  }
}
