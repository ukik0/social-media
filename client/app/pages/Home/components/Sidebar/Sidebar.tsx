import { PossibleFollowers } from '@/app/pages/Home';

import cl from './Sidebar.module.scss';

export const Sidebar = () => {
    return (
        <div className={cl.sidebar}>
            <PossibleFollowers />
        </div>
    );
};
