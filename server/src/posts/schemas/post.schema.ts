import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
    @Prop({type: String, required: true, unique: true})
    title: string;

    @Prop({type: String, required: true})
    description: string;

    @Prop({type: Number, default: 0})
    views: number;

    @Prop({type: String, default: ''})
    imageUrl: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    author: ObjectId;
    //
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Like' }], default: [] })
    likes: ObjectId[];
    //
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: [] }] })
    comments: ObjectId[];

    @Prop({type: [String], default: []})
    tags: string[];

    @Prop({type: String, required: true})
    category: string;

    @Prop({type: Date, default: Date.now()})
    created_at: Date
    _id: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
