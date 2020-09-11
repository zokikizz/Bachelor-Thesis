import { Comment } from './entity/comment.entity';
import { CommentsService } from './comments.service';
import { Controller, Get, Param, Put, Body, Post, Delete } from '@nestjs/common';

@Controller('comments')
export class CommentsController {

    constructor(private commentService: CommentsService) {}

    @Get(':bloguiid')
    getOne(@Param('bloguiid') bloguiid: string): Promise<{ comments: Comment[]}> {
        return this.commentService.getCommentsForBlog(bloguiid);
    }

    @Post()
    createOne(@Body() dto: Comment): Promise<Comment> {
        return this.commentService.createComment(dto);
    }

    @Put(':uiid')
    updateOne(
        @Param('uiid') title: string,
        @Body() dto: Comment,
    ) {
        return this.commentService.updateComment(title, dto);
    }

    @Delete(':uuid')
    async deleteOne(
        @Param('uuid') uuid: string,
    ): Promise<string> {
        return this.commentService.deleteComment(uuid);
    }
}
