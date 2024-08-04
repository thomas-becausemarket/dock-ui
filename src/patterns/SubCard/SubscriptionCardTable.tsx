import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { ISubscription, ISubscriptionLineItem } from '~/types/subscription';
import {
  renderIsOneTimeAddedBody,
  renderProductTitleBody,
  renderPriceBody,
  generatePricingColumnsData,
} from './renders';
import { MouseEvent, useMemo, useRef, useState } from 'react';
import { Menu } from 'primereact/menu';
import { MenuItem, MenuItemCommandEvent } from 'primereact/menuitem';
import { InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { QuantityInput } from './QuantityInput';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';

interface SubscriptionCardTableProps {
  subscription: ISubscription;
  isCollapsed?: boolean;
  tableCellMenuItems?: MenuItem[];
  saveEditAction?: (
    e: MouseEvent,
    data: ISubscriptionLineItem
  ) => Promise<void>;
  cancelEditAction?: (
    e: MouseEvent,
    data: ISubscriptionLineItem
  ) => Promise<void>;
  togglePanelRef: React.RefObject<Panel | null>;
  setIsCollapsed: (value: boolean) => void;
}

export const SubscriptionCardTable = ({
  subscription,
  isCollapsed,
  tableCellMenuItems,
  saveEditAction,
  cancelEditAction,
  togglePanelRef,
  setIsCollapsed,
}: SubscriptionCardTableProps) => {
  if (!tableCellMenuItems) {
    console.warn('Please provide menu items');
  }
  const menu = useRef<Menu>(null);
  const { totalLineItemPrice, totalLineItemDiscountedPrice } = subscription;

  Number(totalLineItemPrice) - Number(totalLineItemDiscountedPrice || 0);
  const [selectedRowItem, setSelectedRowItem] = useState<
    ISubscriptionLineItem | undefined
  >();
  const [editableRows, setEditableRows] = useState<{
    [key: number]: boolean;
  } | null>(null);

  const remainingLines = useMemo(
    () =>
      (subscription.lineItems.length > 3 &&
        subscription.lineItems.length - 3) ||
      false,
    [subscription]
  );

  const saveRowEditAction = async (
    e: MouseEvent,
    data: ISubscriptionLineItem
  ) => {
    await saveEditAction?.(e, data);
    setEditableRows(null);

    //   const index = subscription.lineItems.findIndex(
    //     (item) => item.id === selectedRowItem?.id
    //   );
    //   if (index !== -1) {
    //     subscription.lineItems[index] = selectedRowItem;
    //     console.log('Item replaced successfully.');
    //   } else {
    //     console.log('Item not found.');
    //   }
  };

  const cancelRowEditAction = async (
    e: MouseEvent,
    data: ISubscriptionLineItem
  ) => {
    await cancelEditAction?.(e, data);
    setEditableRows(null);
  };

  const menuEditCommand = (event: MenuItemCommandEvent) => {
    if (selectedRowItem) {
      const newEditableRows = {
        ...editableRows,
        [selectedRowItem.id]: true,
      };
      console.log(newEditableRows);
      setEditableRows(newEditableRows);
    }
  };

  const menuSwapCommand = (event: MenuItemCommandEvent) => {};

  const menuDeleteCommand = (event: MenuItemCommandEvent) => {};

  const onQuantityValueChange = (e: InputNumberValueChangeEvent) => {
    if (selectedRowItem) {
      setSelectedRowItem({
        ...selectedRowItem,
        quantity: Number(e.target.value),
      });
    }
  };

  const items: MenuItem[] = [
    {
      label: 'Edit',
      icon: 'pi pi-pen-to-square',
      command: menuEditCommand,
    },
    {
      label: 'Swap',
      icon: 'pi pi-arrow-right-arrow-left',
      command: menuSwapCommand,
    },
    {
      label: 'Delete',
      icon: 'pi pi-times',
      command: menuDeleteCommand,
    },
  ];

  return (
    <>
      <Menu
        pt={{
          root: {
            className: 'p-0',
          },
        }}
        className="w-min text-xs"
        model={items}
        popup
        popupAlignment="right"
        ref={menu}
        id="popup_menu_left"
      />

      <div className="">
        <DataTable
          dataKey="id"
          editingRows={{ quantity: true }}
          pt={{
            columnGroup: {
              root: {
                className: 'hidden',
              },
            },
          }}
          className="mb-2 border-x border-t"
          value={subscription.lineItems.slice(0, !isCollapsed ? undefined : 3)}
          tableStyle={{ minWidth: '50rem' }}
          editMode="cell"
        >
          <Column
            className="relative"
            field="quantity"
            body={(data, options) => {
              if (editableRows?.[data.id]) {
                return (
                  <QuantityInput
                    onValueChange={onQuantityValueChange}
                    selectedRowItem={selectedRowItem}
                  />
                );
              }
              return data.quantity;
            }}
          />
          <Column field="isOneTimeAdded" body={renderIsOneTimeAddedBody} />
          <Column field="productTitle" body={renderProductTitleBody} />
          <Column field="price" body={renderPriceBody} />
          <Column
            field=""
            body={(data) => {
              if (editableRows?.[data.id]) {
                return (
                  <div className="flex items-center gap-4">
                    <i
                      onClick={(event) => saveRowEditAction(event, data)}
                      className="pi pi-check cursor-pointer text-green-600 hover:scale-110"
                    ></i>
                    <i
                      onClick={(event) => cancelRowEditAction(event, data)}
                      className="pi pi-times cursor-pointer text-red-600 hover:scale-110"
                    ></i>
                  </div>
                );
              }
              return (
                <i
                  onClick={(event) => {
                    setSelectedRowItem(data);
                    console.log(data);
                    menu.current?.toggle(event);
                  }}
                  className="pi pi-ellipsis-v cursor-pointer hover:scale-110"
                ></i>
              );
            }}
          />
        </DataTable>
        {!!remainingLines && (
          <div className="flex w-full items-center justify-center">
            <Button
              text
              className="p-0 py-1.5 hover:bg-transparent hover:underline focus:shadow-none"
              onClick={(e) => {
                togglePanelRef?.current?.toggle(e);
                setIsCollapsed(!isCollapsed);
              }}
            >
              {isCollapsed ? `Show ${remainingLines} more` : 'Show less'}
            </Button>
          </div>
        )}
        <DataTable
          dataKey="key"
          pt={{
            columnGroup: {
              root: {
                className: 'hidden',
              },
            },
          }}
          className="border-x border-t"
          value={generatePricingColumnsData(subscription)} // This should now be an array of PricingColumn
          stripedRows
        >
          <Column
            align="left"
            field="label"
            body={(data, _options) => {
              if (data.key === 'total') {
                return <span className="font-bold">{data.label}</span>;
              }
              return data.label;
            }}
          />
          <Column className="w-2/6" />
          <Column
            field="value"
            body={(data, _options) => {
              if (data.key === 'total') {
                return <span className="font-bold">{data.value}</span>;
              }
              return data.value;
            }}
          />
        </DataTable>
      </div>
    </>
  );
};
