import { ApiProperty } from '@nestjs/swagger';
import { File } from 'src/file/file.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, TreeParent, UpdateDateColumn } from 'typeorm';

@Entity()
export class FileDetail {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ApiProperty({ type: () => File })
  @ManyToOne(() => File)
  @JoinColumn()
    file: File;

  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn()
    createDate: Date;
      
  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn()
    updateDate: Date;
}