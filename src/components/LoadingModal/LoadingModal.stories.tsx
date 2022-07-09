import { ComponentMeta, ComponentStory } from '@storybook/react';

import { LoadingModal } from './LoadingModal';
import { loadingModalPropsMocked } from './LoadingModal.mock';

export default {
  title: 'components/LoadingModal',
  component: LoadingModal,
} as ComponentMeta<typeof LoadingModal>;

const Template: ComponentStory<typeof LoadingModal> = (args) => (
  <LoadingModal {...args} />
);
export const Default = Template.bind({});

Default.args = loadingModalPropsMocked;
