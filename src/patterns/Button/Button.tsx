import { Button, ButtonProps } from '~/components/ui/button';

export const DockButton = (props: ButtonProps) => (
  <Button {...props}>{props.children}</Button>
);
