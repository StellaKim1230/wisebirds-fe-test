'use client';

import { useSnapshot } from 'valtio';
import { Tr, Td, Switch } from '@chakra-ui/react';
import { menuStore } from '../../stores/menuStore';
import { Campaign } from '../../types/campaign';
import { MenuPermission } from '../../types/menu';
import { roundAndConvertToPercentage } from '../../utils/roundAndConvertToPercentage';

interface Props {
  campaign: Campaign;
}

const CampaignListItem = ({ campaign }: Props) => {
  const { permission } = useSnapshot(menuStore);

  const handleChangeEnabled = async () => {
    await fetch(`${process.env.ApiUrl}/api/campaigns/${campaign.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ enabled: !campaign.enabled }),
    });
  };

  return (
    <Tr>
      <Td>
        <Switch
          isChecked={campaign.enabled}
          isDisabled={permission === MenuPermission.VIEWER}
          onChange={handleChangeEnabled}
        />
      </Td>
      <Td>{campaign.name}</Td>
      <Td>{campaign.campaign_objective}</Td>
      <Td isNumeric>{new Intl.NumberFormat().format(campaign.impressions)}</Td>
      <Td isNumeric>{new Intl.NumberFormat().format(campaign.clicks)}</Td>
      <Td isNumeric>{roundAndConvertToPercentage(campaign.ctr).toFixed(0)}%</Td>
      <Td isNumeric>{campaign.video_views}</Td>
      <Td isNumeric>{roundAndConvertToPercentage(campaign.vtr).toFixed(0)}%</Td>
    </Tr>
  );
};
export default CampaignListItem;
