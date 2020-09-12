import { CommentsService } from './../comments/comments.service';
import { ContentBuilderService } from './../content-builder/content-builder.service';
import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs';
import {Blog, ListResponse, BlogItem, Props} from './entity/blog.entity';

@Injectable()
export class BlogService {

    baseRoute: string = __dirname + '/blogs';
    archiveRoute: string = __dirname + '/trash';

    constructor(
        private logger: Logger,
        private contentBuilder: ContentBuilderService,
        private commentService: CommentsService) {
        this.setUp();
    }

    getBlogs(limit?: number): Promise<ListResponse | HttpException> {
        return fs.promises.readdir(this.baseRoute).then(files => {
            const blogs: BlogItem[] = files.reduce((acc, currVal) =>
                [...acc, this.createFileInfo(currVal)], []);
            return { blogs };
        }).catch(err => {
            this.logger.error(err);
            return new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }

    async getBlogById(id: string): Promise<ListResponse | Blog> {
        return this.filterBlogs(this.filterById, id, false);
    }

    getBlogByTitle(title: string): Promise<ListResponse | Blog> {
        return this.filterBlogs(this.filterByTitle, title, true);
    }

    createBlog(blog: Blog): Promise<Blog | HttpException> {
        const generateProps = this.contentBuilder.generateProps();
        const foldername = this.generateBlogFileName(blog.title, generateProps);
        const filename = foldername + '.txt';
        const folderpath = `${this.baseRoute}/${foldername}`;
        const filepath = `${this.baseRoute}/${foldername}/${filename}`;
        const content = this.contentBuilder.createBlogContent(
            blog.title, blog.content, 'author',
            blog.category, blog.tags, filename, generateProps.uiid,
        );
        console.log(content);

        return fs.promises.mkdir(folderpath).then(() => {
            return fs.promises.writeFile(filepath, content).then(() => {
                this.logger.debug(`blog ${filename} is created`);
                return this.contentBuilder.parseBlogFromString(content);
            });
        }).catch(e => new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR));
    }

    updateBlog(title: string, blog: Blog) {

        const path = `${this.baseRoute}/${title}/${title}.txt`;

        return fs.promises.readFile(path, { encoding: 'utf-8' }).then(data => {
            const updateBlog = this.contentBuilder.parseBlogFromString(data);
            updateBlog.content = blog.content;
            updateBlog.tags = blog.tags;
            updateBlog.category = blog.category;
            const content = this.contentBuilder.createBlogContent(
                updateBlog.title, updateBlog.content, updateBlog.author, updateBlog.category,
                updateBlog.tags, updateBlog.filename, updateBlog.uiid, updateBlog.creationdate);
            return fs.promises.writeFile(path, content).then(() => {
                this.logger.debug(`blog ${blog.title} is updated`);
                return updateBlog;
            });
        }).catch(e => new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR));
    }

    setUp() {
        if (!fs.existsSync(this.baseRoute)) {
            fs.mkdirSync(this.baseRoute);
        }

        if (!fs.existsSync(this.archiveRoute)) {
            fs.mkdirSync(this.archiveRoute);
        }
    }

    private generateBlogFileName(title: string, generateProps: Props) {
        return `${generateProps.day}-${generateProps.month}-${generateProps.year}|${generateProps.hours}:${generateProps.minutes}:${generateProps.seconds}(${generateProps.miliseconds})|${title}|${generateProps.uiid}`;
    }

    filterById = (id: string) => {
        return (element) => element.includes(id);
    }

    filterByTitle = (title: string) => (element, index, array) => {
        return element.includes(title);
    }

    async filterBlogs(filterFuntion, term: number | string, asArray: boolean = false): Promise<ListResponse | Blog> {

        return fs.promises.readdir(this.baseRoute).then(files => {
            if (asArray) {
                const res: ListResponse = {
                    blogs: files.filter(filterFuntion(term)).map(
                        filename => this.createFileInfo(filename)),
                 };
                return res;
            } else {
                const name = files.filter(filterFuntion(term))[0];
                return fs.promises.readFile(`${this.baseRoute}/${name}/${name}.txt`, { encoding: 'utf-8' }).then(data => {
                    const res = this.contentBuilder.parseBlogFromString(data);
                    return this.commentService.getCommentsForBlog(res.filename.replace(/\.[^.]*$/, '')).then(comments => {
                        res.comments = comments;
                        return res;
                    });
                });
            }
        });
    }

    createFileInfo(fileName: string): BlogItem {
        return { title: fileName, creationdate: fs.statSync(this.baseRoute + '/' + fileName).mtime };
    }

    deleteBlog(title: string): Promise<{ title: string }> {
        return fs.promises.rename(`${this.baseRoute}/${title}`, `${this.archiveRoute}/${title}`).then(() => {
            return fs.promises.rmdir(`${this.baseRoute}/${title}`, { recursive: true }).then(() => {
                return { title };
            });
        });
        // TODO: REMOVE npc if code above work correctly (test again)
        // return new Promise((resolve, rejects) => {
        //     npc(`${this.baseRoute}/${title}`, `${this.archiveRoute}/${title}`, (err) => {
        //         if (err) { this.logger.error(err); rejects(err); }
        //         fs.rmdir(`${this.baseRoute}/${title}`, { recursive: true }, (error) => {
        //             if (error) { this.logger.error(error); rejects(error); }
        //             this.logger.debug(`blog ${title} deleted`);
        //             resolve({ title });
        //         });
        //     });
        // });
    }
}
