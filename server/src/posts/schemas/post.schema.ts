import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
    @Prop({type: String, required: true, unique: true})
    title: string;

    @Prop({type: String, required: true})
    description: string;

    @Prop({type: Number, default: 0})
    views: 0;

    @Prop({type: String, default: ''})
    imageUrl: string;

    // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], required: true })
    // author: string;
    //
    // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Like' }], default: [] })
    // likes: string[];
    //
    // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: [] }] })
    // comments: string[];

    @Prop({type: [String], default: []})
    tags: string[];

    @Prop({type: String, required: true})
    category: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
