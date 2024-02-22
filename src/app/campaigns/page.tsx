import { use } from 'react';
import { Text, Box } from '@chakra-ui/react';
import CampaignListTable from './CampaignListTable';
import { ResponseCampaigns } from '../../types/campaign';

async function getCampaigns() {
  const response = await fetch(`${process.env.ApiUrl}/api/campaigns`);
  const campagins = await response.json();
  return campagins;
}

export default function CampaignsPage() {
  const campaigns: ResponseCampaigns = use(getCampaigns());

  return (
    <>
      <Box padding="16px">
        <Text as="h2" fontWeight="bold">
          캠패인 관리
        </Text>
      </Box>
      <CampaignListTable campaigns={campaigns.content} />
    </>
  );
}
