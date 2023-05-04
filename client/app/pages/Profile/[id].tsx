import { useState } from 'react';

import { useRouter } from 'next/router';

import { Layout, Loader, PostsComponents } from '@/components';

import { POSTS_SORTING_LIST } from '@/utils';

import { UserProfile, useProfilePage } from '@/app/pages/Profile';

import cl from './ProfilePage.module.scss';

export const ProfilePage = () => {
    const { query } = useRouter();
    const [active, setActive] = useState<PostsSorting>({ title: 'Новые', type: 'created_at', value: -1 });

    const { user, posts, isLoading } = useProfilePage(query.id as string, active);

    if (isLoading || !user || !posts) return <Loader />;

    return (
        <Layout title={user.name}>
            <main className='main'>
                <div className='container'>
                    <div className={cl.profile}>
                        <div className={cl.top}>
                            <PostsComponents.Sorting
                                sortingList={POSTS_SORTING_LIST}
                                active={active}
                                setActive={setActive}
                            />
                        </div>

                        <div className={cl[`profile__content`]}>
                            <PostsComponents.List isLoading={isLoading} posts={posts} />
                            <div className={cl.sticky}>
                                <UserProfile user={user} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
};
