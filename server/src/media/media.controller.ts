import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { MediaService } from './media.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AccessTokenGuard } from '../auth/decorators/accessToken.guard';

@Controller('media')
export class MediaController {
    constructor(private readonly mediaService: MediaService) {}

    @Post()
    @UseGuards(AccessTokenGuard)
    @UseInterceptors(FileInterceptor('upload'))
    async uploadMedia(@UploadedFile() uploadFile: Express.Multer.File) {
        return this.mediaService.uploadMedia(uploadFile);
    }
}
