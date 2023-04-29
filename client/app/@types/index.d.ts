type ReactTagProps<T> = import('react').ComponentPropsWithRef<T>;

interface Comment {
    _id: string;
    text: string;
    author: Author;
    postId: string;
    created_at: Date;
}

interface Author {
    _id: string;
    name: string;
    email: string;
    imageUrl: string;
    followers: User[];
    subscribers: User[];
    favourites: Post[];
}

interface PostResponse<T> {
    pages: number;
    posts: T;
}

interface Post {
    _id: string;
    title: string;
    description: string;
    views: number;
    imageUrl: string;
    author: Author;

    likes: [];

    comments: [];
    tags: string[];
    category: string;
    created_at: Date;
}

type PostsSorting = {
    title: 'Новые' | 'Старые' | 'Популярные';
    type: 'created_at' | 'views';
    value: -1 | 1;
};

type User = Author;

interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}

interface LogoutResponse extends User {
    refreshToken: null;
}
