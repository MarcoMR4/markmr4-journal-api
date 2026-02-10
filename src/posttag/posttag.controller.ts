import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostTagService } from './posttag.service';
import { CreatePostTagDto } from './dto/create-posttag.dto';
import { UpdatePostTagDto } from './dto/update-posttag.dto';

@Controller('post-tags')
export class PostTagController {
  constructor(private readonly postTagService: PostTagService) {}

  @Post()
  create(@Body() createPostTagDto: CreatePostTagDto) {
    return this.postTagService.create(createPostTagDto);
  }

  @Get()
  findAll() {
    return this.postTagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postTagService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostTagDto: UpdatePostTagDto) {
    return this.postTagService.update(id, updatePostTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postTagService.remove(id);
  }
}
