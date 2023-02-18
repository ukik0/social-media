import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
import { AuthDto } from './dto/auth.dto';
import { AccessTokenGuard } from './decorators/accessToken.guard';
import { RefreshTokenGuard } from './decorators/refreshToken.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    register(@Body() dto: UserDto) {
        return this.authService.register(dto);
    }

    @Post('login')
    login(@Body() data: AuthDto) {
        return this.authService.login(data);
    }

    @UseGuards(AccessTokenGuard)
    @Get('logout')
    logout(@Req() req: Request) {
        return this.authService.logout(req.user['userId']);
    }

    @UseGuards(RefreshTokenGuard)
    @Get('refresh')
    refreshTokens(@Req() req: Request) {
        const userId = req.user['userId'];
        const refreshToken = req.user['refreshToken'];
        return this.authService.refreshTokens(userId, refreshToken);
    }
}
