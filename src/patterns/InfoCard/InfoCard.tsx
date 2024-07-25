import {  PlusIcon } from 'lucide-react';

import { Badge } from '~/components/ui/badge';
import { Card, CardContent, CardTitle } from '~/components/ui/card';
import { cn } from '~/lib/utils';
import { IIcon } from '~/types/icon';

import { LoaderWrapper } from '../General/LoaderWrapper';
import IconButton from '../IconButton/IconButton';

interface InfoCardProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  titleInfo?: string;
  titleIcons?: IIcon[];
  showBadge?: boolean;
  noIcon?: boolean;
  isLoading?: boolean;
  primaryIconAction?: () => void;
  secondaryIconAction?: () => void;
}

export const InfoCard = ({
  children,
  className,
  titleIcons,
  title,
  // titleInfo,
  showBadge,
  noIcon,
  isLoading = false,
  primaryIconAction,
  secondaryIconAction,
}: InfoCardProps) => {
  const renderTitleIcons = () => {
    if (titleIcons) {
      return (
        <div className="space-x-2">
          {titleIcons.map((icon, index) => (
            <IconButton
              key={index}
              icon={icon}
              onClick={index === 0 ? primaryIconAction : secondaryIconAction}
            />
          ))}
        </div>
      );
    }

    if (!noIcon) {
      return [PlusIcon].map((icon, index) => (
        <IconButton key={index} icon={icon} />
      ));
    }
  };
  return (
    <LoaderWrapper isLoading={isLoading}>
        <Card
          className={cn(
            'flex w-max min-w-[400px] items-start justify-between p-4',
            className
          )}
        >
          <div className="space-y-2">
            {!showBadge && (
              <Badge
                variant="default"
                className="mb-2 bg-blue-500 text-sm text-white"
              >
                Subscriber
              </Badge>
            )}
            {title && (
              <CardTitle className="flex items-center gap-2">
                {title}{' '}
                {/* {!!titleInfo && (
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-5 w-5" />
                    </TooltipTrigger>
                    <TooltipContent>{titleInfo}</TooltipContent>
                  </Tooltip>
                )} */}
              </CardTitle>
            )}
            <CardContent className="pl-0">{children}</CardContent>
          </div>
          <div>{renderTitleIcons()}</div>
        </Card>
    </LoaderWrapper>
  );
};
