import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { AiAliyunSession } from '../../ai-aliyun-session/entities/ai-aliyun-session.entity';

@Entity()
export class AiAliyunMessage {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ApiProperty({ description: 'role' })
  @Column()
    role: 'user'|'system';

  @ApiProperty({ description: 'content' })
  @Column({ type: 'text' })
    content: string;

  @ApiProperty({ description: 'queueId' })
  @Column()
    qid: string;

  @ApiProperty({ description: '状态' })
  @Column({ default: 'done' })
    status: 'loading' | 'done';

  @ApiProperty({ type: () => AiAliyunSession })
  @ManyToOne(() => AiAliyunSession)
  @JoinColumn()
    session: AiAliyunSession;

  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn()
    createDate: Date;
      
  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn()
    updateDate: Date;
}
