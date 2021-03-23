import { Controller, Get, Param, Res } from '@nestjs/common';

import { Message } from '@blog-workspace/api-interfaces';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }

  @Get('assets/:imgFolder/:imgName')
  test(@Param('imgFolder') imgFolder, @Param('imgName') imgName: string, @Res() res) {
    return res.sendFile(`${__dirname}/assets/blogs/${imgFolder}/${imgName}`);
  }
}
