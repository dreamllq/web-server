import { ApiProperty } from '@nestjs/swagger';
import { Address } from 'src/address/address.entity';
import { User } from 'src/users/user.entity';
import { AfterInsert, BeforeInsert, Column, CreateDateColumn, Entity, Generated, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { MallOrderStatusEnum } from './mall-order.type';
import { MallOrderGood } from './mall-order-good.entity';

@Entity()
export class MallOrder {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User)
  @JoinColumn()
    creator:User;

  @ApiProperty({ type: () => Address })
  @ManyToOne(() => Address)
  @JoinColumn()
    address: Address;

  @ApiProperty({ type: [MallOrderGood] })
  @OneToMany(() => MallOrderGood, (good) => good.order)
    goods:MallOrderGood[];

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: MallOrderStatusEnum,
    default: MallOrderStatusEnum.Unknown
  })
    status: MallOrderStatusEnum;

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