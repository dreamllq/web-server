import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { BiDataStructType } from '../constants/bi-data-struct-type';
import { BiDataMeta } from '../../bi-data-meta/entities/bi-data-meta.entity';

@Entity()
export class BiDataStruct {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ApiProperty({
    description: '操作类型',
    enum: BiDataStructType,
    enumName: 'BiDataStructType' 
  })
  @Column({
    type: 'enum',
    enum: BiDataStructType,
    default: BiDataStructType.TEXT 
  })
    type: BiDataStructType;

  @ApiProperty({ description: '字段名' })
  @Column()
    name: string;  

  @ApiProperty({ description: '字段分组' })
  @Column()
    group: string;  

  @ApiProperty({ description: '字段说明' })
  @Column()
    desc: string;  
        
  @ApiProperty({ type: () => BiDataMeta })
  @ManyToOne(() => BiDataMeta)
  @JoinColumn()
    meta: BiDataMeta;

  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn()
    createDate: Date;
      
  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn()
    updateDate: Date;
}
