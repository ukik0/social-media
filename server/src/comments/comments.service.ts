import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CommentDto } from './dto/comment.dto';
import { User, UserDocument } from '../users/schemas/user.schema';
import { Post, PostDocument } from '../posts/schemas/post.schema';

@Injectable()
export class CommentsService {
    constructor(
        @InjectModel(Comment.name)
        private commentDocumentModel: Model<CommentDocument>,
        @InjectModel(User.name) private userDocumentModel: Model<UserDocument>,
        @InjectModel(Post.name) private postDocumentModel: Model<PostDocument>
    ) {}
    async createCommentToPost(
        dto: CommentDto,
        userId: string
    ): Promise<Comment> {
        const user = await this.userDocumentModel.findById(userId);

        if (!dto.text)
            throw new BadRequestException('Комментарий не может быть пусты');

        const comment = await this.commentDocumentModel.create({
            text: dto.text,
            author: user
        });

        await comment.save();

        await this.postDocumentModel.findByIdAndUpdate(dto.postId, {
            $push: { comments: comment }
        });

        return comment;
    }

    async removeCommentFromPost(dto, userId: string, commentId): Promise<Post> {
        const post = await this.postDocumentModel.findById(dto.postId);
        const comment = await this.commentDocumentModel.findById(commentId);

        if (!post || !comment) throw new BadRequestException('Пост не найден');

        const updatedPost = await this.postDocumentModel.findByIdAndUpdate(
            dto.postId,
            {
                $pull: { comments: comment._id }
            },
            { new: true }
        );

        await this.commentDocumentModel.findByIdAndDelete(commentId);

        return updatedPost;
    }

    async getCommentsFromPost(postId): Promise<Comment[]> {
        const post = await this.postDocumentModel.findById(postId);

        if (!post) throw new BadRequestException('Пост не найден');

        const postComments = await Promise.all(
            post.comments.map((comment) =>
                this.commentDocumentModel.findById(comment).populate('author')
            )
        );

        return postComments
    }
}
