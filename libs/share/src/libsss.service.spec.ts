import { Test, TestingModule } from '@nestjs/testing';
import { LibsssService } from './libsss.service';

describe('LibsssService', () => {
  let service: LibsssService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LibsssService],
    }).compile();

    service = module.get<LibsssService>(LibsssService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
