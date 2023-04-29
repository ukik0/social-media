import { AxiosError } from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { timeoutPromise } from '@/utils';
import { likesApi } from '@/utils/api';

export const useLikePostMutation = (postId: string) => {
    const client = useQueryClient();

    return useMutation({
        mutationFn: () => likesApi.likePost(postId),
        onSuccess: async () => {
            client.invalidateQueries({ queryKey: ['filteredPosts'] });
            client.invalidateQueries({ queryKey: ['favouritesPosts'] });
            client.invalidateQueries({ queryKey: ['userPosts'] });
            await timeoutPromise();
        },
        onError: (error: AxiosError<Error>) => {
            if (error.response?.status === 401) {
                toast.error(`Необходимо авторизоваться`);
            } else {
                toast.error(`${error?.response?.data.message}`);
            }
        }
    });
};
