import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Password {
  @ApiProperty({ description: '用户id' })
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ApiProperty({ description: '密码' })
  @Column()
    password: string;
}