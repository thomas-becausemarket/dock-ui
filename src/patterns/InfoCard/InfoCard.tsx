
// import { Card, CardContent, CardTitle } from '~/components/ui/card';
import { cn } from '~/lib/utils';
import { Card } from 'primereact/card'
import { Tooltip } from 'primereact/tooltip'
import { Tag } from 'primereact/tag'
import { ButtonGroup } from 'primereact/buttongroup'
import { Menu } from 'primereact/menu';


import { LoaderWrapper } from '../General/LoaderWrapper';
import { Button } from '../Button/Button';
import { IconType } from 'primereact/utils';
import type { ButtonProps } from 'primereact/button';
import { useRef } from 'react';

interface InfoCardProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  titleInfo?: string;
  titleIcons?: IconType<ButtonProps>[] | undefined;
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
  titleInfo,
  showBadge,
  noIcon,
  isLoading = false,
  primaryIconAction,
  secondaryIconAction,
}: InfoCardProps) => {
  const menuRight = useRef<Menu>(null);
  const renderTitleIcons = () => {
    if (titleIcons) {
      return (
        <ButtonGroup>
          {titleIcons.map((icon, index) => (
            <Button
              rounded
              size="small"
              key={index}
              outlined
              icon={icon}
              // className={cn('rounded-r', index === 0 && 'rounded-l rounded-r-none')}
              onClick={index === 0 ? primaryIconAction : secondaryIconAction}
            />
          ))}
        </ButtonGroup>
      );
    }

    if (!noIcon) {
      return ['plus'].map((icon, index) => (
        <Button key={index} icon={icon} />
      ));
    }
  };

  const CardTitle = () => {
    if (!title) return null;

    return (
      <>
        <Tooltip target=".info" />

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            {!showBadge && (
              <Tag
                value="Subscriber"
                className="bg-blue-500 text-xs rounded flex items-center text-white"
              />
            )}
            <i className="pi pi-ellipsis-h cursor-pointer" onClick={(event) => menuRight?.current?.toggle(event)}></i>
            <Menu unstyled className="w-max border rounded shadow-md" pt={{
              action: {
                className: 'flex items-center justify-start gap-1 self-start'
              },

              menuitem: {
                className: 'focus-visible:outline-none px-2 border-b py-1 hover:bg-gray-100 text-sm'
              },

            }} ref={menuRight} popup popupAlignment="right" model={[
              { label: 'Edit', icon: 'pi pi-pencil' },
              { label: 'Search', icon: 'pi pi-search' }
            ]} />


            {/* <div>{renderTitleIcons()}</div> */}

          </div>
          <div className="flex items-center gap-2">
            {title} {` `}
            {titleInfo && (
              <i data-pr-tooltip="No notifications"
                className="pi pi-info-circle info" data-pr-classname="text-sm" style={{ fontSize: '1rem', cursor: 'pointer' }} />
            )}
          </div>

        </div>
      </>
    )
  }


  return (
    <LoaderWrapper isLoading={isLoading}>
      <Card
        pt={{
          body: {
            className: 'w-full'
          }
        }}
        title={<CardTitle />}
        className={cn(
          'flex w-max min-w-[400px] items-start justify-between p-4',
          className
        )}
      >
        <div className="pl-0">{children}</div>
      </Card>
    </LoaderWrapper>
  );
};

