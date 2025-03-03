

import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { BiDataStruct } from '../../bi-data-struct/entities/bi-data-struct.entity';
@Entity()
export class BiDataMeta {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ApiProperty({ description: '名称' })
  @Column()
    name: string;  

  @ApiProperty({ description: '描述' })
  @Column()
    desc: string;  
    
  @ApiProperty({ type: [BiDataStruct] })
  @OneToMany(() => BiDataStruct, (comment) => comment.meta)
    structs: BiDataStruct[];

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
