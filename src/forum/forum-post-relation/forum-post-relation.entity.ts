import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ForumPost } from '../forum-post/forum-post.entity';
import { ForumPostRelationTypeEnum } from './forum-post-relation.type';

@Entity()
export class ForumPostRelation {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
    id: string;
  
  @ApiProperty({ type: () => User })
  @ManyToOne(() => User)
  @JoinColumn()
    creator: User;
    
  @ApiProperty({ type: () => ForumPost })
  @ManyToOne(() => ForumPost)
  @JoinColumn()
    post: ForumPost;

  @ApiProperty({ enum: ForumPostRelationTypeEnum })
  @Column({
    type: 'enum',
    enum: ForumPostRelationTypeEnum,
    default: ForumPostRelationTypeEnum.Unknown
  })
    type: ForumPostRelationTypeEnum;

  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn()
    createDate: Date;
      
  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn()
    updateDate: Date;
}