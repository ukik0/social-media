import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDto } from './dto/post.dto';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body() dto: PostDto) {
        return this.postsService.createPost(dto);
    }

    @Get('/:id')
    @UsePipes(new ValidationPipe())
    getPost(@Param('id') id: string) {
        return this.postsService.getPost(id);
    }

    @Get('')
    @UsePipes(new ValidationPipe())
    getPosts() {
        return this.postsService.getPosts();
    }

    @Patch('/:id')
    @UsePipes(new ValidationPipe())
    updatePost(@Body() dto: PostDto, @Param('id') id: string) {
        return this.postsService.updatePost(id, dto);
    }

    @Delete('/:id')
    @UsePipes(new ValidationPipe())
    deletePost(@Param('id') id: string) {
        return this.postsService.deletePost(id);
    }
}
