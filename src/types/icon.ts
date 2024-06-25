import { LucideProps } from 'lucide-react';

export type IIcon = React.ForwardRefExoticComponent<
  React.SVGProps<SVGSVGElement> &
    LucideProps &
    React.RefAttributes<SVGSVGElement>
>;
