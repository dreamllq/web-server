import { ApiProperty } from '@nestjs/swagger';
import { AiServiceType } from 'src/ai/ai-common/ai-service-type/entities/ai-service-type.entity';
import { User } from 'src/users/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class AiAliyunService {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ApiProperty({ description: '服务名称' })
  @Column({
    nullable: false,
    unique: true 
  })
    name: string;

  @ApiProperty({ description: '接口endpoint' })
  @Column({ nullable: true })
    endpoint: string;

  @ApiProperty({ description: '接口path' })
  @Column({ nullable: true })
    path: string;

  @ApiProperty({ type: () => AiServiceType })
  @ManyToOne(() => AiServiceType)
  @JoinColumn()
    type: AiServiceType; 

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
