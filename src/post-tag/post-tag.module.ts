import { Module } from '@nestjs/common';
import { PostTagService } from './post-tag.service';
import { PostTagController } from './post-tag.controller';

import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [PostTagService, PrismaService],
  controllers: [PostTagController],
})
export class PostTagModule {}
