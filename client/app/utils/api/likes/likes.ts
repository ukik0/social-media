import { api } from '@/app/utils';

export const likesApi = {
    async likePost(postId: string) {
        return api.post<Post>(`likes/like/${postId}`);
    },
    async unLikePost(postId: string) {
        return api.post<Post>(`likes/unlike/${postId}`);
    }
};
