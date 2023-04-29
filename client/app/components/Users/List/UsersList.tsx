import { FC } from 'react';

import { UsersComponents } from '@/components';

import cl from './UsersList.module.scss';

interface UsersListProps {
    users?: User[];
}

export const UsersList: FC<UsersListProps> = ({ users }) => {
    if (!users)
        return (
            <ul className={cl.list}>
                <div className={cl.spinner}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </ul>
        );

    if (!users.length) return null;

    return (
        <ul className={cl.list}>
            {users.map((user) => (
                <UsersComponents.Card key={user._id} user={user} />
            ))}
        </ul>
    );
};
