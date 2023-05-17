import EditorJS, { OutputData } from '@editorjs/editorjs';

import { FC, useCallback, useEffect, useRef } from 'react';
import { AiOutlineComment, AiOutlineEye } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Editor, PostsComponents, Typography } from '@/components';

import { ROUTES, timeFromNow, useOutside } from '@/utils';
import { useMounted } from '@/utils/hooks/useMounted';
import { CreatePostSchema } from '@/utils/validation/createPostData';

import cn from 'classnames';

import cl from './Card.module.scss';

interface CardProps {
    post: Post;
}

export const Card: FC<CardProps> = ({ post }) => {
    const { asPath } = useRouter();
    const { ref, isShow, setIsShow } = useOutside(false);
    const editorRef = useRef<EditorJS>();

    const isPostPage = asPath.split('/').includes('post');
    console.log(post.imageUrl);
    return (
        <li className={cl.item}>
            <div className={cl.top}>
                <div className={cl.user}>
                    <Link href={`${ROUTES.PROFILE}/${post.author._id}`}>
                        <img
                            src='https://rare-gallery.com/uploads/posts/529054-flowers-red.jpg'
                            alt='img'
                            className={cl[`user__img`]}
                        />
                    </Link>

                    <div className={cl.info}>
                        <Link href={`${ROUTES.PROFILE}/${post.author._id}`}>{post.author.name}</Link>
                        <time>{timeFromNow(post.created_at)}</time>
                    </div>
                </div>

                <div ref={ref} onClick={() => setIsShow((prev) => !prev)} className={cl.icon}>
                    <BsThreeDots />
                </div>

                <div
                    ref={ref}
                    className={cn(cl.triplet, {
                        [cl.active]: isShow
                    })}
                >
                    <PostsComponents.Favourites postId={post._id} />
                    <PostsComponents.SharePost postId={post._id} />
                    <PostsComponents.RemovePost post={post} />
                </div>
            </div>

            <div className={cl.banner}>
                <Image
                    src={`${process.env.NEXT_PUBLIC_URL}${post.imageUrl}`}
                    alt={post.title}
                    width={300}
                    height={300}
                    priority
                />
            </div>

            <Link href={`${ROUTES.POST_PAGE}/${post._id}`} className={cl.title}>
                {post.title}
            </Link>

            {isPostPage && (
                <Editor id={'EditorCard'} readOnly ref={editorRef} className={cl.editor} post={post} />
            )}

            <div className={cl.category}>
                Категория:
                <Link href={`${ROUTES.POST_CATEGORY_PAGE}/${post.category}`}>{post.category}</Link>
            </div>

            {!isPostPage && (
                <>
                    <div className={cl.stats}>
                        <div className={cl.wrapper}>
                            <AiOutlineEye /> {post.views}
                        </div>

                        <div className={cl.wrapper}>
                            <AiOutlineComment /> {post.comments.length}
                        </div>
                    </div>

                    <PostsComponents.Reaction post={post} />
                </>
            )}
        </li>
    );
};
