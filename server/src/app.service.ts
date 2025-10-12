import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
@Injectable()
export class AppService {
  // @Cron(CronExpression.EVERY_10_SECONDS)
  @Cron(CronExpression.EVERY_MINUTE)
  async pingSelf() {
    const baseUrl = process.env.BASE_URL;
    console.log(`Pinging self at ${baseUrl}`);
    try {
      const res = await fetch(`${baseUrl}`);
      console.log(`Self ping response: ${res.status}`);
    } catch (e) {
      console.log(`Error pinging self: ${e}`);
    }
  }

  getHello() {
    return `
      <div style="min-height: 100vh; margin: 0;
      padding: 0; display: flex; justify-content: center; align-items: center; background-color: #000; font-family: Arial, sans-serif; color: #fff;">
        <div style="background: #1e1e1e; padding: 40px; border-radius: 15px; max-width: 600px; width: 100%; text-align: center; box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);">
          <h1 style="margin-bottom: 20px;">🚀 Hello World!</h1>
          <p style="margin-bottom: 10px;">The server is running smoothly.</p>
          <p style="margin-bottom: 10px;">✅ Server is running and ready to handle requests.</p>
          <p style="margin-bottom: 20px;">Enjoy building with NestJS</p>

          <p style="color: #aaa;">Need help? <a href="https://www.github.com/Tofaal9152" target="_blank">Github</a></p>
        </div>
      </div>
    `;
  }
}
