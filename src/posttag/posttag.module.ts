import { Module } from '@nestjs/common';
import { PostTagService } from './posttag.service';
import { PostTagController } from './posttag.controller';

import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [PostTagService, PrismaService],
  controllers: [PostTagController],
})
export class PostTagModule {}
