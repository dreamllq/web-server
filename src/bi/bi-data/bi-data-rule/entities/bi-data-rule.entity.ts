import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { BiDataMeta } from '../../bi-data-meta/entities/bi-data-meta.entity';
import { BiDataRuleType } from '../constants/bi-data-rule-type';
import { File } from 'src/file/file.entity';

@Entity()
export class BiDataRule {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
    id: string;
    
  @ApiProperty({
    description: '类型',
    enum: BiDataRuleType,
    enumName: 'BiDataRuleType' 
  })
  @Column({
    type: 'enum',
    enum: BiDataRuleType,
    default: BiDataRuleType.EXCEL 
  })
    type: BiDataRuleType;

  @ApiProperty({ type: () => File })
  @ManyToOne(() => File)
  @JoinColumn()
    excelFile: File;

  @ApiProperty({ description: 'sql' })
  @Column()
    sql: string;  
    
  @ApiProperty({ type: () => BiDataMeta })
  @OneToOne(() => BiDataMeta)
  @JoinColumn()
    meta: BiDataMeta;

  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn()
    createDate: Date;
      
  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn()
    updateDate: Date;
}
