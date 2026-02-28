import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleName } from 'src/types/user';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Roles(RoleName.admin, RoleName.author)
  create(@Body() dto: CreatePostDto, @Request() req) {
    const userId = req.user.sub;
    return this.postService.create(dto, userId);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @Roles(RoleName.admin, RoleName.author)
  update(@Param('id') id: string, @Body() dto: UpdatePostDto, @Request() req) {
    console.log('User ID in controller:', req.user.sub);
    return this.postService.update(id, dto, req.user.sub, req.user.roles);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles(RoleName.admin, RoleName.author)
  remove(@Param('id') id: string, @Request() req) {
    return this.postService.remove(id, req.userId, req.user.roles);
  }
}
