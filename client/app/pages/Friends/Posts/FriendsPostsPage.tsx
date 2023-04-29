import cl from './FriendsPostsPage.module.scss';
import { useGetFollowersPosts } from '@/utils/api';
import { PostsComponents } from '@/components';

export const FollowersPostsPage = () => {
    const {data: posts, isLoading} = useGetFollowersPosts()

    return (
        <main className={cl.posts}>
            <div className='container'>
                <div className={cl[`posts__content`]}>
                    <PostsComponents.List isLoading={isLoading} posts={posts}/>
                </div>
            </div>
        </main>
    );
};
