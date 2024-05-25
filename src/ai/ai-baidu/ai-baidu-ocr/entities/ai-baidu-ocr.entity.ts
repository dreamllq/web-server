import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { OcrOperates } from '../constants/ocr-operate';
import { AiBaiduAccount } from '../../ai-baidu-account/entities/ai-baidu-account.entity';
import { AiBaiduOrcGeneralScenarios } from './ai-baidu-orc-general-scenarios.entity';

@Entity()
export class AiBaiduOcr {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ApiProperty({ description: 'ocr任务名称' })
  @Column()
    name: string;

  @ApiProperty({ type: () => AiBaiduAccount })
  @ManyToOne(() => AiBaiduAccount)
  @JoinColumn()
    account: AiBaiduAccount;

  @ApiProperty({ description: '操作类型' })
  @Column({
    type: 'enum',
    enum: OcrOperates,
    default: OcrOperates.GeneralScenarios 
  })
    type: OcrOperates;

  @ApiProperty({ type: () => AiBaiduOrcGeneralScenarios })
  @OneToOne(() => AiBaiduOrcGeneralScenarios)
  @JoinColumn()
    generalScenarios: AiBaiduOrcGeneralScenarios;

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
