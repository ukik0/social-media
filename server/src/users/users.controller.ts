import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { RefreshTokenGuard } from '../auth/decorators/refreshToken.guard';
import { Request } from 'express';
import { AccessTokenGuard } from '../auth/decorators/accessToken.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() dto: UserDto) {
        return this.usersService.create(dto);
    }

    @Get('/search')
    searchUsersByQuery(@Query('query') query:string) {
        return this.usersService.searchUsersByQuery(query);
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @UseGuards(RefreshTokenGuard)
    @Get('/me')
    findById(@Req() req: Request) {
        return this.usersService.findById(req.user['userId']);
    }

    @Get('/friends/posts')
    @UseGuards(AccessTokenGuard)
    getPostsFromFriends(@Req() req: Request) {
        return this.usersService.getPostsFromFriends(req.user['userId']);
    }

    @Get('/friends/:userId')
    getUserFriends(@Param('userId') userId: string) {
        return this.usersService.getUserFriends(userId);
    }


    @UseGuards(AccessTokenGuard)
    @Patch()
    update(@Req() req: Request, @Body() dto: UserDto) {
        return this.usersService.update(req.user['userId'], dto);
    }

    @UseGuards(AccessTokenGuard)
    @Delete()
    remove(@Req() req: Request) {
        return this.usersService.remove(req.user['userId']);
    }

    @Get('/posts/:userId')
    getUserPosts(@Param('userId') userId:string) {
        return this.usersService.getUserPosts(userId);
    }

    @UseGuards(AccessTokenGuard)
    @Post('/addFriend/:friendUserId')
    addUserToFriend(@Req() req: Request, @Param('friendUserId') friendUserId: string) {
        return this.usersService.addUserToFriend(req.user['userId'], friendUserId);
    }

    @UseGuards(AccessTokenGuard)
    @Post('/removeFriend/:friendUserId')
    removeUserFromFriend(@Req() req: Request, @Param('friendUserId') friendUserId: string) {
        return this.usersService.removeUserFromFriend(req.user['userId'], friendUserId);
    }



}
