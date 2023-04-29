import { Typography } from '@/app/components';

import { FC } from 'react';

import Link from 'next/link';

import { ROUTES } from '@/utils';

import cl from './Result.module.scss';

interface ResultProps {
    posts?: Post[];
    isSuccess: boolean;
}

export const Result: FC<ResultProps> = ({ posts, isSuccess }) => {
    if (!posts || !isSuccess) return null;

    return (
        <>
            {posts.length ? (
                <ul className={cl.list}>
                    {posts.map((post) => (
                        <li key={post._id} className={cl.item}>
                            <Link href={`${ROUTES.POST_PAGE}/${post._id}`}>
                                <Typography variant={'description'} tag={'span'}>
                                    {post.title}
                                </Typography>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <Typography tag={'span'} variant={'description'} className={cl.empty}>
                    Посты не найдены :(
                </Typography>
            )}
        </>
    );
};
