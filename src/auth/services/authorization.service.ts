import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { RoleName } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthorizationService {
  constructor(private readonly prisma: PrismaService) {}

  isAdmin = (roles: RoleName[]) => roles.includes(RoleName.admin);
  isAuthor = (roles: RoleName[]) => roles.includes(RoleName.author);

  async checkPostOwnership(
    postId: string,
    userId: string,
    userRoles: RoleName[],
  ): Promise<void> {
    if (this.isAdmin(userRoles)) {
      return;
    }

    const post = await this.prisma.post.findUnique({
      where: { id: postId },
      select: { userId: true },
    });

    if (!post) {
      throw new NotFoundException({
        errorCode: 'POST_NOT_FOUND',
        message: 'Post not found',
      });
    }

    if (post.userId !== userId) {
      throw new ForbiddenException({
        errorCode: 'POST_EDIT_FORBIDDEN',
        message: 'You can only edit your own posts',
      });
    }
  }

  async checkCommentOwnership(
    commentId: string,
    userId: string,
    userRoles: RoleName[],
  ): Promise<void> {
    if (this.isAdmin(userRoles)) {
      return;
    }

    const comment = await this.prisma.postComment.findUnique({
      where: { id: commentId },
      select: { userId: true },
    });

    if (!comment) {
      throw new NotFoundException({
        errorCode: 'COMMENT_NOT_FOUND',
        message: 'Comment not found',
      });
    }

    if (comment.userId !== userId) {
      throw new ForbiddenException({
        errorCode: 'COMMENT_EDIT_FORBIDDEN',
        message: 'You can only edit your own comments',
      });
    }
  }

  canModifyResource(
    resourceOwnerId: string,
    currentUserId: string,
    userRoles: RoleName[],
  ): boolean {
    return this.isAdmin(userRoles) || resourceOwnerId === currentUserId;
  }
}
