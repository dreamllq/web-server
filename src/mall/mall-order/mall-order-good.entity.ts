
import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { MallGood } from '../mall-good/mall-good.entity';
import { MallOrder } from './mall-order.entity';

@Entity()
export class MallOrderGood {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ApiProperty({ type: () => MallOrder })
  @ManyToOne(() => MallOrder, (order) => order.goods)
  @JoinColumn()
    order:MallOrder;

  @ApiProperty({ type: () => MallGood })
  @ManyToOne(() => MallGood)
  @JoinColumn()
    good: MallGood;

  @ApiProperty()
  @Column()
    count: number;

  @ApiProperty()
  @Column()
    price: number;

  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn()
    createDate: Date;
      
  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn()
    updateDate: Date;
}