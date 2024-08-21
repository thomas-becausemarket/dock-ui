import { useEffect, useState } from 'react';

import {
  ISubscription,
  ISubscriptionLineItem,
  SelectedProduct,
} from '~/types/subscription';

import { SubscriptionCard } from '..';

const subscriptions: ISubscription[] = [
  {
    id: 1829985,
    customerId: 7282490704097,
    totalLineItemPrice: '87.96',
    totalLineItemDiscountedPrice: '87.96',
    deliveryInterval: 'MONTH',
    completedOrdersCount: 3,
    deliveryIntervalCount: 2,
    billingInterval: 'MONTH',
    billingIntervalCount: 2,
    isPrepaid: false,
    status: 'ACTIVE',
    lastPaymentStatus: 'SUCCESS',
    paymentMethodId: 3134347,
    shopifyId: 8322711777,
    deliveryPrice: '0.00',
    nextBillingDateEpoch: 1721984400,
    nextBillingDate: '2024-07-26T09:00:00',
    lineItems: [
      {
        id: 5546884,
        isOneTimeAdded: false,
        bundleTransactionId: null,
        productShopifyId: 7761174888673,
        variantShopifyId: 43825914544353,
        productTitle: 'Premium Maximum Plus Underwear for Women',
        variantTitle: 'Small/Medium (28-40 in) / Beige',
        sku: 'WUDMMX4MS020',
        quantity: 2,
        price: '15.26',
        basePrice: '16.95',
        discountedPrice: '30.51',
        discountedUnitPrice: '15.26',
      },
      {
        id: 6070559,
        isOneTimeAdded: true,
        bundleTransactionId: null,
        productShopifyId: 8207335424225,
        variantShopifyId: 44374218932449,
        productTitle: 'Because Brain & Memory Supplement',
        variantTitle: 'Default Title',
        sku: '147500000208',
        quantity: 1,
        price: '22.49',
        basePrice: '24.99',
        discountedPrice: '22.49',
        discountedUnitPrice: '22.49',
      },
      {
        id: 6374193,
        isOneTimeAdded: false,
        bundleTransactionId: null,
        productShopifyId: 7761174888673,
        variantShopifyId: 43825914544353,
        productTitle: 'Premium Maximum Plus Underwear for Women',
        variantTitle: 'Small/Medium (28-40 in) / Beige',
        sku: 'WUDMMX4MS020',
        quantity: 1,
        price: '15.26',
        basePrice: '16.95',
        discountedPrice: '15.26',
        discountedUnitPrice: '15.26',
      },
      {
        id: 6374203,
        isOneTimeAdded: true,
        bundleTransactionId: null,
        productShopifyId: 7761174888673,
        variantShopifyId: 43825914708193,
        productTitle: 'Premium Maximum Plus Underwear for Women',
        variantTitle: 'X-Large (48-64 in) / Grey',
        sku: 'UUDMMX9XL020',
        quantity: 1,
        price: '19.70',
        basePrice: '21.89',
        discountedPrice: '19.70',
        discountedUnitPrice: '19.70',
      },
    ],
    discounts: [],
    shippingAddress: {
      firstName: null,
      lastName: 'Roberts',
      phone: null,
      company: null,
      address1: '1075 Oakleaf Plantation Parkway',
      address2: null,
      city: 'Orange Park',
      zip: '32065',
      countryCode: 'US',
      provinceCode: 'FL',
    },
  },
];

const swappedItem = {
  productId: 12345,
  productTitle: 'Incredible Concrete Chips',
  variant: {
    title: 'Maroon / Large',
    shopifyId: 67890,
    image: null,
    sku: 'PROD-1234',
    price: '29.99',
    hasSellingPlan: true,
  },
};

export const Default = () => {
  const [swap, setSwap] = useState<SelectedProduct | undefined>(undefined);
  const [selectedRowItem, setSelectedRowItem] =
    useState<ISubscriptionLineItem | null>(null);

  const swapItem = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSwap(swappedItem);
  };

  useEffect(() => {
    console.log('selectedRowItem', selectedRowItem);
  }, [selectedRowItem]);
  return (
    <SubscriptionCard
      title={`Subscription #${subscriptions[0].id}`}
      subscription={subscriptions[0]}
      titleIcon="clipboard"
      currentSwappedItem={swap}
      menuSwapAction={swapItem}
      cancelEditAction={async () => setSwap(undefined)}
      getSelectedRowItem={setSelectedRowItem}
      saveEditAction={async () => {
        setSwap(undefined);
        console.log(selectedRowItem);
      }}
      // buttonActions={{ cancel: () => swapItem() }}
      // buttonActions={{
      //   move: () => console.log('I am move'),
      // }}
    />
  );
};
