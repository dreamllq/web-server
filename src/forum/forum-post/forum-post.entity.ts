import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { AfterInsert, AfterLoad, BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ForumSection } from '../forum-section/forum-section.entity';
import { ForumComment } from '../forum-comment/forum-comment.entity';
import { ForumPostRelation } from '../forum-post-relation/forum-post-relation.entity';
import { ForumPostRelationTypeEnum } from '../forum-post-relation/forum-post-relation.type';

@Entity()
export class ForumPost {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ApiProperty()
  @Column({ nullable: true })
    title:string;

  @ApiProperty()
  @Column({ type: 'text' })
    content:string;

  @ApiProperty({ type: [String] })
  @Column({ type: 'simple-array' })
    images:string[];
  
  @ApiProperty({ type: () => User })
  @ManyToOne(() => User)
  @JoinColumn()
    creator: User;

  @ApiProperty({ type: () => ForumSection })
  @ManyToOne(() => ForumSection)
  @JoinColumn()
    section: ForumSection;

  @ApiProperty({ type: [ForumComment] })
  @OneToMany(() => ForumComment, (comment) => comment.post)
    comments: ForumComment[];

  @ApiProperty({ type: [ForumPostRelation] })
  @OneToMany(() => ForumPostRelation, (relation) => relation.post)
    zans: ForumPostRelation[];

  @ApiProperty({ type: [ForumPostRelation] })
  @OneToMany(() => ForumPostRelation, (relation) => relation.post)
    collects: ForumPostRelation[];

  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn()
    createDate: Date;
      
  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn()
    updateDate: Date;

  @BeforeInsert()
  updateTitle() {
    if (!this.title) {
      this.title = this.content.slice(0, 10);
    }
  }

  @AfterLoad()
  loadZans() {
    if (this.zans) {
      return this.zans = this.zans.filter(r => r.type === ForumPostRelationTypeEnum.Zan);
    }
  }

  @AfterLoad()
  loadCollects() {
    if (this.collects) {
      return this.collects = this.collects.filter(r => r.type === ForumPostRelationTypeEnum.Collect);
    }
  }

  @AfterLoad()
  loadComments() {
    if (this.comments) {
      this.comments.sort((a, b) => a.createDate.getTime() - b.createDate.getTime());
    }
  }
}