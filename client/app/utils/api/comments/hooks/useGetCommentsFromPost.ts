import { useQuery } from '@tanstack/react-query';

import { commentsApi } from '@/utils/api';

export const useGetCommentsFromPost = (postId: string) => {
    return useQuery({
        queryFn: () => commentsApi.getCommentsFromPost(postId),
        queryKey: ['postComments'],
        select: (users) => users.data
    });
};
