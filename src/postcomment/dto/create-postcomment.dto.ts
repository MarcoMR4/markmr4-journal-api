import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { CommentStatus } from './comment-status.enum';

export class CreatePostCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsEnum(CommentStatus)
  status?: CommentStatus;

  @IsString()
  @IsNotEmpty()
  postId: string;
}
