import { ComponentMeta, ComponentStory } from '@storybook/react';

import { SuccessModal } from './SuccessModal';
import { successModalPropsMocked } from './SuccessModal.mock';

export default {
  title: 'components/SuccessModal',
  component: SuccessModal,
} as ComponentMeta<typeof SuccessModal>;

const Template: ComponentStory<typeof SuccessModal> = (args) => (
  <SuccessModal {...args} />
);
export const Default = Template.bind({});

Default.args = successModalPropsMocked;
