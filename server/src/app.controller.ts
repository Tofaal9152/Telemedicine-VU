import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators';
@Public()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getHello() {
    console.log("Accessing the root endpoint");
    return this.appService.getHello();
  }
  @Get('/health')
  healthCheck() {
   
    return this.appService.pingSelf();
  }
}
