import cn from 'classnames';

type TagTypes = 'div' | 'span' | 'p' | 'label' | 'h1' | 'h2' | 'h3';
type VariantTypes = 'title-1' | 'title-2' | 'description' | 'sub-title-1' | 'sub-title-2' | 'error';

interface TypographyProps {
    children: string;
    variant: VariantTypes;
    tag?: TagTypes;
    className?: string;
}
export const Typography = ({ children, tag = 'div', variant, className }: TypographyProps) => {
    const Component = tag;

    return <Component className={cn(variant, className)}>{children}</Component>;
};
