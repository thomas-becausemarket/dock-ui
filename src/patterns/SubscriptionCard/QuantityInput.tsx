import {
  InputNumber,
  InputNumberValueChangeEvent,
} from 'primereact/inputnumber';

import { cn } from '~/lib/utils';
import { ISubscriptionLineItem } from '~/types/subscription';

export const QuantityInput = ({
  selectedRowItem,
  onValueChange,
}: {
  selectedRowItem: ISubscriptionLineItem | undefined;
  onValueChange: (e: InputNumberValueChangeEvent) => void;
}) => {
  return (
    <div className="top-4 flex items-center gap-2">
      <InputNumber
        onValueChange={onValueChange}
        min={0}
        showButtons
        pt={{
          decrementButton: {
            className: 'w-min rounded',
          },
          incrementButton: {
            className: 'w-max rounded',
          },
          root: {
            className: 'flex items-center group gap-1',
          },
          buttonGroup: {
            className: 'h-min invisible gap-1 group-hover:visible',
          },
          input: {
            root: {
              className: cn('w-12 rounded'),
            },
          },
        }}
        value={selectedRowItem!.quantity}
      />
    </div>
  );
};
