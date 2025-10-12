import { IsNotEmpty, IsString } from 'class-validator';
import { NotificationPriority } from 'generated/prisma';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsNotEmpty()
  @IsString()
  priority: NotificationPriority;

}
