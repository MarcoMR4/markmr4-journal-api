import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should redirect to /api/v1/docs with 301', () => {
      const result = appController.rootRedirect();
      expect(result).toEqual({ url: '/api/v1/docs', statusCode: 301 });
    });
  });
});
