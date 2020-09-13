import { Comment } from './entity/comment.entity';
import { ContentBuilderService } from './../content-builder/content-builder.service';
import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs';
import { Props } from '../blog/entity/blog.entity';

@Injectable()
export class CommentsService {

    readonly baseRoute: string = __dirname + '/../blog/blogs';
    readonly commentRoute = 'comments';
    // archiveRoute: string = __dirname + '/trash';
    constructor(
        private logger: Logger,
        private contentBuilder: ContentBuilderService) { }

    createComment(title: string, comment: Comment) {
        return fs.promises.stat(`${this.baseRoute}/${title}/${this.commentRoute}`).then(() =>
            this.createNewComment(title, comment),
        ).catch(() => fs.promises.mkdir(`${this.baseRoute}/${title}/${this.commentRoute}`).then(() => {
                return this.createNewComment(title, comment);
            }),
        ).catch(e => new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR));
    }

    generateCommentFilename(props: Props, author: string): string {
        return `${props.day}-${props.month}-${props.year}|${props.hours}:${props.minutes}:${props.seconds}(${props.miliseconds})|${author}|${props.uiid}.txt`;
    }

    updateComment(title: string, commentFileName, commnet: Comment) {
        const commentFilenamePath = `${this.baseRoute}/${title}/${this.commentRoute}/${commentFileName}`;
        return fs.promises.readFile(commentFilenamePath, { encoding: 'utf-8' }).then((data) => {
            const commentForUpdate = this.contentBuilder.parseCommentFromString(data);
            commentForUpdate.content = commnet.content;
            commentForUpdate.tags = commnet.tags;
            const parsedComment = this.contentBuilder.createCommentContent(commentForUpdate.author,
                commentForUpdate.tags, commentForUpdate.filename, commentForUpdate.content, commentForUpdate.uiid,
                commentForUpdate.creationdate);
            return fs.promises.writeFile(commentFilenamePath, parsedComment).then(() => commentForUpdate);
        }).catch(e => new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR));
    }

    deleteComment(title: string, filename: string): Promise<{ filename: string }> {
        return fs.promises.unlink(`${this.baseRoute}/${title}/${this.commentRoute}/${filename}`).then(() => {
            return { filename };
        });
    }

    getCommentsForBlog(title: string): Promise<Comment[]> {
        return fs.promises.stat(`${this.baseRoute}/${title}/${this.commentRoute}`).then(stat => {
                return fs.promises.readdir(`${this.baseRoute}/${title}/${this.commentRoute}`).then(files => {
                    return files;
                });
            }).catch(() => {
                return [];
            }).then((files: string[]) => {
                const promises = [];
                for (const commentFile of files) {
                    promises.push(
                        fs.promises.readFile(`${this.baseRoute}/${title}/${this.commentRoute}/${commentFile}`, { encoding: 'utf-8' }),
                    );
                }
                return Promise.all(promises).then(comments =>
                    comments.map(comment => this.contentBuilder.parseCommentFromString(comment)),
                );
        });
    }

    createNewComment(title: string, comment: Comment) {
        const props = this.contentBuilder.generateProps();
        const filename = this.generateCommentFilename(props, comment.author);
        const commentContent = this.contentBuilder.createCommentContent(comment.author, comment.tags, filename, comment.content, props.uiid);
        return fs.promises.writeFile(`${this.baseRoute}/${title}/${this.commentRoute}/${filename}`, commentContent).then(() => {
            this.logger.debug(`created comment ${filename}.`);
            return this.contentBuilder.parseCommentFromString(commentContent);
        });
    }
}
