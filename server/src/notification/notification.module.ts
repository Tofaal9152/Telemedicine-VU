import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [UserModule],
  controllers: [NotificationController],
  providers: [NotificationService, UserService],
})
export class NotificationModule {}
