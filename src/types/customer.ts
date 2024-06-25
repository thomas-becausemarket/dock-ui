export interface ICustomerAddress {
  first_name: string;
  last_name: string;
  address1: string;
  address2?: string;
  city: string;
  province_code: string;
  countryCode: string;
  zip: string;
  phone?: string;
  company?: string;
}
