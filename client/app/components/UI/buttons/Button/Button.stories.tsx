import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button } from '@/components';

const buttonProps = {
    children: 'button',
    onClick: () => null,
    variant: 'outlined',
    fill: false
};

const ButtonTemplate: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Cointained: ComponentStory<typeof Button> = ButtonTemplate.bind({});
Cointained.args = { ...buttonProps, variant: 'contained' };

export const Outlined: ComponentStory<typeof Button> = ButtonTemplate.bind({});
Outlined.args = { ...buttonProps, variant: 'outlined' };

export default {
    component: Button,
    title: 'ui/buttons/button'
} as ComponentMeta<typeof Button>;
