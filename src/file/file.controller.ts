import { Controller, Get, Request, Post, UseGuards, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { FileUploadDto } from './dtos/file-upload.dto';
import { FilesUploadDto } from './dtos/files-upload.dto';
import { FileService } from './file.service';
import { FileUploadResponse } from './responses/file-upload.res';

@ApiTags('file')
@UseInterceptors(new TransformInterceptor())
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiOperation({ operationId: 'uploadFile' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileUploadDto })
  @ApiOkResponse({ type: FileUploadResponse })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const id = await this.fileService.create(file);
    return {
      url: `/api/file/static/${id}`,
      fileId: id 
    };
  }

  @ApiOperation({ operationId: 'uploadFiles' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FilesUploadDto })
  @Post('uploads')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    const ids = await Promise.all(files.map(file => this.fileService.create(file)));
    return {
      urls: ids.map(id => ({
        url: `/api/file/static/${id}`,
        fileId: id 
      })) 
    };
  }
}
