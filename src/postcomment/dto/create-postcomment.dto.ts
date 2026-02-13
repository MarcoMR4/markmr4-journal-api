import { IsString, IsNotEmpty, IsEnum, IsUUID } from 'class-validator';
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

  @IsUUID()
  userId: string;
}
