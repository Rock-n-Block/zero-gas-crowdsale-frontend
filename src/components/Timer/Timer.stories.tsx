import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Timer } from './Timer';
import { timerPropsMocked } from './Timer.mock';

export default {
  title: 'components/Timer',
  component: Timer,
} as ComponentMeta<typeof Timer>;

const Template: ComponentStory<typeof Timer> = (args) => (
  <Timer {...args} />
);
export const Default = Template.bind({});

Default.args = timerPropsMocked;
