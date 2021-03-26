import { MailModule } from '../mail/mail.module';
import { SearchModule } from './../search/search.module';
import { CommentFileService } from './services/comment-file/comment-file.service';
import { CommentController } from './controllers/comment.controller';
import { Module, OnModuleInit } from '@nestjs/common';

@Module({
    imports: [
        SearchModule,
        MailModule
    ],
    controllers: [
        CommentController
    ],
    providers: [
        CommentFileService
    ]
})
export class CommentModule implements OnModuleInit {

    onModuleInit() {
        
    }
}
