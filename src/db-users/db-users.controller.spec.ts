import { Test, TestingModule } from '@nestjs/testing';
import { DbUsersController } from './db-users.controller';

describe('DbUsersController', () => {
  let controller: DbUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DbUsersController],
    }).compile();

    controller = module.get<DbUsersController>(DbUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
