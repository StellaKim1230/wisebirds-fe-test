import { use } from 'react';
import { Text, Box, Divider } from '@chakra-ui/react';
import CampaignListTable from './CampaignListTable';
import ErrorBoundary from '../../components/ErrorBoundary';
import { ResponseCampaigns } from '../../types/campaign';
import { defaultStartPage } from '../../constants';

async function getCampaigns(page: number) {
  try {
    const response = await fetch(`${process.env.ApiUrl}/api/campaigns?page=${page}`);
    const campaigns = await response.json();
    return campaigns;
  } catch (error) {
    throw new Error();
  }
}

export default function CampaignsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams.page) || defaultStartPage;
  const campaigns: ResponseCampaigns = use(getCampaigns(page));

  return (
    <Box padding="16px">
      <Text as="h2" fontWeight="bold" marginBottom="16px">
        캠패인 관리
      </Text>
      <Divider />
      <ErrorBoundary>
        <CampaignListTable campaigns={campaigns.content} page={page} totalCount={campaigns.total_elements} />
      </ErrorBoundary>
    </Box>
  );
}
