import { Module, Logger } from '@nestjs/common';
import { BlogController } from './blog/blog.controller';
import { BlogService } from './blog/blog.service';
import { ContentBuilderService } from './content-builder/content-builder.service';

@Module({
  controllers: [BlogController],
  providers: [BlogService, Logger, ContentBuilderService],
})
export class SearchMeModule {}
