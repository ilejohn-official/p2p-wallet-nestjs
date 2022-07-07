import { Entity, Column } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from '../common/base.entity';

@Entity('user')
export class User extends BaseEntity {
  private static Str: {
    type: 'varchar';
    length: 255;
  };

  @Column(User.Str)
  name: string;

  @Column({
    ...User.Str,
    unique: true,
  })
  email: string;

  @Column(User.Str)
  @Exclude()
  password: string;
}
