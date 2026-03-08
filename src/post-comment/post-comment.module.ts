import { Module } from '@nestjs/common';
import { PostCommentService } from './post-comment.service';
import { PostCommentController } from './post-comment.controller';

@Module({
  providers: [PostCommentService],
  controllers: [PostCommentController],
})
export class PostCommentModule {}
