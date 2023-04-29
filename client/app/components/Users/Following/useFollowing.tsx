import { useAuthStore } from '@/app/store';

import { useGetUserFollowers, useSubscriptionUserMutation, useUnsubscribeUserMutation } from '@/utils/api';

export const useFollowing = (user: User) => {
    const isAuth = useAuthStore((state) => state.isAuth);
    const { user: currentUser } = useAuthStore((state) => state);

    const { data: followers, isLoading: dataIsLoading } = useGetUserFollowers();
    const { mutate: subscription, isLoading: subscriptionIsLoading } = useSubscriptionUserMutation(user._id);
    const { mutate: unsubscribe, isLoading: unsubscribeIsLoading } = useUnsubscribeUserMutation(user._id);

    const mutationIsLoading = subscriptionIsLoading || unsubscribeIsLoading;

    const isLoading = dataIsLoading || mutationIsLoading;

    return {
        followers,
        mutations: { subscription, unsubscribe },
        isLoading,
        currentUser,
        isAuth
    };
};
