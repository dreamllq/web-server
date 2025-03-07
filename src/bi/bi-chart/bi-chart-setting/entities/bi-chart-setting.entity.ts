import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { BiChartMeta } from '../../bi-chart-meta/entities/bi-chart-meta.entity';

@Entity()
export class BiChartSetting {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ApiProperty({ description: '配置' })
  @Column({ type: 'text' })
    config: string;

  @ApiProperty({ type: () => BiChartMeta })
  @OneToOne(() => BiChartMeta)
  @JoinColumn()
    chartMeta: BiChartMeta;

  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn()
    createDate: Date;
      
  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn()
    updateDate: Date;  

  
}
