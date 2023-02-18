import { IsEmail, IsString } from 'class-validator';

export class AuthDto {
    @IsString()
    name: string;

    @IsEmail()
    mail: string;

    @IsString()
    password: string;
}