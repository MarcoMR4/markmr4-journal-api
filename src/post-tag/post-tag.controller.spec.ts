import { Test, TestingModule } from '@nestjs/testing';
import { PostTagController } from './post-tag.controller';
import { PostTagService } from './post-tag.service';

describe('PostTagController', () => {
  let controller: PostTagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostTagController],
      providers: [
        {
          provide: PostTagService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PostTagController>(PostTagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
