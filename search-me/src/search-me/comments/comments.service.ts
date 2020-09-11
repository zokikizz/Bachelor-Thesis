import { Comment } from './entity/comment.entity';
import { ContentBuilderService } from './../content-builder/content-builder.service';
import { Injectable, Logger } from '@nestjs/common';
import { resolve } from 'dns';

@Injectable()
export class CommentsService {

    baseRoute: string = __dirname + '../blog/blogs';
    // archiveRoute: string = __dirname + '/trash';
    constructor(private logger: Logger, private contentBuilder: ContentBuilderService) {}

    createComment(commnet: Comment): Promise<Comment> {
        return new Promise((resolve, reject) => {
            resolve(commnet);
        });
    }

    updateComment(uiid: string, commnet: Comment): Promise<Comment> {
        return new Promise((resolve, reject) => {
            resolve(commnet);
        });
    }

    deleteComment(uiid: string): Promise<string> {
        return new Promise((resolve, reject) => {
            resolve(uiid);
        });
    }

    getCommentsForBlog(bloguiid: string): Promise<{ comments: Comment[]}> {
        return new Promise((resolve, reject) => {
            return resolve({ comments: [] });
        });
    }
}
