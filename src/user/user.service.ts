import { Injectable } from '@nestjs/common';
import { User as PrismaUser, RoleName } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';

interface CreateUserInput {
  name: string;
  nickname?: string;
  email: string;
  password: string;
  isActive?: boolean;
}

export interface UserWithRoles extends PrismaUser {
  roles: {
    role: {
      name: RoleName;
    };
  }[];
}

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async create(data: CreateUserInput): Promise<PrismaUser> {
    const hashedPassword = await this.hashPassword(data.password);

    const authorRole = await this.prisma.role.findUnique({
      where: { name: RoleName.author },
    });

    return this.prisma.user.create({
      data: {
        name: data.name,
        nickname: data.nickname,
        email: data.email,
        password: hashedPassword,
        isActive: data.isActive ?? true,
        roles: {
          create: {
            roleId: authorRole.id,
          },
        },
      },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });
  }

  async findOne(username: string): Promise<UserWithRoles | null> {
    return this.prisma.user.findFirst({
      where: { nickname: username },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });
  }
}
