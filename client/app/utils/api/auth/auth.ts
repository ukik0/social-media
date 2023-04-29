import { api } from '@/app/utils';
import axios from 'axios';

interface IAuth {
    name: string;
    email: string;
    password: string;
}

export const authApi = {
    async register({ name, email, password }: IAuth) {
        return api.post<AuthResponse>(`auth/register`, {
            name,
            email,
            password
        });
    },
    async login({ name, password }: Omit<IAuth, 'email'>) {
        return api.post<AuthResponse>(`auth/login`, { name, password });
    },
    async logout() {
        return api.post<LogoutResponse>(`auth/logout`);
    },
    async checkAuth() {
        return axios.get<{
            accessToken: string;
            refreshToken: string;
            user: User;
        }>(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
            withCredentials: true
        });
    }
};
