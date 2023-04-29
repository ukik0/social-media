import { IsEmail, IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class AuthDto {
    @ApiProperty({
        default: 'Метелев Дмитрий',
        description: 'Логин',
        required: true
    })
    @IsString()
    name: string;

    @IsEmail()
    mail: string;

    @IsString()
    @ApiProperty({
        default: '12345',
        description: 'Пароль',
        required: true
    })
    password: string;
}