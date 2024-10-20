import {
  Body,
  Controller,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/app.controller';
import { customStorage, storage } from './storage.config';

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
        validators: [new MaxFileSizeValidator({ maxSize: 10 * 1023 * 1024 })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return {
      message: 'upload-validate success',
      body,
    };
  }
}
