'use client';

import { useState } from 'react';
import { useSnapshot } from 'valtio';
import useSWR from 'swr';
import { Tr, Td, Switch } from '@chakra-ui/react';
import { menuStore } from '../../stores/menuStore';
import { Campaign } from '../../types/campaign';
import { MenuPermission } from '../../types/menu';
import { fetcher, roundAndConvertToPercentage } from '../../utils';
import { HttpMethod } from '../../constants';

interface Props {
  campaign: Campaign;
  page: number;
}

const CampaignListItem = ({ campaign, page }: Props) => {
  const [enabled, setEnabled] = useState<boolean>(campaign.enabled);
  const { permission } = useSnapshot(menuStore);

  const { mutate } = useSWR(`${process.env.ApiUrl}/api/campaigns?page=${page}`, fetcher);

  const handleChangeEnabled = async () => {
    try {
      setEnabled(!enabled);
      await fetch(`${process.env.ApiUrl}/api/campaigns/${campaign.id}`, {
        method: HttpMethod.PATCH,
        body: JSON.stringify({ enabled: !enabled }),
      });
      await mutate();
    } catch (error) {
      throw new Error();
    }
  };

  return (
    <Tr>
      <Td textAlign="center">
        <Switch isChecked={enabled} isDisabled={permission === MenuPermission.VIEWER} onChange={handleChangeEnabled} />
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
