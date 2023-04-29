import { FC } from 'react';
import { BsFillTrashFill } from 'react-icons/bs';

import { useRemoveCommentMutation } from '@/utils/api';

import cl from './RemoveCommentButton.module.scss';

interface RemoveCommentButtonProps {
    comment: Comment;
}

export const RemoveCommentButton: FC<RemoveCommentButtonProps> = ({ comment }) => {
    const { mutate: removeComment, isLoading } = useRemoveCommentMutation(comment._id, comment.postId);

    if (isLoading) return <div className={cl.spinner}></div>;

    return <BsFillTrashFill className={cl.icon} onClick={() => removeComment()} />;
};
