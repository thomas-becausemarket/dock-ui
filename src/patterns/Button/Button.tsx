import { Button as PRButton, ButtonProps } from 'primereact/button';
import { useMemo } from 'react';

import { cn } from '~/lib/utils';

export interface CustomButtonProps extends Omit<ButtonProps, 'rounded'> {
  loadingText?: string | boolean;
  fullWidth?: boolean;
  rounded?: 'sm' | 'md' | 'lg' | 'full' | boolean
}

export const Button = ({
  label,
  loadingText,
  loading,
  fullWidth,
  className,
  rounded,
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
  const renderRounded = useMemo(() => {
    if (rounded) {
      if (typeof rounded === 'boolean') return 'rounded'
      return `rounded-${rounded}` || 'rounded'
    }
  }, [
    rounded
  ])

  return (
    <PRButton
      label={renderLabel}
      loading={loading}
      {...rest}
      className={cn(
        'py-1.5 focus:shadow-none rounded-none',
        fullWidth && 'w-full',
        rounded && renderRounded,
        className,
      )}
    />
  );
};
