import { MailService } from '../../mail/mail.service';
import { CommentIndexService } from './../../search/services/comment-index/comment-index.service';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Comment } from '@blog-workspace/api-interfaces';


@Controller('comment')
export class CommentController {

    constructor(private cis: CommentIndexService,
        private mailService: MailService,
    ) { }

    /**
     * 
     * @param param 
     * @returns list of the comments Comments[]
     */
    @Get('list/:blogId') 
    getComments(@Param('blogId') blogId: string) {
        return this.cis.list(blogId);
    }

    /**
     * 
     * @param comment new comment that will be added to the blog
     * @returns added comment 
     */
    @Post()
    addComment(@Body() comment: Comment) {
        comment.date = Date.now();
        return this.cis.index(comment).then(v => {
            console.log(JSON.stringify(v));
            return v;
        }).then((v) => {
            this.mailService.sendConformationEmailForComment(comment.email, comment.comment, v.body._id);
        });
    }

    @Get('/mail')
    sendEmail() {
        return this.mailService.testEmail();
    }

    /**
     * Endpoint for email where user will send anwser should comment be displayed or not
     * @param status status should comment be rejacted or accaped and displayed on blog
     * @param commentId commentId that should be updated
     * @returns nothing
     */
    @Put('update/:commentId/:status')
    updateCommentStatus(@Param('status') status: 'accepted' | 'rejacted', @Param('commentId') commentId: string) {
        return this.cis.update(commentId, status === 'accepted');
    }
}
