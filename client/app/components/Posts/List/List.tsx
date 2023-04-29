import { FC } from 'react';

import { PostsComponents } from '@/components';

import cl from './List.module.scss';

interface ListProps {
    posts?: Post[];
    isLoading: boolean;
}

export const List: FC<ListProps> = ({ posts, isLoading }) => {
    if (posts?.length === 0)
        return (
            <ul className={cl.list}>
                <h1 className={cl.title}>Постов не найдено :(</h1>
            </ul>
        );

    if (!posts || isLoading)
        return (
            <ul className={cl.list}>
                <div className={cl.spinner}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </ul>
        );

    return (
        <ul className={cl.list}>
            {posts.map((post) => (
                <PostsComponents.Card post={post} key={post._id} />
            ))}
        </ul>
    );
};
