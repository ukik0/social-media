import { PostPage } from '@/pages';

import { NextPageAuth } from '@/provider';

const Post: NextPageAuth = () => {
    return <PostPage />;
};

Post.isAuth = false;

export default Post;
