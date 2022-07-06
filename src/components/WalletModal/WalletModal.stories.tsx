import { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { WalletModal } from './WalletModal';
import { walletModalPropsMocked } from './WalletModal.mock';

export default {
  title: 'components/WalletModal',
  component: WalletModal,
} as ComponentMeta<typeof WalletModal>;

const Template: ComponentStory<typeof WalletModal> = (args) => {
  const [isOpen, setIsOpen] = useState(true);
  return <WalletModal {...args} visible={isOpen} onClose={() => setIsOpen(false)} />;
};
export const Default = Template.bind({});

Default.args = walletModalPropsMocked;
