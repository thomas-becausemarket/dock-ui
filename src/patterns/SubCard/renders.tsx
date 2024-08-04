import { ColumnBodyOptions } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { priceFormat } from '~/lib/format';
import { cn } from '~/lib/utils';
import { ISubscription, ISubscriptionLineItem } from '~/types/subscription';

interface PricingColumn {
  label: string;
  key: string;
  value: string;
}

export const renderProductTitleBody = (
  data: ISubscriptionLineItem,
  _options: ColumnBodyOptions
) => {
  return (
    <>
      <p className={cn(data.variantTitle === 'Default Title' && 'py-2.5')}>
        {data.productTitle}
      </p>
      <p>{data.variantTitle !== 'Default Title' && data.variantTitle}</p>
    </>
  );
};

export const renderIsOneTimeAddedBody = (
  data: ISubscriptionLineItem,
  _options: ColumnBodyOptions
) => {
  if (_options.field === 'isOneTimeAdded' && data.isOneTimeAdded) {
    return <Tag value="One Time Purchase" />;
  }
  return null;
};

export const renderPriceBody = (
  data: ISubscriptionLineItem,
  _options: ColumnBodyOptions
) => <p>{priceFormat((Number(data.price) * data.quantity).toFixed(2))}</p>;

export const generatePricingColumnsData = (subscription: ISubscription) => {
  const { totalLineItemPrice, deliveryPrice, totalLineItemDiscountedPrice } =
    subscription;
  const discountPrice =
    Number(totalLineItemPrice) - Number(totalLineItemDiscountedPrice || 0);

  const pricingColumnsData = () => {
    const data: PricingColumn[] = [
      {
        label: 'Subtotal',
        key: 'subtotal',
        value: `$${Number(totalLineItemPrice).toFixed(2)}`,
      },
      {
        label: 'Shipping',
        key: 'shipping',
        value: `$${Number(deliveryPrice).toFixed(2)}`,
      },

      {
        label: 'Pre Tax Estimated Total',
        key: 'total',
        value: `$${Number(Number(totalLineItemPrice) + Number(deliveryPrice) - Number(discountPrice)).toFixed(2)}`,
      },
    ].filter(Boolean) as PricingColumn[];

    if (discountPrice !== 0) {
      data.push({
        label: 'Discounts',
        key: 'discounts',
        value: `-$${Number(discountPrice).toFixed(2)}`,
      });
    }
    return data;
  };

  return pricingColumnsData();
};
