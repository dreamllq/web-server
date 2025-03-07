import { ApiProperty } from '@nestjs/swagger';
import { BiDataMeta } from 'src/bi/bi-data/bi-data-meta/entities/bi-data-meta.entity';
import { User } from 'src/users/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { BiChartSetting } from '../../bi-chart-setting/entities/bi-chart-setting.entity';

@Entity()
export class BiChartMeta {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ApiProperty({ description: '名称' })
  @Column()
    name: string;  

  @ApiProperty({ description: '描述' })
  @Column()
    desc: string;  

  @ApiProperty({ type: () => BiDataMeta })
  @ManyToOne(() => BiDataMeta)
  @JoinColumn()
    data: BiDataMeta;

  @ApiProperty({ type: () => BiChartSetting })
  @OneToOne(() => BiChartSetting)
    chartSetting: BiChartSetting;

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
