import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Area {
  @ApiProperty()
  @PrimaryGeneratedColumn()
    id: number;
  
  @ApiProperty()
  @Column({ default: 0 })
    parentId: number;

  @ApiProperty()
  @Column({ default: '' })
    name: string;
}