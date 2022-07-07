import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword } from '../utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const hashedPassword = await hashPassword(createUserDto.password);

    return this.usersRepository.save(
      this.usersRepository.create({
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashedPassword,
      }),
    );
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  getUserByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }

  remove(id: number): Promise<any> {
    return this.usersRepository.delete(id);
  }
}
