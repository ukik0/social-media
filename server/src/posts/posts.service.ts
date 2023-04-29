import { BadRequestException, Injectable } from '@nestjs/common';
import { Post, PostDocument } from './schemas/post.schema';
import { User, UserDocument } from '../users/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post.name) private postDocumentModel: Model<PostDocument>,
        @InjectModel(User.name) private userDocumentModel: Model<UserDocument>,
    ) {}

    async getFilteredPosts(page: number, sortBy: keyof Post, sortValue: 1 | -1, start: string = "2021-01-01", end: string = "9999-01-01"): Promise<{ pages: number, posts: Post[] }> {
        const limit = 2;

        const postsCount = await this.postDocumentModel.find({created_at:{$gte: new Date(start), $lt: new Date(end)}}).count()
        const pages = postsCount / limit

        const posts = await this.postDocumentModel
            .find({created_at:{$gte: new Date(start), $lt: new Date(end)}})
            .populate('author')
            .sort({ [sortBy]: sortValue })
            .skip(limit * (page-1))
            .limit(limit);

        return {pages, posts};
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
        const post: Post = await this.postDocumentModel.findById(id);
        const author = await this.userDocumentModel.find({name: post.author})

        if (!post || !author) throw new BadRequestException('Пост не найден');

        const deletedPost = await this.postDocumentModel.findByIdAndDelete(id);

        await this.userDocumentModel.findByIdAndUpdate(post.author, {
            $pull: {favourites: post._id}
        })

        return deletedPost;
    }

    async searchPostByQuery(query: string): Promise<Post[]> {
        const posts = await this.postDocumentModel.find({
            title: { $regex: new RegExp(query, 'i') }
        });

        return posts;
    }

    async searchPostByCategory(category: string): Promise<Post[]> {
        const posts = await this.postDocumentModel.find({ category });

        return posts;
    }


}
