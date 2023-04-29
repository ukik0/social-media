import { Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { AccessTokenGuard } from '../auth/decorators/accessToken.guard';
import { Request } from 'express';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

@Controller('favourites')
@UseGuards(AccessTokenGuard)
@ApiTags('favourites')
@ApiBearerAuth()
export class FavouritesController {
    constructor(private readonly favouritesService: FavouritesService) {}

    @Get('')
    getFavouritesPosts(@Req() req: Request) {
        return this.favouritesService.getFavouritesPosts(req.user['userId']);
    }

    @Post('/addFavouritePost/:postId')
    addPostToFavourites(@Req() req: Request, @Param('postId') postId: string) {
        return this.favouritesService.addPostToFavourites(
            req.user['userId'],
            postId
        );
    }

    @Delete('/removePostFromFavourites/:postId')
    removePostFromFavourites(@Req() req: Request, @Param('postId') postId: string) {
      return this.favouritesService.removePostFromFavourites(req.user['userId'], postId);
    }
}
