import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/app.controller';
import { customStorage, getFileName, storage } from './storage.config';
import { createWriteStream, existsSync, mkdirSync } from 'fs';

@Controller('upload')
export class UploadController {
  @Post('')
  @Public()
  @UseInterceptors(FileInterceptor('file', { storage }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return 'success';
  }

  @Public()
  @Post('/upload-validate')
  @UseInterceptors(FileInterceptor('file', { storage: customStorage }))
  async uploadFileAndPassValidation(
    @Body() body: any,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 100 * 1023 * 1024 })],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log('upload-validate success!');
    return {
      message: 'upload-validate success',
      body,
    };
  }

  @Public()
  @Post('massive-file')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 500 * 1024 * 1024 },
    }),
  )
  async uploadLargeFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
    }

    const uploadDir = './uploads';
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir);
    }

    // Generate a unique file name
    const filePath = getFileName(file);

    try {
      // Create a writable stream for the final destination
      const writeStream = createWriteStream(filePath);

      writeStream.write(file.buffer);

      return new Promise((resolve, reject) => {
        console.log(`Parsing file in progress`);

        writeStream.end(() => {
          console.log('File uploaded successfully');

          resolve({ message: 'File uploaded successfully', path: filePath });
        });

        writeStream.on('error', (error) => {
          reject(
            new HttpException(
              `Upload failed: ${error.message}`,
              HttpStatus.INTERNAL_SERVER_ERROR,
            ),
          );
        });
      });
    } catch (err) {
      console.log(err);

      throw new HttpException(
        `Error uploading file: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
