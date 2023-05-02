import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Weixin } from '../weixin.entity';

@Entity()
export class WeixinOfficialAccountConfig {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ApiProperty()
  @Column({ default: '' })
    token: string;

  @ApiProperty()
  @Column({ default: '' })
    encodingAesKey: string;

  @ApiProperty()
  @Column({ default: false })
    checkSignature: boolean;

  @ApiPropertyOptional()
  @ApiProperty({ type: Weixin })
  @OneToOne(() => Weixin)
  @JoinColumn()
    weixin: Weixin;

  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn()
    createDate: Date;
      
  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn()
    updateDate: Date;
}