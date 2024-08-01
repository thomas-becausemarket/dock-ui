import { Panel } from 'primereact/panel';
import type {
  PanelFooterTemplateOptions,
  PanelHeaderTemplateOptions,
} from 'primereact/panel';
import { ReactNode, useRef, useState } from 'react';

import { FooterTemplate } from './SubscriptionCardFooter';
import { HeaderTemplate } from './SubscriptionCardHeader';
import { ISubscription } from '~/types/subscription';
import { cn } from '~/lib/utils';
import { SubscriptionCardTable } from './SubscriptionCardTable';
import { MenuItem } from 'primereact/menuitem';
import { Button } from 'primereact/button';

interface MenuItemActions {
  edit: () => void;
  delete: () => void;
}

interface ButtonActions {
  [key: string]: () => void;
}

interface SubscriptionCardProps {
  title: string;
  titleIcon?: ReactNode | string;
  subscription: ISubscription;
  tableCellMenuItems?: MenuItem[];
  defaultTableCellMenuItemActions?: MenuItemActions;
  buttonActions?: ButtonActions;
  className?: string;
}

const defaultTableCellMenuItems: MenuItem[] = [
  {
    label: 'Edit',
    icon: 'pi pi-pen-to-square',
    command: () => {},
  },
  {
    label: 'Swap',
    icon: 'pi pi-arrow-right-arrow-left',
    command: () => {},
  },
  {
    label: 'Delete',
    icon: 'pi pi-times',
    command: () => {},
  },
];

export const SubCard = ({
  subscription,
  title,
  titleIcon,
  buttonActions,
  tableCellMenuItems = defaultTableCellMenuItems,
  className,
}: SubscriptionCardProps) => {
  const togglePanelRef = useRef<Panel | Panel>(null);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { nextBillingDate } = subscription;

  const ShowMoreLessButton = () => {
    if (subscription.lineItems.length < 4) return null;

    return (
      <div className="mt-2 flex w-full items-center justify-center">
        <Button
          text
          onClick={(e) => {
            togglePanelRef.current?.toggle(e);
            setIsCollapsed(!isCollapsed);
          }}
        >
          Show {isCollapsed ? 'more' : 'less'}
        </Button>
      </div>
    );
  };

  return (
    <Panel
      className={cn(
        'relative min-w-[600px] max-w-[1200px] shadow-lg',
        className
      )}
      pt={{
        content: {
          className: 'rounded-b-none border-b-0',
        },
      }}
      headerTemplate={(props: PanelHeaderTemplateOptions) => (
        <HeaderTemplate
          {...props}
          nextBillingDate={nextBillingDate}
          titleElement={<>{title}</>}
          iconsElement={
            <i className={cn(titleIcon && `pi pi-${titleIcon} text-xl`)}></i>
          }
        />
      )}
      footerTemplate={(props: PanelFooterTemplateOptions) => (
        <FooterTemplate {...props} buttonActions={buttonActions} />
      )}
    >
      <SubscriptionCardTable
        subscription={subscription}
        isCollapsed={isCollapsed}
        ref={togglePanelRef}
        tableCellMenuItems={tableCellMenuItems}
      />
      <ShowMoreLessButton />
    </Panel>
  );
};
