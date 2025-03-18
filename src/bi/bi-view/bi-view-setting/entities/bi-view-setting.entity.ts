import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { BiViewMeta } from '../../bi-view-meta/entities/bi-view-meta.entity';

@Entity()
export class BiViewSetting {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ApiProperty({ description: '配置' })
  @Column({ type: 'text' })
    config: string;

  @ApiProperty({ type: () => BiViewMeta })
  @OneToOne(() => BiViewMeta)
  @JoinColumn()
    viewMeta: BiViewMeta;

  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn()
    createDate: Date;
      
  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn()
    updateDate: Date;  
}
