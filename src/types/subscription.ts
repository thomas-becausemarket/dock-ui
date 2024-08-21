export interface Discount {
  shopifyId: string;
  title: string;
  isActive: boolean;
  discount_type: string; // Changed to avoid conflict with reserved keyword
  value: {
    amount?: {
      amount: number;
      currencyCode: string;
    };
    percentage: number;
    appliesOnEachItem: boolean;
  };
}

export interface ISubscription {
  id: number;
  customerId: number;
  totalLineItemPrice: string;
  totalLineItemDiscountedPrice: string;
  deliveryInterval: string;
  completedOrdersCount: number;
  deliveryIntervalCount: number;
  billingInterval: string;
  billingIntervalCount: number;
  isPrepaid: boolean;
  status: string;
  lastPaymentStatus: string;
  paymentMethodId: number;
  shopifyId: number;
  deliveryPrice: string;
  nextBillingDateEpoch: number;
  nextBillingDate: string;
  lineItems: ISubscriptionLineItem[];
  discounts: {
    shopifyId: string;
    title: string;
    isActive: boolean;
    type: string;
    value: {
      amount: null;
      percentage: number;
      appliesOnEachItem: null;
    };
  }[];
  shippingAddress: {
    firstName: null;
    lastName: string;
    phone: null;
    company: null;
    address1: string;
    address2: null;
    city: string;
    zip: string;
    countryCode: string;
    provinceCode: string;
  };
}

export interface ISubscriptionLineItem {
  id: number;
  isOneTimeAdded: boolean;
  bundleTransactionId: null;
  productShopifyId: number;
  variantShopifyId: number;
  productTitle: string;
  variantTitle: string;
  sku: string;
  quantity: number;
  price: string;
  basePrice: string;
  discountedPrice: string;
  discountedUnitPrice: string;
}

export interface ISubscriptionShippingAddress {
  firstName?: string;
  lastName: string;
  phone?: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  zip: string;
  countryCode: string;
  provinceCode: string;
}

export interface ISubscriptionOrderShippingAddress {
  name: string | null;
  phone: string | null;
  company: string | null;
  address1: string;
  address2: string;
  city: string;
  zip: string;
  countryCode: string;
  provinceCode: string;
}

export interface ISubscriptionOrder {
  id: number;
  shopifyId?: number;
  billingDate?: string;
  fulfillmentStatus?: string;
  financialStatus?: string;
  note?: string;
  shopifyCreatedAt?: string;
  shopifyProcessedAt?: string;
  shopifyUpdatedAt?: string;
  currencyCode?: string;
  totalPriceUsd: number;
  totalDiscount: number;
  totalLineItemsPrice: number;
  totalShippingPrice: number;
  shopifyOrderNumber?: number;
  status: string;
  paymentMethodId?: number;
  nextBillingDate?: string;
  lineItems: ISubscriptionLineItem[];
  discounts: Discount[];
  shippingAddress?: ISubscriptionOrderShippingAddress;
}

export type IProductVariant = {
  title: string;
  shopifyId: number;
  image: string | null;
  sku: string;
  price: string;
  hasSellingPlan: boolean;
};
export interface SelectedProduct {
  productId: number;
  productTitle: string;
  variant: IProductVariant;
}
