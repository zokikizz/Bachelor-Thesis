import { ListResponse } from './list-response';
import { Comment } from '@blog-workspace/api-interfaces';

export interface ICommentIndex {
    index: (comment: Comment) => Promise<any>;
    list: (blogId: string) => Promise<ListResponse<Comment>>;
    update: (commentId: string, accepted: boolean) => Promise<boolean>;
}