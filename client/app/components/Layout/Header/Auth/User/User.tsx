import { Typography } from '@/app/components';

import { FC } from 'react';
import { BiExit } from 'react-icons/bi';

import Link from 'next/link';

import { useAuth } from '@/store';

import { ROUTES } from '@/utils';

import cl from './User.module.scss';

interface UserProps {
    user: User;
}

export const User: FC<UserProps> = ({ user }) => {
    const { logout } = useAuth();

    return (
        <div className={cl.user}>
            <div className={cl.image}>
                <img src={user.imageUrl} alt={user.name} />
            </div>

            <div className={cl.info}>
                <Link href={`${ROUTES.PROFILE}/${user._id}`}>
                    <Typography variant={'description'} tag={'span'}>
                        {user.name}
                    </Typography>{' '}
                </Link>
                <Typography tag={'p'} variant={'sub-title-2'}>
                    {user.email}
                </Typography>
            </div>

            <BiExit className={cl.icon} onClick={() => logout()} />
        </div>
    );
};
