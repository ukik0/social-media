import { FC } from 'react';
import { CiSquareRemove } from 'react-icons/ci';

import { Typography } from '@/components';

import { useAuthStore } from '@/store';

import { useRemovePostMutation } from '@/utils/api';

import cl from './RemovePost.module.scss';

interface RemovePostProps {
    post: Post;
}

export const RemovePost: FC<RemovePostProps> = ({ post }) => {
    const { isAuth, user } = useAuthStore();
    const { mutate: removePost, isLoading } = useRemovePostMutation(post._id);

    if (!isAuth || user._id !== post.author._id) return null;

    if (isLoading) return <div className={cl.spinner}></div>;

    return (
        <div className={cl.remover}>
            <CiSquareRemove className={cl.icon} onClick={() => removePost()} />

            <Typography variant={'sub-title-1'} tag={'p'}>
                Удалить
            </Typography>
        </div>
    );
};
