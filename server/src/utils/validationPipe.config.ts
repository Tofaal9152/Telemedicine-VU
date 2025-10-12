import { ValidationPipe } from '@nestjs/common';

export const validationPipeConfig = new ValidationPipe({
  transform: true,
  whitelist: true,
});
