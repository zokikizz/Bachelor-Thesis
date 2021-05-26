import { Blog } from '@blog-workspace/api-interfaces';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';


/**
 * File service for blog
 * Every indexed blog must be in assets/blogs folder. Every blog should have separated folder.
 * Inside folder there should be file with same name as parent folder (also that will be title of the blog) and with whatever extension (.md, .txt, .html, .xml)
 * That folder will also contain child folder for comments with name `comments` ???
 * To set category and tags for blogs - rethink how we will fix this problem
 */
@Injectable()
export class BlogFileService {

    private readonly blogPath = `${__dirname}/assets/blogs`;


    private async readAllDirs(path: string = this.blogPath) {
        return (await fs.promises.readdir(path, { withFileTypes: true })).filter(e => e.isDirectory());
    }

    private async findBlog(name: string) {
        const blogName = (await fs.promises.readdir(`${this.blogPath}/${name}`, { withFileTypes: true }))
            .filter(e => !e.isDirectory())
            .map(e => e.name)
            .filter(name => name.includes('blog') || name.includes('Blog'))[0];

        const path = `${this.blogPath}/${name}/${blogName}`;
        const content = await fs.promises.readFile(path);
        const stat = await fs.promises.stat(path);

        const nameWithCategoryAndTags = blogName.slice(0, blogName.lastIndexOf('.'));
        const tags = nameWithCategoryAndTags.slice(nameWithCategoryAndTags.lastIndexOf('|')+1, nameWithCategoryAndTags.length);
        const category = nameWithCategoryAndTags.slice(nameWithCategoryAndTags.indexOf('|') + 1, blogName.lastIndexOf('|'));
        const title = nameWithCategoryAndTags.slice(0, nameWithCategoryAndTags.indexOf('|'));

        return {
            title: title,
            category: category,
            tags: tags.split('#').splice(1),
            name: blogName,
            blogFolder: name,
            content: content.toString(),
            miniContent: content.length > 256 ? content.toString().slice(0, 256) : content.toString(),
            imagePath: 'blog-image.jpg',
            createdAt: stat.birthtime
        } as Blog;
    }

    async readAllBlogs(): Promise<Blog[]> {
        const dirs = await this.readAllDirs();
        const dirNames = dirs.map(d => d.name);

        const getContentOfAllBlogs = dirNames.map(async (d) => {
          return await this.findBlog(d);
        });

       return Promise.all(getContentOfAllBlogs);
    }

}
