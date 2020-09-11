import { ContentBuilderService } from './../content-builder/content-builder.service';
import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import { Blog, ListResponse, BlogItem, Props } from './entity/blog.entity';
import { v4 as uuidv4 } from 'uuid';
import * as npc from 'ncp';

@Injectable()
export class BlogService {

    baseRoute: string = __dirname + '/blogs';
    archiveRoute: string = __dirname + '/trash';

    constructor(private logger: Logger, private contentBuilder: ContentBuilderService) {
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

    getBlogById(id: string): Promise<ListResponse> {
        return this.filterBlogs(this.filterById, id);
    }

    getBlogByTitle(title: string): Promise<ListResponse> {
        return this.filterBlogs(this.filterByTitle, title);
    }

    createBlog(blog: Blog): Promise<Blog> {
        return new Promise<Blog>((resolve, rejects) => {
            const generateProps = this.generateProps();
            const foldername = this.generateBlogFileName(blog.title, generateProps);
            const filename = foldername + '.txt';
            const folderpath = `${this.baseRoute}/${foldername}`;
            const filepath = `${this.baseRoute}/${foldername}/${filename}`;
            const content = this.contentBuilder.createBlogContent(
                blog.title, blog.content, 'author',
                blog.category, blog.tags, generateProps.uiid,
            );

            fs.mkdir(folderpath, { recursive: true }, (err) => {
                if (err) { this.logger.error(err); rejects(err); }
                fs.writeFile(filepath, content, (error) => {
                    if (error) { this.logger.error(error); rejects(err); }
                    this.logger.debug(`blog ${filename} is created`);
                    resolve(this.contentBuilder.parseBlogFromString(content));
                });
            });
        });
    }

    updateBlog(title: string, blog: Blog) {
        return new Promise<Blog>((resolve, rejects) => {
            const path = `${this.baseRoute}/${title}/${title}.txt`;
            fs.readFile(path, 'utf8', (error, data) => {
                if (error) { this.logger.error(error); rejects(error); }
                const updateBlog = this.contentBuilder.parseBlogFromString(data);
                updateBlog.content = blog.content;
                updateBlog.tags = blog.tags;
                updateBlog.title = blog.title;
                updateBlog.category = blog.category;

                const content = this.contentBuilder.createBlogContent(
                    updateBlog.title, updateBlog.content, updateBlog.author, updateBlog.category,
                    updateBlog.tags, updateBlog.uiid, updateBlog.creationdate);
                fs.writeFile(path, content, (err) => {
                    if (err) { this.logger.error(err); rejects(err); }
                    this.logger.debug(`blog ${blog.title} is updated`);
                    return resolve(updateBlog);
                });
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

    private generateBlogFileName(title: string, generateProps: Props) {
        return `${generateProps.uiid}|${title}-${generateProps.day}-${generateProps.month}-${generateProps.year}|${generateProps.hours}:${generateProps.minutes}:${generateProps.seconds}(${generateProps.miliseconds})`;
    }

    private generateProps(): Props {

        const currentTime = new Date();
        const month = currentTime.getMonth() + 1;
        const day = currentTime.getDate();
        const year = currentTime.getFullYear();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const seconds = currentTime.getSeconds();
        const miliseconds = currentTime.getMilliseconds();
        const uiid = uuidv4();

        return {
            currentTime,
            month,
            day,
            year,
            hours,
            minutes,
            seconds,
            miliseconds,
            uiid,
        };
    }

    filterById = (id: string) => {
        return (element) => element.includes(id);
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
        return { title: fileName, creationdate: fs.statSync(this.baseRoute + '/' + fileName).mtime };
    }

    deleteBlog(title: string): Promise<{ title: string }> {
        return new Promise((resolve, rejects) => {
            npc(`${this.baseRoute}/${title}`, `${this.archiveRoute}/${title}`, (err) => {
                if (err) { this.logger.error(err); rejects(err); }
                fs.rmdir(`${this.baseRoute}/${title}`, { recursive: true }, (error) => {
                    if (error) { this.logger.error(error); rejects(error); }
                    this.logger.debug(`blog ${title} deleted`);
                    resolve({ title });
                });
            });
        });
    }
}
