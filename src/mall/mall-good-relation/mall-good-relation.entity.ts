import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { MallGood } from '../mall-good/mall-good.entity';
import { MallGoodRelationTypeEnum } from './mall-good-relation.type';

@Entity()
export class MallGoodRelation {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User)
  @JoinColumn()
    user: User;

  @ApiProperty({ type: () => MallGood })
  @ManyToOne(() => MallGood)
  @JoinColumn()
    good: MallGood;

  @ApiProperty({ enum: MallGoodRelationTypeEnum })
  @Column({
    type: 'enum',
    enum: MallGoodRelationTypeEnum,
    default: MallGoodRelationTypeEnum.Unknown
  })
    type:MallGoodRelationTypeEnum;

  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn()
    createDate: Date;
      
  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn()
    updateDate: Date;
}