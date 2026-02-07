import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsInt,
  MaxLength,
  IsPositive,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum PostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  author?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsEnum(PostStatus)
  status?: PostStatus;
}
