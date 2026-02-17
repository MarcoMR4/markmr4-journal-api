import { Test, TestingModule } from '@nestjs/testing';
import { PostCommentController } from './postcomment.controller';
import { PostCommentService } from './postcomment.service';

describe('PostCommentController', () => {
  let controller: PostCommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostCommentController],
      providers: [
        {
          provide: PostCommentService,
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

    controller = module.get<PostCommentController>(PostCommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
