import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class MallGoodTag {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ApiProperty()
  @Column()
    name: string;

  @ApiProperty()
  @Column({
    nullable: true,
    default: '' 
  })
    desc: string;

  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn()
    createDate: Date;
      
  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn()
    updateDate: Date;
}