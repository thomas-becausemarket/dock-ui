import { cn } from '~/lib/utils';

interface LoaderWrapperProps {
  children: React.ReactNode;
  isLoading?: boolean;
  iconStyles?: string;
}

export const LoaderWrapper = ({
  children,
  isLoading = false,
  iconStyles,
}: LoaderWrapperProps) => {
  if (!isLoading) {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="relative">
        <div className="absolute inset-0 z-10 grid place-items-center">
          <i className={cn("pi pi-spin pi-spinner", iconStyles)} style={{ fontSize: '2rem' }}></i>
        </div>
        <div className="relative inset-0 opacity-50">{children}</div>
      </div>
    );
  }
};
