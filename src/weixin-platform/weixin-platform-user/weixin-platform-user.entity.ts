import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Weixin } from 'src/weixin/weixin.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity()
export class WeixinPlatformUser {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ApiProperty({ type: () => User })
  @ApiPropertyOptional()
  @ManyToOne(() => User, (user) => user.weixinPlatformUsers)
    user: User;

  @ApiProperty({ type: () => Weixin })
  @ApiPropertyOptional()
  @ManyToOne(() => Weixin, (weixin) => weixin.weixinPlatformUsers)
    weixin: Weixin;

  @Column({ nullable: true })
    unionid: string;

  @Column({ unique: true })
    openid: string;

  @Column({ nullable: true })
    nickname: string;

  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn()
    createDate: Date;
      
  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn()
    updateDate: Date;
}