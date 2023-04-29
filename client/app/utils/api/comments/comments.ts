import { api } from '@/app/utils';

export const commentsApi = {
    async getCommentsFromPost(postId: string) {
        return api.get<Comment[]>(`comments/${postId}`);
    },
    async createComment(text: string, postId: string) {
        return api.post<Comment>(`comments/createComment`, { text, postId });
    },
    async removeComment(commentId: string, postId: string) {
        return api.post<Comment>(`comments/removeComment/${commentId}`, {
            commentId,
            postId
        });
    }
};
