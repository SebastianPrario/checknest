import { Injectable } from '@nestjs/common';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bank } from './entities/bank.entity';

interface NewBank {
  bank: string;
  user?: string;
}
@Injectable()
export class BankService {
  constructor(
    @InjectRepository(Bank)
    private bankRepository: Repository<Bank>,
  ) {}

  async create(createBankDto: CreateBankDto, idUser: string) {
    const bankExists = await this.bankRepository.findOne({
      where: {
        bank: createBankDto.bank,
        user: idUser,
      },
    });
    if (bankExists) {
      return 'BANCO YA EXISTE';
    }

    const newBank: NewBank = { ...createBankDto };
    newBank.user = idUser;
    await this.bankRepository.save(newBank);
    return 'cheque creado';
  }

  findAll(userId: string) {
    console.log(userId);
    return this.bankRepository.find({
      where: {
        user: userId,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} bank`;
  }

  update(id: number, updateBankDto: UpdateBankDto) {
    return this.bankRepository.update(id, updateBankDto);
  }

  remove(id: number) {
    return this.bankRepository.delete(id);
  }
}
