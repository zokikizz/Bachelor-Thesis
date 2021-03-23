import { Test, TestingModule } from '@nestjs/testing';
import { BlogIndexService } from './blog-index.service';

describe('BlogIndexService', () => {
  let service: BlogIndexService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogIndexService],
    }).compile();

    service = module.get<BlogIndexService>(BlogIndexService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
