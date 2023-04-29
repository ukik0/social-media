import { GiShadowFollower } from 'react-icons/gi';

import { UsersComponents } from '@/components';

import { useGetUsersQuery } from '@/utils/api';

import cl from './PossibleFollowers.module.scss';

export const PossibleFollowers = () => {
    const { data: users } = useGetUsersQuery();

    return (
        <div className={cl.possible}>
            <div className={cl[`possible__content`]}>
                <div className={cl.title}>
                    <h1>Возможные фолловеры:</h1>
                    <GiShadowFollower className={cl.icon} />
                </div>

                <UsersComponents.List users={users} />
            </div>
        </div>
    );
};
