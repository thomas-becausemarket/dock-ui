import { format } from 'date-fns';
import { ReactNode } from 'react';

import { Badge } from '~/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from '~/components/ui/table';
import { priceFormat } from '~/lib/format';
import { Button } from '~/patterns';
import { ISubscription } from '~/types/subscription';

interface SubscriptionCardProps {
  title: string;
  titleIcon?: ReactNode;
  subscription: ISubscription;
}

export const SubscriptionCard = ({
  subscription,
  title,
  titleIcon,
}: SubscriptionCardProps) => {
  const { nextBillingDate } = subscription;

  return (
    <Card className="border-2 border-slate-500 bg-white">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <CardTitle>{title}</CardTitle>
          {titleIcon && titleIcon}
        </div>
        <p className="text-sm text-gray-500">
          Order scheduled on{' '}
          {nextBillingDate && format(nextBillingDate, 'MMMM dd, yyyy')}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <Button className="pl-0">Show Payment Card Info</Button>
          </div>
          <div className="rounded border">
            <Table className="space-y-2 text-base">
              <TableBody>
                {subscription.lineItems.map((lineItem) => (
                  <TableRow key={lineItem.id}>
                    <TableCell>{lineItem.quantity}</TableCell>
                    <TableCell>{lineItem.productTitle}</TableCell>
                    {lineItem.isOneTimeAdded ? (
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className="border-solid border-slate-500"
                        >
                          One Time Purchase
                        </Badge>
                      </TableCell>
                    ) : (
                      <TableCell />
                    )}
                    <TableCell>{priceFormat(lineItem.price)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell />
                  <TableCell>Sub Total</TableCell>
                  <TableCell />
                  <TableCell>$61.04</TableCell>
                </TableRow>
                {/* <TableRow>
                  <TableCell>Shipping</TableCell>
                  <TableCell>$0.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Pre Tax Estimated Total</TableCell>
                  <TableCell>$61.04</TableCell>
                </TableRow> */}
              </TableFooter>
            </Table>
          </div>
        </div>
      </CardContent>
      <CardFooter className="grid grid-flow-col gap-3">
        <Button>Add Item</Button>
        <Button>Move</Button>
        <Button>Change Interval</Button>
        <Button>Apply Coupon</Button>
        <Button>Cancel</Button>
        <Button>Order Now</Button>
      </CardFooter>
    </Card>
  );
};
