import { HttpResponse, http } from 'msw';
import { faker } from '@faker-js/faker';
import { Campaign, CampaignObjective, ResponseCampaigns } from '../../types/campaign';
import { paginationObject } from '../../utils';
import { defaultStartPage, defaultPageSize, totalElements } from '../../constants';

/**
 * @description faker 라이브러리를 이용하여 100개의 데이터를 생성합니다.
 */
export const getCampaigns = http.get('/api/campaigns', ({ request }) => {
  const campaigns: Campaign[] = [];
  const url = new URL(request.url);

  for (let i = 0; i < totalElements; i += 1) {
    const campaign: Campaign = {
      id: i + 1,
      name: `캠페인${i + 1}`,
      enabled: faker.datatype.boolean(),
      campaign_objective: faker.helpers.enumValue(CampaignObjective),
      impressions: parseInt(faker.number.int().toString().slice(0, 6), 10),
      clicks: parseInt(faker.number.int().toString().slice(0, 4), 10),
      ctr: parseFloat(faker.number.float().toFixed(4)),
      video_views: parseInt(faker.number.int().toString().slice(0, 3), 10),
      vtr: parseFloat(faker.number.float().toFixed(4)),
    };

    campaigns.push(campaign);
  }

  const pageParams = url.searchParams.get('page');
  const page = pageParams ? parseInt(pageParams, 10) : defaultStartPage;
  const startIndex = page === 1 ? page - 1 : (page - 1) * defaultPageSize;

  const responseCampaigns: ResponseCampaigns = {
    content: campaigns.slice(startIndex, startIndex + defaultPageSize),
    ...paginationObject(page),
  };

  return HttpResponse.json(responseCampaigns);
});

/**
 * @description 캠페인 상태의 enabled를 변경하는 로직은 생략 후 result, id를 리턴합니다.
 */
export const patchCampaignEnable = http.patch('/api/campaigns/:id', async ({ request, params }) => {
  const { id } = params;
  return HttpResponse.json({ result: true, id });
});
