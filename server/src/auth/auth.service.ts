import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/auth.dto';
import { UserDto } from '../users/dto/user.dto';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService

    ) {}
    //TODO: поправить проверку для пользователя при регистрации на емаил
    async register(dto: UserDto): Promise<any> {
        const userExists = await this.usersService.findByUsername(
            dto.name
        );

        if (userExists) {
            throw new BadRequestException('User already exists');
        }

        const hash = await this.hashData(dto.password);
        const userData = await this.usersService.create({
            ...dto,
            password: hash
        });

        const tokens = await this.getTokens(userData._id, userData.name);
        await this.updateRefreshToken(userData._id, tokens.refreshToken);

        // @ts-ignore
        const {refreshToken, _id, password, ...user} = userData._doc

        return { ...tokens, user };
    }

    async login(dto: AuthDto): Promise<any> {
        const userData = await this.usersService.findByUsername(dto.name);

        if (!userData) throw new BadRequestException('User does not exist');

        const passwordMatches = await argon2.verify(
            userData.password,
            dto.password
        );

        if (!passwordMatches) throw new BadRequestException('Password is incorrect');

        const tokens = await this.getTokens(userData._id, userData.name);
        await this.updateRefreshToken(userData._id, tokens.refreshToken);

        // @ts-ignore
        const {refreshToken, _id, password, ...user} = userData._doc

        return { ...tokens, user };
    }

    async logout(userId: string): Promise<User> {
        return this.usersService.update(userId, {refreshToken: null} as UserDto);
    }

    async refreshTokens(userId: string, refreshToken: string): Promise<{accessToken: string, refreshToken: string}> {
        const user = await this.usersService.findById(userId);

        if (!user || !user.refreshToken) throw new ForbiddenException('Access Denied');

        const refreshTokenMatches = await argon2.verify(
            user.refreshToken,
            refreshToken,
        );

        if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

        const tokens = await this.getTokens(user._id, user.name);

        await this.updateRefreshToken(user._id, tokens.refreshToken);

        return tokens;
    }

    hashData(data: string) {
        return argon2.hash(data);
    }

    async updateRefreshToken(userId: string, refreshToken: string) {
        const hashedRefreshToken = await this.hashData(refreshToken);

        await this.usersService.update(userId, {refreshToken: hashedRefreshToken} as UserDto);
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
                    expiresIn: '7d'
                }
            )
        ]);

        return {
            accessToken,
            refreshToken
        };
    }
}
