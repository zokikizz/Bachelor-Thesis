import { Module, Logger } from '@nestjs/common';
import { BlogController } from './blog/blog.controller';
import { BlogService } from './blog/blog.service';
import { ContentBuilderService } from './content-builder/content-builder.service';
import { CommentsController } from './comments/comments.controller';
import { CommentsService } from './comments/comments.service';

@Module({
  controllers: [BlogController, CommentsController],
  providers: [BlogService, Logger, ContentBuilderService, CommentsService],
})
export class SearchMeModule {}
