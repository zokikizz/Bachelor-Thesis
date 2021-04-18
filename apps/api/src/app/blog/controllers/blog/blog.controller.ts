import { sanitizeIdentifier } from '@angular/compiler';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BlogIndexService } from '../../../search/services/blog-index/blog-index.service';

@Controller('blog')
export class BlogController {

    constructor(private bis: BlogIndexService) {}


    @Get('allTags') 
    getAllTags() {
        return this.bis.getTags();
    }

    @Get('allCategories') 
    getAllCategories() {
        return this.bis.getCategories();
    }

    /**
     * 
     * @param searchString searching title or conent
     * @param startFrom result start from
     * @param size number of blogs that will be return
     * @returns list of blogs
     */
    @Get('search')
    async search(
        @Query('search') searchString,
        @Query('startFrom') startFrom: number,
        @Query('size') size: number
    ) {
        console.log(startFrom);
        return await this.bis.search(searchString, startFrom, size);
    }

    /**
     * 
     * @param type depends on the type search blogs by tag or category
     * @param searchString searching category or tag
     * @param startFrom result start from 
     * @param size number of blogs that will be return 
     * @returns list of blogs
     */
    @Get('search/:type')
    async searchByCategoryOrTag(
        @Param('type') type: 'tag' | 'category',
        @Query('search') searchString,
        @Query('startFrom') startFrom: number,
        @Query('size') size: number,
    ) {
        return (type === 'tag') ?
            await this.bis.searchByTag(searchString, startFrom, size) :
            await this.bis.searchByCategory(searchString, startFrom, size);
    }

    /**
     * 
     * @param startFrom start for pagination
     * @param size how much element to return
     * @returns list of Blogs
     */
    @Get('list')
    async list(@Query('startFrom') startFrom: number, @Query('size') size: number) {
        return await this.bis.list(startFrom, size);
    }

    /**
     * 
     * @param id id of the blog that we want to get content
     * @returns blog with id
     */
    @Get(':id')
    async getById(@Param('id') id) {
        return await this.bis.getById(id);
    }
}
