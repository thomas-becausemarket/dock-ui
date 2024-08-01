import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import type { PanelFooterTemplateOptions } from 'primereact/panel';
import { useRef } from 'react';
import { cn } from '~/lib/utils';

const buttons = [
  {
    label: 'Add Item',
    key: 'add-item',
    icon: 'pi pi-plus',
    action: () => null,
  },
  {
    label: 'Move',
    key: 'move',
    icon: 'pi pi-calendar-clock',
    action: () => console.log('move'),
  },
  {
    label: 'Order Now',
    key: 'order',
    icon: 'pi pi-cart-arrow-down',
    action: () => console.log('order now'),
  },
  {
    label: 'Change Interval',
    key: 'interval',
    icon: 'pi pi-arrow-right-arrow-left',
    action: () => console.log('change interval'),
  },
  {
    label: 'Apply Coupon',
    key: 'coupon',
    icon: 'pi pi-tags',
    action: () => console.log('apply coupon'),
  },
  {
    label: 'Cancel',
    key: 'cancel',
    icon: 'pi pi-times',
    action: () => console.log('Cancel'),
  },
];

interface CustomerFoooterTemplateProps extends PanelFooterTemplateOptions {
  buttonActions?: {
    [key: string]: () => void;
  };
}

export const FooterTemplate = (options: CustomerFoooterTemplateProps) => {
  const { buttonActions } = options;
  const buttonsWithActions = buttons.map((button) => ({
    ...button,
    action: buttonActions?.[button.key],
  }));
  const menu = useRef<Menu>(null);
  const button = useRef<Button>(null);

  return (
    <>
      <div
        className={cn(
          options.className,
          'hidden grid-flow-row grid-cols-3 flex-wrap items-center justify-center gap-3 whitespace-nowrap text-xs lg:grid 2xl:grid-cols-6'
        )}
      >
        {buttonsWithActions.map((button) => (
          <Button
            pt={{
              label: {
                className: 'w-min',
              },
              icon: {
                className: 'text-base',
              },
            }}
            key={button.key}
            label={button.label}
            icon={button.icon}
            className="w-full rounded"
            onClick={button.action || undefined}
          />
        ))}
      </div>
      <div className="p-4 lg:hidden">
        <Menu model={buttons} popup ref={menu} id="popup_menu_left" />
        <Button
          ref={button}
          size="small"
          label="Actions"
          icon="pi pi-angle-up"
          onClick={(event) => menu.current?.toggle(event)}
          aria-controls="popup_menu_left"
          aria-haspopup
        />
      </div>
    </>
  );
};
