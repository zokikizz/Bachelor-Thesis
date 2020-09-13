import { Comment } from './entity/comment.entity';
import { CommentsService } from './comments.service';
import { Controller, Param, Put, Body, Post, Delete, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '../shared/http-exception-filter';

@Controller('comments')
@UseFilters(new HttpExceptionFilter())
export class CommentsController {

    constructor(private commentService: CommentsService) {}

    @Post(':title')
    createOne(
        @Param('title') title: string,
        @Body() dto: Comment,
    ) {
            return this.commentService.createComment(title, dto);
    }

    @Put(':title/:commentFilename')
    updateOne(
        @Param('title') title: string,
        @Param('commentFilename') filename: string,
        @Body() dto: Comment,
    ) {
        return this.commentService.updateComment(title, filename, dto);
    }

    @Delete(':title/:commentFilename')
    async deleteOne(
        @Param('title') title: string,
        @Param('commentFilename') filename: string,
    ): Promise<{ filename: string }> {
        return this.commentService.deleteComment(title, filename);
    }
}
