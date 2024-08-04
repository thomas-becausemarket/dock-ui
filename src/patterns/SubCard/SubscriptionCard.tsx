import { Panel } from 'primereact/panel';
import type {
  PanelFooterTemplateOptions,
  PanelHeaderTemplateOptions,
} from 'primereact/panel';
import { MouseEvent, ReactNode, useRef, useState } from 'react';

import { FooterTemplate } from './SubscriptionCardFooter';
import { HeaderTemplate } from './SubscriptionCardHeader';
import { ISubscription, ISubscriptionLineItem } from '~/types/subscription';
import { cn } from '~/lib/utils';
import { SubscriptionCardTable } from './SubscriptionCardTable';
import { MenuItem } from 'primereact/menuitem';

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
  saveEditAction?: (
    e: MouseEvent,
    data: ISubscriptionLineItem
  ) => Promise<void>;
  cancelEditAction?: (
    e: MouseEvent,
    data: ISubscriptionLineItem
  ) => Promise<void>;
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
  saveEditAction,
  cancelEditAction,
  className,
}: SubscriptionCardProps) => {
  const togglePanelRef = useRef<Panel | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(true);

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
          subscription={subscription}
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
        tableCellMenuItems={tableCellMenuItems}
        saveEditAction={saveEditAction}
        cancelEditAction={cancelEditAction}
        togglePanelRef={togglePanelRef}
        setIsCollapsed={setIsCollapsed}
      />
    </Panel>
  );
};
