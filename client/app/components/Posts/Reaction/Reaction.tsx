import { FC } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';

import { useReaction } from '@/app/components/Posts/Reaction/useReaction';

import { useAuthStore } from '@/store';

import cn from 'classnames';

import cl from './Reaction.module.scss';

interface ReactionProps {
    post: Post;
}

export const Reaction: FC<ReactionProps> = ({ post }) => {
    const user = useAuthStore((state) => state.user);

    const { mutations, isLoading } = useReaction(post);

    if (isLoading) return <div className={cl.spinner}></div>;

    const postIsLiked = !!post.likes.find((item) => item === user._id);

    const handleLikePost = () => {
        postIsLiked ? mutations.unlikePost() : mutations.likePost();
    };

    return (
        <div className={cl.likes} onClick={handleLikePost}>
            <AiOutlineHeart
                className={cn(cl.icon, {
                    [cl.active]: postIsLiked
                })}
            />
            <span>{post.likes.length}</span>
        </div>
    );
};
