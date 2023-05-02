import { ApiProperty } from '@nestjs/swagger';
import { Resource } from 'src/resources/resource.entity';
import { User } from 'src/users/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Role {
  @ApiProperty({ description: '角色id' })
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ApiProperty({ description: '角色名称' })
  @Column({
    nullable: false,
    unique: true 
  })
    name: string;

  @ApiProperty({ description: '角色描述' })
  @Column()
    desc: string;

  @ApiProperty({
    description: '资源列表',
    type: [Resource] 
  })
  @ManyToMany(() => Resource)
  @JoinTable()
    resources: Resource[];
    
  
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