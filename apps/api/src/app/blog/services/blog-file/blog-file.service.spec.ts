import { Test, TestingModule } from '@nestjs/testing';
import { BlogFileService } from './blog-file.service';

describe('BlogFileService', () => {
  let service: BlogFileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogFileService],
    }).compile();

    service = module.get<BlogFileService>(BlogFileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
