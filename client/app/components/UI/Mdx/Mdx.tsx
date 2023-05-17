import { MDXComponents } from 'mdx/types';
import { useMDXComponent } from 'next-contentlayer/hooks';

import { HTMLAttributes, ImgHTMLAttributes } from 'react';

import cl from './Mdx.module.scss';

interface MdxProps {
    code: string;
}

const components = {
    h1: ({ className, ...props }: HTMLAttributes<HTMLHeadElement>) => <h1 className={cl.h1} {...props} />,
    h2: ({ className, ...props }: HTMLAttributes<HTMLHeadElement>) => <h2 {...props} />,
    h3: ({ className, ...props }: HTMLAttributes<HTMLHeadElement>) => <h3 {...props} />,
    h4: ({ className, ...props }: HTMLAttributes<HTMLHeadElement>) => <h4 {...props} />,
    h5: ({ className, ...props }: HTMLAttributes<HTMLHeadElement>) => <h5 {...props} />,
    h6: ({ className, ...props }: HTMLAttributes<HTMLHeadElement>) => <h6 {...props} />,
    a: ({ className, ...props }: HTMLAttributes<HTMLAnchorElement>) => <a {...props} />,
    p: ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => <p className={cl.p} {...props} />,
    ul: ({ className, ...props }: HTMLAttributes<HTMLUListElement>) => <ul {...props} />,
    ol: ({ className, ...props }: HTMLAttributes<HTMLOListElement>) => <ol {...props} />,
    li: ({ className, ...props }: HTMLAttributes<HTMLLIElement>) => <li {...props} />,
    blockquote: ({ className, ...props }: HTMLAttributes<HTMLElement>) => <blockquote {...props} />,
    img: ({ className, alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) => <img alt={alt} {...props} />,
    hr: ({ ...props }) => <hr {...props} />,
    table: ({ className, ...props }: HTMLAttributes<HTMLTableElement>) => (
        <div>
            <table {...props} />
        </div>
    ),
    tr: ({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) => <tr {...props} />,
    th: ({ className, ...props }: HTMLAttributes<HTMLTableHeaderCellElement>) => <th {...props} />,
    td: ({ className, ...props }: HTMLAttributes<HTMLTableDataCellElement>) => <td {...props} />,
    pre: ({ className, ...props }: HTMLAttributes<HTMLPreElement>) => <pre {...props} />,
    code: ({ className, ...props }: HTMLAttributes<HTMLElement>) => <code {...props} />
};

export const Mdx = ({ code }: MdxProps) => {
    const Component = useMDXComponent(code);

    return (
        <div className='mdx'>
            <Component components={components as unknown as MDXComponents} />
        </div>
    );
};
