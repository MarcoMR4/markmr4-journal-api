import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostCommentModule } from './post-comment/post-comment.module';
import { PostTagModule } from './post-tag/post-tag.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    PostModule,
    PrismaModule,
    PostCommentModule,
    PostTagModule,
    HealthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
