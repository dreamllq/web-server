import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { File } from 'src/file/file.entity';
import { GeneralScenariosType } from '../constants/general-scenarios-type';

@Entity()
export class AiBaiduOrcGeneralScenarios {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ApiProperty({ type: () => File })
  @ManyToOne(() => File)
  @JoinColumn()
    file: File;

  @ApiProperty({ description: '识别文件页码' })
  @Column()
    fileNumber: number;

  @ApiProperty({ description: '图片类型' })
  @Column({
    type: 'enum',
    enum: GeneralScenariosType,
    default: GeneralScenariosType.GeneralBasic,
    nullable: false
  })
    type: GeneralScenariosType;

  @ApiProperty({ description: 'ocr识别结果' })
  @Column({
    type: 'text',
    nullable: true 
  })
    result: string;

  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn()
    createDate: Date;
      
  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn()
    updateDate: Date;
}