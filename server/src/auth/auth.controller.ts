import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
import { AuthDto } from './dto/auth.dto';
import { AccessTokenGuard } from './decorators/accessToken.guard';
import { RefreshTokenGuard } from './decorators/refreshToken.guard';
import {ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    @ApiBody({type: AuthDto})
    async register(@Body() dto: UserDto, @Res({passthrough: true}) res: Response) {
        return this.authService.register(dto, res);
    }

    @Post('login')
    @ApiBody({type: AuthDto, description: "The Description for the Post Body. Please look into the DTO. You will see the @ApiOptionalProperty used to define the Schema.",
        examples: {
            a: {
                summary: "Empty Body",
                description: "Description for when an empty body is used",
                value: {}
            },
            b: {
                summary: "Вход",
                description: "тестовое значение для входа",
                value: {
                    name: 'Метелев Дмитрий',
                    password: "12345"
                }
            }
        }})
    @ApiOperation({ summary: 'Логин' })
    @ApiResponse({ status: 200, description: 'Вернет access/refresh токены и пользователя' })
    async login(@Body() dto: AuthDto, @Res({passthrough: true}) res: Response) {
        return this.authService.login(dto, res);
    }

    @Post('logout')
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth()
    async logout(@Req() req: Request, @Res({passthrough: true}) res: Response) {
        return  this.authService.logout(req.user['userId'], res);
    }

    @Get('refresh')
    @UseGuards(RefreshTokenGuard)
    @ApiBearerAuth()
    refreshTokens(@Req() req: Request, @Res({passthrough: true}) res: Response) {
        const userId = req.cookies.userId;
        return this.authService.refreshTokens(userId, res);
    }
}
