import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from '../posts/schemas/post.schema';
import { Model } from 'mongoose';
import { Like, LikeDocument } from './schemas/like.schema';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class LikesService {
    constructor(
        @InjectModel(Post.name) private postDocumentModel: Model<PostDocument>,
        @InjectModel(Like.name) private likeDocumentModel: Model<LikeDocument>,
        @InjectModel(User.name) private userDocumentModel: Model<UserDocument>
    ) {}

    async likePost(userId: string, postId: string): Promise<Post> {
        const post = await this.postDocumentModel.findById(postId);

        if (!post) throw new BadRequestException('Пост не найден');

        await this.likeDocumentModel.create({ userId, postId });

        const updatedPost = await this.postDocumentModel.findByIdAndUpdate(
            postId,
            {
                $push: { likes: userId }
            },
            { new: true }
        );

        return updatedPost;
    }

    async unlikePost(userId: string, postId: string): Promise<Post> {
        const like = await this.likeDocumentModel.find({postId, userId});

        if (!like) throw new BadRequestException('Пост не найден');

        await this.likeDocumentModel.findByIdAndDelete(like[0]._id)

        const updatedPost = await this.postDocumentModel.findByIdAndUpdate(
            postId,
            {
                $pull: { likes: userId }
            },
            { new: true }
        );

        return updatedPost;
    }

    async getLikesFromPost(postId: string): Promise<User[]> {
        const post = await this.postDocumentModel.findById(postId);

        if (!post) throw new BadRequestException('Пост не найден');

        const likes = await Promise.all(
            post.likes.map((item) => this.userDocumentModel.findById(item))
        );

        return likes;
    }
}
