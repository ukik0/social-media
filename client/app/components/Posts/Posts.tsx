import { useState } from 'react';
import { DateObject } from 'react-multi-date-picker';

import { PostsComponents } from '@/components';

import { POSTS_SORTING_LIST } from '@/utils/constants/';

import { useGetFilteredPosts } from '@/app/utils/api';

import cl from './Posts.module.scss';

export const Posts = () => {
    const [active, setActive] = useState<PostsSorting>({ title: 'Новые', type: 'created_at', value: -1 });
    const [date, setDate] = useState<DateObject[]>([]);

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

                <PostsComponents.List posts={posts?.posts} isLoading={isLoading} />

                <PostsComponents.Pagination pages={posts?.pages} />
            </div>
        </>
    );
};
