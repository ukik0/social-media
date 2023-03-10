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

    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        required: true,
        default: []
    })
    friends: ObjectId[];

    @Prop()
    refreshToken: string;

    _id: string
}

export const UserSchema = SchemaFactory.createForClass(User);
