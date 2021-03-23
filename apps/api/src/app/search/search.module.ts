import { CommentIndexService } from './services/comment-index/comment-index.service';
import { BlogIndexService } from './services/blog-index/blog-index.service';
import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
    imports: [
        ElasticsearchModule.register({
            node: 'http://localhost:9200'
        }),
    ],
    providers: [
        BlogIndexService,
        CommentIndexService,
    ],
    exports: [
        BlogIndexService,
        CommentIndexService,
    ]
})
export class SearchModule {}
