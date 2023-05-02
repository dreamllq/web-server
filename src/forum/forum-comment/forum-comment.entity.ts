import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ForumPost } from '../forum-post/forum-post.entity';

@Entity()
export class ForumComment {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ApiProperty()
  @Column({ type: 'text' })
    content:string;

  @ApiProperty()
  @Column({ type: 'simple-array' })
    images: string[];

  @ApiProperty({ type: () => ForumComment })
  @ManyToOne(() => ForumComment)
  @JoinColumn()
    to: ForumComment;
    
  @ApiProperty({ type: () => ForumPost })
  @ManyToOne(() => ForumPost)
  @JoinColumn()
    post: ForumPost;
  
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