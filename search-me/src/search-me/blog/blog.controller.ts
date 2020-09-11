import { BlogService } from './blog.service';
import { Controller, Get, Param, Put, Body, Post, Delete } from '@nestjs/common';
import { Blog, ListResponse } from './entity/blog.entity';

@Controller('blog')
export class BlogController {
    constructor(private blogService: BlogService) { }
    @Get()
    getMany(): Promise<ListResponse> {
        return this.blogService.getBlogs();
    }

    @Get('uiid/:id')
    getOne(@Param('id') id: string): Promise<ListResponse | Blog> {
        return this.blogService.getBlogById(id);
    }

    @Get(':title')
    getOneWithTitle(@Param('title') title: string): Promise<ListResponse | Blog> {
        return this.blogService.getBlogByTitle(title);
    }

    @Post()
    createOne(@Body() dto: Blog): Promise<Blog> {
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
