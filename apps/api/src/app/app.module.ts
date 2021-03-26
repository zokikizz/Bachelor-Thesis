import { MailService } from './mail/mail.service';
import { MailModule } from './mail/mail.module';
import { CommentModule } from './comment/comment.module';
import { BlogModule } from './blog/blog.module';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MailModule, 
    BlogModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
