import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type LikeDocument = HydratedDocument<Like>;

@Schema()
export class Like {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    userId: ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    postId: ObjectId;

    _id: ObjectId
}

export const LikeSchema = SchemaFactory.createForClass(Like);
