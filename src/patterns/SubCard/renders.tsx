import { ColumnBodyOptions } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { priceFormat } from '~/lib/format';
import { cn } from '~/lib/utils';
import { ISubscriptionLineItem } from '~/types/subscription';

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
) => <p>{priceFormat(data.price)}</p>;
