import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: 'https://gravatar.com/avatar/27a264ea7883247ef7700435514779e4?s=400&d=robohash&r=x' })
    imageUrl: string;

    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        default: []
    })
        //На кого подписан пользователь
    followers: ObjectId[];

    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        default: []
    })
    //Кто подписан на пользователя
    subscribers: ObjectId[];

    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
        default: []
    })
    favourites: ObjectId[];

    @Prop()
    refreshToken: string;

    _id: string
}

export const UserSchema = SchemaFactory.createForClass(User);
