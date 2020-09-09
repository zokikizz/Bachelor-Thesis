import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import { Blog, ListResponse, BlogItem } from './entity/blog.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BlogService {

    baseRoute: string = __dirname + '/blogs';
    archiveRoute: string = __dirname + '/trash';

    constructor(private logger: Logger) {
        this.setUp();
    }

    getBlogs(limit?: number): Promise<ListResponse> {
        return new Promise((resolve, rejects) => {
            fs.readdir(this.baseRoute, (err, files) => {
                if (err) {
                    this.logger.error(err);
                    rejects(err);
                }
                const res = {
                    blogs: files.reduce((acc, currVal) =>
                        [...acc, this.createFileInfo(currVal)], []),
                };
                resolve(res);
            });
        });
    }

    getBlogById(id: number): Promise<ListResponse> {
        return this.filterBlogs(this.filterById, id);
    }

    getBlogByTitle(title: string): Promise<ListResponse> {
        return this.filterBlogs(this.filterByTitle, title);
    }

    createBlog(blog: Blog): Promise<Blog> {
        return new Promise<Blog>((resolve, rejects) => {
            const filename = this.generateBlogFileName(blog.title);
            const path = `${this.baseRoute}/${filename}`;
            fs.writeFile(path, blog.content, (err) => {
                if (err) { this.logger.error(err); rejects(err); }
                this.logger.debug(`blog ${filename} is created`);
                resolve({ id: filename, title: blog.title, content: blog.content });
            });
        });
    }

    updateBlog(blog: Blog) {
        return new Promise<Blog>((resolve, rejects) => {
            const path = `${this.baseRoute}/${blog.title}`;
            fs.writeFile(path, blog.content, (err) => {
                if (err) { this.logger.error(err); rejects(err); }
                this.logger.debug(`blog ${blog.title} is updated`);
                return resolve({ id: blog.title, title: blog.title, content: blog.content } as Blog);
            });
        });
    }

    setUp() {
        if (!fs.existsSync(this.baseRoute)) {
            fs.mkdirSync(this.baseRoute);
        }

        if (!fs.existsSync(this.archiveRoute)) {
            fs.mkdirSync(this.archiveRoute);
        }
    }

    private generateBlogFileName(title: string) {
        // Return today's date and time
        const currentTime = new Date();
        const month = currentTime.getMonth() + 1;
        const day = currentTime.getDate();
        const year = currentTime.getFullYear();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const seconds = currentTime.getSeconds();
        const miliseconds = currentTime.getMilliseconds();
        return `${uuidv4()}|${title}-${month}-${day}-${year}|${hours}:${minutes}:${seconds}(${miliseconds}).txt`;
    }

    filterById = (id: number) => {
        return (element) => fs.statSync(element).uid === id;
    }

    filterByTitle = (title: string) => (element, index, array) => {
        return element.includes(title);
    }

    filterBlogs(filterFuntion, term: number | string): Promise<ListResponse> {
        return new Promise((resolve, rejects) => {
            fs.readdir(this.baseRoute, (err, files) => {
                if (err) {
                    this.logger.error(err);
                    rejects(err);
                }

                const res = {
                    blogs: files.filter(filterFuntion(term)).map(
                        filename => this.createFileInfo(filename)),
                };
                resolve(res);
            });
        });
    }

    createFileInfo(fileName: string): BlogItem {
        return { title: fileName, creationDate: fs.statSync(this.baseRoute + '/' + fileName).mtime };
    }

    deleteBlog(title: string): Promise<{ title: string }> {
        return new Promise((resolve, rejects) => {
            fs.rename(`${this.baseRoute}/${title}`, `${this.archiveRoute}/${title}`, (err) => {
                if (err) { throw err; rejects(err); }

                this.logger.debug(`blog ${title} deleted`);
                resolve({ title });
            });
        });
    }
}
