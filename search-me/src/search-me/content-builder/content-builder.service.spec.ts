import { Test, TestingModule } from '@nestjs/testing';
import { ContentBuilderService } from './content-builder.service';

describe('ContentBuilderService', () => {
  let service: ContentBuilderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentBuilderService],
    }).compile();

    service = module.get<ContentBuilderService>(ContentBuilderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
