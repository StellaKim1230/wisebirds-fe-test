'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Table, Thead, Tbody, Tr, Th, TableContainer, Center } from '@chakra-ui/react';
import CampaignListItem from './CampaignListItem';
import { Pagination } from '../../components/Pagination';
import { Campaign } from '../../types/campaign';
import { defaultSize } from '../../constants';

interface Props {
  campaigns: Campaign[];
  page: number;
  totalCount: number;
}

const CampaignListTable = ({ campaigns, page, totalCount }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const [currentCampaigns, setCurrentCampaigns] = useState<Campaign[]>(campaigns);

  const handlePageChange = async (page: number) => {
    router.replace(`${pathname}?page=${page}`);
    const response = await fetch(`${process.env.ApiUrl}/api/campaigns?page=${page}`);
    const campaigns = await response.json();
    setCurrentCampaigns(campaigns.content);
  };

  return (
    <>
      <TableContainer maxHeight="calc(100vh - 176px)" overflowY="auto" marginBottom="16px">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th textAlign="center">상태</Th>
              <Th>캠페인명</Th>
              <Th>캠페인 목적</Th>
              <Th isNumeric>노출수</Th>
              <Th isNumeric>클릭수</Th>
              <Th isNumeric>CTR</Th>
              <Th isNumeric>동영상조회수</Th>
              <Th isNumeric>VTR</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentCampaigns.map((campaign) => (
              <CampaignListItem key={campaign.id} campaign={campaign} page={page} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Center height="40px">
        <Pagination total={totalCount} size={defaultSize} page={page} setPage={handlePageChange} />
      </Center>
    </>
  );
};

export default CampaignListTable;
