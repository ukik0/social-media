import { FC } from 'react';

import Link from 'next/link';

import { Typography } from '@/components';

import { RemoveCommentButton } from '@/app/components/Comments/Comment/RemoveCommentButton/RemoveCommentButton';

import { useAuthStore } from '@/store';

import { timeFromNow } from '@/utils';
import { ROUTES } from '@/utils/constants';

import cl from './Comment.module.scss';

interface CommentProps {
    comment: Comment;
}

export const Comment: FC<CommentProps> = ({ comment }) => {
    const { user } = useAuthStore((state) => state);

    const isAuthor = comment.author._id === user._id;

    return (
        <li className={cl.item}>
            <div className={cl.image}>
                <img src={comment.author.imageUrl} alt={comment.author.name} />
            </div>

            <div className={cl.info}>
                <Link href={`${ROUTES.PROFILE}/${comment.author._id}`}>{comment.author.name}</Link>
                <Typography tag={'p'} variant={'description'}>
                    {comment.text}
                </Typography>
            </div>

            <time className={cl.time}>{timeFromNow(comment.created_at)}</time>

            {isAuthor && <RemoveCommentButton comment={comment} />}
        </li>
    );
};
