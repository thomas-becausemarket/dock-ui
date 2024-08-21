import { Story } from '@ladle/react';

import { InfoCard } from './InfoCard';

export const DefaultInfoCard: Story<{
  title: string;
  titleInfo?: string;
}> = ({ title, titleInfo }) => (
  <InfoCard title={title} titleInfo={titleInfo} titleIcons={['pencil']}>
    Member since: 2 months ago
  </InfoCard>
);

DefaultInfoCard.args = {
  title: 'Title',
  titleInfo: 'hello',
};
