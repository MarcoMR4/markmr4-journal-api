import { PartialType } from '@nestjs/mapped-types';
import { CreatePostTagDto } from './create-posttag.dto';

export class UpdatePostTagDto extends PartialType(CreatePostTagDto) {}
