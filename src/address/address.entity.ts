import { ApiProperty } from '@nestjs/swagger';
import { Area } from 'src/area/area.entity';
import { User } from 'src/users/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Address {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ApiProperty()
  @Column()
    name:string;

  @ApiProperty()
  @Column()
    mobile: string;

  @ApiProperty()
  @Column()
    country: number;

  @ApiProperty({ type: Area })
  @ManyToOne(() => Area)
  @JoinColumn()
    province: Area;
  
  @ApiProperty({ type: Area })
  @ManyToOne(() => Area)
  @JoinColumn()
    city: Area;
  
  @ApiProperty({ type: Area })
  @ManyToOne(() => Area)
  @JoinColumn()
    region: Area;

  @ApiProperty()
  @Column()
    address:string;

  @ApiProperty()
  @Column()
    isDefault: boolean;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.addresses)
    user: User;
  
  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn()
    createDate: Date;
      
  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn()
    updateDate: Date;
}