import { Test, TestingModule } from '@nestjs/testing';
import { PostTagService } from './post-tag.service';
import { PrismaService } from '../prisma/prisma.service';

describe('PostTagService', () => {
  let service: PostTagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostTagService,
        {
          provide: PrismaService,
          useValue: {
            postTag: {
              findUnique: jest.fn(),
              create: jest.fn(),
              findMany: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<PostTagService>(PostTagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
