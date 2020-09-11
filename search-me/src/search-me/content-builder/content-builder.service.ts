import { COMMENT_BLOCKS } from './../shared/comment-builder-tags';
import { BLOG_BLOCKS } from './../shared/blog-builder-tags';
import { Injectable, Logger } from '@nestjs/common';
import { Blog } from '../blog/entity/blog.entity';

@Injectable()
export class ContentBuilderService {

    constructor(private logger: Logger) {}

    createBlogContent(
        title: string, content: string, author: string,
        category: string, tags: string[], uiid?, creationDate?: Date | number,
    ): string {
        let resultContent = '';

        const inputData = {
            title, content, author, category,
            tags: tags.reduce((acc, current) => `${acc}#${current}`, ''), uiid,
            creationdate: creationDate ? creationDate : Date.now(),
            modifieddate: Date.now(),
        };

        for (const tagType of Object.keys(BLOG_BLOCKS)) {
            resultContent += `${BLOG_BLOCKS[tagType].createTag(inputData[tagType])} \n`;
        }
        this.logger.debug(`constructed blog content ${resultContent}`);
        return resultContent;
    }

    parseBlogFromString(content: string): Blog {
        const parsedObject: Blog = {};

        for (const tagType of Object.keys(BLOG_BLOCKS)) {
            parsedObject[tagType.toLocaleLowerCase()] = BLOG_BLOCKS[tagType].parse(content);
        }
        this.logger.debug(`parsed blog object: { ${this.objectParseForLogging(parsedObject)} } `);
        return parsedObject;
    }

    createCommentContent(author: string, tags: string[], content: string, uiid, creationDate: Date | number) {
        let resultContent = '';

        const inputData = {
            content, author, tags: tags.reduce((acc, current) => `${acc}#${current}`, ''),
            uiid,
            creationdate: creationDate ? creationDate : Date.now(),
            modifieddate: Date.now(),
        };

        for (const tagType of Object.keys(COMMENT_BLOCKS)) {
            resultContent += `${COMMENT_BLOCKS[tagType].createTag(inputData[tagType])} \n`;
        }
        this.logger.debug(`constructed comment content ${resultContent}`);
        return resultContent;

     }

    parseCommentContent(content: string) {
        const parsedObject = {};

        for (const tagType of Object.keys(COMMENT_BLOCKS)) {
            parsedObject[tagType.toLocaleLowerCase()] = COMMENT_BLOCKS[tagType].parse(content);
        }
        this.logger.debug(`parsed blog object: { ${this.objectParseForLogging(parsedObject)} } `);
        return parsedObject;
     }

    objectParseForLogging(obj) {
        return Object.keys(obj).map(value => value + ':' + obj[value]);
    }
}
