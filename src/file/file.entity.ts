import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { FileBuffer } from './file-buffer.entity';

@Entity()
export class File {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column()
    name:string;

  @ApiProperty({ description: '扩展名' })
  @Column()
    ext: string;


  @ApiProperty({ type: () => FileBuffer })
  @OneToOne(() => FileBuffer)
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