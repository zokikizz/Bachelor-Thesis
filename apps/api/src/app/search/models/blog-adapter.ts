import { ListResponse } from './../intefaces/list-response';
import { SearchResponse } from '../intefaces/elasticsearc-interface';
import { Blog } from "@blog-workspace/api-interfaces";

export class BlogAdapter {
    static request(body: SearchResponse<Blog>): ListResponse<Blog> {
        const blogs = body.hits.hits.map(b => {
            const { content, name, ...response } = b._source;
            return {
                id: b._id,
                ...response
            };
         });
        
        return {
            total: body.hits.total.value,
            list: blogs
        }
    }

}