import { Module, Logger } from '@nestjs/common';
import { BlogController } from './blog/blog.controller';
import { BlogService } from './blog/blog.service';

@Module({
  controllers: [BlogController],
  providers: [BlogService, Logger],
})
export class SearchMeModule {}
