import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from 'src/roles/role.entity';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Password } from './password.entity';
import { Address } from 'src/address/address.entity';
import { WeixinPlatformUser } from 'src/weixin-platform/weixin-platform-user/weixin-platform-user.entity';

@Entity()
export class User {
  @ApiProperty({ description: '用户id' })
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ApiProperty({ description: '用户名' })
  @Column({
    unique: true,
    nullable: true 
  })
    username: string;

  @ApiProperty({ type: Password })
  @OneToOne(() => Password)
  @JoinColumn()
    password: Password;

  @ApiProperty({ description: '昵称' })
  @Column({ nullable: true })
    nickName: string;


  @ApiProperty()
  @Column({ nullable: true })
    headimg:string;

  @ApiProperty({ description: '手机号' })
  @Column({
    unique: true,
    nullable: true 
  })
    mobile: string;

  @ApiProperty({ description: '是否活跃' })
  @Column({ default: true })
    isActive: boolean; 

  @ApiProperty({
    enum: [true, false],
    description: '是否为超级管理员'
  })
  @Column({ default: false })
    isSuper: boolean; 

  @ApiProperty({
    description: '角色',
    type: [Role]
  })
  @ManyToMany(() => Role)
  @JoinTable()
    roles: Role[];

  @ApiProperty({ type: () => [WeixinPlatformUser] })
  @OneToMany(() => WeixinPlatformUser, (weixinUser) => weixinUser.user)
    weixinPlatformUsers: WeixinPlatformUser[];

  @ApiProperty({ type: () => [Address] })
  @OneToMany(() => Address, (address) => address.user)
    addresses: Address[];

  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn()
    createDate: Date;
      
  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn()
    updateDate: Date;
}