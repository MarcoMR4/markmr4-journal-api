import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostTagDto } from './dto/create-posttag.dto';
import { UpdatePostTagDto } from './dto/update-posttag.dto';

@Injectable()
export class PostTagService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPostTagDto: CreatePostTagDto) {
    return this.prisma.postTag.create({
      data: createPostTagDto,
    });
  }

  findAll() {
    return this.prisma.postTag.findMany();
  }

  findOne(id: string) {
    if (!id) throw new NotFoundException('PostTag ID is required');
    return this.prisma.postTag.findUnique({
      where: { id },
    });
  }

  update(id: string, updatePostTagDto: UpdatePostTagDto) {
    if (!id) throw new NotFoundException('PostTag ID is required');
    return this.prisma.postTag.update({
      where: { id },
      data: updatePostTagDto,
    });
  }

  remove(id: string) {
    if (!id) throw new NotFoundException('PostTag ID is required');
    return this.prisma.postTag.delete({
      where: { id },
    });
  }
}
