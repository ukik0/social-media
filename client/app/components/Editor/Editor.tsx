import EditorJS, { OutputData } from '@editorjs/editorjs';

import { MutableRefObject, forwardRef, useCallback, useEffect, useRef } from 'react';

import { useMounted } from '@/utils/hooks/useMounted';

import cl from './Editor.module.scss';

interface EditorProps {
    className?: string;
    post?: Post;
    readOnly?: boolean;
    id: string;
}

export const Editor = forwardRef<any, EditorProps>(({ id, className, readOnly = false, post }, ref) => {
    const isMounted = useMounted();

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
                holder: id,
                onReady() {
                    ref.current = editor;
                },
                placeholder: 'Печатайте тут, что бы написать пост...',
                inlineToolbar: !readOnly,
                readOnly: readOnly,
                data: post ? (post.description as unknown as OutputData) : undefined,
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

    if (!isMounted) return null;

    return <div id={id} className={className} />;
});
