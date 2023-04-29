import { api } from '@/app/utils';
import { DateObject } from 'react-multi-date-picker';

interface FilteredPostsProps {
    page?: number;
    sortBy: string;
    sortValue: number;
    start: DateObject;
    end: DateObject;
}

export const usersApi = {
    async getUsers() {
        return api.get<User[]>(`users`);
    },
    async getUserFollowers() {
        return api.get<User[]>(`users/followers`);
    },
    async subscriptionUser(subscriberId: string) {
        return api.post<User>(`users/subscription/${subscriberId}`);
    },
    async unsubscribeUser(subscriberId: string) {
        return api.post<User>(`users/unsubscribe/${subscriberId}`);
    },
    async getUserPosts({
        userId,
        sortBy,
        sortValue
    }: Omit<FilteredPostsProps, 'end' | 'page'> & { userId: string }) {
        return api.get<Post[]>(`users/posts/${userId}?sortBy=${sortBy}&sortValue=${sortValue}`);
    },
    async getUser(userId: string) {
        return api.get<User>(`users/${userId}`);
    },
    async getFollowersPosts() {
        return api.get<Post[]>(`users/followers/posts`);
    }
};
