import { Module } from '@nestjs/common';
import { PostCommentService } from './postcomment.service';
import { PostCommentController } from './postcomment.controller';

@Module({
  providers: [PostCommentService],
  controllers: [PostCommentController],
})
export class PostCommentModule {}
