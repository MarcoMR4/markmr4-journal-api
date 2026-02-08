import { Test, TestingModule } from '@nestjs/testing';
import { PostCommentController } from './postcomment.controller';

describe('PostCommentController', () => {
  let controller: PostCommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostCommentController],
    }).compile();

    controller = module.get<PostCommentController>(PostCommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
