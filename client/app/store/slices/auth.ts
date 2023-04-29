import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import toast from 'react-hot-toast';

import { authApi } from '@/utils/api/';

interface AuthStore {
    isAuth: boolean;
    user: User;
    isLoading: boolean;
    login: (name: string, password: string) => void;
    register: (name: string, email: string, password: string) => void;
    logout: () => void;
    checkAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
    devtools((set) => ({
        user: {} as User,
        isAuth: false,
        isLoading: false,

        login: async (name, password) => {
            try {
                const { data } = await authApi.login({ name, password });
                localStorage.setItem('token', data.accessToken);
                set({ isAuth: true });
                set({ user: data.user });
                toast.success('Авторизация прошла успешно!');
            } catch (e: any) {
                toast.error(e.response?.data?.message);
            }
        },

        register: async (name, email, password) => {
            try {
                const { data } = await authApi.register({
                    name,
                    email,
                    password
                });
                localStorage.setItem('token', data.accessToken);
                set({ isAuth: true });
                set({ user: data.user });
                toast.success('Регистрация прошла успешно!');
            } catch (e: any) {
                toast.error(e.response?.data?.message);
            }
        },

        logout: async () => {
            try {
                const { data } = await authApi.logout();
                localStorage.removeItem('token');
                set({ isAuth: false });
                set({ user: {} as User });
                set({ isLoading: false });
                toast.success('Вы успешно вышли из системы');
            } catch (e: any) {
                toast.error(e.response?.data?.message);
            }
        },

        checkAuth: async () => {
            set({ isLoading: true });
            try {
                const { data } = await authApi.checkAuth();
                localStorage.setItem('token', data.accessToken);
                set({ isAuth: true });
                set({ user: data.user });
                set({ isLoading: false });
            } catch (e: any) {
                console.log(e.response?.data?.message);
            } finally {
                set({ isLoading: false });
            }
        }
    }))
);

export const useAuth = () => ({
    user: useAuthStore((state) => state.user),
    isAuth: useAuthStore((state) => state.isAuth),
    isLoading: useAuthStore((state) => state.isLoading),
    logout: useAuthStore((state) => state.logout),
    checkAuth: useAuthStore((state) => state.checkAuth)
});
