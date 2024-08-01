import { format } from 'date-fns';
import { Inplace, InplaceContent, InplaceDisplay } from 'primereact/inplace';
import { Menu } from 'primereact/menu';
import type { PanelHeaderTemplateOptions } from 'primereact/panel';
import { Tag } from 'primereact/tag';
import { useRef } from 'react';
import { cn } from '~/lib/utils';

const items = [
  {
    label: 'Refresh',
    icon: 'pi pi-refresh',
  },
  {
    label: 'Search',
    icon: 'pi pi-search',
  },
  {
    separator: true,
  },
  {
    label: 'Delete',
    icon: 'pi pi-times',
  },
];

interface CustomHeaderTemplateProps extends PanelHeaderTemplateOptions {
  nextBillingDate: string;
}

export const HeaderTemplate = ({
  className,
  titleElement,
  togglerElement,
  iconsElement,
  nextBillingDate,
}: CustomHeaderTemplateProps) => {
  const configMenu = useRef<Menu | null>(null);

  return (
    <div className={cn('items-start bg-white', className)}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center space-x-2">
          <p className="text-2xl font-semibold">{titleElement}</p>
          {iconsElement}
        </div>
        <div className="flex items-center gap-2">
          <i className="pi pi-circle-fill animate-pulse text-[8px] text-green-600"></i>
          <p className="text-lg font-medium">
            Order scheduled on{' '}
            {nextBillingDate && format(nextBillingDate, 'MMMM dd, yyyy')}
          </p>
        </div>
        <Inplace unstyled className="underline-offset-2 hover:underline">
          <InplaceDisplay>Show Payment Card Info</InplaceDisplay>
          <InplaceContent>Payment Card Info</InplaceContent>
        </Inplace>
      </div>
      {/* <div>
        <Menu model={items} popup ref={configMenu} id="config_menu" />
        <button
          className="p-panel-header-icon p-link mr-2"
          onClick={(e) => configMenu?.current?.toggle(e)}
        >
          <span className="pi pi-cog"></span>
        </button>
        {togglerElement}
      </div> */}
      <div className="flex w-max flex-col gap-3">
        <p>Every 2 months</p>
        <Tag
          className="w-full rounded p-2 px-4 text-sm"
          value="Active"
          severity="success"
        />
      </div>
    </div>
  );
};
