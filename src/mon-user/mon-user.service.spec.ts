import { Test, TestingModule } from '@nestjs/testing';
import { MonUserService } from './mon-user.service';

describe('MonUserService', () => {
  let service: MonUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MonUserService],
    }).compile();

    service = module.get<MonUserService>(MonUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
