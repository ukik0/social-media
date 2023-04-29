import { LinkButton, PostsComponents, Typography } from '@/app/components';

import { useGetFavouritesPosts } from '@/utils/api';
import { ROUTES } from '@/utils/constants';

import cl from './Favourites.module.scss';

export const FavouritesPage = () => {
    const { data: favourites, isLoading } = useGetFavouritesPosts();

    if (!favourites || isLoading)
        return (
            <main className={cl.favourites}>
                <div className={cl.spinner}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </main>
        );

    return (
        <main className={cl.favourites}>
            <div className='container'>
                <div className={cl[`favourites__content`]}>
                    <ul className={cl.list}>
                        {favourites.length ? (
                            favourites.map((post) => <PostsComponents.Card post={post} key={post._id} />)
                        ) : (
                            <div className={cl.wrapper}>
                                <Typography tag={'h1'} variant={'title-1'} className={cl.empty}>
                                    Избранных постов нет :(
                                </Typography>
                                <LinkButton variant={'outlined'} to={ROUTES.ROOT}>
                                    На главную
                                </LinkButton>
                            </div>
                        )}
                    </ul>
                </div>
            </div>
        </main>
    );
};
