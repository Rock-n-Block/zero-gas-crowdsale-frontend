import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Progress } from './Progress';
import { progressPropsMocked } from './Progress.mock';

export default {
  title: 'components/Progress',
  component: Progress,
} as ComponentMeta<typeof Progress>;

const Template: ComponentStory<typeof Progress> = (args) => <Progress {...args} />;
export const Default = Template.bind({});

Default.args = progressPropsMocked;
