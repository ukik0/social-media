import {useMutation, useQueryClient} from "@tanstack/react-query";
import {postsApi} from "@/utils/api";
import {timeoutPromise} from "@/utils";
import toast from "react-hot-toast";
import {AxiosError} from "axios";

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
