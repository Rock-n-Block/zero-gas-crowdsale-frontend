import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button } from './Button';
import { buttonPropsMocked } from './Button.mock';

export default {
  title: 'components/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}>Hello World!</Button>;
export const Default = Template.bind({});

Default.args = buttonPropsMocked;
