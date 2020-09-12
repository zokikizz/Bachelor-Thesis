import { Comment } from './entity/comment.entity';
import { ContentBuilderService } from './../content-builder/content-builder.service';
import { Injectable, Logger } from '@nestjs/common';
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

    createComment(title: string, comment: Comment): Promise<Comment> {
        return new Promise((resolve, reject) => {
            fs.exists(`${this.baseRoute}/${title}/${this.commentRoute}`, exist => {
                if (!exist) {
                    fs.mkdir(`${this.baseRoute}/${title}/${this.commentRoute}`, (err) => {
                        this.createNewComment(title, comment, resolve, reject);
                    });
                } else {
                    this.createNewComment(title, comment, resolve, reject);
                }

            });
        });
    }

    generateCommentFilename(props: Props, author: string): string {
        return `${props.uiid}|${author}|${props.day}-${props.month}-${props.year}|${props.hours}:${props.minutes}:${props.seconds}(${props.miliseconds}).txt`;
    }

    updateComment(title: string, commentFileName, commnet: Comment): Promise<Comment> {
        return new Promise((resolve, reject) => {
            const commentFilenamePath = `${this.baseRoute}/${title}/${this.commentRoute}/${commentFileName}`;
            fs.readFile(commentFilenamePath, 'utf-8', (err, data) => {
                if (err) { this.logger.error(err); reject(err); }
                const commentForUpdate = this.contentBuilder.parseCommentFromString(data);
                commentForUpdate.content = commnet.content;
                commentForUpdate.tags = commnet.tags;
                const parsedComment = this.contentBuilder.createCommentContent(commentForUpdate.author,
                    commentForUpdate.tags, commentForUpdate.filename, commentForUpdate.content, commentForUpdate.uiid,
                    commentForUpdate.creationdate);
                fs.writeFile(commentFilenamePath, parsedComment, (error) => {
                    if (error) { this.logger.error(error); reject(error); }

                    resolve(commentForUpdate);
                });
            });
        });
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

    createNewComment(title: string, comment: Comment, resolve, reject) {
        const props = this.contentBuilder.generateProps();
        const filename = this.generateCommentFilename(props, comment.author);
        const commentContent = this.contentBuilder.createCommentContent(comment.author, comment.tags, filename, comment.content, props.uiid);
        fs.writeFile(`${this.baseRoute}/${title}/${this.commentRoute}/${filename}`, commentContent, (error) => {
            if (error) { this.logger.error(error); reject(error); }
            this.logger.debug(`created comment ${filename}.`);
            resolve(this.contentBuilder.parseCommentFromString(commentContent));

        });
    }
}
