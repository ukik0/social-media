import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {

    @Prop({ type: String, required: true })
    text: string

    @Prop({ type:  mongoose.Schema.Types.ObjectId, ref: 'User', required: true  })
    author: string

    @Prop({type: Date, default: Date.now()})
    created_at: Date

    _id: string
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
