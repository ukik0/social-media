import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh'
) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    let token = request.cookies?.refreshToken;

                    if (!token) {
                        return null;
                    }

                    return token;
                }
            ]),
            secretOrKey: configService.get('JWT_REFRESH_SECRET'),
            passReqToCallback: true
        });
    }


    async validate(payload: any) {
        return { ...payload };
    }
}
