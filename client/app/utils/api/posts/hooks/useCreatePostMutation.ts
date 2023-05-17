import { AxiosError } from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { timeoutPromise } from '@/utils';
import { postsApi } from '@/utils/api';

export const useCreatePostMutation = (data?: CreatePostData) => {
    const client = useQueryClient();

    return useMutation({
        mutationFn: () => postsApi.createPost(data!),
        onSuccess: async () => {
            client.invalidateQueries({ queryKey: ['filteredPosts'] });
            await timeoutPromise();
            toast.success('Пост успешно создан');
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
