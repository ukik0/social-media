import { LinkButton, User } from '@/components';

import { useAuthStore } from '@/store';

import { ROUTES } from '@/utils';

import cl from './Auth.module.scss';

export const Auth = () => {
    const user = useAuthStore((state) => state.user)
    const isLoading = useAuthStore((state) => state.isLoading)
    const isAuth = useAuthStore((state) => state.isAuth)

    //TODO: loader
    if (isLoading)
        return (
            <div className={cl.wrapper}>
                <div className={cl.spinner}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        );

    return (
        <div className={cl.wrapper}>
            {isAuth ? (
                <User user={user} />
            ) : (
                <LinkButton variant={'contained'} to={ROUTES.LOGIN}>
                    Войти
                </LinkButton>
            )}
        </div>
    );
};
