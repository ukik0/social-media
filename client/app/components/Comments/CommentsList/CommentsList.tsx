import { FC } from 'react';

import { CommentsComponents, Typography } from '@/components';

import { useGetCommentsFromPost } from '@/utils/api';

import cl from './CommentsList.module.scss';

interface CommentsListProps {
    postId: Post['_id'];
}
export const CommentsList: FC<CommentsListProps> = ({ postId }) => {
    const { data: comments, isLoading } = useGetCommentsFromPost(postId);

    if (!comments || isLoading)
        return (
            <ul className={cl.list}>
                <div className={cl.spinner}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </ul>
        );

    if (!comments.length)
        return (
            <Typography tag={'h1'} variant={'description'} className={cl.empty}>
                Комментов нет. Но будьте первым, кто его оставит :)
            </Typography>
        );

    return (
        <ul className={cl.list}>
            {comments.map((comment) => (
                <CommentsComponents.Comment key={comment._id} comment={comment} />
            ))}
        </ul>
    );
};
