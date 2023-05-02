import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { MallGood } from '../mall-good/mall-good.entity';

@Entity()
export class MallCart {
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

  @ApiProperty()
  @Column()
    count: number;

  @ApiProperty()
  @Column({ default: true })
    checked: boolean;

  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn()
    createDate: Date;
      
  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn()
    updateDate: Date;
}