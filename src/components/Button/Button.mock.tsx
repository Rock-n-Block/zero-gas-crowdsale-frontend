import { SuccessIcon } from '@/assets/img';

import { ButtonProps } from './Button';

export const buttonPropsMocked: ButtonProps = {
  onClick: () => alert('On button click'),
  startIcon: <SuccessIcon />,
};
