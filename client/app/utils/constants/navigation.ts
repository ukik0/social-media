import { IconType } from 'react-icons';
import { BiHomeHeart } from 'react-icons/bi';
import { BsFillBookmarkHeartFill } from 'react-icons/bs';
import { CgUserList } from 'react-icons/cg';
import { FaUserFriends } from 'react-icons/fa';

import { ROUTES } from '@/utils/constants/';

interface INavigation {
    href: string;
    title: string;
    icon: IconType;
}

export const NAV_LIST: INavigation[] = [
    {
        href: ROUTES.ROOT,
        title: 'Главная',
        icon: BiHomeHeart
    },
    {
        href: ROUTES.FRIENDS_FIND,
        title: 'Найти друзей',
        icon: FaUserFriends
    },
    {
        href: ROUTES.FRIENDS_POST,
        title: 'Посты друзей',
        icon: CgUserList
    },
    {
        href: ROUTES.FAVOURITES,
        title: 'Избранное',
        icon: BsFillBookmarkHeartFill
    }
];
