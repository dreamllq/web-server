import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { AiBaiduSession } from '../../ai-baidu-session/entities/ai-baidu-session.entity';

@Entity()
export class AiBaiduMessage {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ApiProperty({ description: 'role' })
  @Column()
    role: 'user'|'assistant';

  @ApiProperty({ description: 'content' })
  @Column()
    content: string;

  @ApiProperty({ description: 'queueId' })
  @Column()
    qid: string;

  @ApiProperty({ type: () => AiBaiduSession })
  @ManyToOne(() => AiBaiduSession)
  @JoinColumn()
    session: AiBaiduSession;

  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn()
    createDate: Date;
      
  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn()
    updateDate: Date;
}
