import { Module } from '@nestjs/common';
import { ForumSectionController } from './forum-section/forum-section.controller';
import { ForumSectionService } from './forum-section/forum-section.service';
import { ForumPostService } from './forum-post/forum-post.service';
import { ForumPostController } from './forum-post/forum-post.controller';
import { ForumCommentController } from './forum-comment/forum-comment.controller';
import { ForumCommentService } from './forum-comment/forum-comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForumSection } from './forum-section/forum-section.entity';
import { ForumPost } from './forum-post/forum-post.entity';
import { ForumComment } from './forum-comment/forum-comment.entity';
import { ForumPostRelationController } from './forum-post-relation/forum-post-relation.controller';
import { ForumPostRelationService } from './forum-post-relation/forum-post-relation.service';
import { ForumPostRelation } from './forum-post-relation/forum-post-relation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ForumSection,
      ForumPost,
      ForumComment,
      ForumPostRelation
    ])
  ],
  controllers: [
    ForumSectionController, // 板块
    ForumPostController, // 帖子
    ForumCommentController, // 评论
    ForumPostRelationController // 点赞、收藏
  ],
  providers: [
    ForumSectionService,
    ForumPostService,
    ForumCommentService,
    ForumPostRelationService
  ]
})
export class ForumModule {}
