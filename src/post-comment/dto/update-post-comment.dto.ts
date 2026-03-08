import { IsString, IsOptional, IsEnum } from 'class-validator';
import { CommentStatus } from './comment-status.enum';

export class UpdatePostCommentDto {
  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsEnum(CommentStatus)
  status?: CommentStatus;
}
