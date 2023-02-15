import { BadRequestException, Injectable } from '@nestjs/common';
import { Post, PostDocument } from './schemas/post.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PostDto } from './dto/post.dto';

//TODO: Сделать защищенные роуты
@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post.name) private postDocumentModel: Model<PostDocument>
    ) {}

    async getPost(id: string): Promise<Post> {
        const post = await this.postDocumentModel.findById(id);

        if (!post) throw new BadRequestException('Пост не найден');

        return post;
    }

    async getPosts(): Promise<Post[]> {
        const posts = await this.postDocumentModel.find();

        return posts;
    }

    async createPost(dto: PostDto): Promise<Post> {
        const post = await this.postDocumentModel.create({ ...dto });

        return post;
    }

    async updatePost(id: string, dto: PostDto): Promise<Post> {
        const post = await this.postDocumentModel.findById(id);

        if (!post) throw new BadRequestException('Пост не найден');

        const updatedPost = await this.postDocumentModel.findByIdAndUpdate(
            id,
            {
                $set: { ...dto }
            },
            { new: true }
        );


        return updatedPost;
    }

    async deletePost(id: string): Promise<Post> {
        const post = await this.postDocumentModel.findById(id);

        if (!post) throw new BadRequestException('Пост не найден');

        const deletedPost = await this.postDocumentModel.findByIdAndDelete(id);

        return deletedPost;
    }
}
