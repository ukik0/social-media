import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { Post, PostDocument } from '../posts/schemas/post.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userDocumentModel: Model<UserDocument>,
        @InjectModel(Post.name) private postDocumentModel: Model<PostDocument>
    ) {}

    async create(dto: UserDto): Promise<User> {
        const user = await this.userDocumentModel.create({ ...dto });

        return user;
    }

    async findAll(): Promise<User[]> {
        return this.userDocumentModel.find().exec();
    }

    async findById(id: string): Promise<User> {
        return this.userDocumentModel.findById(id);
    }

    async findByUsername(name: string): Promise<User> {
        return this.userDocumentModel.findOne({ name }).exec();
    }

    async update(id: string, dto: UserDto): Promise<User> {
        return this.userDocumentModel
            .findByIdAndUpdate(id, { $set: { ...dto } }, { new: true })
            .exec();
    }

    async remove(id: string): Promise<User> {
        return this.userDocumentModel.findByIdAndDelete(id).exec();
    }

    async getUserPosts(userId: string): Promise<Post[]> {
        const posts = await this.postDocumentModel.find({ author: userId });

        return posts;
    }

    async searchUsersByQuery(query: string): Promise<User[]> {
        const users = await this.userDocumentModel.find({
            name: { $regex: new RegExp(query, 'i') }
        });

        return users;
    }

    async addUserToFriend(userId, friendUserId): Promise<User> {
        const user = await this.userDocumentModel.findById(userId);
        const friendUser = await this.userDocumentModel.findById(friendUserId);

        if (!user || !friendUser)
            throw new BadRequestException('Пользователь не найден');

        const updatedUser = await this.userDocumentModel.findByIdAndUpdate(
            userId,
            {
                $push: { friends: friendUser }
            },
            { new: true }
        );

        const updatedFriendUser =
            await this.userDocumentModel.findByIdAndUpdate(
                friendUserId,
                {
                    $push: { friends: user }
                },
                { new: true }
            );

        return updatedUser;
    }

    async removeUserFromFriend(userId, friendUserId): Promise<User> {
        const user = await this.userDocumentModel.findById(userId);
        const friendUser = await this.userDocumentModel.findById(friendUserId);

        if (!user || !friendUser)
            throw new BadRequestException('Пользователь не найден');

        const updatedUser = await this.userDocumentModel.findByIdAndUpdate(
            userId,
            {
                $pull: { friends: friendUser._id }
            },
            { new: true }
        );

        const updatedFriendUser =
            await this.userDocumentModel.findByIdAndUpdate(
                friendUserId,
                {
                    $pull: { friends: user._id }
                },
                { new: true }
            );

        return updatedUser;
    }

    async getUserFriends(userId): Promise<User[]> {
        const user = await this.userDocumentModel.findById(userId);

        if (!user) throw new BadRequestException('Пользователь не найден');

        const userFriends = await Promise.all(
            user.friends.map((friend) =>
                this.userDocumentModel.findById(friend)
            )
        );

        return userFriends;
    }

    async getPostsFromFriends(userId): Promise<any> {
        const user = await this.userDocumentModel.findById(userId);

        if (!user) throw new BadRequestException('Пользователь не найден');

        const posts = await Promise.all(user.friends.map((friend) => this.postDocumentModel.find({author: friend})))

        return posts.flat();
    }
}
