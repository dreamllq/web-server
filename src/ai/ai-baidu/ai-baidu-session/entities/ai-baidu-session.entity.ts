import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { AiBaiduService } from '../../ai-baidu-service/entities/ai-baidu-service.entity';
import { User } from 'src/users/user.entity';
import { AiBaiduAccount } from '../../ai-baidu-account/entities/ai-baidu-account.entity';

@Entity()
export class AiBaiduSession {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ApiProperty({ description: '会话名称' })
  @Column({
    nullable: false,
    unique: true 
  })
    name: string;

  @ApiProperty({ type: () => AiBaiduAccount })
  @ManyToOne(() => AiBaiduAccount)
  @JoinColumn()
    account: AiBaiduAccount;

  @ApiProperty({ type: () => AiBaiduService })
  @ManyToOne(() => AiBaiduService)
  @JoinColumn()
    service: AiBaiduService;

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
