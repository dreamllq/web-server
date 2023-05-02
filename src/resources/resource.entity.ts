import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Resource {
  @ApiProperty({ description: '资源id' })
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ApiProperty({ description: '资源名称' })
  @Column({
    nullable: false,
    unique: true 
  })
    name: string;

  @ApiProperty({ description: '资源key' })
  @Column({
    nullable: false,
    unique: true 
  })
    key:string;

  @ApiProperty({ description: '资源描述' })
  @Column({ default: '' })
    desc: string;

  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn()
    createDate: Date;
    
  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn()
    updateDate: Date;
}