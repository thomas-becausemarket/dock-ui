import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Panel } from 'primereact/panel';
import { ISubscription } from '~/types/subscription';
import {
  renderIsOneTimeAddedBody,
  renderProductTitleBody,
  renderPriceBody,
} from './renders';
import { forwardRef, useRef } from 'react';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { Row } from 'primereact/row';

const items: MenuItem[] = [
  {
    label: 'Edit',
    icon: 'pi pi-pen-to-square',
    command: () => {},
  },
  {
    label: 'Swap',
    icon: 'pi pi-arrow-right-arrow-left',
  },
  {
    label: 'Delete',
    icon: 'pi pi-times',
  },
];

interface SubscriptionCardTableProps {
  subscription: ISubscription;
  isCollapsed?: boolean;
  tableCellMenuItems?: MenuItem[];
}

export const SubscriptionCardTable = forwardRef<
  Panel,
  SubscriptionCardTableProps
>(({ subscription, isCollapsed, tableCellMenuItems }, ref) => {
  if (!tableCellMenuItems) {
    console.warn('Please provide menu items');
  }
  const menu = useRef<Menu>(null);
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

      <DataTable
        dataKey="id"
        pt={{
          root: {
            // className: 'border-t-0',
          },
          columnGroup: {
            root: {
              className: 'hidden',
            },
          },
        }}
        className="border-x border-t"
        value={subscription.lineItems.slice(0, 3)}
        tableStyle={{ minWidth: '50rem' }}
      >
        <Column field="quantity" />
        <Column field="isOneTimeAdded" body={renderIsOneTimeAddedBody} />
        <Column field="productTitle" body={renderProductTitleBody} />
        <Column field="price" body={renderPriceBody} />

        <Column
          field=""
          body={() => (
            <i
              onClick={(event) => menu.current?.toggle(event)}
              className="pi pi-ellipsis-v cursor-pointer hover:scale-110"
            ></i>
          )}
        />
      </DataTable>

      {subscription.lineItems.length > 3 && (
        <Panel
          collapsed={isCollapsed}
          ref={ref}
          toggleable
          pt={{
            header: {
              style: { display: 'none' },
            },
            content: {
              style: { padding: 0, border: 'none' },
            },
          }}
        >
          <DataTable
            dataKey="id"
            pt={{
              root: {
                // className: 'border-t-0',
              },
              columnGroup: {
                root: {
                  className: 'hidden',
                },
              },
            }}
            className="border-x"
            value={subscription.lineItems.slice(3)}
            tableStyle={{ minWidth: '50rem' }}
          >
            <Column field="quantity" />
            <Column field="isOneTimeAdded" body={renderIsOneTimeAddedBody} />
            <Column field="productTitle" body={renderProductTitleBody} />
            <Column field="price" body={renderPriceBody} />
            <Column
              field=""
              body={() => (
                <i
                  onClick={(event) => menu.current?.toggle(event)}
                  className="pi pi-ellipsis-v cursor-pointer hover:scale-110"
                ></i>
              )}
            />
          </DataTable>
        </Panel>
      )}
      <DataTable
        dataKey="id"
        pt={{
          root: {
            // className: 'border-t-0',
          },
          columnGroup: {
            root: {
              className: 'hidden',
            },
          },
        }}
        className="border-x"
        value={[
          { label: 'Subtotal', key: 'subtotal', value: '$61.04' },
          { label: 'Shipping', key: 'shipping', value: '$0.00' },
          { label: 'Pre Tax Estimated Total', key: 'total', value: '$0.00' },
        ]}
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
    </>
  );
});
