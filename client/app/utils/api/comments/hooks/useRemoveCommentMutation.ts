import { AxiosError } from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { timeoutPromise } from '@/utils';
import { commentsApi } from '@/utils/api';

export const useRemoveCommentMutation = (commentId: string, postId: string) => {
    const client = useQueryClient();

    return useMutation({
        mutationFn: () => commentsApi.removeComment(commentId, postId),
        onSuccess: async () => {
            client.invalidateQueries(['postComments']);
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
