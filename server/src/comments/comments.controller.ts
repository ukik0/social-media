import { Body, Controller, Get, Param, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/comment.dto';
import { AccessTokenGuard } from '../auth/decorators/accessToken.guard';
import { Request } from 'express';
import { RemoveCommentDto } from './dto/remove-comment.dto';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

@Controller('comments')
@ApiTags('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Post('/createComment')
    @UsePipes(new ValidationPipe())
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth()
    createCommentToPost(@Body() dto: CommentDto, @Req() req: Request) {
        return this.commentsService.createComment(dto, req.user['userId']);
    }

    @Post('/removeComment/:commentId')
    @UsePipes(new ValidationPipe())
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth()
    removeCommentFromPost(@Body() dto: RemoveCommentDto, @Req() req: Request, @Param('commentId') commentId: string) {
        return this.commentsService.removeComment(dto, req.user['userId'], commentId);
    }

    @UsePipes(new ValidationPipe())
    @Get('/:postId')
    getCommentsFromPost(@Param('postId') postId: string) {
        return this.commentsService.getCommentsFromPost(postId);
    }
}
