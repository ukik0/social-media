import { Body, Controller, Get, Param, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/comment.dto';
import { AccessTokenGuard } from '../auth/decorators/accessToken.guard';
import { Request } from 'express';
import { RemoveCommentDto } from './dto/remove-comment.dto';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @UsePipes(new ValidationPipe())
    @UseGuards(AccessTokenGuard)
    @Post()
    createCommentToPost(@Body() dto: CommentDto, @Req() req: Request) {
        return this.commentsService.createCommentToPost(dto, req.user['userId']);
    }

    @UsePipes(new ValidationPipe())
    @UseGuards(AccessTokenGuard)
    @Post('/:commentId')
    removeCommentFromPost(@Body() dto: RemoveCommentDto, @Req() req: Request, @Param('commentId') commentId: string) {
        return this.commentsService.removeCommentFromPost(dto, req.user['userId'], commentId);
    }

    @UsePipes(new ValidationPipe())
    @Get()
    getCommentsFromPost(@Body() dto: RemoveCommentDto) {
        return this.commentsService.getCommentsFromPost(dto.postId);
    }
}
