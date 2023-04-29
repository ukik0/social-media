import { AxiosError } from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { timeoutPromise } from '@/utils';

import { usersApi } from '@/app/utils/api';

export const useUnsubscribeUserMutation = (postId: string) => {
    const client = useQueryClient();

    return useMutation({
        mutationFn: () => usersApi.unsubscribeUser(postId),
        onSuccess: async () => {
            client.invalidateQueries({ queryKey: ['followers'] });
            client.invalidateQueries({ queryKey: ['user'] });
            client.invalidateQueries({ queryKey: ['followersPosts'] });
            await timeoutPromise();
            toast.success(`Вы успешно отписались от пользователя`);
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
