import { FC } from 'react';

import Link from 'next/link';

import { Typography, UsersComponents } from '@/components';

import { ROUTES } from '@/utils/constants';

import cl from './Card.module.scss';

interface UserProps {
    user: User;
}

export const Card: FC<UserProps> = ({ user }) => {
    return (
        <li key={user._id} className={cl.item}>
            <div className={cl.image}>
                <img src={user.imageUrl} alt={user.name} />
            </div>

            <div className={cl.info}>
                <Link href={`${ROUTES.PROFILE}/${user._id}`}>{user.name}</Link>

                <Typography variant={'sub-title-1'} tag={'p'}>
                    {user.email.slice(0, 25)}
                </Typography>
            </div>

            <UsersComponents.Following user={user} />
        </li>
    );
};
