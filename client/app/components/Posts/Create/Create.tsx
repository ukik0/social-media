import EditorJS from '@editorjs/editorjs';
import { AxiosError } from 'axios';
import * as process from 'process';

import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { BsFillCloudUploadFill } from 'react-icons/bs';

import Image from 'next/image';

import { Button, Modal } from '@/components';

import { Input } from '@/app/components/UI/Input/Input';

import { mediaApi } from '@/utils/api';
import { useMounted } from '@/utils/hooks/useMounted';

import cl from './Create.module.scss';

export const Create = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string>('');

    const ref = useRef<EditorJS>();
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const isMounted = useMounted();

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

    const initializeEditor = useCallback(async () => {
        const EditorJS = (await import('@editorjs/editorjs')).default;
        const Header = (await import('@editorjs/header')).default;
        const Embed = (await import('@editorjs/embed')).default;
        const Table = (await import('@editorjs/table')).default;
        const List = (await import('@editorjs/list')).default;
        const Code = (await import('@editorjs/code')).default;
        const LinkTool = (await import('@editorjs/link')).default;
        const InlineCode = (await import('@editorjs/inline-code')).default;

        if (!ref.current) {
            const editor = new EditorJS({
                holder: 'editor',
                onReady() {
                    ref.current = editor;
                },
                placeholder: 'Печатайте тут, что бы написать пост...',
                inlineToolbar: true,
                tools: {
                    header: Header,
                    linkTool: LinkTool,
                    list: List,
                    code: Code,
                    inlineCode: InlineCode,
                    table: Table,
                    embed: Embed
                }
            });
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            initializeEditor();

            return () => {
                ref.current?.destroy();
                ref.current = undefined;
            };
        }
    }, [isMounted, initializeEditor]);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <Input
                readOnly
                placeholder={'Что нового?'}
                onClick={() => setOpen((prev) => !prev)}
                className={cl.input}
            />

            <Modal active={open} setActive={setOpen} className={cl.modal}>
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

                <div id='editor' className={cl.editor} />
            </Modal>
        </>
    );
};
