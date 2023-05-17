import EditorJS from '@editorjs/editorjs';
import { zodResolver } from '@hookform/resolvers/zod';
import * as process from 'process';

import { useCallback, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BsFillCloudUploadFill } from 'react-icons/bs';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button, Editor, Field, Modal } from '@/components';

import { Input } from '@/app/components/UI/Input/Input';

import { api } from '@/utils';
import { mediaApi, useCreatePostMutation } from '@/utils/api';
import { useMounted } from '@/utils/hooks/useMounted';
import { RegisterValidationSchema, RegisterValidationSchemaType } from '@/utils/validation';
import { CreatePostSchema, CreatePostSchemaType } from '@/utils/validation/createPostData';

import cl from './Create.module.scss';

export const Create = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const editorRef = useRef<EditorJS>();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string>('');
    const [isSaving, setIsSaving] = useState<boolean>(false);

    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset
    } = useForm<CreatePostSchemaType>({
        resolver: zodResolver(CreatePostSchema),
        mode: 'all',
        defaultValues: {
            title: '',
            tags: '',
            category: ''
        }
    });

    const handleUploadFile = (e: Event) => {
        e.preventDefault();
        inputRef.current?.click();
    };

    const handleInputChangeFile = async (e: Event) => {
        try {
            const file = (e.target as HTMLInputElement).files![0];

            const formData = new FormData();
            formData.append('upload', file);

            const { data } = await mediaApi.uploadFile(formData);

            setImageUrl(data.url);
        } catch (e: any) {
            toast.error(e.response?.data?.message);
        }
    };

    const handleCreatePost: SubmitHandler<CreatePostSchemaType> = async (data) => {
        setIsSaving(true);

        const content = await editorRef.current?.save();

        try {
            const response = await api.post<Post>(`/posts`, {
                imageUrl,
                title: data.title,
                category: data.category,
                tags: data.tags.split(','),
                description: content
            });

            setIsSaving(false);

            setIsOpen(false);
            setImageUrl('');
            reset();

            router.push(`/post/${response.data._id}`);
        } catch (e: any) {
            toast.error(e.response?.data?.message);
            setIsSaving(false);
        }
    };

    return (
        <>
            <Input
                readOnly
                placeholder={'Что нового?'}
                onClick={() => setIsOpen((prev) => !prev)}
                className={cl.input}
            />

            <Modal active={isOpen} setActive={setIsOpen} className={cl.modal}>
                <form onSubmit={handleSubmit(handleCreatePost)} className={cl.form}>
                    <Button onClick={handleUploadFile} fill variant={'outlined'} Icon={BsFillCloudUploadFill}>
                        Загрузить фото поста
                    </Button>
                    <Input
                        onChange={handleInputChangeFile}
                        ref={inputRef}
                        type='file'
                        hidden
                        accept={'image/png'}
                    />
                    {imageUrl && (
                        <>
                            <Image
                                src={`${process.env.NEXT_PUBLIC_URL}${imageUrl}`}
                                alt={imageUrl}
                                width={300}
                                height={300}
                                priority
                                className={cl.image}
                            />
                            <Button onClick={() => setImageUrl('')} variant={'contained'} fill>
                                Удалить картинку
                            </Button>
                        </>
                    )}

                    <Editor id={'EditorCreate'} ref={editorRef} className={cl.editor} />

                    <Field
                        label={'Название поста:'}
                        type={'text'}
                        error={errors.title}
                        {...register('title')}
                        placeholder={'Введите название поста'}
                    />
                    <Field
                        label={'Категория поста:'}
                        type={'text'}
                        error={errors.category}
                        {...register('category')}
                        placeholder={'Введите категорию поста'}
                    />
                    <Field
                        label={'Теги поста:'}
                        type={'text'}
                        error={errors.tags}
                        {...register('tags')}
                        placeholder={'Введите теги поста через запятую.'}
                    />

                    <Button type={'submit'} disabled={isSaving || !isValid} variant={'outlined'} fill>
                        Сохранить
                    </Button>
                </form>
            </Modal>
        </>
    );
};
