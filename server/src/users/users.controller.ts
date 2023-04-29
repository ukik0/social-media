import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { Request } from 'express';
import { AccessTokenGuard } from '../auth/decorators/accessToken.guard';
import { PostDto } from '../posts/dto/post.dto';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

@Controller('users')
@ApiTags('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getUsers() {
        return this.usersService.getUsers();
    }

    @Post()
    create(@Body() dto: UserDto) {
        return this.usersService.create(dto);
    }

    @Get('/search')
    searchUsersByQuery(@Query('query') query: string) {
        return this.usersService.searchUsersByQuery(query);
    }

    @Get('/followers')
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth()
    getUserFollowers(@Req() req: Request) {
        return this.usersService.getUserFollowers(req.user['userId']);
    }

    @Get('/:id')
    findById(@Param('id') id: string) {
        return this.usersService.findById(id);
    }

    @Get('/followers/posts')
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth()
    getPostsFromFollowers(@Req() req: Request) {
        return this.usersService.getPostsFromFollowers(req.user['userId']);
    }

    @Patch()
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth()
    update(@Req() req: Request, @Body() dto: UserDto) {
        return this.usersService.update(req.user['userId'], dto);
    }

    @Get('/posts/:userId')
    getUserPosts(
        @Param('userId') userId: string,
        @Query('sortBy') sortBy: keyof PostDto,
        @Query('sortValue') sortValue: 1 | -1
    ) {
        return this.usersService.getUserPosts(userId, sortBy, sortValue);
    }

    @Post('/subscription/:subscriberId')
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth()
    subscription(
        @Req() req: Request,
        @Param('subscriberId') subscriberId: string
    ) {
        return this.usersService.subscription(req.user['userId'], subscriberId);
    }

    @Post('/unsubscribe/:subscriberId')
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth()
    unsubscribe(
        @Req() req: Request,
        @Param('subscriberId') subscriberId: string
    ) {
        return this.usersService.unsubscribe(req.user['userId'], subscriberId);
    }
}
