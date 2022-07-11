import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ErrorModal } from './ErrorModal';
import { errorModalPropsMocked } from './ErrorModal.mock';

export default {
  title: 'components/ErrorModal',
  component: ErrorModal,
} as ComponentMeta<typeof ErrorModal>;

const Template: ComponentStory<typeof ErrorModal> = (args) => (
  <ErrorModal {...args} />
);
export const Default = Template.bind({});

Default.args = errorModalPropsMocked;
