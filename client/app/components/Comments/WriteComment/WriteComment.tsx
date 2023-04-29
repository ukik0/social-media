import { FC, useState } from 'react';

import { CreateCommentButton } from '@/app/components/Comments/WriteComment/CreateCommentButton/CreateCommentButton';

import cl from './WriteComment.module.scss';

interface WriteCommentProps {
    postId: string;
}

export const WriteComment: FC<WriteCommentProps> = ({ postId }) => {
    const [value, setValue] = useState<string>('');

    return (
        <div className={cl.comment}>
            <div className={cl.image}>
                <img
                    src='https://sun9-4.userapi.com/s/v1/ig2/tCLgAGnxd5isPoI0D9UkwGiGMiPxxfAAlIK_MFLXTV1DghB5CpRPSJ1-rVutIi2rlJSO2SOZ6vL1NXhWO9IkSGZT.jpg?size=50x50&quality=96&crop=18,1,205,205&ava=1'
                    alt='img'
                />
            </div>

            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type='text'
                className={cl.input}
                placeholder={'Ваш комментарий'}
            />

            <CreateCommentButton value={value} postId={postId} setValue={setValue} />
        </div>
    );
};
