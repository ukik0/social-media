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

    async getPosts(page: number): Promise<Post[]> {
        const limit = 5;

        const posts = await this.postDocumentModel
            .find()
            .populate('author')
            .sort({ created_at: -1 })
            .skip(limit * (page-1))
            .limit(limit);

        return posts;
    }

    async getPost(id: string): Promise<Post> {
        const post = await this.postDocumentModel
            .findByIdAndUpdate(id, {
                $inc: { views: 1 }
            })
            .populate('author');

        if (!post) throw new BadRequestException('Пост не найден');

        return post;
    }

    async createPost(dto: PostDto, author: string): Promise<Post> {
        const post = await this.postDocumentModel.create({ ...dto, author });

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

    async searchByQuery(query: string): Promise<Post[]> {
        const posts = await this.postDocumentModel.find({
            title: { $regex: new RegExp(query, 'i') }
        });

        return posts;
    }

    async searchByCategory(category: string): Promise<Post[]> {
        const posts = await this.postDocumentModel.find({ category });

        return posts;
    }
}
