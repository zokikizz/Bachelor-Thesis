import { BlogIndexService } from './../search/services/blog-index/blog-index.service';
import { BlogFileService } from './services/blog-file/blog-file.service';

import { BlogController } from './controllers/blog/blog.controller';
import { Module, OnModuleInit } from '@nestjs/common';
import { SearchModule } from '../search/search.module';

@Module({
    imports: [
        SearchModule,
    ],
    controllers: [
        BlogController
    ],
    providers: [
        BlogFileService,
    ]
})
export class BlogModule implements OnModuleInit {

    constructor(private bfs: BlogFileService,
                private bis: BlogIndexService) { }


    onModuleInit() {
        this.bis.blogMapping().then(() => {
           this.setUpBlogs();
        });
    }

    async setUpBlogs() {
        const r = await this.bfs.readAllBlogs();
        // console.log(r);
        const indexedBlogs = (await this.bis.bulk(r)).body.items;
        // console.log(indexedBlogs);
        const errors = indexedBlogs.filter(i => i.index?.error).map(i => i.index.error)
        errors.length && errors.array.forEach(element => {
            console.error(element);
        });
    }
}
