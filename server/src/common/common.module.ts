import { Global, Module } from '@nestjs/common';
import { PaginationService } from './services/pagination.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationService } from 'src/notification/notification.service';
import { UserService } from 'src/user/user.service';

@Global()
@Module({
  providers: [
    PaginationService,
    PrismaService,
    NotificationService,
    UserService,
  ],
  exports: [PaginationService, PrismaService, NotificationService, UserService],
})
export class CommonModule {}
