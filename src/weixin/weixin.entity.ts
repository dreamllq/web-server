import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { WeixinAppTypeEnum } from './weixin.type';
import { WeixinPlatformUser } from 'src/weixin-platform/weixin-platform-user/weixin-platform-user.entity';

@Entity()
export class Weixin {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ApiProperty()
  @Column()
    name: string;
  
  @ApiProperty()
  @Column({
    nullable: false,
    unique: true 
  })
    appid: string;
  
  @ApiProperty()
  @Column({
    nullable: false,
    unique: true 
  })
    appSecret: string;

  @ApiProperty({ enum: WeixinAppTypeEnum })
  @Column()
    appType: WeixinAppTypeEnum;

  @ApiProperty({ type: () => [WeixinPlatformUser] })
  @ApiPropertyOptional()
  @OneToMany(() => WeixinPlatformUser, (user) => user.weixin)
    weixinPlatformUsers: WeixinPlatformUser[];

  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn()
    createDate: Date;
      
  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn()
    updateDate: Date;
}