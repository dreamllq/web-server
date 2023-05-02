import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { MallShop } from '../mall-shop/mall-shop.entity';
import { MallGoodGroup } from '../mall-good-group/mall-good-group.entity';

@Entity()
export class MallGood {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
    id: string;
  
  @ApiProperty()
  @Column()
    title: string;
    
  @ApiProperty()
  @Column()
    desc: string;

  @ApiProperty({ type: () => MallGoodGroup })
  @ManyToOne(() => MallGoodGroup)
  @JoinColumn()
    group: MallGoodGroup;

  @ApiProperty()
  @Column()
    headimg: string;

  @ApiProperty({ description: '单位分' })
  @Column()
    price: number;

  @ApiProperty()
  @Column({ type: 'simple-array' })
    images: string[];

  @ApiProperty()
  @Column({ type: 'text' })
    detail: string;

  @ApiProperty({ type: () => MallShop })
  @ManyToOne(() => MallShop)
  @JoinColumn()
    shop: MallShop;
    
  @ApiProperty({ type: () => User })
  @ManyToOne(() => User)
  @JoinColumn()
    creator: User;
  
  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn()
    createDate: Date;
      
  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn()
    updateDate: Date;
}