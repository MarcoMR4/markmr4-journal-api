import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostCommentDto } from './dto/create-postcomment.dto';
import { UpdatePostCommentDto } from './dto/update-postcomment.dto';

@Injectable()
export class PostCommentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePostCommentDto) {
    return this.prisma.postComment.create({
      data: {
        content: dto.content,
        status: dto.status ?? 'pending',
        post: { connect: { id: dto.postId } },
      },
    });
  }

  async findAll() {
    return this.prisma.postComment.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const comment = await this.prisma.postComment.findUnique({ where: { id } });
    if (!comment) throw new NotFoundException('Comment not found');
    return comment;
  }

  async update(id: string, dto: UpdatePostCommentDto) {
    await this.findOne(id);
    return this.prisma.postComment.update({
      where: { id },
      data: { ...dto },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.postComment.delete({ where: { id } });
  }
}
