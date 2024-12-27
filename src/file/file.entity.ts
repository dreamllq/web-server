import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { FileBuffer } from './file-buffer.entity';

@Entity()
export class File {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ApiProperty({ description: '名称' })
  @Column()
    name:string;

  @ApiProperty({ description: '文件原名' })
  @Column({ nullable: true })
    originFileName:string;

  @ApiProperty({ description: '扩展名' })
  @Column()
    ext: string;


  @ApiProperty({ description: '空间大小' })
  @Column()
    size: number;
  

  @ApiProperty({ type: () => FileBuffer })
  @ApiPropertyOptional()
  @ManyToOne(() => FileBuffer)
  @JoinColumn()
    content: FileBuffer;

  @Column()
    md5: string;

  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn()
    createDate: Date;
      
  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn()
    updateDate: Date;
}