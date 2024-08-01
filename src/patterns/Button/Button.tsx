import { Button as PRButton, ButtonProps } from 'primereact/button';
import { useMemo } from 'react';

import { cn } from '~/lib/utils';

export interface CustomButtonProps extends Omit<ButtonProps, 'rounded'> {
  loadingText?: string | boolean;
  fullWidth?: boolean;
  rounded?: 'sm' | 'md' | 'lg' | 'full' | boolean;
}

export const Button = ({
  label,
  loadingText,
  loading,
  fullWidth,
  className,
  rounded,
  icon,
  ...rest
}: CustomButtonProps) => {
  const renderLabel = useMemo(() => {
    if (loading) {
      if (loadingText && typeof loadingText === 'string') {
        return loadingText;
      } else {
        return 'Loading';
      }
    } else {
      return label;
    }
  }, [loading, label, loadingText]);

  const renderRounded = useMemo(() => {
    if (rounded) {
      if (typeof rounded === 'boolean') return 'rounded';
      return `rounded-${rounded}` || 'rounded';
    }
  }, [rounded]);

  console.log(renderLabel);

  return (
    <PRButton
      pt={{
        label: {
          className: !label && 'hidden',
        },
      }}
      label={renderLabel}
      loading={loading}
      {...rest}
      className={cn(
        'rounded-none py-1.5 focus:shadow-none',
        fullWidth && 'w-full',
        rounded && renderRounded,
        icon && `pi pi-${icon}`,
        className
      )}
    />
  );
};
