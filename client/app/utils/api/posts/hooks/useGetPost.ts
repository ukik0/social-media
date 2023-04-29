import { useQuery } from '@tanstack/react-query';

import { timeoutPromise } from '@/utils';

import { postsApi } from '@/app/utils/api';

export const useGetPost = (postId: string) => {
    return useQuery({
        queryFn: () => postsApi.getPost({ id: postId }),
        onSuccess: async () => {
            await timeoutPromise();
        },
        retry: 1,
        queryKey: ['post', postId],
        select: (post) => post.data
    });
};
