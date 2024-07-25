import { Button as PRButton, ButtonProps } from 'primereact/button';
import { useMemo } from 'react';

import { cn } from '~/lib/utils';

export interface CustomButtonProps extends ButtonProps {
  loadingText?: string | boolean;
  fullWidth?: boolean;
}

export const Button = ({
  label,
  loadingText,
  loading,
  fullWidth,
  className,
  ...rest
}: CustomButtonProps) => {
  const renderLabel = useMemo(
    () =>
      loading
        ? typeof loadingText === 'string'
          ? loadingText
          : 'Loading'
        : label,
    [loading, label, loadingText]
  );
  return (
    <PRButton
      label={renderLabel}
      loading={loading}
      severity="secondary"
      {...rest}
      className={cn(
        'py-1.5 focus:shadow-none',
        className,
        fullWidth && 'w-full'
      )}
    />
  );
};
