import { CommentAdapter } from './../../models/comment-adapter';
import { ICommentIndex } from './../../intefaces/comment-index-interface';
import { Comment } from '@blog-workspace/api-interfaces';
import { ElasticsearchService } from '@nestjs/elasticsearch';

import { HttpStatus, Injectable } from '@nestjs/common';
import { RequestParams } from '@elastic/elasticsearch';
import { ListResponse } from '../../intefaces/list-response';
import { SearchResponse } from '../../intefaces/elasticsearc-interface';
@Injectable()
export class CommentIndexService implements ICommentIndex {

    readonly esIndex = 'comment';

    constructor(private ess: ElasticsearchService) { }

    async update(commentId: string, accepted: boolean): Promise<boolean | any> {
        const request: RequestParams.Update = {
            index: this.esIndex,
            id: commentId,
            body: {
                doc: {
                    isApproved: accepted
                }
            }
        }
        return await this.ess.update(request);
    }

    async index(data: Comment): Promise<Comment | any> {

        const doc: RequestParams.Index = {
            index: this.esIndex,
            refresh: true,
            body: {
                ...data,
                isApproved: false
            }
        }

        const r = await this.ess.index(doc);
        return r;
    }

    async list(blogId: string, startFrom = 0, size = 10): Promise<ListResponse<Comment> | []> {
        /*query: {
            match: {
                name: 'test',
            }
        }*/

        const doc: RequestParams.Search = {
            index: this.esIndex,
            from: startFrom,
            size: size,
            body: {
                query: {
                    match: {
                        blogId: blogId
                    }
                },
            }
        };

        const r = await this.ess.search(doc).catch(e => e.meta.statusCode);
        return r === HttpStatus.NOT_FOUND ? Promise.resolve([]) :  CommentAdapter.request(r.body as SearchResponse<Comment>);
    }
}
