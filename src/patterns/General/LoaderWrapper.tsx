import { Loader2, LucideProps } from 'lucide-react';

import { cn } from '~/lib/utils';
import { IIcon } from '~/types/icon';

interface LoaderWrapperProps {
  children: React.ReactNode;
  isLoading?: boolean;
  loaderIcon?: IIcon;
  iconStyles?: string;
  iconProps?: LucideProps;
}

export const LoaderWrapper = ({
  children,
  isLoading = false,
  loaderIcon: LoaderIcon,
  iconStyles,
  iconProps,
}: LoaderWrapperProps) => {
  if (!isLoading) {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="relative">
        <div className="absolute inset-0 z-10 grid place-items-center">
          {LoaderIcon ? (
            <LoaderIcon
              {...iconProps}
              className={cn('text-black', iconStyles)}
            />
          ) : (
            <Loader2 size="30px" className={cn('animate-spin', iconStyles)} />
          )}
        </div>
        <div className="relative inset-0 opacity-50">{children}</div>
      </div>
    );
  }
};
