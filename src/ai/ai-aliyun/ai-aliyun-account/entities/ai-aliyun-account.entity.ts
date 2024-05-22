import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class AiAliyunAccount {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ApiProperty({ description: 'Access Key' })
  @Column({
    nullable: false,
    unique: true 
  })
    accessKey: string;

  @ApiProperty({ description: '名称' })
  @Column({
    nullable: false,
    unique: true 
  })
    name: string;

  @ApiProperty({ description: 'Secret Key' })
  @Column({
    nullable: false,
    unique: true 
  })
    secretKey: string;

  @ApiProperty({ description: 'Dashscope Api Key' })
  @Column({
    nullable: true,
    unique: true 
  })
    dashscopeApiKey: string;

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
