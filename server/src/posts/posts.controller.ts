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
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

@Controller('posts')
@ApiTags('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get()
    @UsePipes(new ValidationPipe())
    getFilteredPosts(
        @Query('page') page: number,
        @Query('sortBy') sortBy: keyof PostDto,
        @Query('sortValue') sortValue: 1 | -1,
        @Query('start') start?: string,
        @Query('end') end?: string,
    ) {
        return this.postsService.getFilteredPosts(page, sortBy, sortValue, start, end);
    }

    @Get('/search')
    searchPostByQuery(@Query('query') query: string) {
        return this.postsService.searchPostByQuery(query);
    }

    @Get('/category/:category')
    searchPostByCategory(@Param('category') category: string) {
        return this.postsService.searchPostByCategory(category);
    }

    @Get('/:id')
    @UsePipes(new ValidationPipe())
    getPost(@Param('id') id: string) {
        return this.postsService.getPost(id);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth()
    create(@Body() dto: PostDto, @Req() req: Request) {
        return this.postsService.createPost(dto, req.user['userId']);
    }

    @Patch('/:id')
    @UsePipes(new ValidationPipe())
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth()
    updatePost(@Body() dto: PostDto, @Param('id') id: string) {
        return this.postsService.updatePost(id, dto);
    }

    @Delete('/:id')
    @UsePipes(new ValidationPipe())
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth()
    deletePost(@Param('id') id: string) {
        return this.postsService.deletePost(id);
    }

}
