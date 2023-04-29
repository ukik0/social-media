import { Dispatch, FC, SetStateAction } from 'react';
import { AiOutlineSend } from 'react-icons/ai';

import { useCreateCommentMutation } from '@/utils/api';

import cl from './CreateCommentButton.module.scss';

interface CreateCommentButtonProps {
    value: string;
    postId: Post['_id'];
    setValue: Dispatch<SetStateAction<string>>;
}

export const CreateCommentButton: FC<CreateCommentButtonProps> = ({ value, setValue, postId }) => {
    const { mutateAsync: createComment, isLoading } = useCreateCommentMutation(value, postId);

    const handleCommentCreate = async () => {
        await createComment();
        setValue('');
    };

    if (isLoading) return <div className={cl.spinner}></div>;

    return <AiOutlineSend className={cl.icon} onClick={handleCommentCreate} />;
};
