import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  // @Get('home')
  // getGello(@Res() res: Response): void {
  //   const filePath = join('/Users/nona/Sites/www/pages', 'home.html'); // Path to your HTML file
  //   res.sendFile(filePath);
  // }
  // // @Get('home')
  // getGello(@Res() res: Response): void {
  //   const filePath = join(__dirname, '..', 'public', 'home.html');
  //   res.sendFile(filePath);
  // }
}