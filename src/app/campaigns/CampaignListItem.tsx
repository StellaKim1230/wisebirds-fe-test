'use client';

import { useSnapshot } from 'valtio';
import { Tr, Td, Switch } from '@chakra-ui/react';
import { menuStore } from '../../stores/menuStore';
import { Campaign } from '../../types/campaign';
import { MenuPermission } from '../..//types/menu';

interface Props {
  campaign: Campaign;
}

const CampaignListItem = ({ campaign }: Props) => {
  const { permission } = useSnapshot(menuStore);
  return (
    <Tr>
      <Td>
        <Switch isChecked={campaign.enabled} isDisabled={permission === MenuPermission.VIEWER} />
      </Td>
      <Td>{campaign.name}</Td>
      <Td>{campaign.campaign_objective}</Td>
      <Td isNumeric>{campaign.impressions}</Td>
      <Td isNumeric>{campaign.clicks}</Td>
      <Td isNumeric>{campaign.ctr}</Td>
      <Td isNumeric>{campaign.video_views}</Td>
      <Td isNumeric>{campaign.vtr}</Td>
    </Tr>
  );
};
export default CampaignListItem;
