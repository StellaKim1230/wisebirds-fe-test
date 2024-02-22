import { use } from 'react';
import { Text, Box, Divider } from '@chakra-ui/react';
import CampaignListTable from './CampaignListTable';
import { ResponseCampaigns } from '../../types/campaign';
import { defaultPage } from '../../constants';

async function getCampaigns(page: number) {
  const response = await fetch(`${process.env.ApiUrl}/api/campaigns?page=${page}`);
  const campagins = await response.json();
  return campagins;
}

export default function CampaignsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams.page) || defaultPage;
  const campaigns: ResponseCampaigns = use(getCampaigns(page));

  return (
    <Box padding="16px">
      <Text as="h2" fontWeight="bold" marginBottom="16px">
        캠패인 관리
      </Text>
      <Divider />
      <CampaignListTable campaigns={campaigns.content} page={page} totalCount={campaigns.total_elements} />
    </Box>
  );
}
