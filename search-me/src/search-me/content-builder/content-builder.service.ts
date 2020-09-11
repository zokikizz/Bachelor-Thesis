import { Comment } from './../comments/entity/comment.entity';
import { COMMENT_BLOCKS } from './../shared/comment-builder-tags';
import { BLOG_BLOCKS } from './../shared/blog-builder-tags';
import { Injectable, Logger } from '@nestjs/common';
import { Blog, Props } from '../blog/entity/blog.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ContentBuilderService {

    constructor(private logger: Logger) {}

    createBlogContent(
        title: string, content: string, author: string,
        category: string, tags: string[], filename, uiid?, creationDate?: Date | number,
    ): string {
        let resultContent = '';

        const inputData = {
            title, content, author, category, filename,
            tags: tags ? tags.reduce((acc, current) => `${acc}#${current}`, '') : '', uiid,
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

    createCommentContent(author: string, tags: string[], filename: string, content: string, uiid, creationDate?: Date | number) {
        let resultContent = '';

        const inputData = {
            content, author, tags: tags ? tags.reduce((acc, current) => `${acc}#${current}`, '') : '',
            uiid,
            filename,
            creationdate: creationDate ? creationDate : Date.now(),
            modifieddate: Date.now(),
        };

        for (const tagType of Object.keys(COMMENT_BLOCKS)) {
            resultContent += `${COMMENT_BLOCKS[tagType].createTag(inputData[tagType])} \n`;
        }
        this.logger.debug(`constructed comment content ${resultContent}`);
        return resultContent;

     }

    parseCommentFromString(content: string): Comment {
        const parsedObject: Comment = {};

        for (const tagType of Object.keys(COMMENT_BLOCKS)) {
            parsedObject[tagType.toLocaleLowerCase()] = COMMENT_BLOCKS[tagType].parse(content);
        }
        this.logger.debug(`parsed blog object: { ${this.objectParseForLogging(parsedObject)} } `);
        return parsedObject;
     }

    objectParseForLogging(obj) {
        return Object.keys(obj).map(value => value + ':' + obj[value]);
    }

    generateProps(): Props {

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
}
