import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/users/user.entity';
import { AiAliyunAccount } from '../../ai-aliyun-account/entities/ai-aliyun-account.entity';
import { AiAliyunService } from '../../ai-aliyun-service/entities/ai-aliyun-service.entity';

@Entity()
export class AiAliyunSession {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ApiProperty({ description: '会话名称' })
  @Column({
    nullable: false,
    unique: true 
  })
    name: string;

  @ApiProperty({ type: () => AiAliyunAccount })
  @ManyToOne(() => AiAliyunAccount)
  @JoinColumn()
    account: AiAliyunAccount;

  @ApiProperty({ type: () => AiAliyunService })
  @ManyToOne(() => AiAliyunService)
  @JoinColumn()
    service: AiAliyunService;

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
