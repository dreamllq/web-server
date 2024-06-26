import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { AiAliyunAccount } from '../../ai-aliyun-account/entities/ai-aliyun-account.entity';
import { OcrOperates } from '../constants/ocr-operate';
import { AiAliyunOcrRecognizeAllText } from './ai-aliyun-ocr-recognize-all-text.entity';

@Entity()
export class AiAliyunOcr {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ApiProperty({ description: 'ocr任务名称' })
  @Column()
    name: string;

  @ApiProperty({ type: () => AiAliyunAccount })
  @ManyToOne(() => AiAliyunAccount)
  @JoinColumn()
    account: AiAliyunAccount;

  @ApiProperty({ description: '操作类型' })
  @Column({
    type: 'enum',
    enum: OcrOperates,
    default: OcrOperates.RecognizeAllText 
  })
    type: OcrOperates;

  @ApiProperty({ type: () => AiAliyunOcrRecognizeAllText })
  @OneToOne(() => AiAliyunOcrRecognizeAllText)
  @JoinColumn()
    recognizeAllText: AiAliyunOcrRecognizeAllText;

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
