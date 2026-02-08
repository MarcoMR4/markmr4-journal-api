import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { PostCommentService } from './postcomment.service';
import { CreatePostCommentDto } from './dto/create-postcomment.dto';
import { UpdatePostCommentDto } from './dto/update-postcomment.dto';

@Controller('post-comments')
export class PostCommentController {
  constructor(private readonly service: PostCommentService) {}

  @Post()
  async create(@Body() dto: CreatePostCommentDto) {
    return this.service.create(dto);
  }

  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdatePostCommentDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
