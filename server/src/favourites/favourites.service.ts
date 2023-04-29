import { BadRequestException, Injectable } from '@nestjs/common';
import { User, UserDocument } from '../users/schemas/user.schema';
import { Post, PostDocument } from '../posts/schemas/post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FavouritesService {
    constructor(
        @InjectModel(User.name) private userDocumentModel: Model<UserDocument>,
        @InjectModel(Post.name) private postDocumentModel: Model<PostDocument>
    ) {}

    async addPostToFavourites(userId, postId): Promise<User> {
        const user = await this.userDocumentModel.findById(userId);
        const post = await this.postDocumentModel.findById(postId);

        if (!user || !post) throw new BadRequestException('Запись не найдеа');

        const userData = await this.userDocumentModel.findByIdAndUpdate(
            userId,
            {
                $push: { favourites: post._id }
            },
            { new: true }
        );

        return userData;
    }

    async removePostFromFavourites(userId, postId): Promise<User> {
        const user = await this.userDocumentModel.findById(userId);
        const post = await this.postDocumentModel.findById(postId);

        if (!user || !post) throw new BadRequestException('Запись не найдеа');

        const userData = await this.userDocumentModel.findByIdAndUpdate(
            userId,
            {
                $pull: { favourites: post._id }
            },
            { new: true }
        );

        return userData;
    }

    async getFavouritesPosts(userId): Promise<Post[]> {
        const user = await this.userDocumentModel.findById(userId);

        if (!user) throw new BadRequestException('Запись не найдеа');

        const posts = await Promise.all(
            user.favourites.map((post) =>
                this.postDocumentModel.findById(post).populate('author')
            )
        );

        return posts;
    }
}
