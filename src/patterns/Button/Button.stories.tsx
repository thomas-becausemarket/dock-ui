import { Story } from '@ladle/react';

import { Button, CustomButtonProps } from './Button';

export const Default: Story<CustomButtonProps> = ({
  loading,
  label,
  icon,
  loadingText,
  fullWidth,
  disabled,
}) => (
  <Button
    icon={icon}
    fullWidth={fullWidth}
    label={label}
    size="small"
    loadingText={loadingText}
    loading={loading}
    disabled={disabled}
  />
);

Default.args = {
  label: 'Button',
};
Default.argTypes = {
  label: {
    control: { type: 'text' },
  },
  loading: {
    control: { type: 'boolean' },
  },
  loadingText: {
    control: { type: 'text' },
    description: 'Text to display when loading is true',
  },
  fullWidth: {
    control: { type: 'boolean' },
  },
  icon: {
    control: { type: 'text' },
    description: 'Icon to display',
  },
  disabled: {
    control: { type: 'boolean' },
  },
};
