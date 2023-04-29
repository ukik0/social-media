import { FC } from 'react';

import { useRouter } from 'next/router';

import { CommentsComponents, Layout, Loader, PostsComponents } from '@/components';

import { useGetPost } from '@/utils/api';

import cl from './PostPage.module.scss';

export const PostPage: FC = () => {
    const { query } = useRouter();

    const { data: post, isLoading } = useGetPost(query.id as string);

    if (!post || isLoading) return <Loader />;

    return (
        <Layout title={post.title}>
            <main className={cl.post}>
                <div className='container'>
                    <div className={cl[`post__content`]}>
                        <PostsComponents.Card post={post} />

                        <div className={cl.comments}>
                            <h1 className={cl.title}>Комментарии</h1>

                            <CommentsComponents.CommentsList postId={post._id} />

                            <CommentsComponents.WriteComment postId={post._id} />
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
};
