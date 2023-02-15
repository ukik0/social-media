import { IsNotEmpty, IsString } from 'class-validator';

export class PostDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    views: 0;

    @IsString()
    imageUrl: string;

    @IsNotEmpty()
    author: string;

    likes: string[];

    comments: string[];

    tags: string[];

    @IsNotEmpty()
    @IsString()
    category: string;
}
