import { Body, Controller, Get, Patch, Param, Post, Request, Delete } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationService } from './notification.service';

@Roles('PATIENT')
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  create(
    @Body() createNotificationDto: CreateNotificationDto,
    @Request() req: { user: { id: string } },
  ) {
    return this.notificationService.create(createNotificationDto, req.user.id);
  }

  @Get()
  findAll(@Request() req: { user: { id: string } }) {
    return this.notificationService.findAll(req.user.id);
  }

  @Patch(':id/read')
  markAsRead(@Param('id') id: string) {
    return this.notificationService.markAsRead(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.notificationService.delete(id);
  }

  @Get('all')
  findAllForPatients() {
    return this.notificationService.findAllForPatients();
  }
}
