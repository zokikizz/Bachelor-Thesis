import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {

    constructor(private readonly mailer: MailerService) { }
    
    testEmail() {
        return this.mailer.sendMail({
            to: 'zp.zoki95@gmail.com', // list of receivers
            from: 'zpzoki95@pepisandbox.com', // sender address
            subject: 'Testing Nest MailerModule ✔', // Subject line
            text: 'welcome', // plaintext body
            html: '<b>welcome</b>', // HTML body content
        });
    }

    sendConformationEmailForComment(email: string, content: string, commentId: string) {
        return this.mailer.sendMail({
            to: 'zp.zoki95@gmail.com', // list of receivers
            from: 'zpzoki95@pepisandbox.com', // sender address
            subject: `Review comment from ${email} user`, // Subject line
            // html: '<b>welcome</b>', // HTML body content
            template: 'conformation',
            context: {
                email,
                content,
                commentId
            }
        });
    }
}
