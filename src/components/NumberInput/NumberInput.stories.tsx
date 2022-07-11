import { ComponentMeta, ComponentStory } from '@storybook/react';

import { NumberInput } from './NumberInput';
import { numberInputPropsMocked } from './NumberInput.mock';

export default {
  title: 'components/NumberInput',
  component: NumberInput,
} as ComponentMeta<typeof NumberInput>;

const Template: ComponentStory<typeof NumberInput> = (args) => (
  <NumberInput {...args} />
);
export const Default = Template.bind({});

Default.args = numberInputPropsMocked;
