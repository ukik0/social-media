import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { MediaService } from './media.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AccessTokenGuard } from '../auth/decorators/accessToken.guard';
import {ApiBearerAuth, ApiBody, ApiConsumes, ApiTags} from "@nestjs/swagger";

@Controller('media')
@ApiTags('media')
@UseGuards(AccessTokenGuard)
@ApiBearerAuth()
export class MediaController {
    constructor(private readonly mediaService: MediaService) {}

    @Post()
    @UseInterceptors(FileInterceptor('upload'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                upload: {
                    type: 'string',
                    format: 'binary'
                }
            }
        }
    })
    async uploadMedia(@UploadedFile() uploadFile: Express.Multer.File) {
        return this.mediaService.uploadMedia(uploadFile);
    }
}
