import { Controller, Get, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller() // used to allow for us to use routes within this function
export class AppController {
  constructor(
    private readonly appService: AppService,
    ) {}


  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

}
