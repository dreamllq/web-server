import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { RecognizeAllTextType } from '../constants/orc-recognize-all-text-type';
import { File } from 'src/file/file.entity';

@Entity()
export class AiAliyunOcrRecognizeAllText {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ApiProperty({ type: () => File })
  @ManyToOne(() => File)
  @JoinColumn()
    file: File;

  @ApiProperty({ description: '图片类型' })
  @Column({
    type: 'enum',
    enum: RecognizeAllTextType,
    default: RecognizeAllTextType.General,
    nullable: false
  })
    type: RecognizeAllTextType;

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