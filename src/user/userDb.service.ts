import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserDbService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  saveUser(user: Omit<User, 'id'>) {
    this.userRepository.save(user);
  }
  getAllUser() {
    return this.userRepository.find();
  }

  async getUserById(id: string) {
    const user = await this.userRepository.find({ where: { id: id } });
    return user ? user : new NotFoundException('usuario no encontrado');
  }

  async getUserOnlyAdmin() {
    const user = await this.userRepository.find({ where: { role: true } });
    return user ? user : new NotFoundException('usuario no encontrado');
  }
  getUserByEmail(email: string) {
    return this.userRepository.find({ where: { email } });
  }

  async deleteUser(id: string): Promise<string> {
    try {
      const userFilter = await this.userRepository.findOne({
        where: { id: id },
      });
      if (!userFilter) {
        new NotFoundException('no se encontro usuario con ese ID');
      }
      await this.userRepository.delete(userFilter);
      return `Elemento con ID ${id} eliminado correctamente.`;
    } catch (error) {
      console.error('Error al eliminar el elemento:', error);
    }
  }

  async updateUser(data: any, idUser: string) {
    console.log(data, idUser);
    const usuarioExistente = await this.userRepository.findOne({
      where: { id: idUser },
    });
    if (!usuarioExistente) {
      return `Usuario con ID ${idUser} no encontrado`;
    }
    Object.assign(usuarioExistente, data);
    const hashPassword = await bcrypt.hash(usuarioExistente.password, 10);
    usuarioExistente.password = hashPassword;
    await this.userRepository.save(usuarioExistente);
    return 'usuario modificado';
  }
}
