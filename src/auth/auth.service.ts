import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { verifyPassword } from 'src/utils';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  login(user: User): { access_token: string } {
    const payload = { userId: user.id, email: user.email, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  logout() {
    return { message: 'remove token from request header' };
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.getUserByEmail(email);

    const verifiedPassword = await verifyPassword(password, user?.password);

    if (!user || !verifiedPassword) {
      return null;
    }

    return user;
  }
}
