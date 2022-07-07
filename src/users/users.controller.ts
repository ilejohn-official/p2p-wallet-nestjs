import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  ClassSerializerInterceptor,
  UseInterceptors,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { jsonSuccess } from '../utils';
import { ValidateEmailUnique } from './validations/validate-email-unique.pipe';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Create user
   *
   * @param {CreateUserDto} createUserDto
   *
   */
  @Post()
  async create(@Body(ValidateEmailUnique) createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    return jsonSuccess(user, 'User created successfully.', HttpStatus.CREATED);
  }

  /**
   * Get all users
   *
   *
   */
  @Get()
  async findAll() {
    const users = await this.usersService.findAll();

    return jsonSuccess(users, 'All Users retrieved successfully.');
  }

  /**
   * Find user by id
   *
   * @param {number} id
   *
   */
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(+id);

    if (!user)
      throw new HttpException(
        `user with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );

    return jsonSuccess(user, 'User retrieved successfully.');
  }

  /**
   * Delete user by id
   *
   * @param {number} id
   *
   */
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    this.usersService.remove(+id);

    return jsonSuccess(null, 'User removed successfully.');
  }
}
