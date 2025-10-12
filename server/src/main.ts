import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsConfig, validationPipeConfig } from './utils';
import { JwtAuthGuard } from './auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles/roles.guard';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply Global Pipes
  app.useGlobalPipes(validationPipeConfig);

  // Enable CORS
  // app.enableCors(corsConfig);
  // allow all cors
  app.enableCors({
    origin: (origin: any, callback: any) => {
      // Allow requests with no origin (like Postman)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      if (!origin) return callback(null, true);
      // Dynamically allow any origin (required for credentials)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return callback(null, true);
    },
    credentials: true,
  });

  // Roles Guard And JWT Auth Guard
  const reflector = new Reflector();
  app.useGlobalGuards(new JwtAuthGuard(reflector), new RolesGuard(reflector));
// Increase body size limits
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  //  server listen on the specified port
  await app.listen(process.env.PORT ?? 8089);
}
bootstrap().catch((err) => {
  if (err instanceof Error) {
    console.error('Error during application bootstrap:', err.message);
  }
});
