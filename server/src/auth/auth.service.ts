import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/auth.dto';
import { UserDto } from '../users/dto/user.dto';
import { User } from '../users/schemas/user.schema';
import { Response } from 'express';
import {hashData} from "../utils/hashData";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService

    ) {}
    //TODO: поправить проверку для пользователя при регистрации на емаил
    async register(dto: UserDto, res: Response): Promise<{user: UserDto, accessToken: string, refreshToken: string}> {
        const userExists = await this.usersService.findByUsername(
            dto.name
        );

        if (userExists) {
            throw new BadRequestException('Пользователь уже занят :(');
        }

        const hash = await hashData(dto.password);
        const userData = await this.usersService.create({
            ...dto,
            password: hash
        });

        const tokens = await this.getTokens(userData._id, userData.name);
        await this.updateRefreshToken(userData._id, tokens.refreshToken);

        this.setCookies(tokens, userData, res)

        // @ts-ignore
        const {refreshToken, password, ...user} = userData._doc

        return { ...tokens, user };
    }

    async login(dto: AuthDto, res: Response): Promise<{user: UserDto, accessToken: string, refreshToken: string}> {
        const userData = await this.usersService.findByUsername(dto.name);

        if (!userData) throw new BadRequestException('Пользователь не найден');

        const passwordMatches = await argon2.verify(
            userData.password,
            dto.password
        );

        if (!passwordMatches) throw new BadRequestException('Неверный пароль');

        const tokens = await this.getTokens(userData._id, userData.name);
        await this.updateRefreshToken(userData._id, tokens.refreshToken);

        this.setCookies(tokens, userData, res)
        // @ts-ignore
        const {refreshToken, password, ...user} = userData._doc

        return { ...tokens, user };
    }

    async logout(userId: string, res: Response): Promise<User> {
        res.clearCookie('refreshToken')
        res.clearCookie('userId')

        return this.usersService.update(userId, {refreshToken: null} as UserDto);
    }

    async refreshTokens(userId: string, res: Response): Promise<{accessToken: string, refreshToken: string, user: User}> {
        const user = await this.usersService.findById(userId);

        if (!user || !user.refreshToken) throw new ForbiddenException('Доступ запрещен');

        // const refreshTokenMatches = await argon2.verify(
        //     user.refreshToken,
        //     refreshToken,
        // );
        //
        // if (!refreshTokenMatches) throw new ForbiddenException('Токены не совпадают');

        const tokens = await this.getTokens(user._id, user.name);

        await this.updateRefreshToken(user._id, tokens.refreshToken);

        this.setCookies(tokens, user, res)

        return {...tokens, user};
    }

    setCookies(tokens: {accessToken: string, refreshToken: string}, user: User, res: Response) {
        res.cookie('refreshToken', tokens.refreshToken, {httpOnly: true, maxAge: 1000 * 60 * 30})
        res.cookie('userId', user._id.valueOf(), {httpOnly: true, maxAge: 1000 * 60 * 30})
    }

    async updateRefreshToken(userId: string, refreshToken: string) {
        const hashedRefreshToken = await hashData(refreshToken);

        return await this.usersService.update(userId, {refreshToken: hashedRefreshToken} as UserDto);
    }

    async getTokens(userId: string, username: string): Promise<{accessToken: string, refreshToken: string}> {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    userId: userId,
                    username
                },
                {
                    secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
                    expiresIn: '15m'
                }
            ),
            this.jwtService.signAsync(
                {
                    userId: userId,
                    username
                },
                {
                    secret: this.configService.get<string>(
                        'JWT_REFRESH_SECRET'
                    ),
                    expiresIn: '30m'
                }
            )
        ]);

        return {
            accessToken,
            refreshToken
        };
    }
}
