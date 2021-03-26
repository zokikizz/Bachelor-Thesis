import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
              host: 'smtp.pepipost.com',
              port: 587,
              secure: false, // upgrade later with STARTTLS
              auth: {
                user: "zpzoki95",
                pass: "zpzoki95_a1056e9f6097e0639510d0ed07e1cb0e",
              },
            },
            defaults: {
              from:'"blog" <zpzoki95@pepisandbox.com>',
            },
            template: {
              dir: __dirname + '/assets/templates/',
              adapter: new HandlebarsAdapter(), // or new PugAdapter()
              options: {
                strict: true,
              },
            },
          }),
    ],
    controllers: [],
    providers: [MailService],
    exports: [MailService]
})
export class MailModule {}
