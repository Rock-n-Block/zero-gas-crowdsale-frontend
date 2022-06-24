import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Typography } from './Typography';
import { typographyPropsMocked } from './Typography.mock';

export default {
  title: 'components/Typography',
  component: Typography,
} as ComponentMeta<typeof Typography>;

const Template: ComponentStory<typeof Typography> = (args) => <Typography {...args} />;
export const Default = Template.bind({});

Default.args = typographyPropsMocked;
