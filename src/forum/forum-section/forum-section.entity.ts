import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ForumPost } from '../forum-post/forum-post.entity';

@Entity()
export class ForumSection {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ApiProperty()
  @Column()
    name:string;

  @ApiProperty()
  @Column()
    desc:string;
  
  @ApiProperty({ type: () => User })
  @ManyToOne(() => User)
  @JoinColumn()
    creator: User;

  @ApiProperty({ type: [ForumPost] })
  @OneToMany(() => ForumPost, (post) => post.section)
    posts: ForumPost[];

  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn()
    createDate: Date;
      
  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn()
    updateDate: Date;
}