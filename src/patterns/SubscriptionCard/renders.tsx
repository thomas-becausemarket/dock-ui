import { ColumnBodyOptions } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { priceFormat } from '~/lib/format';
import { cn } from '~/lib/utils';
import {
  ISubscription,
  ISubscriptionLineItem,
  SelectedProduct,
} from '~/types/subscription';

interface PricingColumn {
  label: string;
  key: string;
  value: string;
}

export const renderProductTitleBody = (
  data: ISubscriptionLineItem,
  _options: ColumnBodyOptions,
  currentSwappedItem: SelectedProduct | undefined,
  selectedRowItem: ISubscriptionLineItem | undefined
) => {
  if (currentSwappedItem && selectedRowItem?.id === data?.id) {
    return (
      <>
        <p>
          {`${currentSwappedItem?.productTitle} ${currentSwappedItem?.variant.title}`}
        </p>
        <p className="line-through">{data.productTitle}</p>
      </>
    );
  }

  return (
    <>
      <p>{data.productTitle}</p>
    </>
  );
};

export const renderIsOneTimeAddedBody = (
  data: ISubscriptionLineItem,
  _options: ColumnBodyOptions
) => {
  if (_options.field === 'isOneTimeAdded' && data.isOneTimeAdded) {
    return <Tag className="ml-0" value="One Time Purchase" />;
  }
  return null;
};

export const renderPriceBody = (
  data: ISubscriptionLineItem,
  _options: ColumnBodyOptions,
  currentSwappedItem: SelectedProduct | undefined,
  selectedRowItem: ISubscriptionLineItem | undefined
) => {
  if (currentSwappedItem) {
    return (
      <p>
        {priceFormat(
          (
            Number(currentSwappedItem.variant.price) *
            Number(selectedRowItem?.quantity!)
          ).toFixed(2)
        )}
      </p>
    );
  }
  return <p>{priceFormat((Number(data.price) * data.quantity).toFixed(2))}</p>;
};

export const generatePricingColumnsData = (
  subscription: ISubscription,
  currentSwappedItem: SelectedProduct | undefined
) => {
  const { totalLineItemPrice, deliveryPrice, totalLineItemDiscountedPrice } =
    subscription;
  const discountPrice =
    Number(totalLineItemPrice) - Number(totalLineItemDiscountedPrice || 0);

  const pricingColumnsData = () => {
    const data: PricingColumn[] = [
      {
        label: 'Subtotal',
        key: 'subtotal',
        value: currentSwappedItem
          ? '-'
          : `$${Number(totalLineItemPrice).toFixed(2)}`,
      },
      {
        label: 'Shipping',
        key: 'shipping',
        value: `$${Number(deliveryPrice).toFixed(2)}`,
      },
      discountPrice !== 0 && {
        label: 'Discounts',
        key: 'discounts',
        value: `- $${Number(discountPrice).toFixed(2)}`,
      },
      {
        label: 'Pre Tax Estimated Total',
        key: 'total',
        value: currentSwappedItem
          ? '-'
          : `$${Number(Number(totalLineItemPrice) + Number(deliveryPrice) - Number(discountPrice)).toFixed(2)}`,
      },
    ].filter(Boolean) as PricingColumn[];

    return data;
  };

  return pricingColumnsData();
};
