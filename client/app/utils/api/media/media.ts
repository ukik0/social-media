import { api } from '@/utils';

interface MediaResponse {
    url: string;
    name: string;
}

export const mediaApi = {
    async uploadFile(file: FormData) {
        return api.post<MediaResponse>(`/media`, file);
    }
};
