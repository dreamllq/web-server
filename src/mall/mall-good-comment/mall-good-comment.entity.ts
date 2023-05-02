import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { MallGood } from '../mall-good/mall-good.entity';

export class MallGoodComment {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User)
  @JoinColumn()
    creator:User;

  @ApiProperty({ type: () => MallGood })
  @ManyToOne(() => MallGood)
  @JoinColumn()
    good: MallGood;

  @ApiProperty()
  @Column()
    content: string;

  @ApiProperty()
  @Column({ type: 'simple-array' })
    images: string[];
  
  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn()
    createDate: Date;
      
  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn()
    updateDate: Date;
}