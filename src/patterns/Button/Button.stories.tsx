import { Story } from '@ladle/react';

import { Button, CustomButtonProps } from './Button';

export const Default: Story<CustomButtonProps> = ({
  label,
  size,
  fullWidth,
  rounded,
}) => (
  <Button label={label} size={size} fullWidth={fullWidth} rounded={rounded} />
);

Default.args = {
  label: 'Button',
};
Default.argTypes = {
  label: {
    control: { type: 'text' },
  },
  size: {
    options: ['small', 'large', undefined],
    control: { type: 'radio' },
  },
  fullWidth: {
    control: { type: 'boolean' },
  },
  rounded: {
    control: { type: 'boolean' },
  },
};

export const IconButton: Story<CustomButtonProps> = ({ label, icon }) => (
  <Button icon={icon} label={label ? 'Button' : undefined} />
);

IconButton.args = {
  label: 'Button',
  icon: 'pi pi-verified',
};

IconButton.argTypes = {
  label: {
    control: { type: 'boolean' },
    description: 'Show only the icon',
  },
  icon: {
    control: { type: 'text' },
    description: 'Icon to display',
  },
};

export const LoadingButton: Story<CustomButtonProps> = ({
  loading,
  label,
  loadingText,
}) => (
  <Button
    rounded
    loading={loading}
    label={label ? 'Button' : undefined}
    loadingText={loadingText}
    className="w-1/6"
  />
);

LoadingButton.args = {
  label: 'Button',
  loading: true,
  loadingText: 'Loading',
};

LoadingButton.argTypes = {
  label: {
    control: { type: 'boolean' },
    description: 'Button text',
  },
  loading: {
    control: { type: 'boolean' },
    description: 'Loading state',
  },
  loadingText: {
    control: { type: 'text' },
    description: 'Loading text',
  },
};
