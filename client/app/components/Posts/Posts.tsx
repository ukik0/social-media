import { useState } from 'react';
import { DateObject } from 'react-multi-date-picker';

import { Field, PostsComponents } from '@/components';

import { Input } from '@/app/components/UI/Input/Input';
import { Modal } from '@/app/components/UI/Modal/Modal';

import { POSTS_SORTING_LIST } from '@/utils/constants/';

import { useGetFilteredPosts } from '@/app/utils/api';

import cl from './Posts.module.scss';

export const Posts = () => {
    const [date, setDate] = useState<DateObject[]>([]);
    const [active, setActive] = useState<PostsSorting>({ title: 'Новые', type: 'created_at', value: -1 });

    const { data: posts, isLoading } = useGetFilteredPosts({ active, date });

    return (
        <>
            <div className={cl.posts}>
                <div className={cl.top}>
                    <PostsComponents.Sorting
                        sortingList={POSTS_SORTING_LIST}
                        active={active}
                        setActive={setActive}
                    />
                    <PostsComponents.Filter date={date} setDate={setDate} />
                </div>

                <PostsComponents.CreatePost />

                <PostsComponents.List posts={posts?.posts} isLoading={isLoading} />

                <PostsComponents.Pagination pages={posts?.pages} />
            </div>
        </>
    );
};
