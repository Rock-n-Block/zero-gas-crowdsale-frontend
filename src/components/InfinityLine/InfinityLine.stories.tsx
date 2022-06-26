import { ComponentMeta, ComponentStory } from '@storybook/react';

import { InfinityLine } from './InfinityLine';
import { infinityLinePropsMocked } from './InfinityLine.mock';

export default {
  title: 'components/InfinityLine',
  component: InfinityLine,
} as ComponentMeta<typeof InfinityLine>;

const Template: ComponentStory<typeof InfinityLine> = (args) => (
  <InfinityLine>
    <div style={{ width: '100px', height: '20px', background: 'red' }} />
  </InfinityLine>
);
export const Default = Template.bind({});

Default.args = infinityLinePropsMocked;
