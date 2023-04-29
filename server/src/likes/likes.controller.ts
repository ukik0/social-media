import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import { AccessTokenGuard } from '../auth/decorators/accessToken.guard';
import { Request } from 'express';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

@Controller('likes')
@ApiTags('likes')
export class LikesController {
    constructor(private readonly likesService: LikesService) {}

    @Post('/like/:postId')
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth()
    likePost(@Param('postId') postId: string, @Req() req: Request) {
        return this.likesService.likePost(req.user['userId'], postId);
    }

    @Post('/unlike/:postId')
    @UseGuards(AccessTokenGuard)
    unlikePost(@Param('postId') postId: string, @Req() req: Request) {
        return this.likesService.unlikePost(req.user['userId'], postId);
    }

    @Get('/:postId')
    getLikesFromPost(@Param('postId') postId: string) {
        return this.likesService.getLikesFromPost(postId)
    }
}
