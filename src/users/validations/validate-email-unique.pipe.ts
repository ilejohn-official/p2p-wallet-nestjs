import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UsersService } from '../users.service';

@Injectable()
export class ValidateEmailUnique implements PipeTransform<any> {
  constructor(private readonly userService: UsersService) {}

  async transform(body: any, { metatype }: ArgumentMetadata) {
    const dto = plainToInstance(metatype, body);

    if (!(await this.isUnique(dto.email))) {
      throw new BadRequestException('Email already taken');
    }

    return dto;
  }

  private async isUnique(email: string): Promise<boolean> {
    const user = await this.userService.getUserByEmail(email);

    return Object.keys(user ?? {}).length < 1 && user?.email !== email;
  }
}
