import { BlogService } from './blog.service';
import {
    Controller, Get, Param, Put, Body, Post, Delete,
    HttpStatus, HttpCode, UseFilters, HttpException,
} from '@nestjs/common';
import { Blog } from './entity/blog.entity';
import { HttpExceptionFilter } from '../shared/http-exception-filter';

@Controller('blog')
@UseFilters(new HttpExceptionFilter())
export class BlogController {
    constructor(private blogService: BlogService) { }
    @Get()
    getMany() {
        return this.blogService.getBlogs();
    }

    @Get('uiid/:id')
    async getOne(@Param('id') id: string) {
        return this.blogService.getBlogById(id);
    }

    @Get(':title')
    getOneWithTitle(@Param('title') title: string) {
        return this.blogService.getBlogByTitle(title);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createOne(@Body() dto: Blog) {
        return this.blogService.createBlog(dto);
    }

    @Put(':title')
    updateOne(
        @Param('title') title: string,
        @Body() dto: Blog,
    ) {
        return this.blogService.updateBlog(title, dto);
    }

    @Delete(':title')
    async deleteOne(
        @Param('title') title: string,
    ): Promise<{title: string}> {
        return this.blogService.deleteBlog(title);
    }
}
