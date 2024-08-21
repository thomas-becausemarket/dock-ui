import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { Menu } from 'primereact/menu';
import { MenuItem, MenuItemCommandEvent } from 'primereact/menuitem';
import { Panel } from 'primereact/panel';
import { MouseEvent, useMemo, useRef, useState } from 'react';

import {
  ISubscription,
  ISubscriptionLineItem,
  SelectedProduct,
} from '~/types/subscription';

import { QuantityInput } from './QuantityInput';
import {
  generatePricingColumnsData,
  renderIsOneTimeAddedBody,
  renderPriceBody,
  renderProductTitleBody,
} from './renders';

interface SubscriptionCardTableProps {
  subscription: ISubscription;
  isCollapsed?: boolean;
  currentSwappedItem?: SelectedProduct | undefined;
  saveEditAction?: (
    e: MouseEvent,
    data: ISubscriptionLineItem | SelectedProduct
  ) => Promise<void>;
  cancelEditAction?: (
    e: MouseEvent,
    data: ISubscriptionLineItem
  ) => Promise<void>;
  menuSwapAction?: (
    event: MenuItemCommandEvent,
    data: ISubscriptionLineItem
  ) => Promise<void>;
  menuDeleteAction?: (
    event: MenuItemCommandEvent,
    data: ISubscriptionLineItem
  ) => void;
  togglePanelRef: React.RefObject<Panel | null>;
  setIsCollapsed: (value: boolean) => void;
  getSelectedRowItem?: (data: ISubscriptionLineItem) => void;
}

export const SubscriptionCardTable = ({
  subscription,
  isCollapsed,
  saveEditAction,
  cancelEditAction,
  menuSwapAction,
  getSelectedRowItem,
  menuDeleteAction,
  togglePanelRef,
  setIsCollapsed,
  currentSwappedItem,
}: SubscriptionCardTableProps) => {
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
    if (currentSwappedItem) {
      await saveEditAction?.(e, currentSwappedItem);
    } else {
      await saveEditAction?.(e, data);
    }
    setEditableRows(null);
  };

  const cancelRowEditAction = async (
    e: MouseEvent,
    data: ISubscriptionLineItem
  ) => {
    await cancelEditAction?.(e, data);
    setEditableRows(null);
  };

  const setupRowAdjustment = () => {
    if (selectedRowItem) {
      const newEditableRows = {
        ...editableRows,
        [selectedRowItem.id]: true,
      };
      console.log(newEditableRows);
      setEditableRows(newEditableRows);
    }
  };
  const menuEditCommand = () => {
    setupRowAdjustment();
  };

  const menuSwapCommand = async (event: MenuItemCommandEvent) => {
    if (selectedRowItem) {
      await menuSwapAction?.(event, selectedRowItem);
      setupRowAdjustment();
    }
  };

  const menuDeleteCommand = async (event: MenuItemCommandEvent) => {
    if (selectedRowItem) await menuDeleteAction?.(event, selectedRowItem);
  };

  const onQuantityValueChange = (e: InputNumberValueChangeEvent) => {
    if (selectedRowItem) {
      setSelectedRowItem({
        ...selectedRowItem,
        quantity: Number(e.value),
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
            pt={{
              bodyCell: {
                className: 'p-0 pl-4',
              },
            }}
            body={(data) => {
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
          <Column
            field="productTitle"
            body={(data, options) =>
              renderProductTitleBody(
                data,
                options,
                currentSwappedItem,
                selectedRowItem
              )
            }
          />
          <Column
            field="price"
            body={(data, options) =>
              renderPriceBody(
                data,
                options,
                currentSwappedItem,
                selectedRowItem
              )
            }
          />
          <Column
            field=""
            body={(data: ISubscriptionLineItem) => {
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
                    getSelectedRowItem?.(data);
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
          value={generatePricingColumnsData(subscription, currentSwappedItem)} // This should now be an array of PricingColumn
          stripedRows
        >
          <Column
            align="left"
            field="label"
            body={(data) => {
              if (data.key === 'total') {
                return <span className="font-bold">{data.label}</span>;
              }
              return data.label;
            }}
          />
          <Column className="w-2/6" />
          <Column
            field="value"
            pt={{
              bodyCell: {
                className: 'relative',
              },
            }}
            body={(data) => {
              if (data.key === 'total') {
                return <span className="font-bold">{data.value}</span>;
              }
              if (data.key === 'discounts') {
                return (
                  <span className="absolute bottom-4 left-2">{data.value}</span>
                );
              }
              return data.value;
            }}
          />
        </DataTable>
      </div>
    </>
  );
};
