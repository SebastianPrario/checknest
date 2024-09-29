import { Injectable } from '@nestjs/common';
import { CreateChequeDto } from './dto/create-cheque.dto';
import { UpdateChequeDto } from './dto/update-cheque.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cheque } from './entities/cheque.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class ChequesService {
  constructor(
    @InjectRepository(Cheque)
    private chequesRepository: Repository<Cheque>,
    @InjectRepository(User)
    private dbUserRepository: Repository<User>,
  ) {}
  // crear cheques en BD relacionado con ID del usuario
  async create(createChequeDto: CreateChequeDto, req: string) {
    const newCheck = { ...createChequeDto };
    await this.chequesRepository.save(newCheck);
    const userDb = await this.dbUserRepository.findOneBy({
      id: req,
    });
    if (userDb) {
      newCheck.user = userDb;
      await this.chequesRepository.save(newCheck);
    }
  }

  async findAll(userId: string): Promise<Cheque[]> {
    return await this.chequesRepository.find({
      where: { user: { id: userId } },
    });
  }

  async findOne(userId: string, id: number) {
    try {
      const foundCheck = await this.chequesRepository.findOne({
        where: {
          user: { id: userId },
          id: id,
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
  async update(userId: string, id: number, updateChequeDto: UpdateChequeDto) {
    try {
      const updatecheck = await this.chequesRepository.findOne({
        where: {
          user: { id: userId },
          id: id,
        },
      });
      if (updatecheck) {
        return;
      } else {
        return 'Cheque no encontrado';
      }
    } catch (error) {
      console.error('Error al buscar el cheque:', error.message);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} cheque`;
  }
}
