import { format } from 'date-fns';
import { Inplace, InplaceContent, InplaceDisplay } from 'primereact/inplace';
import type { PanelHeaderTemplateOptions } from 'primereact/panel';
import { Tag } from 'primereact/tag';

import { cn } from '~/lib/utils';
import { ISubscription } from '~/types/subscription';

interface CustomHeaderTemplateProps extends PanelHeaderTemplateOptions {
  subscription: ISubscription;
}

export const HeaderTemplate = ({
  className,
  titleElement,
  iconsElement,
  subscription,
}: CustomHeaderTemplateProps) => {
  const { nextBillingDate, status, deliveryInterval, deliveryIntervalCount } =
    subscription;
  const deliveryIntervalValue = (
    deliveryIntervalCount == 1 ? deliveryInterval : `${deliveryInterval}s`
  ).toLowerCase();

  const renderStatusTag = () => {
    const statusData = (): { color: string; label: string } => {
      switch (status) {
        case 'ACTIVE':
          return { color: 'bg-green-700', label: 'Active' };
        case 'PAUSED':
          return {
            color: 'bg-slate-600',
            label: 'Paused',
          };
        case 'CANCELLED':
        case 'PAST_DUE':
          return {
            color: 'bg-red-600',
            label: 'Past Due',
          };
        default:
          return {
            color: 'bg-slate-600',
            label: 'Unknown',
          };
      }
    };

    const { color: statusColor, label: statusLabel } = statusData();

    return (
      <Tag
        className={cn(
          'w-full rounded p-1.5 text-sm font-medium tracking-wide',
          statusColor
        )}
        value={statusLabel}
      />
    );
  };

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
        <p className="font-semibold">
          Every {deliveryIntervalCount} {deliveryIntervalValue}
        </p>
        {renderStatusTag()}
      </div>
    </div>
  );
};
