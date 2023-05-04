import { FC, useCallback, useState } from 'react';
import { BsFillBookmarkHeartFill, BsFillShareFill } from 'react-icons/bs';

import { Button, Typography } from '@/components';

import { ROUTES } from '@/utils';

import cl from './SharePost.module.scss';

interface SharePostProps {
    postId: Post['_id'];
}

export const SharePost: FC<SharePostProps> = ({ postId }) => {
    const [isCopy, setIsCopy] = useState<boolean>(false);

    const handleCopyClick = useCallback(() => {
        setIsCopy(true);
        navigator.clipboard.writeText(`http://localhost:3000${ROUTES.POST_PAGE}/${postId}`);

        setTimeout(() => {
            setIsCopy(false);
        }, 1500);
    }, []);

    return (
        <div className={cl.copy}>
            <BsFillShareFill onClick={handleCopyClick} className={cl.icon} />

            <Typography variant={'sub-title-1'} tag={'p'}>
                {isCopy ? 'Скопировано' : 'Скопировать'}
            </Typography>
        </div>
    );
};
