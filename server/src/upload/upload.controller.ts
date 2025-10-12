import {
  Controller,
  NotFoundException,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { Public } from 'src/auth/decorators';
import cloudinary from 'src/cloudinary/cloudinary.provider';
import { Readable } from 'stream';

@Controller('upload')
export class UploadController {
  @Public()
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(), // No disk usage
      limits: { fileSize: 50 * 1024 * 1024 }, // Limit file size to 5MB
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    // <-- async added here
    console.log('Uploading file:');
    if (!file) {
      throw new NotFoundException('File not provided');
    }

    // Stream file buffer to Cloudinary
    const streamUpload = () =>
      new Promise((resolve, reject) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'telemedicine' }, // optional
          (error, result) => {
            // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
            if (error) return reject(error);
            resolve(result);
          },
        );

        Readable.from(file.buffer).pipe(stream);
      });

    const result: any = await streamUpload();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log('File uploaded successfully:', result.secure_url);
    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      url: result.secure_url,
    };
  }
}
