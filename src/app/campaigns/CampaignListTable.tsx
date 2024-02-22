import { Table, Thead, Tbody, Tr, Th, TableContainer } from '@chakra-ui/react';
import { Campaign } from '../../types/campaign';
import CampaignListItem from './CampaignListItem';

interface Props {
  campaigns: Campaign[];
}

const CampaignListTable = ({ campaigns }: Props) => {
  return (
    <TableContainer maxHeight="calc(100vh - 200px)" overflowY="auto">
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
          {campaigns.map((campaign) => (
            <CampaignListItem key={campaign.id} campaign={campaign} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default CampaignListTable;
