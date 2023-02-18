import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Req,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDto } from './dto/post.dto';
import { AccessTokenGuard } from '../auth/decorators/accessToken.guard';
import { Request } from 'express';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get()
    @UsePipes(new ValidationPipe())
    getPosts(@Query('page') page: number) {
        return this.postsService.getPosts(page);
    }

    @Get('/search')
    searchByQuery(@Query('query') query: string) {
        return this.postsService.searchByQuery(query)
    }

    @Get('/category/:category')
    searchByCategory(@Param('category') category: string) {
        return this.postsService.searchByCategory(category)
    }

    @Get('/:id')
    @UsePipes(new ValidationPipe())
    getPost(@Param('id') id: string) {
        return this.postsService.getPost(id);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    @UseGuards(AccessTokenGuard)
    create(@Body() dto: PostDto, @Req() req: Request) {
        return this.postsService.createPost(dto, req.user['userId']);
    }

    @Patch('/:id')
    @UsePipes(new ValidationPipe())
    @UseGuards(AccessTokenGuard)
    updatePost(@Body() dto: PostDto, @Param('id') id: string) {
        return this.postsService.updatePost(id, dto);
    }

    @Delete('/:id')
    @UsePipes(new ValidationPipe())
    @UseGuards(AccessTokenGuard)
    deletePost(@Param('id') id: string) {
        return this.postsService.deletePost(id);
    }

}
