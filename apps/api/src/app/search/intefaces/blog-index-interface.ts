import { Blog } from '@blog-workspace/api-interfaces';
import { ListResponse } from './list-response';

export interface IBlogIndex {
    search?: (data: string) => Promise<ListResponse<Blog>>;
    bulk?: (data: Blog[]) => Promise<any>;
    list?: (startFrom: number) => Promise<ListResponse<Blog>>;
    getById: (blogId: string) => Promise<Blog | any>;
}
