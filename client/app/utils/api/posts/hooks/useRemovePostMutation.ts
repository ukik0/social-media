import {useMutation, useQueryClient} from "@tanstack/react-query";
import {favouritesApi, postsApi} from "@/utils/api";
import {timeoutPromise} from "@/utils";
import toast from "react-hot-toast";
import {AxiosError} from "axios";

export const useRemovePostMutation = (postId: string) => {
    const client = useQueryClient();

    return useMutation({
        mutationFn: () => postsApi.removePost({ id: postId }),
        onSuccess: async () => {
            client.invalidateQueries({ queryKey: ['filteredPosts'] });
            client.invalidateQueries({ queryKey: ['favouritesPosts'] });
            await timeoutPromise();
            toast.success('Пост успешно удален');
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