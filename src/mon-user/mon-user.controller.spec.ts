import { Test, TestingModule } from '@nestjs/testing';
import { MonUserController } from './mon-user.controller';

describe('MonUserController', () => {
  let controller: MonUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonUserController],
    }).compile();

    controller = module.get<MonUserController>(MonUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
