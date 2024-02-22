import { use } from 'react';
import { Text, Box } from '@chakra-ui/react';
import { ResponseCampaigns } from '../../types/campaign';

async function getUsers() {
  const response = await fetch(`${process.env.ApiUrl}/api/campaigns`);
  const campagins = await response.json();
  return campagins;
}

export default function UsersPage() {
  const campaigns: ResponseCampaigns = use(getUsers());

  return (
    <>
      <Box padding="16px">
        <Text as="h2" fontWeight="bold">
          사용자 관리
        </Text>
      </Box>
      {/* <CampaignListTable campaigns={campaigns.content} /> */}
    </>
  );
}
