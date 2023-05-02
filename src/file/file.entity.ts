import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class File {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column()
    name:string;

  @Column()
    ext: string;

  @Column({ type: 'mediumblob' })
    content: Buffer;

  @Column()
    md5: string;

  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn()
    createDate: Date;
      
  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn()
    updateDate: Date;
}