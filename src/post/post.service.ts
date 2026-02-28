import { Injectable, NotFoundException } from '@nestjs/common';
import { PostStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { RoleName } from '@prisma/client';
import { AuthorizationService } from 'src/auth/services/authorization.service';

@Injectable()
export class PostService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authorizationService: AuthorizationService,
  ) {}

  async create(dto: CreatePostDto, userId: string) {
    const slug = this.slugify(dto.title);

    return this.prisma.post.create({
      data: {
        title: dto.title,
        content: dto.content,
        status: dto.status ?? PostStatus.draft,
        slug,
        user: {
          connect: { id: userId },
        },
        tagsOnPosts: {
          create: this.processTags(dto.tags),
        },
      },
      include: {
        tagsOnPosts: {
          include: {
            postTag: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        tagsOnPosts: {
          include: {
            postTag: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        tagsOnPosts: {
          include: {
            postTag: true,
          },
        },
      },
    });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async update(
    id: string,
    dto: UpdatePostDto,
    userId: string,
    userRoles: RoleName[],
  ) {
    console.log('user id for update:', userId);
    console.log('user roles for update:', userRoles);
    await this.authorizationService.checkPostOwnership(id, userId, userRoles);
    await this.findOne(id);

    const { tags, ...rest } = dto;
    const data: any = { ...rest };

    if (tags) {
      const tagCreateInput = this.processTags(tags);
      data.tagsOnPosts = {
        deleteMany: {},
        create: tagCreateInput,
      };
    }

    if (dto.title) data.slug = this.slugify(dto.title);

    return this.prisma.post.update({
      where: { id },
      data,
      include: {
        tagsOnPosts: {
          include: {
            postTag: true,
          },
        },
      },
    });
  }

  async remove(id: string, userId: string, userRoles: RoleName[]) {
    await this.authorizationService.checkPostOwnership(id, userId, userRoles);
    await this.findOne(id);
    return this.prisma.post.delete({ where: { id } });
  }

  private processTags(tags: string[]) {
    const tagsToProcess = tags || [];

    const uniqueTags = [
      ...new Set(
        tagsToProcess
          .filter((tag) => tag.trim().length > 0)
          .map(
            (tag) =>
              tag.trim().charAt(0).toUpperCase() +
              tag.trim().slice(1).toLowerCase(),
          ),
      ),
    ];

    return uniqueTags.map((tag) => ({
      postTag: {
        connectOrCreate: {
          where: { name: tag },
          create: { name: tag },
        },
      },
    }));
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
