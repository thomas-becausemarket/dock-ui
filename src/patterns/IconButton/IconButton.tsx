import React from 'react';

import { Button, ButtonProps } from '~/components/ui/button';
import { cn } from '~/lib/utils';

interface IconButtonProps extends ButtonProps {
  icon: React.ForwardRefExoticComponent<
    React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>
  >;
  className?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  className,
  ...props
}) => {
  return (
    <Button variant="outline" className={cn('p-2', className)} {...props}>
      <Icon className="h-4 w-4 text-blue-500" />
    </Button>
  );
};

export default IconButton;
