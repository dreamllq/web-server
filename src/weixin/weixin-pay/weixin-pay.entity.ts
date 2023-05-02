import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class WeixinPay {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ApiProperty()
  @Column()
    name: string;

  @ApiProperty()
  @Column()
    mchid: string;

  @ApiProperty()
  @Column()
    partnerKey: string;

  @ApiProperty()
  @Column()
    pfx: string;

  @ApiProperty()
  @Column()
    notifyUrl: string;

  @ApiProperty()
  @Column()
    spbillCreateIp: string;

  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn()
    createDate: Date;
      
  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn()
    updateDate: Date;
}