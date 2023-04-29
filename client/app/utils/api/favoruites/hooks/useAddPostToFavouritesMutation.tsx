import { AxiosError } from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { timeoutPromise } from '@/utils';
import { favouritesApi } from '@/utils/api';

export const useAddPostToFavouritesMutation = (postId: string) => {
    const client = useQueryClient();

    return useMutation({
        mutationFn: () => favouritesApi.addPostToFavourites({ postId }),
        onSuccess: async () => {
            client.invalidateQueries({ queryKey: ['favouritesPosts'] });
            await timeoutPromise();
            toast.success('Пост успешно добавлен в избранное');
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
