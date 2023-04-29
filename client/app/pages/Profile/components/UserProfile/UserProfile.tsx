import { FC } from 'react';

import { Typography, UsersComponents } from '@/components';

import cl from './UserProfile.module.scss';

interface UserProfileProps {
    user: User;
}

export const UserProfile: FC<UserProfileProps> = ({ user }) => {
    return (
        <div className={cl.user}>
            <div className={cl.top}>
                <img src='https://rare-gallery.com/uploads/posts/529054-flowers-red.jpg' alt='img' />

                <div className={cl.info}>
                    <Typography variant={'sub-title-1'} tag={'p'}>
                        {user.name}
                    </Typography>

                    <Typography variant={'sub-title-2'} tag={'span'}>
                        {user.email}
                    </Typography>
                </div>

                <UsersComponents.Following user={user} />
            </div>

            {user.subscribers.length >= 1 && (
                <Typography variant={'sub-title-1'} tag={'h2'} className={cl.title}>
                    Подписчики:
                </Typography>
            )}

            <UsersComponents.List users={user.subscribers.slice(0, 5)} />

            {user.followers.length >= 1 && (
                <Typography variant={'sub-title-1'} tag={'h2'} className={cl.title}>
                    Подписан на:
                </Typography>
            )}

            <UsersComponents.List users={user.followers.slice(0, 5)} />
        </div>
    );
};
