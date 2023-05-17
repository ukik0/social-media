import { api } from '@/app/utils';

import { DateObject } from 'react-multi-date-picker';

interface FilteredPostsProps {
    page?: number;
    sortBy: string;
    sortValue: number;
    start: DateObject;
    end: DateObject;
}

export const postsApi = {
    async getPosts({ start, end }: { start: string; end: string }) {
        return api.get<PostResponse<Post[]>>(`posts?start=${start}&end=${end}`);
    },
    async getPost({ id }: { id: string }) {
        return api.get<Post>(`/posts/${id}`);
    },
    async getFilteredPosts({ page = 1, sortBy, sortValue, start, end }: FilteredPostsProps) {
        return api.get<PostResponse<Post[]>>(
            `posts?page=${page}&sortBy=${sortBy}&sortValue=${sortValue}&start=${start}&end=${end}`
        );
    },
    async getPostsByQuery({ query }: { query: string }) {
        return api.get<Post[]>(`posts/search`, { params: { query } });
    },
    async removePost({ id }: { id: string }) {
        return api.delete<Post>(`posts/${id}`);
    },
    async createPost(data: CreatePostData) {
        return api.post<Post>(`posts`, data);
    }
};
