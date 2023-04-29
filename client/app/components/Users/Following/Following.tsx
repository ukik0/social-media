import { FC } from 'react';
import { HiUserAdd, HiUserRemove } from 'react-icons/hi';

import { useFollowing } from '@/app/components/Users/Following/useFollowing';

import cn from 'classnames';

import cl from './Following.module.scss';

interface FollowingProps {
    user: User;
}

export const Following: FC<FollowingProps> = ({ user }) => {
    const { followers, isLoading, mutations, isAuth, currentUser } = useFollowing(user);

    if (!isAuth || currentUser._id === user._id) return null;

    if (isLoading || !followers) return <div className={cl.spinner}></div>;

    const isFollowing = !!followers.find((follower) => follower._id === user._id);

    const handleSubscriptionUser = () => {
        isFollowing ? mutations.unsubscribe() : mutations.subscription();
    };

    return (
        <>
            {!isFollowing ? (
                <HiUserAdd className={cl.icon} onClick={handleSubscriptionUser} />
            ) : (
                <HiUserRemove
                    className={cn(cl.icon, {
                        [cl.active]: isFollowing
                    })}
                    onClick={handleSubscriptionUser}
                />
            )}
        </>
    );
};
