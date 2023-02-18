import { IsNotEmpty, IsString } from 'class-validator';

export class CommentDto {
    @IsNotEmpty()
    @IsString()
    text: string

    @IsNotEmpty()
    @IsString()
    postId: string

}