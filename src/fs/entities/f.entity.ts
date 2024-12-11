import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, TreeParent, UpdateDateColumn } from 'typeorm';
import { PathType } from '../constants/path-type';
import { FileDetail } from './file-detail.entity';

@Entity()
export class F {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ApiProperty()
  @Column()
    name:string;

  @ApiProperty({ description: '路径类型' })
  @Column({
    type: 'enum',
    enum: PathType,
    default: PathType.UNKNOWN
  })
    pathType: PathType;

  @ApiProperty({ type: () => F })
  @TreeParent()
    parent:F;

  @ApiProperty({ type: () => FileDetail })
  @OneToOne(() => FileDetail)
  @JoinColumn()
    fileDetail:FileDetail;

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
