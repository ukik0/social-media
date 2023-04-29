import { IsNotEmpty, IsString } from 'class-validator';

export class CommentDto {
    @IsString()
    text: string

    @IsNotEmpty()
    @IsString()
    postId: string

}