import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import envVariables from '../config';
import { User } from 'src/users/user.entity';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: envVariables.appKey,
      signOptions: { expiresIn: '300s' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [
    { provide: 'USER_SERVICE', useClass: UsersService },
    { provide: 'AUTH_SERVICE', useClass: AuthService },
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
