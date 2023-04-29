import { FC } from 'react';
import { BsFillBookmarkHeartFill, BsFillBookmarkXFill } from 'react-icons/bs';

import { useFavourites } from '@/app/components/Posts/Favourites/hooks/useFavourites';

import cl from './Favourites.module.scss';
import { Typography } from '@/components';

interface FavouritesProps {
    postId: Post['_id'];
}

export const Favourites: FC<FavouritesProps> = ({ postId }) => {
    const { mutations, isLoading, favouritesPosts, isAuth } = useFavourites(postId);
    console.log(favouritesPosts)

    if (!isAuth) return null;

    if (isLoading || !favouritesPosts) return <div className={cl.spinner}></div>;

    const isFavouritePost = !!favouritesPosts.find((item) => item._id === postId);

    return (
        <>
            {!isFavouritePost ? (
                <div className={cl.wrapper}>
                    <BsFillBookmarkHeartFill
                        className={cl.icon}
                        onClick={() => mutations.addPostToFavourite()}
                    />
                    <Typography variant={'sub-title-1'} tag={'p'}>
                        Добавить в избранное
                    </Typography>
                </div>
            ) : (
                <div className={cl.wrapper}>
                    <BsFillBookmarkXFill
                        className={cl.icon}
                        onClick={() => mutations.removePostFromFavourite()}
                    />
                    <Typography variant={'sub-title-1'} tag={'p'}>
                        Удалить из избранного
                    </Typography>
                </div>
            )}
        </>
    );
};
