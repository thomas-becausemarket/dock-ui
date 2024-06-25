import { Story } from '@ladle/react';
import { Pencil, PlusIcon } from 'lucide-react';

import { InfoCard } from './InfoCard';

export const DefaultInfoCard: Story<{
  title: string;
  titleInfo?: string;
}> = ({ title, titleInfo }) => (
  <InfoCard title={title} titleInfo={titleInfo} titleIcons={[Pencil, PlusIcon]}>
    Member since: 2 months ago
  </InfoCard>
);

DefaultInfoCard.args = {
  title: 'Title',
  titleInfo: '',
};
