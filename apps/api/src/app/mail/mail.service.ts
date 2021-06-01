import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {

    constructor(private readonly mailer: MailerService) { }

    sendConformationEmailForComment(email: string, content: string, commentId: string) {
      const approveUrl = 'http://localhost:3333/api/comment/update/' + commentId + '/accepted';
      const rejectUrl = 'http://localhost:3333/api/comment/update/' + commentId + '/rejected';
        return this.mailer.sendMail({
            to: 'zp.zoki95@gmail.com', // list of receivers
            from: 'zpzoki95@pepisandbox.com', // sender address
            subject: `Review comment from ${email} user`, // Subject line
            html: '' +
              '<b>Review following Comment:</b> <br/>' +
              content + '<br/>'
              + '<div>' +
              '<div>To approve click <a href="' + approveUrl + '">here</a></div>' +
              '<div>To reject click <a href="' + rejectUrl + '">here</a></div>' +
              '</div> '
          , // HTML body content
            template: 'conformation',
            context: {
                email,
                content,
                commentId
            }
        });
    }
}
