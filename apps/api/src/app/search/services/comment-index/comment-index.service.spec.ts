import { Test, TestingModule } from '@nestjs/testing';
import { CommentIndexService } from './comment-index.service';

describe('CommentIndexService', () => {
  let service: CommentIndexService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentIndexService],
    }).compile();

    service = module.get<CommentIndexService>(CommentIndexService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
