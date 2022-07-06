import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Input } from './Input';
import { inputPropsMocked } from './Input.mock';

export default {
  title: 'components/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => (
  <Input {...args} />
);
export const Default = Template.bind({});

Default.args = inputPropsMocked;
