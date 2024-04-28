import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Area {
  @ApiProperty()
  @PrimaryGeneratedColumn()
    id: number;
  
  @ApiProperty()
  @Column({ default: 0 })
    parentId: number;
  
  @ApiProperty()
  @Column({ default: 0 })
    deep: number; 

  @ApiProperty()
  @Column({ default: '' })
    name: string;

  @ApiProperty()
  @Column({ default: '' })
    pinyinPrefix: string;

  @ApiProperty()
  @Column({ default: '' })
    pinyin: string;

  @ApiProperty()
  @Column({ default: '' })
    extId: string;

  @ApiProperty()
  @Column({ default: '' })
    extName: string;
}