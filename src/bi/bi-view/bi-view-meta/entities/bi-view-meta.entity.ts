import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { BiViewSetting } from '../../bi-view-setting/entities/bi-view-setting.entity';

@Entity()
export class BiViewMeta {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ApiProperty({ description: '名称' })
  @Column()
    name: string;  

  @ApiProperty({ description: '描述' })
  @Column()
    desc: string;  
    
  @ApiProperty({ type: () => BiViewSetting })
  @OneToOne(() => BiViewSetting)
    viewSetting: BiViewSetting;
    
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
