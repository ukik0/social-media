import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import {MediaDto} from "./dto/media.dto";
import {ApiTags} from "@nestjs/swagger";


@Injectable()
export class MediaService {
    async uploadMedia(mediaFile: Express.Multer.File): Promise<MediaDto> {
        const uploadFolder = `${path}/uploads/`
        await ensureDir(uploadFolder)

        await writeFile(`${uploadFolder}/${mediaFile.originalname}`, mediaFile.buffer)

        return {
            url: `/uploads/${mediaFile.originalname}`,
            name: mediaFile.originalname
        }
    }
}
