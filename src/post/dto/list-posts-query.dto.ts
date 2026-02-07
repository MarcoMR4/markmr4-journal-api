// src/posts/dto/list-posts.query.dto.ts
import { Type } from 'class-transformer';
import { IsOptional, IsString, Max, Min, IsEnum } from 'class-validator';
import { PostStatus } from './create-post.dto';

export class ListPostsQueryDto {
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @Max(50)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(PostStatus)
  status?: PostStatus;
}
