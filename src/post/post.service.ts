import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePostDto) {
    const slug = this.slugify(dto.title);

    return this.prisma.post.create({
      data: {
        title: dto.title,
        content: dto.content,
        status: dto.status ?? 'draft',
        slug,
      },
    });
  }

  async findAll() {
    return this.prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async update(id: string, dto: UpdatePostDto) {
    await this.findOne(id);

    const data: any = { ...dto };
    if (dto.title) data.slug = this.slugify(dto.title);

    return this.prisma.post.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.post.delete({ where: { id } });
  }

  private slugify(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
}
