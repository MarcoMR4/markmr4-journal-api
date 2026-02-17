import { Test, TestingModule } from '@nestjs/testing';
import { PostCommentService } from './postcomment.service';
import { PrismaService } from '../prisma/prisma.service';

describe('PostCommentService', () => {
  let service: PostCommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostCommentService,
        {
          provide: PrismaService,
          useValue: {
            postComment: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<PostCommentService>(PostCommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
