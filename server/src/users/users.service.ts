import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { Post, PostDocument } from '../posts/schemas/post.schema';
import {shuffleArray} from "../utils/shuffleArray";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userDocumentModel: Model<UserDocument>,
        @InjectModel(Post.name) private postDocumentModel: Model<PostDocument>
    ) {}


    async getUsers(): Promise<User[]> {
        const users = await this.userDocumentModel.find();

        return shuffleArray(users)
    }

    async findById(id: string): Promise<User> {
        return this.userDocumentModel.findById(id).populate(['subscribers', 'followers']);
    }

    async findByUsername(name: string): Promise<User> {
        return this.userDocumentModel.findOne({ name }).exec();
    }

    async create(dto: UserDto): Promise<User> {
        const user = await this.userDocumentModel.create({ ...dto });

        return user;
    }

    async update(id: string, dto: UserDto): Promise<User> {
        return this.userDocumentModel
            .findByIdAndUpdate(id, { $set: { ...dto } }, { new: true })
            .exec();
    }

    async getUserPosts(userId: string, sortBy: keyof Post, sortValue: 1 | -1): Promise<Post[]> {
        const posts = await this.postDocumentModel.find({ author: userId }).populate('author').sort({ [sortBy]: sortValue });

        return posts;
    }

    async searchUsersByQuery(query: string): Promise<User[]> {
        const users = await this.userDocumentModel.find({
            name: { $regex: new RegExp(query, 'i') }
        });

        return users;
    }

    async getPostsFromFollowers(userId): Promise<Post[]> {
        const user = await this.userDocumentModel.findById(userId);

        if (!user) throw new BadRequestException('Пользователь не найден');

        const posts = await Promise.all(user.followers.map((follower) => this.postDocumentModel.find({author: follower}).populate('author')))

        return posts.flat();
    }

    async subscription(userId: string, subscriberId: string): Promise<User> {
        const user = await this.userDocumentModel.findById(userId)
        const subscriber = await this.userDocumentModel.findById(subscriberId)

        if (!user || !subscriber) throw new BadRequestException('Ошибка при подписке на пользователя :(')

        await this.userDocumentModel.findByIdAndUpdate(subscriberId, {
            $push: {subscribers: user._id}
        })

        await this.userDocumentModel.findByIdAndUpdate(userId, {
            $push: {followers: subscriber._id}
        })

        return user
    }

    async unsubscribe(userId: string, subscriberId: string): Promise<User> {
        const user = await this.userDocumentModel.findById(userId)
        const subscriber = await this.userDocumentModel.findById(subscriberId)

        if (!user || !subscriber) throw new BadRequestException('Ошибка при подписке на пользователя :(')

        await this.userDocumentModel.findByIdAndUpdate(userId, {
            $pull: {followers: subscriber._id}
        })

        await this.userDocumentModel.findByIdAndUpdate(subscriberId, {
            $pull: {subscribers: user._id}
        })

        return user
    }

    async getUserFollowers(userId: string): Promise<User[]> {
        const user = await this.userDocumentModel.findById(userId)

        if (!user) throw new BadRequestException('Пользователь не найден')

        const followers = await Promise.all(user.followers.map((follower) => this.userDocumentModel.findById(follower)))

        return followers
    }




}
