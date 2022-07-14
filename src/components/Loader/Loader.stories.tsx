import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Loader } from './Loader';
import { loaderPropsMocked } from './Loader.mock';

export default {
  title: 'components/Loader',
  component: Loader,
} as ComponentMeta<typeof Loader>;

const Template: ComponentStory<typeof Loader> = (args) => (
  <Loader {...args} />
);
export const Default = Template.bind({});

Default.args = loaderPropsMocked;
